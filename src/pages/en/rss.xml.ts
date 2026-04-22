import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { ui } from '../../i18n/ui';

export async function GET(context: any) {
  const items = await getCollection('news-en', ({ data }) => !data.draft);
  return rss({
    title: ui.en['site.title'],
    description: ui.en['site.tagline'],
    site: context.site,
    items: items
      .sort((a, b) => new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf())
      .map(e => ({
        title: e.data.title,
        pubDate: new Date(e.data.date),
        description: e.data.subtitle ?? '',
        link: `/en/news/${e.slug}/`,
        categories: [
          e.data.category,
          ...(Array.isArray(e.data.tags) ? e.data.tags : [])
        ].filter(Boolean)
      }))
  });
}
