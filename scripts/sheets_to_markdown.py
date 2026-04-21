#!/usr/bin/env python3
"""
sheets_to_markdown.py

Google Sheets'te tutulan haber taslaklarını okur ve Astro content collection'ı için
`src/content/news-tr/*.md` ve `src/content/news-en/*.md` dosyaları üretir.

Beklenen Google Sheet kolonları (ilk satır başlık):
  slug        | yyyy-mm-dd-kebab-case  (zorunlu, benzersiz)
  lang        | tr | en
  status      | draft | publish
  date        | YYYY-MM-DD
  title       | string
  subtitle    | string
  category    | Lojistik | Tedarik Zinciri | Teknoloji | Envanter | Satınalma
  author      | string (boşsa "Sedat Onat")
  image       | URL
  imageAlt    | string
  sourceUrl   | URL
  body        | Markdown gövde (satır sonları \n ile)

Kullanım:
  GOOGLE_SHEETS_CSV_URL=... python3 scripts/sheets_to_markdown.py

`GOOGLE_SHEETS_CSV_URL` Google Sheets'in "Yayımla > CSV" linkidir:
  https://docs.google.com/spreadsheets/d/<ID>/export?format=csv&gid=<GID>

Script idempotent: aynı slug için mevcut dosyayı overwrite eder (status=publish olanlar),
draft olanlar atlanır. status=delete ise dosya silinir (varsa).
"""

from __future__ import annotations
import csv
import io
import os
import sys
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CONTENT_DIRS = {
    "tr": ROOT / "src" / "content" / "news-tr",
    "en": ROOT / "src" / "content" / "news-en",
}

REQUIRED = ["slug", "lang", "status", "date", "title", "category"]


def fetch_csv(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": "tzh-bot/1.0"})
    with urllib.request.urlopen(req, timeout=30) as resp:
        return resp.read().decode("utf-8")


def escape_yaml(s: str) -> str:
    s = (s or "").replace('"', '\\"').replace("\n", " ").strip()
    return f'"{s}"'


def render_md(row: dict) -> str:
    fm_lines = [
        "---",
        f"title: {escape_yaml(row['title'])}",
    ]
    if row.get("subtitle"):
        fm_lines.append(f"subtitle: {escape_yaml(row['subtitle'])}")
    fm_lines.append(f"date: {row['date']}")
    fm_lines.append(f"category: {escape_yaml(row['category'])}")
    fm_lines.append(f"author: {escape_yaml(row.get('author') or 'Sedat Onat')}")
    if row.get("image"):
        fm_lines.append(f"image: {escape_yaml(row['image'])}")
    if row.get("imageAlt"):
        fm_lines.append(f"imageAlt: {escape_yaml(row['imageAlt'])}")
    if row.get("sourceUrl"):
        fm_lines.append(f"sourceUrl: {escape_yaml(row['sourceUrl'])}")
    fm_lines.append("draft: false")
    fm_lines.append("---")
    body = (row.get("body") or "").replace("\\n", "\n")
    return "\n".join(fm_lines) + "\n\n" + body.strip() + "\n"


def process(rows: list[dict]) -> dict:
    counts = {"written": 0, "skipped_draft": 0, "deleted": 0, "errors": 0}
    seen_slugs = set()
    for i, row in enumerate(rows, start=2):
        missing = [k for k in REQUIRED if not row.get(k)]
        if missing:
            print(f"[row {i}] eksik alan: {missing}", file=sys.stderr)
            counts["errors"] += 1
            continue
        lang = row["lang"].strip().lower()
        if lang not in CONTENT_DIRS:
            print(f"[row {i}] bilinmeyen lang: {lang}", file=sys.stderr)
            counts["errors"] += 1
            continue
        slug = row["slug"].strip()
        if slug in seen_slugs:
            print(f"[row {i}] tekrar eden slug: {slug}", file=sys.stderr)
            counts["errors"] += 1
            continue
        seen_slugs.add(slug)
        out_dir = CONTENT_DIRS[lang]
        out_dir.mkdir(parents=True, exist_ok=True)
        out_path = out_dir / f"{slug}.md"
        status = row["status"].strip().lower()
        if status == "delete":
            if out_path.exists():
                out_path.unlink()
                counts["deleted"] += 1
            continue
        if status != "publish":
            counts["skipped_draft"] += 1
            continue
        out_path.write_text(render_md(row), encoding="utf-8")
        counts["written"] += 1
    return counts


def main():
    url = os.environ.get("GOOGLE_SHEETS_CSV_URL")
    if not url:
        print("Hata: GOOGLE_SHEETS_CSV_URL environment değişkeni tanımlı değil.", file=sys.stderr)
        sys.exit(2)
    csv_text = fetch_csv(url)
    reader = csv.DictReader(io.StringIO(csv_text))
    rows = list(reader)
    if not rows:
        print("Google Sheet boş.", file=sys.stderr)
        sys.exit(0)
    counts = process(rows)
    print(
        f"Yazılan: {counts['written']}  Atlanan (draft): {counts['skipped_draft']}  "
        f"Silinen: {counts['deleted']}  Hata: {counts['errors']}"
    )


if __name__ == "__main__":
    main()
