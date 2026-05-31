/**
 * Pure locale <-> URL path helpers. No Paraglide import so this is safe to use
 * inside the universal `reroute` hook and on both server and client.
 *
 * URL strategy:
 *   - Arabic (base locale) lives at the root:   /pricing, /occasions/ramadan
 *   - English lives under an /en prefix:         /en/pricing, /en/occasions/ramadan
 */

export type Locale = 'ar' | 'en';

/** Route prefixes that belong to the authenticated app (not marketing/SEO). */
const APP_PREFIXES = [
  '/home',
  '/projects',
  '/editor',
  '/settings',
  '/subscription',
  '/tools',
  '/auth',
  '/admin',
  '/api'
];

/** True when the path is an in-app (non-marketing) route. */
export function isAppPath(pathname: string): boolean {
  const p = stripLocalePrefix(pathname);
  return APP_PREFIXES.some((prefix) => p === prefix || p.startsWith(prefix + '/'));
}

/** Strip a leading `/en` segment, always returning a path that starts with `/`. */
export function stripLocalePrefix(pathname: string): string {
  if (pathname === '/en') return '/';
  if (pathname.startsWith('/en/')) return pathname.slice(3);
  return pathname;
}

/** Add the correct locale prefix to a base (Arabic) path. */
export function addLocalePrefix(pathname: string, locale: Locale): string {
  const base = stripLocalePrefix(pathname);
  if (locale === 'en') {
    return base === '/' ? '/en' : '/en' + base;
  }
  return base;
}

/** Read the locale encoded in a URL path (defaults to base locale `ar`). */
export function localeFromPath(pathname: string): Locale {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'ar';
}
