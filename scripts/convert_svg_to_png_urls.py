#!/usr/bin/env python3
"""
Convert Wikipedia SVG image URLs in article frontmatter to PNG thumbnail URLs.

Why:
  Browsers and (especially) social-media OG/Twitter card crawlers do not always
  render SVG images. When the SVG fails, our NewsCard/FlowCard/NewsLayout
  onerror handler falls back to /og-default.png (the TZP.NEWS branded card),
  which is exactly what the user is complaining about.

What this does:
  Walks src/content/news-tr/ and src/content/news-en/ and rewrites the `image:`
  field of any article whose URL is a Wikipedia/Wikimedia SVG.

URL transformations:
  1) https://upload.wikimedia.org/wikipedia/commons/X/XX/Filename.svg
     →  https://upload.wikimedia.org/wikipedia/commons/thumb/X/XX/Filename.svg/1280px-Filename.svg.png

  2) https://en.wikipedia.org/wiki/Special:FilePath/Filename.svg?width=640
     →  https://upload.wikimedia.org/wikipedia/commons/thumb/H/HH/Filename.svg/1280px-Filename.svg.png
     where H/HH is the MD5 hash directory used by Wikimedia (first char / first 2 chars
     of md5(Filename) — the filename is the URL-decoded form, with underscores).

The resulting PNG thumbnails are the same images Wikimedia renders for in-page
display, so they exist and are cache-friendly.
"""

from __future__ import annotations

import hashlib
import re
import sys
import urllib.parse
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
TR_DIR = ROOT / "src" / "content" / "news-tr"
EN_DIR = ROOT / "src" / "content" / "news-en"

# Match the `image:` line in YAML frontmatter. We do this with a single regex
# so we don't have to parse YAML. The URL may be unquoted, single-quoted, or
# double-quoted — capture the prefix, optional opening quote, the URL itself,
# and the optional closing quote separately so we can reconstruct the line
# without disturbing the quoting style.
IMAGE_LINE_RE = re.compile(
    r"""^(image:\s*)(["']?)([^"'\s]+)\2\s*$""",
    re.MULTILINE,
)

UPLOAD_RE = re.compile(
    r"^https://upload\.wikimedia\.org/wikipedia/commons/([0-9a-f])/([0-9a-f]{2})/([^/?#]+\.svg)$",
    re.IGNORECASE,
)
SPECIAL_FILEPATH_RE = re.compile(
    r"^https://en\.wikipedia\.org/wiki/Special:FilePath/([^?#]+\.svg)(?:\?.*)?$",
    re.IGNORECASE,
)


def md5_dir(filename: str) -> tuple[str, str]:
    """Return Wikimedia's (first_char, first_two_chars) directory pair."""
    h = hashlib.md5(filename.encode("utf-8")).hexdigest()
    return h[0], h[:2]


def transform(url: str) -> str | None:
    """Return new URL, or None if URL doesn't need transforming."""
    m = UPLOAD_RE.match(url)
    if m:
        a, ab, fname = m.group(1), m.group(2), m.group(3)
        return (
            f"https://upload.wikimedia.org/wikipedia/commons/thumb/{a}/{ab}/{fname}"
            f"/1280px-{fname}.png"
        )

    m = SPECIAL_FILEPATH_RE.match(url)
    if m:
        # Filename in URL is percent-encoded — decode for the MD5 calc and for
        # rebuilding the direct-upload path. Wikimedia uses the underscore form.
        encoded_fname = m.group(1)
        fname = urllib.parse.unquote(encoded_fname)
        a, ab = md5_dir(fname)
        # Re-encode for path safety (spaces → underscores already, but unicode
        # filenames need percent-encoding in the resulting URL).
        path_fname = urllib.parse.quote(fname, safe="")
        return (
            f"https://upload.wikimedia.org/wikipedia/commons/thumb/{a}/{ab}/{path_fname}"
            f"/1280px-{path_fname}.png"
        )

    return None


def process_file(path: Path, dry_run: bool) -> tuple[bool, str | None]:
    """Return (changed, new_image_url_or_None)."""
    text = path.read_text(encoding="utf-8")
    m = IMAGE_LINE_RE.search(text)
    if not m:
        return False, None
    prefix, quote, old_url = m.group(1), m.group(2), m.group(3).strip()
    new_url = transform(old_url)
    if not new_url or new_url == old_url:
        return False, None
    new_text = text[: m.start()] + f"{prefix}{quote}{new_url}{quote}" + text[m.end():]
    if not dry_run:
        path.write_text(new_text, encoding="utf-8")
    return True, new_url


def main() -> int:
    dry_run = "--dry-run" in sys.argv
    changed = 0
    skipped_dirs: list[Path] = []
    for d in (TR_DIR, EN_DIR):
        if not d.is_dir():
            skipped_dirs.append(d)
            continue
        for md in sorted(d.glob("*.md")):
            did, new_url = process_file(md, dry_run)
            if did:
                changed += 1
                if dry_run:
                    print(f"[would-update] {md.relative_to(ROOT)} → {new_url}")
                else:
                    print(f"[updated]    {md.relative_to(ROOT)}")
    if skipped_dirs:
        for d in skipped_dirs:
            print(f"[skip] missing dir: {d}", file=sys.stderr)
    print(f"\nTotal {'would-be-updated' if dry_run else 'updated'}: {changed}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
