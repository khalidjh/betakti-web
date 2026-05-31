import { m } from '$lib/paraglide/messages.js';
import { setLocale, getLocale, locales } from '$lib/paraglide/runtime.js';
import { addLocalePrefix, type Locale } from '$lib/locale-path';

export type { Locale };

export { m, setLocale, getLocale, locales };

export function isLocale(value: string | undefined | null): value is Locale {
  return value === 'ar' || value === 'en';
}

/**
 * Pick a string by the active locale. Used for SEO landing-page copy that lives
 * in `$lib/seo/*` data files (kept out of Paraglide to avoid a regeneration step
 * for hundreds of long-form marketing strings).
 */
export function t(ar: string, en: string): string {
  return getLocale() === 'en' ? en : ar;
}

/**
 * Localize an internal href for the active locale (prefixes `/en` for English).
 * Pass an explicit locale to override the ambient one.
 */
export function localizeHref(path: string, locale: Locale = getLocale() as Locale): string {
  return addLocalePrefix(path, locale);
}
