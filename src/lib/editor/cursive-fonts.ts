// Cursive sticker fonts — each font maps Latin letters to decorative
// glyphs (calligraphy, ornaments, shapes). Ported from the Flutter app
// at /Users/khalid/Documents/betakti-flutter/lib/core/constants/cursive_fonts.dart.

export interface CursiveFont {
  fontFamily: string;
  nameAr: string;
  nameEn: string;
  /** Letters that have a glyph in this font. */
  letters: readonly string[];
  /** Glyph shown on the font's thumbnail tile (defaults to the category previewLetter or 'A'). */
  previewLetter?: string;
  /** Override font-size used when rendering the thumbnail. */
  previewFontSize?: number;
}

export interface CursiveFontCategory {
  id: string;
  nameAr: string;
  nameEn: string;
  previewLetter: string;
  previewFontSize: number;
  fonts: readonly CursiveFont[];
}

const ALPHA_LOWER = 'abcdefghijklmnopqrstuvwxyz'.split('');
const ALPHA_UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const DIGITS = '0123456789'.split('');
const ALL = [...ALPHA_LOWER, ...ALPHA_UPPER, ...DIGITS];

export const CURSIVE_CATEGORIES: readonly CursiveFontCategory[] = [
  {
    id: 'occasions',
    nameAr: 'مناسبات',
    nameEn: 'Occasions',
    previewLetter: 'A',
    previewFontSize: 55,
    fonts: [
      {
        fontFamily: 'morning',
        nameAr: 'صباحيات',
        nameEn: 'Morning',
        previewFontSize: 75,
        letters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']
      },
      {
        fontFamily: 'jommah',
        nameAr: 'الجمعة',
        nameEn: 'Friday',
        previewFontSize: 75,
        letters: ['A', 'B', 'C', 'D', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V']
      },
      {
        fontFamily: 'monasabat',
        nameAr: 'مناسبات',
        nameEn: 'Occasions',
        letters: [
          'P', 'T', 'Q', 'R', 'S', 'K', 'L',
          ...ALPHA_LOWER.slice(0, 25), // a..y
          'A', 'B', 'C', 'F', 'G', 'H', 'I', 'J', 'M', 'N', 'O'
        ]
      },
      {
        fontFamily: 'zifaf',
        nameAr: 'زفاف',
        nameEn: 'Wedding',
        previewFontSize: 75,
        letters: ['A', 'B', 'C', 'D', 'F', 'G', 'H', 'I']
      },
      {
        fontFamily: 'graduation',
        nameAr: 'تخرج',
        nameEn: 'Graduation',
        letters: [...ALPHA_LOWER, ...ALPHA_UPPER.slice(0, 12)] // A..L
      }
    ]
  },
  {
    id: 'eid',
    nameAr: 'العيد',
    nameEn: 'Eid',
    previewLetter: 'A',
    previewFontSize: 55,
    fonts: [
      { fontFamily: 'eid1', nameAr: 'العيد ١', nameEn: 'Eid 1', previewFontSize: 75, letters: ALL },
      { fontFamily: 'eid2', nameAr: 'العيد ٢', nameEn: 'Eid 2', letters: ALL },
      { fontFamily: 'eid3', nameAr: 'العيد ٣', nameEn: 'Eid 3', previewLetter: 'c', letters: [...ALPHA_LOWER, ...ALPHA_UPPER, '1', '2', '3', '4'] }
    ]
  },
  {
    id: 'islamic',
    nameAr: 'إسلامي',
    nameEn: 'Islamic',
    previewLetter: 'A',
    previewFontSize: 55,
    fonts: [
      { fontFamily: 'Allah1', nameAr: 'لفظ الجلالة ١', nameEn: 'Allah 1', letters: [...'abcdefghijklmnopqrstuvx'.split(''), ...DIGITS] },
      { fontFamily: 'Allah3', nameAr: 'لفظ الجلالة ٣', nameEn: 'Allah 3', letters: ALL },
      { fontFamily: 'basmalah1', nameAr: 'بسملة ١', nameEn: 'Basmalah 1', previewFontSize: 75, letters: ALL },
      { fontFamily: 'basmalah2', nameAr: 'بسملة ٢', nameEn: 'Basmalah 2', letters: ALL },
      { fontFamily: 'islamic', nameAr: 'إسلامي', nameEn: 'Islamic', letters: ALL },
      { fontFamily: 'thikr', nameAr: 'أذكار', nameEn: 'Thikr', letters: ALL.slice(0, ALL.length - 1) },
      { fontFamily: 'masjed', nameAr: 'مساجد', nameEn: 'Mosque', letters: ALL },
      { fontFamily: 'aqsa', nameAr: 'الأقصى', nameEn: 'Al-Aqsa', previewLetter: 'd', letters: 'abcdefghijklmnopqrs'.split('') },
      { fontFamily: 'sadaqa', nameAr: 'صدقة', nameEn: 'Sadaqa', previewLetter: 'x', letters: 'abcdefghijklmnopqrstuvwx'.split('') },
      { fontFamily: 'rasool1', nameAr: 'الرسول ١', nameEn: 'Prophet 1', letters: ALL },
      { fontFamily: 'rasool2', nameAr: 'الرسول ٢', nameEn: 'Prophet 2', letters: ALL }
    ]
  },
  {
    id: 'hajj',
    nameAr: 'الحج',
    nameEn: 'Hajj',
    previewLetter: 'A',
    previewFontSize: 55,
    fonts: [
      { fontFamily: 'hajj1', nameAr: 'الحج ١', nameEn: 'Hajj 1', letters: ALL },
      { fontFamily: 'hajj3', nameAr: 'الحج ٣', nameEn: 'Hajj 3', previewLetter: 'd', letters: 'abcdefghijklmnopqrstuvwx'.split('') }
    ]
  },
  {
    id: 'family',
    nameAr: 'العائلة',
    nameEn: 'Family',
    previewLetter: 'A',
    previewFontSize: 55,
    fonts: [
      { fontFamily: 'ommy1', nameAr: 'أمي ١', nameEn: 'Mom 1', previewLetter: 'a', letters: [...ALPHA_LOWER, ...DIGITS.slice(1)] },
      { fontFamily: 'ommy2', nameAr: 'أمي ٢', nameEn: 'Mom 2', previewLetter: 'a', letters: ['a', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 's', 'x', 'z'] }
    ]
  },
  {
    id: 'shapes',
    nameAr: 'أشكال',
    nameEn: 'Shapes',
    previewLetter: 'A',
    previewFontSize: 55,
    fonts: [
      { fontFamily: 'butterfly1', nameAr: 'فراشات', nameEn: 'Butterflies', letters: [...ALPHA_LOWER, ...ALPHA_UPPER, ...DIGITS.slice(1)] },
      {
        fontFamily: 'flower1',
        nameAr: 'زهور ١',
        nameEn: 'Flowers 1',
        letters: [
          'b', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
          'C', 'D', 'E', 'F', 'G', 'H', 'I', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
          '1', '2', '3', '4', '5', '8', '9'
        ]
      },
      { fontFamily: 'flower2', nameAr: 'زهور ٢', nameEn: 'Flowers 2', letters: [...ALPHA_LOWER, ...ALPHA_UPPER, ...DIGITS.slice(1)] },
      { fontFamily: 'heart1', nameAr: 'قلوب ١', nameEn: 'Hearts 1', letters: ALL },
      { fontFamily: 'heart2', nameAr: 'قلوب ٢', nameEn: 'Hearts 2', letters: [...ALPHA_LOWER, ...ALPHA_UPPER] },
      { fontFamily: 'social1', nameAr: 'اجتماعي ١', nameEn: 'Social 1', letters: ALL }
    ]
  },
  {
    id: 'decorations',
    nameAr: 'مخطوطات',
    nameEn: 'Decorations',
    previewLetter: 'A',
    previewFontSize: 55,
    fonts: [
      { fontFamily: 'decoration1', nameAr: 'زخرفة ١', nameEn: 'Decoration 1', letters: ALL },
      { fontFamily: 'decoration2', nameAr: 'زخرفة ٢', nameEn: 'Decoration 2', letters: ALL },
      { fontFamily: 'decoration3', nameAr: 'زخرفة ٣', nameEn: 'Decoration 3', letters: ALL },
      { fontFamily: 'decoration4', nameAr: 'زخرفة ٤', nameEn: 'Decoration 4', letters: ALL },
      { fontFamily: 'badge1', nameAr: 'شارات ١', nameEn: 'Badges 1', letters: ALL },
      { fontFamily: 'badge2', nameAr: 'شارات ٢', nameEn: 'Badges 2', letters: ALL },
      { fontFamily: 'harakat1', nameAr: 'حركات ١', nameEn: 'Diacritics 1', letters: [...ALPHA_LOWER, ...ALPHA_UPPER, ...DIGITS.slice(1)] },
      { fontFamily: 'harakat2', nameAr: 'حركات ٢', nameEn: 'Diacritics 2', letters: ALL }
    ]
  },
  {
    id: 'ramadan',
    nameAr: 'رمضان',
    nameEn: 'Ramadan',
    previewLetter: 'A',
    previewFontSize: 55,
    fonts: [
      { fontFamily: 'ramadan1', nameAr: 'رمضان ١', nameEn: 'Ramadan 1', previewLetter: 'C', letters: [...ALPHA_LOWER, ...ALPHA_UPPER] },
      {
        fontFamily: 'ramadan2',
        nameAr: 'رمضان ٢',
        nameEn: 'Ramadan 2',
        previewLetter: 'a',
        letters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', ...ALPHA_UPPER, ...DIGITS]
      },
      { fontFamily: 'ramadan3', nameAr: 'رمضان ٣', nameEn: 'Ramadan 3', letters: ALL }
    ]
  }
] as const;

/** Best-effort load; resolves once the font is available or after a short timeout. */
export async function ensureCursiveFontLoaded(fontFamily: string, sample: string): Promise<void> {
  if (typeof document === 'undefined' || !document.fonts) return;
  try {
    await document.fonts.load(`64px "${fontFamily}"`, sample);
  } catch {
    // ignore — fabric will fall back to system font, fine for SSR/old browsers
  }
}
