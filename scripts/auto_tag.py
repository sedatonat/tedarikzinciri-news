#!/usr/bin/env python3
"""Auto-tag all Turkish and English news articles with 5-8 content tags
produced by the Anthropic API.

Pipeline:
    Phase 1 (TR):  For each file in src/content/news-tr/ without tags, call
                   Claude with title + subtitle + body and get 5-8 Turkish
                   tags back. Write them into frontmatter.
    Phase 2 (EN):  For each file in src/content/news-en/ without tags, try
                   to find the matching TR article by slug. If found, ask
                   Claude to translate the TR tags into English. If not
                   found, tag the EN article directly.

Usage:
    pip install anthropic pyyaml
    export ANTHROPIC_API_KEY=sk-ant-...
    python3 scripts/auto_tag.py              # both phases
    python3 scripts/auto_tag.py --tr-only    # only phase 1
    python3 scripts/auto_tag.py --en-only    # only phase 2
    LIMIT=20 python3 scripts/auto_tag.py     # first 20 per phase (preview)
    DRY_RUN=1 python3 scripts/auto_tag.py    # list files without API calls

Environment variables:
    ANTHROPIC_API_KEY   Required.
    CLAUDE_MODEL        Default: claude-sonnet-4-5. Haiku is cheaper:
                        claude-haiku-4-5-20251001
    CONCURRENCY         Parallel requests (default: 4)
    LIMIT               Stop after N files per phase (default: all)
    DRY_RUN=1           List files that would be tagged, do not call API
    FORCE=1             Re-tag even files that already have tags

The script is idempotent: by default it skips any file whose frontmatter
already has a non-empty `tags` array. Pass FORCE=1 to overwrite.
"""

from __future__ import annotations

import argparse
import json
import os
import re
import sys
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

try:
    import anthropic
except ImportError:
    sys.exit("Missing dependency. Run: pip install anthropic pyyaml")
try:
    import yaml
except ImportError:
    sys.exit("Missing dependency. Run: pip install anthropic pyyaml")


ROOT = Path(__file__).resolve().parent.parent
TR_DIR = ROOT / "src" / "content" / "news-tr"
EN_DIR = ROOT / "src" / "content" / "news-en"

MODEL = os.environ.get("CLAUDE_MODEL", "claude-sonnet-4-5")
CONCURRENCY = int(os.environ.get("CONCURRENCY", "4"))
LIMIT = int(os.environ.get("LIMIT", "0")) or None
DRY_RUN = os.environ.get("DRY_RUN") == "1"
FORCE = os.environ.get("FORCE") == "1"

client = anthropic.Anthropic()

# ---------------------------------------------------------------------------
# Frontmatter helpers
# ---------------------------------------------------------------------------
FRONTMATTER_RE = re.compile(r"^---\s*\n(.*?)\n---\s*\n(.*)$", re.DOTALL)


def read_article(path: Path) -> tuple[dict, str]:
    """Return (frontmatter_dict, body)."""
    text = path.read_text(encoding="utf-8")
    m = FRONTMATTER_RE.match(text)
    if not m:
        raise ValueError(f"No frontmatter delimiter in {path}")
    fm = yaml.safe_load(m.group(1)) or {}
    body = m.group(2)
    return fm, body


def write_article(path: Path, fm: dict, body: str) -> None:
    """Write frontmatter + body back, preserving ordering as much as possible."""
    # Dump YAML with quotes for strings that need them. PyYAML uses default_flow_style=False.
    yaml_text = yaml.safe_dump(
        fm,
        allow_unicode=True,
        sort_keys=False,
        default_flow_style=False,
        width=1_000_000,
    ).rstrip()
    path.write_text(f"---\n{yaml_text}\n---\n{body}", encoding="utf-8")


def strip_html(html: str) -> str:
    """Fast, approximate strip for feeding to the LLM (saves tokens)."""
    # Drop HTML tags but keep text
    no_tags = re.sub(r"<[^>]+>", " ", html)
    # Collapse whitespace
    return re.sub(r"\s+", " ", no_tags).strip()


# ---------------------------------------------------------------------------
# Tagging tool schema (Claude returns tags via a structured tool call)
# ---------------------------------------------------------------------------
TAG_TOOL = {
    "name": "submit_tags",
    "description": "Submit 5-8 content tags for the supplied news article.",
    "input_schema": {
        "type": "object",
        "properties": {
            "tags": {
                "type": "array",
                "minItems": 5,
                "maxItems": 8,
                "items": {"type": "string"},
                "description": "5-8 concise content tags covering the article.",
            }
        },
        "required": ["tags"],
    },
}

TR_SYSTEM = """Sen bir tedarik zinciri, lojistik, satınalma ve teknoloji haberlerini etiketleyen profesyonel bir editörsün.

Görevin: Verilen habere 5-8 adet kısa, tutarlı, anlamlı Türkçe etiket üretmek.

Kurallar:
- Etiketler 1-3 kelime olmalı, tercihen isim tamlamaları ("konteyner gemisi", "yapay zeka", "otonom mobil robot")
- Şirket adları, ülke/bölge adları, teknoloji adları, olay türleri ve sektör terimleri uygundur
- Kısaltmaları olduğu gibi bırak: "AI", "RFID", "AMR", "SEC", "CMA CGM"
- Baş harfleri büyük yazma; sadece özel adlar büyük (örn. "Maersk", "Kızıldeniz", "Avrupa Birliği")
- Çok genel etiketlerden kaçın ("haber", "şirket", "olay"). Tag aranabilir ve ayırt edici olmalı.
- Sadece `submit_tags` aracını çağırarak yanıt ver. Normal metin yazma."""

EN_TRANSLATE_SYSTEM = """You translate Turkish content tags into natural English content tags for a supply-chain / logistics news site.

Rules:
- Keep the same number of tags.
- Preserve case: proper nouns capitalized, generic terms lowercase.
- Keep English technical terms already in the Turkish tag unchanged (AI, RFID, AMR, SEC, carrier, etc.).
- "Kızıldeniz" -> "Red Sea", "konteyner gemisi" -> "container ship", "otonom mobil robot" -> "autonomous mobile robot" / "AMR".
- Translate place names to their common English form.
- Respond ONLY via the `submit_tags` tool call."""

EN_SYSTEM = """You are a professional editor tagging supply-chain, logistics, procurement and technology news articles.

Your task: produce 5-8 short, consistent, meaningful English content tags for the supplied article.

Rules:
- Tags should be 1-3 words, usually noun phrases ("container ship", "artificial intelligence", "autonomous mobile robot").
- Company names, countries/regions, technology names, event types and industry terms are all appropriate.
- Keep acronyms as-is: "AI", "RFID", "AMR", "SEC", "CMA CGM".
- Case: lowercase for generic terms, capitalize proper nouns only ("Maersk", "Red Sea", "European Union").
- Avoid overly generic tags ("news", "company", "event"). Tags should be searchable and distinguishing.
- Respond ONLY via the `submit_tags` tool call."""


# ---------------------------------------------------------------------------
# API calls
# ---------------------------------------------------------------------------
def _call_tag_tool(system: str, user_text: str) -> list[str] | None:
    """Call the API once, return tags list or None on failure."""
    try:
        response = client.messages.create(
            model=MODEL,
            max_tokens=512,
            system=system,
            tools=[TAG_TOOL],
            tool_choice={"type": "tool", "name": "submit_tags"},
            messages=[{"role": "user", "content": user_text}],
        )
    except Exception as exc:
        print(f"    ! API error: {exc}", file=sys.stderr)
        return None

    for block in response.content:
        if block.type == "tool_use" and block.name == "submit_tags":
            raw = block.input.get("tags", [])
            tags = [str(t).strip() for t in raw if str(t).strip()]
            # De-duplicate preserving order
            seen = set()
            unique: list[str] = []
            for t in tags:
                key = t.lower()
                if key not in seen:
                    seen.add(key)
                    unique.append(t)
            return unique[:8]
    return None


def tag_article_tr(fm: dict, body: str) -> list[str] | None:
    text = "\n".join([
        f"Başlık: {fm.get('title', '')}",
        f"Özet: {fm.get('subtitle', '')}",
        "",
        "İçerik:",
        strip_html(body)[:6000],
    ])
    return _call_tag_tool(TR_SYSTEM, text)


def tag_article_en_direct(fm: dict, body: str) -> list[str] | None:
    text = "\n".join([
        f"Title: {fm.get('title', '')}",
        f"Subtitle: {fm.get('subtitle', '')}",
        "",
        "Body:",
        strip_html(body)[:6000],
    ])
    return _call_tag_tool(EN_SYSTEM, text)


def translate_tags_tr_to_en(tr_tags: list[str]) -> list[str] | None:
    payload = "\n".join(f"- {t}" for t in tr_tags)
    return _call_tag_tool(EN_TRANSLATE_SYSTEM, f"Translate these Turkish tags into English:\n{payload}")


# ---------------------------------------------------------------------------
# Phase runners
# ---------------------------------------------------------------------------
def _needs_tagging(fm: dict) -> bool:
    if FORCE:
        return True
    existing = fm.get("tags")
    return not (isinstance(existing, list) and len(existing) > 0)


def process_tr_file(path: Path) -> tuple[Path, str]:
    try:
        fm, body = read_article(path)
    except Exception as exc:
        return path, f"read-error: {exc}"
    if not _needs_tagging(fm):
        return path, "skip (already tagged)"
    if DRY_RUN:
        return path, "would-tag"
    tags = tag_article_tr(fm, body)
    if not tags:
        return path, "no tags returned"
    fm["tags"] = tags
    try:
        write_article(path, fm, body)
    except Exception as exc:
        return path, f"write-error: {exc}"
    return path, f"ok ({len(tags)}): {', '.join(tags)}"


def process_en_file(path: Path) -> tuple[Path, str]:
    try:
        fm, body = read_article(path)
    except Exception as exc:
        return path, f"read-error: {exc}"
    if not _needs_tagging(fm):
        return path, "skip (already tagged)"
    if DRY_RUN:
        return path, "would-tag"

    # Try to find matching TR article by slug (filename)
    tr_path = TR_DIR / path.name
    if tr_path.exists():
        try:
            tr_fm, _ = read_article(tr_path)
            tr_tags = tr_fm.get("tags")
        except Exception:
            tr_tags = None
        if isinstance(tr_tags, list) and tr_tags:
            tags = translate_tags_tr_to_en(tr_tags)
            if tags:
                fm["tags"] = tags
                try:
                    write_article(path, fm, body)
                except Exception as exc:
                    return path, f"write-error: {exc}"
                return path, f"ok via TR ({len(tags)}): {', '.join(tags)}"

    # Fall back to direct tagging
    tags = tag_article_en_direct(fm, body)
    if not tags:
        return path, "no tags returned"
    fm["tags"] = tags
    try:
        write_article(path, fm, body)
    except Exception as exc:
        return path, f"write-error: {exc}"
    return path, f"ok direct ({len(tags)}): {', '.join(tags)}"


def run_phase(label: str, directory: Path, processor) -> None:
    files = sorted(p for p in directory.glob("*.md") if p.is_file())
    if LIMIT:
        files = files[:LIMIT]
    print(f"\n=== {label} ({len(files)} files, model={MODEL}, concurrency={CONCURRENCY}) ===")
    if not files:
        return

    done = 0
    with ThreadPoolExecutor(max_workers=CONCURRENCY) as pool:
        futures = {pool.submit(processor, p): p for p in files}
        for fut in as_completed(futures):
            path = futures[fut]
            try:
                _, message = fut.result()
            except Exception as exc:
                message = f"crash: {exc}"
            done += 1
            print(f"[{done}/{len(files)}] {path.name} -> {message}")


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------
def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--tr-only", action="store_true", help="Only run Turkish tagging phase")
    parser.add_argument("--en-only", action="store_true", help="Only run English phase")
    args = parser.parse_args()

    run_tr = not args.en_only
    run_en = not args.tr_only

    if run_tr:
        run_phase("Phase 1 / TR tagging", TR_DIR, process_tr_file)
    if run_en:
        run_phase("Phase 2 / EN tagging (via TR translation)", EN_DIR, process_en_file)


if __name__ == "__main__":
    main()
