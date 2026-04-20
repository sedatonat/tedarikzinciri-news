import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { ui } from '../i18n/ui';

export async function GET(context: any) {
  const items = await getCollection('news-tr', ({ data }) => !data.draft);
  return rss({
    title: ui.tr['site.title'],
    description: ui.tr['site.tagline'],
    site: context.site,
    items: items
      .sort((a, b) => new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf())
      .slice(0, 50)
      .map(e => ({
        title: e.data.title,
        pubDate: new Date(e.data.date),
        description: e.data.subtitle ?? '',
        link: `/haber/${e.slug}/`
      }))
  });
}
