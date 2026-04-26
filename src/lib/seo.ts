/**
 * Schema.org / JSON-LD helpers.
 *
 * Centralizes publisher / author / site identity so every page emits a
 * consistent, complete graph for Google News, Rich Results, and voice
 * assistants. Each helper returns a plain object that gets serialized into
 * its own <script type="application/ld+json"> block by BaseLayout.
 *
 * Why separate scripts (instead of one @graph blob): Google's Rich Results
 * Test parses each block independently; one invalid block doesn't void the
 * others, and validation errors point at the right schema. Crawlers handle
 * either form, so we go with the more debuggable one.
 */

import type { Lang } from '../i18n/ui';
import { categoryLabel } from '../i18n/utils';

export const SITE_URL = 'https://tzp.news';
export const SITE_NAME_TR = 'Tedarik Zinciri Haberleri';
export const SITE_NAME_EN = 'Supply Chain News';
export const PUBLISHER_LOGO = `${SITE_URL}/logo-light.png`;
export const PUBLISHER_LOGO_WIDTH = 600;
export const PUBLISHER_LOGO_HEIGHT = 60;

// Author identity. Kept here (not in frontmatter) so we can enrich it across
// every article in one place when, e.g., adding a Twitter or sameAs handle.
export const AUTHOR_NAME = 'Sedat Onat';
export const AUTHOR_URL = 'https://www.sedatonat.com';
export const AUTHOR_SAME_AS: string[] = [
  'https://www.linkedin.com/in/sedatonat/',
  'https://www.sedatonat.com',
];
export const AUTHOR_JOB_TITLE_TR = 'Tedarik Zinciri Editörü';
export const AUTHOR_JOB_TITLE_EN = 'Supply Chain Editor';
export const AUTHOR_KNOWS_ABOUT = [
  'supply chain',
  'logistics',
  'procurement',
  'inventory management',
  'shipping',
  'maritime',
  'tariffs',
  'trade policy',
];

export function siteName(lang: Lang): string {
  return lang === 'tr' ? SITE_NAME_TR : SITE_NAME_EN;
}

export function authorJobTitle(lang: Lang): string {
  return lang === 'tr' ? AUTHOR_JOB_TITLE_TR : AUTHOR_JOB_TITLE_EN;
}

/** Strip <tags>, collapse whitespace, return word count (for NewsArticle.wordCount). */
export function wordCount(html: string | undefined): number {
  if (!html) return 0;
  const text = html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (!text) return 0;
  return text.split(' ').length;
}

/** Convert word count to "PT5M" (ISO 8601 duration). 200 wpm reading speed. */
export function readingTime(words: number): string {
  const minutes = Math.max(1, Math.round(words / 200));
  return `PT${minutes}M`;
}

/** Reusable Person block for author. */
export function authorPerson(lang: Lang) {
  return {
    '@type': 'Person',
    name: AUTHOR_NAME,
    url: AUTHOR_URL,
    sameAs: AUTHOR_SAME_AS,
    jobTitle: authorJobTitle(lang),
    knowsAbout: AUTHOR_KNOWS_ABOUT,
    worksFor: {
      '@type': 'Organization',
      name: siteName(lang),
      url: SITE_URL,
    },
  };
}

/** Reusable Organization block for publisher. */
export function publisherOrg(lang: Lang) {
  return {
    '@type': 'NewsMediaOrganization',
    name: siteName(lang),
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: PUBLISHER_LOGO,
      width: PUBLISHER_LOGO_WIDTH,
      height: PUBLISHER_LOGO_HEIGHT,
    },
    sameAs: [
      // Add social handles here when the site has them; empty array still
      // signals "we know about this field" to crawlers.
    ],
  };
}

/** WebSite schema with SearchAction — sitelinks search box in SERP. */
export function websiteSchema(lang: Lang) {
  const searchPath = lang === 'tr' ? '/ara' : '/en/search';
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName(lang),
    url: SITE_URL + (lang === 'tr' ? '/' : '/en/'),
    inLanguage: lang === 'tr' ? 'tr-TR' : 'en-US',
    publisher: publisherOrg(lang),
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}${searchPath}?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/** Standalone Organization schema for the home page. */
export function organizationSchema(lang: Lang) {
  return {
    '@context': 'https://schema.org',
    ...publisherOrg(lang),
  };
}

interface BreadcrumbItem {
  name: string;
  url?: string; // omit for the current/last item per Schema.org spec
}

/** BreadcrumbList — appears as breadcrumb in SERP instead of raw URL. */
export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => {
      const entry: Record<string, unknown> = {
        '@type': 'ListItem',
        position: idx + 1,
        name: item.name,
      };
      if (item.url) entry.item = item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`;
      return entry;
    }),
  };
}

interface NewsArticleParams {
  lang: Lang;
  title: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  datePublished: string;
  dateModified?: string;
  category: string;
  tags?: string[];
  bodyHtml?: string;
  sourceUrl?: string;
  canonicalUrl: string;
}

/** Enriched NewsArticle with author, publisher, speakable, wordCount, etc. */
export function newsArticleSchema(p: NewsArticleParams) {
  const words = wordCount(p.bodyHtml);
  const isoPub = new Date(p.datePublished).toISOString();
  const isoMod = p.dateModified ? new Date(p.dateModified).toISOString() : isoPub;
  const catLabel = categoryLabel[p.category]?.[p.lang] ?? p.category;

  const obj: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: p.title,
    description: p.description,
    inLanguage: p.lang === 'tr' ? 'tr-TR' : 'en-US',
    datePublished: isoPub,
    dateModified: isoMod,
    articleSection: catLabel,
    author: authorPerson(p.lang),
    publisher: publisherOrg(p.lang),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': p.canonicalUrl,
    },
    // speakable lets Google Assistant / smart speakers read the article aloud
    // by quoting the matched selectors. We target the h1 (always present) and
    // .prose-article (the article body wrapper in NewsLayout) so the TTS pulls
    // headline + intro paragraph + takeaways. Keeping selectors broad means
    // the schema stays valid even if we later restructure the article header.
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '.prose-article > p:first-of-type', '.prose-article > p:last-of-type'],
    },
  };

  if (p.image) {
    obj.image = [
      {
        '@type': 'ImageObject',
        url: p.image,
        caption: p.imageAlt ?? p.title,
      },
    ];
  }
  if (p.tags && p.tags.length) obj.keywords = p.tags.join(', ');
  if (words > 0) {
    obj.wordCount = words;
    obj.timeRequired = readingTime(words);
  }
  if (p.sourceUrl) obj.isBasedOn = p.sourceUrl;

  return obj;
}

/** CollectionPage for category and tag listings. */
export function collectionPageSchema(params: {
  lang: Lang;
  name: string;
  description?: string;
  url: string;
  itemCount?: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: params.name,
    description: params.description,
    url: params.url,
    inLanguage: params.lang === 'tr' ? 'tr-TR' : 'en-US',
    isPartOf: {
      '@type': 'WebSite',
      name: siteName(params.lang),
      url: SITE_URL,
    },
    publisher: publisherOrg(params.lang),
    ...(params.itemCount !== undefined
      ? {
          mainEntity: {
            '@type': 'ItemList',
            numberOfItems: params.itemCount,
          },
        }
      : {}),
  };
}
