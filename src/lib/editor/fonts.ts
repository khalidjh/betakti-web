'use client';

export interface FontDef {
  family: string;
  label: string;
  script: 'ar' | 'en';
  free: boolean;
}

export const FONTS: FontDef[] = [
  // Arabic — free
  { family: 'Cairo', label: 'Cairo', script: 'ar', free: true },
  { family: 'Tajawal', label: 'Tajawal', script: 'ar', free: true },
  { family: 'Almarai', label: 'Almarai', script: 'ar', free: true },
  { family: 'Changa', label: 'Changa', script: 'ar', free: true },
  { family: 'El Messiri', label: 'El Messiri', script: 'ar', free: true },
  { family: 'Reem Kufi', label: 'Reem Kufi', script: 'ar', free: true },
  // Arabic — pro
  { family: 'Amiri', label: 'Amiri', script: 'ar', free: false },
  { family: 'Aref Ruqaa', label: 'Aref Ruqaa', script: 'ar', free: false },
  { family: 'Lemonada', label: 'Lemonada', script: 'ar', free: false },
  { family: 'Markazi Text', label: 'Markazi Text', script: 'ar', free: false },
  { family: 'Lalezar', label: 'Lalezar', script: 'ar', free: false },
  { family: 'Rakkas', label: 'Rakkas', script: 'ar', free: false },
  { family: 'Marhey', label: 'Marhey', script: 'ar', free: false },
  { family: 'Baloo Bhaijaan 2', label: 'Baloo', script: 'ar', free: false },
  { family: 'Noto Naskh Arabic', label: 'Noto Naskh', script: 'ar', free: false },
  { family: 'Noto Kufi Arabic', label: 'Noto Kufi', script: 'ar', free: false },
  { family: 'IBM Plex Sans Arabic', label: 'IBM Plex', script: 'ar', free: false },
  { family: 'Readex Pro', label: 'Readex Pro', script: 'ar', free: false },
  { family: 'Rubik', label: 'Rubik', script: 'ar', free: false },
  { family: 'Vazirmatn', label: 'Vazirmatn', script: 'ar', free: false },
  { family: 'Harmattan', label: 'Harmattan', script: 'ar', free: false },
  { family: 'Scheherazade New', label: 'Scheherazade', script: 'ar', free: false },

  // English — free
  { family: 'Inter', label: 'Inter', script: 'en', free: true },
  { family: 'Roboto', label: 'Roboto', script: 'en', free: true },
  { family: 'Open Sans', label: 'Open Sans', script: 'en', free: true },
  { family: 'Lato', label: 'Lato', script: 'en', free: true },
  { family: 'Montserrat', label: 'Montserrat', script: 'en', free: true },
  { family: 'Poppins', label: 'Poppins', script: 'en', free: true },
  // English — pro (selection)
  { family: 'Raleway', label: 'Raleway', script: 'en', free: false },
  { family: 'Playfair Display', label: 'Playfair', script: 'en', free: false },
  { family: 'Merriweather', label: 'Merriweather', script: 'en', free: false },
  { family: 'Oswald', label: 'Oswald', script: 'en', free: false },
  { family: 'Nunito', label: 'Nunito', script: 'en', free: false },
  { family: 'Quicksand', label: 'Quicksand', script: 'en', free: false },
  { family: 'Comfortaa', label: 'Comfortaa', script: 'en', free: false },
  { family: 'Pacifico', label: 'Pacifico', script: 'en', free: false },
  { family: 'Dancing Script', label: 'Dancing Script', script: 'en', free: false },
  { family: 'Great Vibes', label: 'Great Vibes', script: 'en', free: false },
  { family: 'Lobster', label: 'Lobster', script: 'en', free: false },
  { family: 'Bebas Neue', label: 'Bebas Neue', script: 'en', free: false },
  { family: 'Anton', label: 'Anton', script: 'en', free: false },
  { family: 'Righteous', label: 'Righteous', script: 'en', free: false },
  { family: 'Caveat', label: 'Caveat', script: 'en', free: false },
  { family: 'Kalam', label: 'Kalam', script: 'en', free: false },
  { family: 'Patrick Hand', label: 'Patrick Hand', script: 'en', free: false },
  { family: 'Indie Flower', label: 'Indie Flower', script: 'en', free: false },
  { family: 'Permanent Marker', label: 'Permanent Marker', script: 'en', free: false },
  { family: 'Abril Fatface', label: 'Abril Fatface', script: 'en', free: false },
  { family: 'Cinzel', label: 'Cinzel', script: 'en', free: false },
  { family: 'Cormorant Garamond', label: 'Cormorant', script: 'en', free: false },
  { family: 'Libre Baskerville', label: 'Libre Baskerville', script: 'en', free: false },
  { family: 'EB Garamond', label: 'EB Garamond', script: 'en', free: false },
  { family: 'Bitter', label: 'Bitter', script: 'en', free: false },
  { family: 'Crimson Text', label: 'Crimson', script: 'en', free: false },
  { family: 'Josefin Sans', label: 'Josefin', script: 'en', free: false },
  { family: 'Fjalla One', label: 'Fjalla One', script: 'en', free: false },
  { family: 'Barlow Condensed', label: 'Barlow Condensed', script: 'en', free: false },
  { family: 'DM Sans', label: 'DM Sans', script: 'en', free: false },
];

const loaded = new Set<string>();

export async function loadFont(family: string): Promise<void> {
  if (loaded.has(family)) return;
  loaded.add(family);
  const href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
    family,
  )}:wght@400;500;600;700&display=swap`;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  document.head.appendChild(link);
  if ('fonts' in document) {
    try {
      await (document as unknown as { fonts: { load: (f: string) => Promise<unknown> } }).fonts.load(
        `16px "${family}"`,
      );
    } catch {
      /* ignore */
    }
  }
}
