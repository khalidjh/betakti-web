import type {
  CanvasBackground,
  CanvasElement,
  CanvasSize,
  GradientStop
} from '$lib/editor/types';

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

const FALLBACK_BACKGROUND: CanvasBackground = { type: 'color', color: '#ffffff' };

// Flutter stores colors as 32-bit ARGB ints (0xAARRGGBB). Convert to CSS.
function argbToCss(argb: unknown): string | null {
  if (typeof argb !== 'number' || !Number.isFinite(argb)) return null;
  const a = (argb >>> 24) & 0xff;
  const r = (argb >>> 16) & 0xff;
  const g = (argb >>> 8) & 0xff;
  const b = argb & 0xff;
  if (a === 255) {
    return '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('');
  }
  return `rgba(${r}, ${g}, ${b}, ${Number((a / 255).toFixed(3))})`;
}

/**
 * Firestore `dynamic_templates` docs are stored in the Flutter data model,
 * where `background.type` is a numeric `BackgroundType` index
 * (0 color, 1 gradient, 2 image, 3 pattern) with ARGB int colours and an
 * `imagePath` field. Translate that to the web `CanvasBackground` shape so
 * previews/thumbnails render. Web-shaped docs (string `type`) pass through.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizeBackground(raw: any): CanvasBackground {
  if (!raw || typeof raw !== 'object') return FALLBACK_BACKGROUND;
  if (typeof raw.type === 'string') return raw as CanvasBackground;

  switch (raw.type) {
    case 1: {
      const colors = Array.isArray(raw.gradientColors) ? raw.gradientColors : [];
      const stops: GradientStop[] = colors.map((c: unknown, i: number) => ({
        color: argbToCss(c) ?? '#000000',
        offset: colors.length > 1 ? i / (colors.length - 1) : 0
      }));
      if (stops.length < 2) return { type: 'color', color: stops[0]?.color ?? '#ffffff' };
      // gradientStart/gradientEnd aren't serialised by Flutter — default to a
      // top-left → bottom-right diagonal.
      return { type: 'gradient', stops, angle: 135 };
    }
    case 2: {
      const src = typeof raw.imagePath === 'string' ? raw.imagePath.trim() : '';
      if (!src) return FALLBACK_BACKGROUND;
      return { type: 'image', src, fit: 'cover' };
    }
    case 3:
      return {
        type: 'pattern',
        character: typeof raw.patternCharacter === 'string' ? raw.patternCharacter : '★',
        fontFamily:
          typeof raw.patternFontFamily === 'string' ? raw.patternFontFamily : 'sans-serif',
        fontSize: typeof raw.patternSize === 'number' ? raw.patternSize : 40,
        spacing: typeof raw.patternSpacing === 'number' ? raw.patternSpacing : 60,
        rotation: typeof raw.patternRotation === 'number' ? raw.patternRotation : 0,
        color: argbToCss(raw.patternColor) ?? '#000000',
        opacity: typeof raw.patternOpacity === 'number' ? raw.patternOpacity : 0.3
      };
    case 0:
    default:
      return { type: 'color', color: argbToCss(raw.color) ?? '#ffffff' };
  }
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
    background: normalizeBackground(raw.background),
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
