import { ui, defaultLang, type Lang, type UIKey } from './ui';

export function getLangFromUrl(url: URL): Lang {
  const [, first] = url.pathname.split('/');
  if (first in ui) return first as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

export function localizedPath(lang: Lang, path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (lang === defaultLang) return clean;
  return `/${lang}${clean}`;
}

export function newsPath(lang: Lang, slug: string): string {
  return lang === 'tr' ? `/haber/${slug}` : `/en/news/${slug}`;
}

export function categoryPath(lang: Lang, category: string): string {
  const slug = categorySlug(category);
  return lang === 'tr' ? `/kategori/${slug}` : `/en/category/${slug}`;
}

export function categorySlug(cat: string): string {
  const map: Record<string, string> = {
    'Lojistik': 'lojistik',
    'Tedarik Zinciri': 'tedarik-zinciri',
    'Teknoloji': 'teknoloji',
    'Envanter': 'envanter',
    'Satınalma': 'satinalma'
  };
  return map[cat] ?? cat.toLowerCase();
}

export const categoryLabel: Record<string, Record<Lang, string>> = {
  'Lojistik':        { tr: 'Lojistik',        en: 'Logistics' },
  'Tedarik Zinciri': { tr: 'Tedarik Zinciri', en: 'Supply Chain' },
  'Teknoloji':       { tr: 'Teknoloji',       en: 'Technology' },
  'Envanter':        { tr: 'Envanter',        en: 'Inventory' },
  'Satınalma':       { tr: 'Satınalma',       en: 'Procurement' }
};
