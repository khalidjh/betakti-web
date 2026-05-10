import type { CanvasBackground, CanvasElement, CanvasSize } from '$lib/editor/types';

export type TemplateCategory =
  | 'quotes'
  | 'announcements'
  | 'sales'
  | 'events'
  | 'social'
  | 'ramadan'
  | 'eid'
  | 'whatsappStatus'
  | 'graduation'
  | 'wedding'
  | 'nationalDay';

export const TEMPLATE_CATEGORIES: TemplateCategory[] = [
  'quotes',
  'announcements',
  'sales',
  'events',
  'social',
  'ramadan',
  'eid',
  'whatsappStatus',
  'graduation',
  'wedding',
  'nationalDay'
];

export interface DynamicTemplate {
  id: string;
  nameAr: string;
  nameEn: string;
  category: TemplateCategory;
  canvasSize: CanvasSize;
  isPremium: boolean;
  isActive: boolean;
  sortOrder: number;
  thumbnailUrl?: string;
  background: CanvasBackground;
  elements: CanvasElement[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function normalizeTemplate(id: string, raw: any): DynamicTemplate | null {
  if (!raw) return null;
  const category = (raw.category ?? 'social') as TemplateCategory;
  const canvasSize: CanvasSize =
    raw.canvasSize && typeof raw.canvasSize === 'object'
      ? raw.canvasSize
      : {
          id: raw.canvasSizeId ?? 'square',
          nameAr: 'بوست مربع',
          nameEn: 'Square Post',
          width: 1080,
          height: 1080
        };
  return {
    id,
    nameAr: raw.nameAr ?? raw.name ?? 'قالب',
    nameEn: raw.nameEn ?? raw.name ?? 'Template',
    category,
    canvasSize,
    isPremium: Boolean(raw.isPremium),
    isActive: raw.isActive !== false,
    sortOrder: typeof raw.sortOrder === 'number' ? raw.sortOrder : 999,
    thumbnailUrl: raw.thumbnailUrl ?? raw.thumbnail ?? undefined,
    background: (raw.background as CanvasBackground) ?? { type: 'color', color: '#ffffff' },
    elements: Array.isArray(raw.elements) ? (raw.elements as CanvasElement[]) : []
  };
}

export function categoryLabel(cat: TemplateCategory, locale: 'ar' | 'en'): string {
  const ar: Record<TemplateCategory, string> = {
    quotes: 'اقتباسات',
    announcements: 'إعلانات',
    sales: 'عروض',
    events: 'مناسبات',
    social: 'تواصل اجتماعي',
    ramadan: 'رمضان',
    eid: 'العيد',
    whatsappStatus: 'حالات واتساب',
    graduation: 'تخرج',
    wedding: 'زفاف',
    nationalDay: 'اليوم الوطني'
  };
  const en: Record<TemplateCategory, string> = {
    quotes: 'Quotes',
    announcements: 'Announcements',
    sales: 'Sales',
    events: 'Events',
    social: 'Social',
    ramadan: 'Ramadan',
    eid: 'Eid',
    whatsappStatus: 'WhatsApp Status',
    graduation: 'Graduation',
    wedding: 'Wedding',
    nationalDay: 'National Day'
  };
  return locale === 'ar' ? ar[cat] : en[cat];
}
