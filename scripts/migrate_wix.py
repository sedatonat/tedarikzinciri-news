#\!/usr/bin/env python3
"""
Wix CMS CSV'den Astro content collection'una migrasyon.

Usage:
  python3 scripts/migrate_wix.py --csv <path> --out src/content/news/tr [--limit N]
"""
import argparse, csv, os, re, sys, html, json, hashlib
from pathlib import Path
from urllib.parse import unquote

# ---- Kategori normalize ----
CATEGORY_MAP = {
    'lojistik': 'Lojistik',
    'lojiatik': 'Lojistik',
    'lojstik':  'Lojistik',
    'lojisttik':'Lojistik',
    'warehouse':'Lojistik',
    'tedarik zinciri': 'Tedarik Zinciri',
    'tedarik ziniciri': 'Tedarik Zinciri',
    'teknoloji': 'Teknoloji',
    'envanter':  'Envanter',
    'envanter yönetimi': 'Envanter',
    'satinalma': 'Satınalma',
    'satınalma': 'Satınalma',
}

def normalize_category(raw: str) -> str:
    if not raw: return 'Lojistik'
    key = raw.strip().lower()
    if key in CATEGORY_MAP:
        return CATEGORY_MAP[key]
    for k, v in CATEGORY_MAP.items():
        if key.startswith(k):
            return v
    return 'Lojistik'  # default

# ---- Slug clean ----
TR_MAP = str.maketrans('çğıöşüÇĞİÖŞÜ', 'cgiosuCGIOSU')
def clean_slug(s: str, limit: int = 60) -> str:
    s = s.translate(TR_MAP)
    s = s.lower()
    s = re.sub(r'[^a-z0-9]+', '-', s)
    s = re.sub(r'-+', '-', s).strip('-')
    if len(s) > limit:
        # Kelime sınırında kes
        s2 = s[:limit]
        last_dash = s2.rfind('-')
        if last_dash > limit - 15:
            s2 = s2[:last_dash]
        s = s2
    return s or 'haber'

# ---- Wix image URL → static URL ----
def wix_image_to_url(wix_url: str) -> tuple[str, str]:
    """'wix:image://v1/6c3915_abc~mv2.jpg/filename.jpg#...' → (https://static.wixstatic.com/media/6c3915_abc~mv2.jpg, alt_filename)"""
    if not wix_url or not wix_url.startswith('wix:image'):
        return ('', '')
    m = re.match(r'wix:image://v1/([^/]+)/([^#]+)', wix_url)
    if not m: return ('', '')
    file_id = m.group(1)
    filename = unquote(m.group(2))
    # Alt text filename'dan
    alt = re.sub(r'\.[a-zA-Z0-9]+$', '', filename).replace('-', ' ').replace('%20', ' ')
    return (f'https://static.wixstatic.com/media/{file_id}', alt)

# ---- HTML clean ----
def clean_article_html(html_str: str) -> tuple[str, str]:
    """HTML'den 'Haber Linki' URL'sini çıkar + temizlenmiş HTML döner.
    Returns: (cleaned_html, source_url)"""
    if not html_str: return ('', '')

    source_url = ''
    # 'Haber Linki' yakınındaki ilk http linki bul
    m = re.search(r'Haber Linki[^<]*</strong>[^<]*<a[^>]*href=["\']([^"\']+)["\']', html_str, re.IGNORECASE)
    if not m:
        m = re.search(r'Haber Linki[^<]*<a[^>]*href=["\']([^"\']+)["\']', html_str, re.IGNORECASE)
    if m: source_url = m.group(1)

    # Wix class'larını kaldır
    cleaned = re.sub(r'\s*class="font_\d+"', '', html_str)
    cleaned = re.sub(r'\s*class="font_\d+\s+[^"]*"', '', cleaned)

    # "Haber Linki" paragrafından itibaren sonuna kadar kes (duyuru bloğu dahil)
    # Bu blok layout'ta otomatik ekleniyor
    cut_patterns = [
        r'<p[^>]*>\s*-{3,}\s*</p>',
        r'<p[^>]*>\s*-{5,}\s*</p>',
        r'<p[^>]*>\s*<strong>\s*Haber Linki',
        r'<p[^>]*>\s*<strong>\s*\!\!\! DUYURU',
    ]
    cut_idx = len(cleaned)
    for pat in cut_patterns:
        m = re.search(pat, cleaned, re.IGNORECASE)
        if m and m.start() < cut_idx:
            cut_idx = m.start()
    cleaned = cleaned[:cut_idx].rstrip()

    # Son bir boşluk paragrafı varsa at
    cleaned = re.sub(r'(<p[^>]*>\s*<br\s*/?>\s*</p>\s*)+$', '', cleaned)
    cleaned = re.sub(r'(<p[^>]*>\s*</p>\s*)+$', '', cleaned)

    return cleaned, source_url

# ---- YAML frontmatter escape ----
def yaml_escape(s: str) -> str:
    if s is None: return ''
    s = str(s).replace('\\', '\\\\').replace('"', '\\"')
    return s

def write_md(outdir: Path, slug: str, data: dict, body: str):
    fn = outdir / f'{slug}.md'
    fm_lines = ['---']
    for k, v in data.items():
        if v is None or v == '':
            continue
        if isinstance(v, bool):
            fm_lines.append(f'{k}: {str(v).lower()}')
        elif isinstance(v, (int, float)):
            fm_lines.append(f'{k}: {v}')
        else:
            fm_lines.append(f'{k}: "{yaml_escape(v)}"')
    fm_lines.append('---')
    fm_lines.append('')
    fm_lines.append(body)
    fn.write_text('\n'.join(fm_lines), encoding='utf-8')

def migrate(csv_path: str, outdir: str, limit: int = 0):
    out = Path(outdir)
    out.mkdir(parents=True, exist_ok=True)

    with open(csv_path, 'r', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        rows = list(reader)

    stats = {'total': 0, 'written': 0, 'cats': {}, 'slug_collisions': 0}
    seen_slugs = set()

    if limit > 0:
        # En yeni 'limit' haberi al
        rows.sort(key=lambda r: r.get('Date') or '', reverse=True)
        rows = rows[:limit]

    for row in rows:
        stats['total'] += 1
        slug_raw = (row.get('Slug') or '').strip()
        if not slug_raw: continue

        slug = clean_slug(slug_raw, 60)
        if slug in seen_slugs:
            stats['slug_collisions'] += 1
            slug = f"{slug}-{stats['slug_collisions']}"
        seen_slugs.add(slug)

        subtitle = (row.get('Subtitle') or '').strip()
        date = (row.get('Date') or '2025-12-31T00:00:00Z').strip()
        category = normalize_category(row.get('Category') or '')
        stats['cats'][category] = stats['cats'].get(category, 0) + 1
        authors = 'Sedat Onat'  # Wix UUID override

        image_url, img_alt = wix_image_to_url(row.get('Image') or '')
        alt_text = (row.get('Alt Text') or img_alt or subtitle).strip()

        article_html = row.get('Article') or ''
        body, source_url = clean_article_html(article_html)

        fm = {
            'title': subtitle,
            'subtitle': subtitle,
            'date': date,
            'category': category,
            'image': image_url,
            'imageAlt': alt_text,
            'sourceUrl': source_url,
            'author': authors,
            'translated': True,
            'draft': False
        }
        write_md(out, slug, fm, body)
        stats['written'] += 1

    return stats

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--csv', required=True)
    ap.add_argument('--out', required=True)
    ap.add_argument('--limit', type=int, default=0)
    args = ap.parse_args()
    s = migrate(args.csv, args.out, args.limit)
    print(json.dumps(s, indent=2, ensure_ascii=False))

if __name__ == '__main__':
    main()
