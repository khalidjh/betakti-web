export interface StylePreset {
  id: string;
  nameAr: string;
  nameEn: string;
  prompt: string;
  strength: number; // 0.0 – 1.0
}

export const STYLE_PRESETS: StylePreset[] = [
  {
    id: 'anime',
    nameAr: 'أنمي',
    nameEn: 'Anime',
    prompt: 'anime style illustration, vibrant colors, cel shaded, clean lines',
    strength: 0.75,
  },
  {
    id: 'oil',
    nameAr: 'زيتي',
    nameEn: 'Oil Painting',
    prompt: 'oil painting, thick brush strokes, impressionist, rich textures',
    strength: 0.7,
  },
  {
    id: 'watercolor',
    nameAr: 'ألوان مائية',
    nameEn: 'Watercolor',
    prompt: 'watercolor painting, soft washes, paper texture, delicate colors',
    strength: 0.7,
  },
  {
    id: 'pencil',
    nameAr: 'رصاص',
    nameEn: 'Pencil Sketch',
    prompt: 'detailed pencil sketch, graphite, fine lines, monochrome',
    strength: 0.8,
  },
  {
    id: 'cyberpunk',
    nameAr: 'سايبربنك',
    nameEn: 'Cyberpunk',
    prompt: 'cyberpunk, neon lights, futuristic, vibrant magenta and cyan',
    strength: 0.75,
  },
  {
    id: 'vintage',
    nameAr: 'قديم',
    nameEn: 'Vintage',
    prompt: 'vintage film photo, faded colors, grain, nostalgic, 1970s',
    strength: 0.6,
  },
  {
    id: 'popart',
    nameAr: 'بوب آرت',
    nameEn: 'Pop Art',
    prompt: 'pop art style, bold colors, halftone dots, high contrast, Warhol-inspired',
    strength: 0.75,
  },
  {
    id: 'arabic-calligraphy',
    nameAr: 'خط عربي',
    nameEn: 'Arabic Calligraphy',
    prompt: 'arabic calligraphy ornamental style, gold and deep blue, traditional pattern',
    strength: 0.7,
  },
];

export function getStyle(id: string): StylePreset {
  const p = STYLE_PRESETS.find((x) => x.id === id);
  if (!p) throw new Error(`Unknown style: ${id}`);
  return p;
}
