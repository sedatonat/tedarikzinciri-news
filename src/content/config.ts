import { defineCollection, z } from 'astro:content';

const CATEGORIES = [
  'Lojistik',
  'Tedarik Zinciri',
  'Teknoloji',
  'Envanter',
  'Satınalma'
] as const;

const newsSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  date: z.coerce.date(),
  category: z.enum(CATEGORIES),
  image: z.string().optional(),
  imageAlt: z.string().optional(),
  sourceUrl: z.string().url().optional(),
  newsSequence: z.number().optional(),
  author: z.string().default('Sedat Onat'),
  draft: z.boolean().default(false),
  translated: z.boolean().default(true),
  slug: z.string().optional()
});

const newsTR = defineCollection({ type: 'content', schema: newsSchema });
const newsEN = defineCollection({ type: 'content', schema: newsSchema });

export const collections = {
  'news-tr': newsTR,
  'news-en': newsEN
};

export { CATEGORIES };
