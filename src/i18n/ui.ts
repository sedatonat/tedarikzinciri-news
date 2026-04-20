export const languages = { tr: 'Türkçe', en: 'English' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'tr';

export const ui = {
  tr: {
    'nav.home': 'Ana Sayfa',
    'nav.categories': 'Kategoriler',
    'nav.about': 'Hakkında',
    'nav.search': 'Ara',
    'site.title': 'Tedarik Zinciri Haberleri',
    'site.tagline': 'Tedarik zinciri, lojistik, satınalma ve teknolojide güncel haberler',
    'news.readMore': 'Haberi oku',
    'news.source': 'Kaynak',
    'news.sourceLink': 'Haber Linki',
    'news.important': 'Önemli Notlar',
    'news.published': 'Yayın Tarihi',
    'news.category': 'Kategori',
    'news.share': 'Paylaş',
    'news.related': 'İlgili Haberler',
    'news.notTranslated': 'Bu haber henüz İngilizceye çevrilmedi. Orijinal kaynak makaleyi okuyabilirsiniz.',
    'theme.light': 'Açık tema',
    'theme.dark': 'Koyu tema',
    'theme.toggle': 'Tema değiştir',
    'lang.toggle': 'Dil değiştir',
    'footer.about': 'Hakkında',
    'footer.contact': 'İletişim',
    'footer.rss': 'RSS',
    'footer.rights': 'Tüm hakları saklıdır.',
    'search.placeholder': 'Haberlerde ara...',
    'search.noResults': 'Sonuç bulunamadı.',
    'categories.all': 'Tümü',
    'home.latest': 'Son Haberler',
    'home.featured': 'Öne Çıkan'
  },
  en: {
    'nav.home': 'Home',
    'nav.categories': 'Categories',
    'nav.about': 'About',
    'nav.search': 'Search',
    'site.title': 'Supply Chain News',
    'site.tagline': 'Latest news in supply chain, logistics, procurement and technology',
    'news.readMore': 'Read article',
    'news.source': 'Source',
    'news.sourceLink': 'Source Link',
    'news.important': 'Key Points',
    'news.published': 'Published',
    'news.category': 'Category',
    'news.share': 'Share',
    'news.related': 'Related News',
    'news.notTranslated': 'This article has not yet been translated to English. You can read the original source article.',
    'theme.light': 'Light theme',
    'theme.dark': 'Dark theme',
    'theme.toggle': 'Toggle theme',
    'lang.toggle': 'Change language',
    'footer.about': 'About',
    'footer.contact': 'Contact',
    'footer.rss': 'RSS',
    'footer.rights': 'All rights reserved.',
    'search.placeholder': 'Search news...',
    'search.noResults': 'No results found.',
    'categories.all': 'All',
    'home.latest': 'Latest News',
    'home.featured': 'Featured'
  }
} as const;

export type UIKey = keyof typeof ui.tr;
