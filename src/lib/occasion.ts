import type { TemplateCategory } from './types/canvas';

interface OccasionConfig {
  category: TemplateCategory;
  month: number; // 1-12
  day: number;
  windowDays: number;
  titleAr: string;
  titleEn: string;
}

// Approximate dates — configurable. Ramadan/Eid shift yearly; update annually.
export const OCCASIONS: OccasionConfig[] = [
  { category: 'ramadan', month: 2, day: 18, windowDays: 20, titleAr: 'رمضان كريم', titleEn: 'Ramadan Kareem' },
  { category: 'eid', month: 3, day: 20, windowDays: 10, titleAr: 'عيد الفطر', titleEn: 'Eid al-Fitr' },
  { category: 'eid', month: 5, day: 27, windowDays: 10, titleAr: 'عيد الأضحى', titleEn: 'Eid al-Adha' },
  { category: 'nationalDay', month: 9, day: 23, windowDays: 10, titleAr: 'اليوم الوطني', titleEn: 'National Day' },
  { category: 'graduation', month: 5, day: 15, windowDays: 20, titleAr: 'موسم التخرج', titleEn: 'Graduation Season' },
];

export function getCurrentOccasion(now: Date = new Date()): OccasionConfig | null {
  const year = now.getFullYear();
  for (const occ of OCCASIONS) {
    const target = new Date(year, occ.month - 1, occ.day);
    const diffDays = Math.abs((now.getTime() - target.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays <= occ.windowDays) return occ;
  }
  return null;
}
