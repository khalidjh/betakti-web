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
  | 'wedding';

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
  'wedding'
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

/**
 * Flutter canvas-size ids, which is all a template doc stores (`canvasSizeId`).
 * Kept in sync with `lib/core/constants/canvas_sizes.dart`; without it every
 * template opened square, so stories (1080×1920) were cropped to 1080×1080.
 */
const TEMPLATE_CANVAS_SIZES: Record<string, CanvasSize> = {
  square_post: { id: 'square_post', nameAr: 'مربع', nameEn: 'Square', width: 1080, height: 1080 },
  instagram_story: {
    id: 'instagram_story',
    nameAr: 'ستوري انستقرام',
    nameEn: 'Instagram Story',
    width: 1080,
    height: 1920
  },
  portrait_post: {
    id: 'portrait_post',
    nameAr: 'منشور عمودي (4:5)',
    nameEn: 'Portrait Post (4:5)',
    width: 1080,
    height: 1350
  },
  facebook_post: {
    id: 'facebook_post',
    nameAr: 'منشور فيسبوك',
    nameEn: 'Facebook Post',
    width: 1200,
    height: 630
  },
  twitter_post: {
    id: 'twitter_post',
    nameAr: 'منشور تويتر',
    nameEn: 'Twitter Post',
    width: 1200,
    height: 675
  },
  youtube_thumbnail: {
    id: 'youtube_thumbnail',
    nameAr: 'صورة يوتيوب مصغرة',
    nameEn: 'YouTube Thumbnail',
    width: 1280,
    height: 720
  },
  pinterest_pin: {
    id: 'pinterest_pin',
    nameAr: 'دبوس بنترست',
    nameEn: 'Pinterest Pin',
    width: 1000,
    height: 1500
  },
  linkedin_post: {
    id: 'linkedin_post',
    nameAr: 'منشور لينكدإن',
    nameEn: 'LinkedIn Post',
    width: 1200,
    height: 627
  },
  tiktok_video: {
    id: 'tiktok_video',
    nameAr: 'فيديو تيك توك',
    nameEn: 'TikTok Video',
    width: 1080,
    height: 1920
  },
  snapchat_story: {
    id: 'snapchat_story',
    nameAr: 'ستوري سناب شات',
    nameEn: 'Snapchat Story',
    width: 1080,
    height: 1920
  },
  whatsapp_status: {
    id: 'whatsapp_status',
    nameAr: 'حالة واتساب',
    nameEn: 'WhatsApp Status',
    width: 1080,
    height: 1920
  },
  cv_a4: { id: 'cv_a4', nameAr: 'سيرة ذاتية (A4)', nameEn: 'CV (A4)', width: 1240, height: 1754 },
  business_card: {
    id: 'business_card',
    nameAr: 'بطاقة عمل',
    nameEn: 'Business Card',
    width: 1050,
    height: 600
  }
};

const SQUARE: CanvasSize = TEMPLATE_CANVAS_SIZES.square_post!;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function resolveCanvasSize(raw: any): CanvasSize {
  const cs = raw?.canvasSize;
  if (cs && typeof cs === 'object' && typeof cs.width === 'number' && typeof cs.height === 'number') {
    return cs as CanvasSize;
  }
  const id = typeof raw?.canvasSizeId === 'string' ? raw.canvasSizeId : '';
  const known = TEMPLATE_CANVAS_SIZES[id];
  if (known) return known;
  // Flutter serialises ad-hoc sizes as `custom_1080x1350`.
  const custom = /^custom_(\d+)x(\d+)$/.exec(id);
  if (custom) {
    return {
      id,
      nameAr: 'مخصص',
      nameEn: 'Custom',
      width: Number(custom[1]),
      height: Number(custom[2])
    };
  }
  return SQUARE;
}

/** Flutter enum indexes, in declaration order — the wire format is the index. */
const TEXT_ALIGNMENTS = ['left', 'center', 'right'] as const;
const IMAGE_FITS = ['fill', 'contain', 'cover', 'fitWidth', 'fitHeight'] as const;
const CROP_SHAPES = ['none', 'circle', 'roundedRect', 'triangle', 'star', 'heart', 'hexagon'] as const;
const STICKER_TYPES = ['emoji', 'asset', 'custom', 'cursive', 'lottie'] as const;
// `cross` is deprecated in Flutter but still occupies index 10, so the list has
// to keep it; the web has no cross shape, so it degrades to a rectangle.
const SHAPE_TYPES = [
  'rectangle',
  'circle',
  'triangle',
  'line',
  'arrow',
  'star',
  'polygon',
  'diamond',
  'heart',
  'hexagon',
  'rectangle',
  'crescent'
] as const;

function enumValue<T extends readonly string[]>(raw: unknown, values: T, fallback: T[number]): T[number] {
  if (typeof raw === 'number' && values[raw]) return values[raw] as T[number];
  if (typeof raw === 'string' && (values as readonly string[]).includes(raw)) return raw as T[number];
  return fallback;
}

/** Colours arrive either as an ARGB int (Flutter) or a CSS string (web/seeds). */
function toCssColor(raw: unknown, fallback: string): string {
  if (typeof raw === 'string' && raw.trim()) return raw.trim();
  return argbToCss(raw) ?? fallback;
}

function num(raw: unknown, fallback: number): number {
  return typeof raw === 'number' && Number.isFinite(raw) ? raw : fallback;
}

/**
 * Some seeded template docs describe text in a compact, resolution-independent
 * form — `textAr`/`textEn`, fractional `x`/`y` in 0..1, `align`/`fontWeight`
 * strings, and no `width`/`height`. Font sizes in those docs are authored
 * against this nominal preview width and scale up with the real canvas.
 */
const COMPACT_REFERENCE_WIDTH = 400;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isCompactText(raw: any): boolean {
  return (
    raw.width === undefined &&
    raw.height === undefined &&
    (raw.textAr !== undefined || raw.textEn !== undefined)
  );
}

/**
 * Firestore template elements are stored in the Flutter model (ARGB ints, enum
 * indexes, absolute pixels) or in the compact seed model above. The editor
 * expects the web `CanvasElement` shape, so translate both. Already-web-shaped
 * values pass through untouched, which keeps this idempotent.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizeElement(raw: any, index: number, size: CanvasSize, locale: 'ar' | 'en'): CanvasElement | null {
  if (!raw || typeof raw !== 'object') return null;
  const type = raw.type;
  if (type !== 'text' && type !== 'image' && type !== 'shape' && type !== 'sticker') return null;

  const base = {
    id: typeof raw.id === 'string' && raw.id ? raw.id : `el_${index}`,
    x: num(raw.x, 0),
    y: num(raw.y, 0),
    width: num(raw.width, size.width / 2),
    height: num(raw.height, size.height / 8),
    rotation: num(raw.rotation, 0),
    isLocked: raw.isLocked === true,
    isVisible: raw.isVisible !== false,
    zIndex: num(raw.zIndex, index),
    ...(raw.groupId ? { groupId: String(raw.groupId) } : {})
  };

  if (type === 'text') {
    const compact = isCompactText(raw);
    const text =
      typeof raw.text === 'string'
        ? raw.text
        : locale === 'en'
          ? (raw.textEn ?? raw.textAr ?? '')
          : (raw.textAr ?? raw.textEn ?? '');
    const fontSize = compact
      ? num(raw.fontSize, 24) * (size.width / COMPACT_REFERENCE_WIDTH)
      : num(raw.fontSize, 24);
    const lineHeight = num(raw.lineHeight, 1.2);
    const alignment = enumValue(
      raw.textAlignment ?? raw.align,
      TEXT_ALIGNMENTS,
      compact ? 'center' : 'center'
    );

    if (compact) {
      // Compact coords are the element's *centre* as a fraction of the canvas.
      const width = size.width * 0.86;
      const height = fontSize * lineHeight * 1.4;
      base.width = width;
      base.height = height;
      base.x = num(raw.x, 0.5) * size.width - width / 2;
      base.y = num(raw.y, 0.5) * size.height - height / 2;
    }

    return {
      ...base,
      type: 'text',
      text: String(text),
      fontFamily: typeof raw.fontFamily === 'string' ? raw.fontFamily : 'Cairo',
      fontSize,
      color: toCssColor(raw.color, '#000000'),
      isBold: raw.isBold === true || raw.fontWeight === 'bold',
      isItalic: raw.isItalic === true || raw.fontStyle === 'italic',
      isUnderline: raw.isUnderline === true,
      textAlignment: alignment,
      letterSpacing: num(raw.letterSpacing, 0),
      lineHeight,
      ...(Array.isArray(raw.gradientColors) && raw.gradientColors.length
        ? { gradientColors: raw.gradientColors.map((c: unknown) => toCssColor(c, '#000000')) }
        : {}),
      ...(raw.backgroundColor != null
        ? { backgroundColor: toCssColor(raw.backgroundColor, 'transparent') }
        : {}),
      ...(raw.outlineColor != null ? { outlineColor: toCssColor(raw.outlineColor, '#000000') } : {}),
      outlineWidth: num(raw.outlineWidth, 0),
      opacity: num(raw.opacity, 1)
    };
  }

  if (type === 'image') {
    const src = typeof raw.imageSrc === 'string' ? raw.imageSrc : (raw.imagePath ?? '');
    if (!src) return null;
    return {
      ...base,
      type: 'image',
      imageSrc: String(src),
      fit: enumValue(raw.fit, IMAGE_FITS, 'cover'),
      opacity: num(raw.opacity, 1),
      cornerRadius: num(raw.cornerRadius, 0),
      ...(raw.borderColor != null ? { borderColor: toCssColor(raw.borderColor, '#000000') } : {}),
      borderWidth: num(raw.borderWidth, 0),
      flipHorizontal: raw.flipHorizontal === true,
      flipVertical: raw.flipVertical === true,
      cropTop: num(raw.cropTop, 0),
      cropBottom: num(raw.cropBottom, 0),
      cropLeft: num(raw.cropLeft, 0),
      cropRight: num(raw.cropRight, 0),
      cropShape: enumValue(raw.cropShape, CROP_SHAPES, 'none'),
      brightness: num(raw.brightness, 0),
      contrast: num(raw.contrast, 0),
      saturation: num(raw.saturation, 0)
    };
  }

  if (type === 'shape') {
    return {
      ...base,
      type: 'shape',
      shapeType: enumValue(raw.shapeType, SHAPE_TYPES, 'rectangle'),
      fillColor: toCssColor(raw.fillColor ?? raw.color, '#000000'),
      ...(raw.strokeColor != null ? { strokeColor: toCssColor(raw.strokeColor, '#000000') } : {}),
      strokeWidth: num(raw.strokeWidth, 0),
      cornerRadius: num(raw.cornerRadius, 0),
      ...(raw.sides != null ? { sides: num(raw.sides, 6) } : {}),
      ...(raw.innerRadius != null ? { innerRadius: num(raw.innerRadius, 0.5) } : {}),
      ...(Array.isArray(raw.gradientColors) && raw.gradientColors.length
        ? { gradientColors: raw.gradientColors.map((c: unknown) => toCssColor(c, '#000000')) }
        : {}),
      opacity: num(raw.opacity, 1)
    };
  }

  return {
    ...base,
    type: 'sticker',
    stickerType: enumValue(raw.stickerType, STICKER_TYPES, 'emoji'),
    content: typeof raw.content === 'string' ? raw.content : '',
    ...(typeof raw.fontFamily === 'string' ? { fontFamily: raw.fontFamily } : {}),
    ...(raw.color != null ? { color: toCssColor(raw.color, '#ffffff') } : {}),
    ...(Array.isArray(raw.gradientColors) && raw.gradientColors.length
      ? { gradientColors: raw.gradientColors.map((c: unknown) => toCssColor(c, '#000000')) }
      : {}),
    ...(typeof raw.imageFill === 'string' ? { imageFill: raw.imageFill } : {}),
    opacity: num(raw.opacity, 1),
    flipHorizontal: raw.flipHorizontal === true,
    flipVertical: raw.flipVertical === true
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function normalizeTemplate(id: string, raw: any, locale: 'ar' | 'en' = 'ar'): DynamicTemplate | null {
  if (!raw) return null;
  const category = (raw.category ?? 'social') as TemplateCategory;
  const canvasSize = resolveCanvasSize(raw);
  const elements = Array.isArray(raw.elements)
    ? raw.elements
        .map((el: unknown, i: number) => normalizeElement(el, i, canvasSize, locale))
        .filter((el: CanvasElement | null): el is CanvasElement => el !== null)
    : [];
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
    elements
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
    wedding: 'زفاف'
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
    wedding: 'Wedding'
  };
  return locale === 'ar' ? ar[cat] : en[cat];
}
