// Build a year→month→day index over a news collection so the Timeline
// component can render clickable date markers that link to pre-rendered
// archive pages.
import { getCollection } from 'astro:content';

export type Lang = 'tr' | 'en';

export type DayEntry = { day: number; url: string; count: number };
export type MonthEntry = {
  year: number;
  month: number;
  url: string;
  count: number;
  days: DayEntry[];
};
export type YearGroup = {
  year: number;
  months: MonthEntry[];
};

function pad2(n: number): string {
  return String(n).padStart(2, '0');
}

export function monthUrl(lang: Lang, year: number, month: number): string {
  const m = pad2(month);
  return lang === 'tr' ? `/arsiv/${year}/${m}/` : `/en/archive/${year}/${m}/`;
}

export function dayUrl(lang: Lang, year: number, month: number, day: number): string {
  const m = pad2(month);
  const d = pad2(day);
  return lang === 'tr' ? `/arsiv/${year}/${m}/${d}/` : `/en/archive/${year}/${m}/${d}/`;
}

export async function getTimelineData(lang: Lang): Promise<YearGroup[]> {
  const collection = lang === 'tr' ? 'news-tr' : 'news-en';
  const all = await getCollection(collection as any, ({ data }: any) => !data.draft);

  const byMonth = new Map<string, MonthEntry>();

  for (const entry of all) {
    const date = new Date((entry as any).data.date);
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
    const key = `${year}-${month}`;

    let m = byMonth.get(key);
    if (!m) {
      m = {
        year,
        month,
        url: monthUrl(lang, year, month),
        count: 0,
        days: [],
      };
      byMonth.set(key, m);
    }
    m.count++;

    let d = m.days.find((x) => x.day === day);
    if (!d) {
      d = { day, url: dayUrl(lang, year, month, day), count: 0 };
      m.days.push(d);
    }
    d.count++;
  }

  // Sort days ascending within each month so the flyout reads 01, 02, ..., 31.
  for (const m of byMonth.values()) {
    m.days.sort((a, b) => a.day - b.day);
  }

  // Group months by year, newest first in each.
  const byYear = new Map<number, MonthEntry[]>();
  for (const m of byMonth.values()) {
    if (!byYear.has(m.year)) byYear.set(m.year, []);
    byYear.get(m.year)!.push(m);
  }

  const result: YearGroup[] = [];
  for (const [year, months] of byYear.entries()) {
    months.sort((a, b) => b.month - a.month);
    result.push({ year, months });
  }
  // Years newest first.
  result.sort((a, b) => b.year - a.year);
  return result;
}

export async function getAllMonthPaths(lang: Lang) {
  const groups = await getTimelineData(lang);
  const out: Array<{ year: number; month: number }> = [];
  for (const g of groups) for (const m of g.months) out.push({ year: m.year, month: m.month });
  return out;
}

export async function getAllDayPaths(lang: Lang) {
  const groups = await getTimelineData(lang);
  const out: Array<{ year: number; month: number; day: number }> = [];
  for (const g of groups)
    for (const m of g.months)
      for (const d of m.days) out.push({ year: m.year, month: m.month, day: d.day });
  return out;
}
