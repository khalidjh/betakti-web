// Curated background presets that work well under posters and text overlay.
// All locally generated (gradients + flat color washes) — no external image
// service is required, so they always load instantly and survive offline.
//
// Each preset returns a CanvasBackground that can be passed straight to
// editor.setBackground(). Categories are kept loose so the picker can group
// them visually.

import type { CanvasBackground, GradientStop } from './types';

export type BackgroundPresetCategory =
  | 'Solid'
  | 'Soft'
  | 'Vivid'
  | 'Sunset'
  | 'Cool'
  | 'Dark'
  | 'Mono';

export interface BackgroundPreset {
  id: string;
  category: BackgroundPresetCategory;
  background: CanvasBackground;
}

function gradient(angle: number, ...colors: string[]): CanvasBackground {
  const stops: GradientStop[] = colors.map((color, i) => ({
    color,
    offset: colors.length === 1 ? 0 : i / (colors.length - 1)
  }));
  return { type: 'gradient', angle, stops };
}

function solid(color: string): CanvasBackground {
  return { type: 'color', color };
}

export const BACKGROUND_PRESETS: BackgroundPreset[] = [
  // Solids — designer neutrals
  { id: 'solid-paper', category: 'Solid', background: solid('#f8f6f1') },
  { id: 'solid-bone', category: 'Solid', background: solid('#ece6d9') },
  { id: 'solid-mist', category: 'Solid', background: solid('#eef2f6') },
  { id: 'solid-sand', category: 'Solid', background: solid('#e7dcc7') },
  { id: 'solid-sage', category: 'Solid', background: solid('#cfd9c8') },
  { id: 'solid-sky', category: 'Solid', background: solid('#bfd3e6') },
  { id: 'solid-blush', category: 'Solid', background: solid('#f3d7d2') },
  { id: 'solid-ink', category: 'Solid', background: solid('#0e1320') },

  // Soft pastel washes — quiet enough for type at any size
  { id: 'soft-peach', category: 'Soft', background: gradient(160, '#fde6d3', '#f7c8b3') },
  { id: 'soft-lavender', category: 'Soft', background: gradient(160, '#e8e4ff', '#cdc4f2') },
  { id: 'soft-mint', category: 'Soft', background: gradient(160, '#dff5ec', '#b7e4cf') },
  { id: 'soft-butter', category: 'Soft', background: gradient(160, '#fff3c8', '#f5dba1') },
  { id: 'soft-rose', category: 'Soft', background: gradient(140, '#ffe2e2', '#f0b8c5') },
  { id: 'soft-sky', category: 'Soft', background: gradient(180, '#e6f1ff', '#bcd6f7') },

  // Vivid duo-tones — for editorial covers / drop-headlines
  { id: 'vivid-electric', category: 'Vivid', background: gradient(135, '#6b4eff', '#1ad0c8') },
  { id: 'vivid-magenta', category: 'Vivid', background: gradient(135, '#ff4f9d', '#7a2cff') },
  { id: 'vivid-citrus', category: 'Vivid', background: gradient(135, '#ffd166', '#ef476f') },
  { id: 'vivid-tropic', category: 'Vivid', background: gradient(135, '#06d6a0', '#118ab2') },
  { id: 'vivid-grape', category: 'Vivid', background: gradient(135, '#5e60ce', '#48bfe3') },
  { id: 'vivid-flame', category: 'Vivid', background: gradient(135, '#f72585', '#ff7b00') },

  // Sunsets / dusks — atmospheric warmth
  { id: 'sunset-dawn', category: 'Sunset', background: gradient(180, '#fbc2eb', '#a18cd1') },
  { id: 'sunset-amber', category: 'Sunset', background: gradient(180, '#fceabb', '#f8b500') },
  { id: 'sunset-coral', category: 'Sunset', background: gradient(180, '#ff9a9e', '#fad0c4') },
  { id: 'sunset-tropic', category: 'Sunset', background: gradient(180, '#fa709a', '#fee140') },
  { id: 'sunset-dusk', category: 'Sunset', background: gradient(180, '#3a1c71', '#d76d77', '#ffaf7b') },
  { id: 'sunset-fire', category: 'Sunset', background: gradient(160, '#f12711', '#f5af19') },

  // Cool — calm, technical, infographic-friendly
  { id: 'cool-arctic', category: 'Cool', background: gradient(160, '#a1c4fd', '#c2e9fb') },
  { id: 'cool-ocean', category: 'Cool', background: gradient(160, '#4facfe', '#00f2fe') },
  { id: 'cool-mint', category: 'Cool', background: gradient(160, '#84fab0', '#8fd3f4') },
  { id: 'cool-deep', category: 'Cool', background: gradient(160, '#0f2027', '#203a43', '#2c5364') },
  { id: 'cool-iris', category: 'Cool', background: gradient(160, '#5ee7df', '#b490ca') },

  // Dark moody — for high-contrast white type
  { id: 'dark-velvet', category: 'Dark', background: gradient(160, '#0f0c29', '#302b63', '#24243e') },
  { id: 'dark-onyx', category: 'Dark', background: gradient(160, '#000000', '#434343') },
  { id: 'dark-midnight', category: 'Dark', background: gradient(160, '#020024', '#090979', '#00d4ff') },
  { id: 'dark-coal', category: 'Dark', background: gradient(160, '#232526', '#414345') },
  { id: 'dark-plum', category: 'Dark', background: gradient(160, '#240b36', '#c31432') },

  // Monochrome washes — quiet, premium
  { id: 'mono-pearl', category: 'Mono', background: gradient(180, '#ffffff', '#e6e9ec') },
  { id: 'mono-graphite', category: 'Mono', background: gradient(180, '#bdc3c7', '#2c3e50') },
  { id: 'mono-cream', category: 'Mono', background: gradient(180, '#fff7e8', '#f3e0c1') },
  { id: 'mono-silver', category: 'Mono', background: gradient(180, '#e0eafc', '#cfdef3') }
];

// --- Stock photo backgrounds ---
// Sourced from Lorem Picsum (https://picsum.photos) — free, no API key, and
// deterministic by seed. Each `seed` always returns the same photo, so users
// get a stable picker that survives reload. Seeds are loosely thematic so the
// grouping below has a chance of looking on-topic, but Picsum returns random
// curated photos, not category-search results.

export type StockImageCategory =
  | 'Landscape'
  | 'Sky'
  | 'Sea'
  | 'Forest'
  | 'Urban'
  | 'Texture'
  | 'Abstract';

export interface StockImage {
  seed: string;
  category: StockImageCategory;
}

function fillSeeds(prefix: string, count: number, category: StockImageCategory): StockImage[] {
  return Array.from({ length: count }, (_, i) => ({
    seed: `${prefix}-${String(i + 1).padStart(2, '0')}`,
    category
  }));
}

export const STOCK_IMAGES: StockImage[] = [
  ...fillSeeds('mountain', 4, 'Landscape'),
  ...fillSeeds('valley', 3, 'Landscape'),
  ...fillSeeds('desert', 3, 'Landscape'),
  ...fillSeeds('horizon', 3, 'Landscape'),
  ...fillSeeds('canyon', 3, 'Landscape'),

  ...fillSeeds('sky', 4, 'Sky'),
  ...fillSeeds('clouds', 3, 'Sky'),
  ...fillSeeds('sunset', 3, 'Sky'),
  ...fillSeeds('aurora', 3, 'Sky'),
  ...fillSeeds('stars', 3, 'Sky'),

  ...fillSeeds('ocean', 4, 'Sea'),
  ...fillSeeds('wave', 3, 'Sea'),
  ...fillSeeds('shore', 3, 'Sea'),
  ...fillSeeds('lake', 3, 'Sea'),
  ...fillSeeds('reef', 3, 'Sea'),

  ...fillSeeds('forest', 4, 'Forest'),
  ...fillSeeds('pine', 3, 'Forest'),
  ...fillSeeds('leaf', 3, 'Forest'),
  ...fillSeeds('jungle', 3, 'Forest'),
  ...fillSeeds('meadow', 3, 'Forest'),

  ...fillSeeds('city', 4, 'Urban'),
  ...fillSeeds('street', 3, 'Urban'),
  ...fillSeeds('arch', 3, 'Urban'),
  ...fillSeeds('facade', 3, 'Urban'),
  ...fillSeeds('neon', 3, 'Urban'),

  ...fillSeeds('paper', 3, 'Texture'),
  ...fillSeeds('marble', 3, 'Texture'),
  ...fillSeeds('wood', 3, 'Texture'),
  ...fillSeeds('linen', 3, 'Texture'),
  ...fillSeeds('concrete', 3, 'Texture'),
  ...fillSeeds('sand', 3, 'Texture'),

  ...fillSeeds('ink', 3, 'Abstract'),
  ...fillSeeds('bokeh', 3, 'Abstract'),
  ...fillSeeds('smoke', 3, 'Abstract'),
  ...fillSeeds('glow', 3, 'Abstract'),
  ...fillSeeds('flow', 3, 'Abstract'),
  ...fillSeeds('light', 3, 'Abstract')
];

export function stockThumbUrl(seed: string): string {
  return `https://picsum.photos/seed/${seed}/200/200`;
}

export function stockFullUrl(seed: string): string {
  return `https://picsum.photos/seed/${seed}/1600/1200`;
}

export function previewCss(bg: CanvasBackground): string {
  if (bg.type === 'color') return bg.color;
  if (bg.type === 'gradient') {
    const stops = bg.stops
      .map((s) => `${s.color} ${Math.round(s.offset * 100)}%`)
      .join(', ');
    return `linear-gradient(${bg.angle}deg, ${stops})`;
  }
  if (bg.type === 'image') return `url(${bg.src}) center/cover no-repeat`;
  return 'transparent';
}
