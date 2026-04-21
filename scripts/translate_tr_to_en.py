#!/usr/bin/env python3
"""Translate Turkish news articles in src/content/news-tr/ to English using the
Anthropic API, writing the results to src/content/news-en/ with the same slugs.

Usage:
    pip install anthropic pyyaml
    export ANTHROPIC_API_KEY=sk-ant-...
    python3 scripts/translate_tr_to_en.py

Environment variables:
    ANTHROPIC_API_KEY   Required. Your Anthropic API key.
    CLAUDE_MODEL        Model name (default: claude-sonnet-4-5).
                        Try claude-haiku-4-5-20251001 for ~5x cheaper, slightly
                        rougher translations.
    CONCURRENCY         Parallel requests (default: 4). Raise to 8-10 if you're
                        not hitting rate limits.
    LIMIT               Translate only the first N files (default: all).
                        Useful for a preview run: LIMIT=5
    DRY_RUN=1           List what would be translated without calling the API.

The script is idempotent: if src/content/news-en/{slug}.md already exists, it
is skipped. Re-running will only translate new or previously-failed files.
"""

import json
import os
import re
import sys
import time
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

client = anthropic.Anthropic()

SYSTEM = """You are a professional English-language business and supply-chain news journalist translating Turkish news articles into English.

Rules:
- Produce natural, fluent, publication-quality English in the voice of a reputable business news outlet (Reuters, Financial Times, Wall Street Journal). Avoid literal word-for-word translation; restructure sentences so they read as if written by a native English business reporter.
- Preserve ALL HTML tags and structure EXACTLY (<p>, <strong>, <em>, <ul>, <ol>, <li>, <h2>, <h3>, <br>, style attributes, etc). Do not add, remove, reorder, or merge tags. Keep the same number of paragraphs.
- Preserve inline English technical terms that appear as-is in the Turkish text (e.g. "order picking", "AMR", "RFID", "SEC", "workflow", "detachable cart"). Do not re-translate terms that are already English.
- Convert Turkish decimal style ("2,5 milyon") to English style ("2.5 million"). Convert Turkish thousand separators similarly ("1.000.000" -> "1,000,000").
- Company names, government agencies, and acronyms retain their English form.
- Do NOT add commentary, introductions, translator's notes, disclaimers, or "Translation:" prefixes.
- Do NOT change meaning, merge paragraphs, or drop content.
- Translate the article heading ("title"), subheading ("subtitle"), image alt text, and body.
- Return ONLY a single JSON object with exactly these keys: title, subtitle, imageAlt, body. No prose before or after. No markdown code fences."""

FRONT_RE = re.compile(r"^---\r?\n(.*?)\r?\n---\r?\n?(.*)$", re.DOTALL)


def parse_article(text: str):
    m = FRONT_RE.match(text)
    if not m:
        raise ValueError("no frontmatter block")
    meta = yaml.safe_load(m.group(1)) or {}
    body = m.group(2)
    return meta, body


def dump_yaml_value(v):
    if isinstance(v, bool):
        return "true" if v else "false"
    if isinstance(v, (int, float)):
        return str(v)
    s = str(v) if v is not None else ""
    # Always double-quote strings so our YAML stays unambiguous
    return '"' + s.replace("\\", "\\\\").replace('"', '\\"') + '"'


FIELD_ORDER = [
    "title",
    "subtitle",
    "date",
    "category",
    "image",
    "imageAlt",
    "wixId",
    "sourceUrl",
    "newsSequence",
    "author",
    "translated",
    "draft",
]


def build_frontmatter(meta: dict) -> str:
    lines = []
    seen = set()
    for k in FIELD_ORDER:
        if k in meta:
            lines.append(f"{k}: {dump_yaml_value(meta[k])}")
            seen.add(k)
    for k, v in meta.items():
        if k not in seen:
            lines.append(f"{k}: {dump_yaml_value(v)}")
    return "\n".join(lines)


def extract_json(text: str) -> dict:
    """Extract a JSON object from Claude's response, tolerating stray prose."""
    start = text.find("{")
    end = text.rfind("}")
    if start < 0 or end < 0:
        raise ValueError("no JSON object in response")
    return json.loads(text[start : end + 1])


def translate_one(tr_path: Path) -> dict:
    slug = tr_path.stem
    en_path = EN_DIR / f"{slug}.md"
    if en_path.exists():
        return {"slug": slug, "skipped": True}

    raw = tr_path.read_text(encoding="utf-8")
    meta, body = parse_article(raw)

    if DRY_RUN:
        return {"slug": slug, "dry_run": True, "title": meta.get("title", "")}

    # PyYAML may parse the ISO date as a datetime; coerce back to ISO string
    date_val = meta.get("date")
    if date_val is not None and not isinstance(date_val, str):
        if hasattr(date_val, "isoformat"):
            meta["date"] = date_val.isoformat()
        else:
            meta["date"] = str(date_val)

    payload = {
        "title": meta.get("title", ""),
        "subtitle": meta.get("subtitle", ""),
        "imageAlt": meta.get("imageAlt", ""),
        "body": body.strip(),
    }

    user_msg = (
        "Translate the following Turkish news article fields to English. "
        "Return ONLY a JSON object with keys title, subtitle, imageAlt, body.\n\n"
        + json.dumps(payload, ensure_ascii=False, indent=2)
    )

    last_err = None
    resp = None
    for attempt in range(4):
        try:
            resp = client.messages.create(
                model=MODEL,
                max_tokens=8000,
                system=SYSTEM,
                messages=[{"role": "user", "content": user_msg}],
            )
            break
        except (anthropic.APIConnectionError, anthropic.APITimeoutError) as e:
            last_err = e
            time.sleep(2 ** attempt)
        except anthropic.RateLimitError as e:
            last_err = e
            time.sleep(5 * (attempt + 1))
        except anthropic.APIStatusError as e:
            last_err = e
            if e.status_code and 500 <= e.status_code < 600:
                time.sleep(2 ** attempt)
            else:
                raise
    if resp is None:
        raise last_err or RuntimeError("API failed after retries")

    text = "".join(
        block.text for block in resp.content if getattr(block, "type", "") == "text"
    )
    try:
        translated = extract_json(text)
    except (json.JSONDecodeError, ValueError) as e:
        raise ValueError(f"JSON parse failed: {e}. First 200 chars: {text[:200]!r}")

    for k in ("title", "body"):
        if not translated.get(k):
            raise ValueError(f"missing '{k}' in translation response")

    en_meta = dict(meta)
    en_meta["title"] = translated["title"]
    en_meta["subtitle"] = translated.get("subtitle") or meta.get("subtitle", "")
    en_meta["imageAlt"] = translated.get("imageAlt") or meta.get("imageAlt", "")
    en_meta["translated"] = True

    out_body = translated["body"].strip()
    out_text = f"---\n{build_frontmatter(en_meta)}\n---\n\n{out_body}\n"
    en_path.write_text(out_text, encoding="utf-8")

    return {
        "slug": slug,
        "tokens_in": resp.usage.input_tokens,
        "tokens_out": resp.usage.output_tokens,
    }


def main():
    if not TR_DIR.is_dir():
        sys.exit(f"Source directory not found: {TR_DIR}")
    EN_DIR.mkdir(parents=True, exist_ok=True)

    files = sorted(p for p in TR_DIR.glob("*.md"))
    if LIMIT:
        files = files[:LIMIT]
    total = len(files)

    print(
        f"Translating up to {total} articles using {MODEL} "
        f"(concurrency={CONCURRENCY})",
        flush=True,
    )
    if DRY_RUN:
        print("DRY RUN — no files will be written.", flush=True)
    print()

    done = skipped = failed = 0
    tok_in = tok_out = 0
    start = time.time()

    with ThreadPoolExecutor(max_workers=CONCURRENCY) as ex:
        futures = {ex.submit(translate_one, p): p for p in files}
        for fut in as_completed(futures):
            p = futures[fut]
            try:
                r = fut.result()
                if r.get("skipped"):
                    skipped += 1
                elif r.get("dry_run"):
                    done += 1
                else:
                    done += 1
                    tok_in += r.get("tokens_in", 0)
                    tok_out += r.get("tokens_out", 0)
            except Exception as e:
                failed += 1
                sys.stderr.write(f"\n  x {p.stem}: {e}\n")
            elapsed = time.time() - start
            sys.stdout.write(
                f"\r[{elapsed:6.0f}s] done={done}/{total} skipped={skipped} "
                f"failed={failed} tokens_in={tok_in:,} tokens_out={tok_out:,}    "
            )
            sys.stdout.flush()

    print()
    print(
        f"\nFinished. done={done} skipped={skipped} failed={failed} "
        f"elapsed={time.time()-start:.0f}s"
    )
    if tok_in or tok_out:
        # Approximate Sonnet pricing: $3/M input, $15/M output
        # Adjust if using Haiku/Opus
        cost = tok_in * 3 / 1_000_000 + tok_out * 15 / 1_000_000
        print(
            f"Tokens: in={tok_in:,} out={tok_out:,}  "
            f"(approx Sonnet cost ${cost:.2f}; Haiku would be ~5x cheaper)"
        )
    if failed:
        print(
            "\nSome files failed — they were left untranslated. "
            "Re-run the script to retry only the failures (successes are skipped)."
        )


if __name__ == "__main__":
    main()
