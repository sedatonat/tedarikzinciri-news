#!/usr/bin/env python3
"""
fetch_sources.py

RSS/Atom kaynaklardan tedarik zinciri haberlerini çeker, daha önce görülmemiş olanları
taslak olarak `src/content/drafts/` altına yazar. Taslaklar, bir insan tarafından
gözden geçirilip `src/content/news-tr/` veya `src/content/news-en/` altına taşınana
kadar siteye dahil edilmez (content collection bu klasörleri okumaz).

Kaynak listesi `scripts/sources.json` dosyasından okunur. Örnek:
[
  {"name": "Supply Chain Dive", "rss": "https://www.supplychaindive.com/feeds/news/", "lang": "en"},
  {"name": "gCaptain", "rss": "https://gcaptain.com/feed/", "lang": "en"}
]

Daha önce görülen haberler `.seen-urls.txt` dosyasında tutulur (repo'ya commit edilir).
"""

from __future__ import annotations
import hashlib
import json
import os
import re
import sys
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DRAFTS_DIR = ROOT / "src" / "content" / "drafts"
SEEN_FILE = ROOT / "scripts" / ".seen-urls.txt"
SOURCES_FILE = ROOT / "scripts" / "sources.json"


def slugify(s: str, max_len: int = 80) -> str:
    s = s.lower()
    s = re.sub(r"[^a-z0-9]+", "-", s).strip("-")
    return s[:max_len] or hashlib.sha1(s.encode()).hexdigest()[:12]


def load_seen() -> set[str]:
    if SEEN_FILE.exists():
        return set(SEEN_FILE.read_text(encoding="utf-8").splitlines())
    return set()


def save_seen(seen: set[str]) -> None:
    SEEN_FILE.parent.mkdir(parents=True, exist_ok=True)
    SEEN_FILE.write_text("\n".join(sorted(seen)) + "\n", encoding="utf-8")


def fetch(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": "tzh-bot/1.0"})
    with urllib.request.urlopen(req, timeout=30) as resp:
        return resp.read().decode("utf-8", errors="replace")


def parse_rss(xml_text: str) -> list[dict]:
    # Basit RSS 2.0 / Atom parse. feedparser'a bağımlılık kurmamak için.
    try:
        root = ET.fromstring(xml_text)
    except ET.ParseError:
        return []
    items = []
    # RSS 2.0
    for it in root.iter("item"):
        title = (it.findtext("title") or "").strip()
        link = (it.findtext("link") or "").strip()
        pub = (it.findtext("pubDate") or "").strip()
        desc = (it.findtext("description") or "").strip()
        if title and link:
            items.append({"title": title, "link": link, "date": pub, "summary": desc})
    # Atom
    if not items:
        ns = {"a": "http://www.w3.org/2005/Atom"}
        for it in root.iter("{http://www.w3.org/2005/Atom}entry"):
            title = (it.findtext("a:title", default="", namespaces=ns) or "").strip()
            link_el = it.find("a:link", ns)
            link = link_el.get("href") if link_el is not None else ""
            pub = (
                it.findtext("a:published", default="", namespaces=ns)
                or it.findtext("a:updated", default="", namespaces=ns)
                or ""
            ).strip()
            desc = (it.findtext("a:summary", default="", namespaces=ns) or "").strip()
            if title and link:
                items.append({"title": title, "link": link, "date": pub, "summary": desc})
    return items


def write_draft(source: str, lang: str, item: dict) -> Path:
    DRAFTS_DIR.mkdir(parents=True, exist_ok=True)
    today = datetime.utcnow().strftime("%Y-%m-%d")
    slug = f"{today}-{slugify(item['title'])}"
    path = DRAFTS_DIR / f"{slug}.md"
    title = item["title"].replace('"', '\\"')
    summary = re.sub(r"<[^>]+>", "", item.get("summary", "")).strip()[:500]
    content = (
        f"---\n"
        f'title: "{title}"\n'
        f'subtitle: ""\n'
        f"date: {today}\n"
        f'category: "Tedarik Zinciri"\n'
        f'author: "Sedat Onat"\n'
        f'sourceUrl: "{item["link"]}"\n'
        f'source: "{source}"\n'
        f'lang: "{lang}"\n'
        f"draft: true\n"
        f"---\n\n"
        f"{summary}\n\n"
        f"> **Kaynak:** [{source}]({item['link']})  \n"
        f"> Bu taslak otomatik üretildi. Yayımlamadan önce gövdeyi yeniden yazın, "
        f"kategoriyi doğrulayın ve uygun koleksiyona (news-tr/news-en) taşıyın.\n"
    )
    path.write_text(content, encoding="utf-8")
    return path


def main():
    if not SOURCES_FILE.exists():
        print(f"sources.json yok: {SOURCES_FILE}", file=sys.stderr)
        sys.exit(2)
    sources = json.loads(SOURCES_FILE.read_text(encoding="utf-8"))
    seen = load_seen()
    new_count = 0
    for src in sources:
        name = src.get("name", src.get("rss", "?"))
        rss = src["rss"]
        lang = src.get("lang", "en")
        try:
            xml_text = fetch(rss)
        except Exception as e:
            print(f"[{name}] fetch hata: {e}", file=sys.stderr)
            continue
        items = parse_rss(xml_text)
        for it in items:
            if it["link"] in seen:
                continue
            seen.add(it["link"])
            try:
                write_draft(name, lang, it)
                new_count += 1
            except Exception as e:
                print(f"[{name}] yazma hata: {e}", file=sys.stderr)
    save_seen(seen)
    print(f"Yeni taslak: {new_count}")


if __name__ == "__main__":
    main()
