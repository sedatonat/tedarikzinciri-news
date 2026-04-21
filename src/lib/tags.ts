import type { Lang } from '../i18n/ui';
import { getCollection, type CollectionEntry } from 'astro:content';

/**
 * Turkish-aware tag slugifier.
 * "Konteyner Gemisi" -> "konteyner-gemisi"
 * "Kızıldeniz" -> "kizildeniz"
 * Keeps behavior identical for EN tags ("Maersk" -> "maersk").
 */
export function slugifyTag(tag: string): string {
  return tag
    .toLowerCase()
    .replace(/ı/g, 'i')
    .replace(/İ/g, 'i')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function tagPath(lang: Lang, tag: string): string {
  const slug = slugifyTag(tag);
  return lang === 'tr' ? `/etiketler/${slug}` : `/en/tags/${slug}`;
}

export function tagsIndexPath(lang: Lang): string {
  return lang === 'tr' ? '/etiketler/' : '/en/tags/';
}

export type TagStat = {
  tag: string;        // display form (first-seen spelling)
  slug: string;       // canonical slug
  count: number;
};

/**
 * Build a sorted list of all tags for a language with their article counts.
 * Tags are de-duplicated by slug (so "AI" and "ai" collapse into one).
 */
export async function getAllTags(lang: Lang): Promise<TagStat[]> {
  const collection = lang === 'tr' ? 'news-tr' : 'news-en';
  const entries = await getCollection(collection, ({ data }) => !data.draft);
  const bySlug = new Map<string, TagStat>();
  for (const entry of entries) {
    const tags = (entry.data.tags ?? []) as string[];
    for (const raw of tags) {
      const tag = raw.trim();
      if (!tag) continue;
      const slug = slugifyTag(tag);
      if (!slug) continue;
      const existing = bySlug.get(slug);
      if (existing) {
        existing.count += 1;
      } else {
        bySlug.set(slug, { tag, slug, count: 1 });
      }
    }
  }
  return Array.from(bySlug.values()).sort((a, b) => {
    // Sort by count desc, then alphabetically
    if (b.count !== a.count) return b.count - a.count;
    return a.tag.localeCompare(b.tag, lang === 'tr' ? 'tr' : 'en');
  });
}

/**
 * Return all articles tagged with a given slug (slug-insensitive match).
 */
export async function getArticlesByTag(
  lang: Lang,
  slug: string
): Promise<CollectionEntry<'news-tr' | 'news-en'>[]> {
  const collection = lang === 'tr' ? 'news-tr' : 'news-en';
  const entries = await getCollection(collection, ({ data }) => !data.draft);
  return entries
    .filter(e => (e.data.tags ?? []).some((t: string) => slugifyTag(t) === slug))
    .sort((a, b) => new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf());
}

/**
 * Find the display form of a tag by its slug for a language.
 * Returns the most common spelling if multiple rows map to the same slug.
 */
export async function getTagDisplayForm(lang: Lang, slug: string): Promise<string | null> {
  const tags = await getAllTags(lang);
  const match = tags.find(t => t.slug === slug);
  return match?.tag ?? null;
}
