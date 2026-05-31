import { env } from '$env/dynamic/public';

/**
 * Canonical production origin used for absolute SEO URLs (canonical, hreflang,
 * og:url, sitemap). Falls back to the production domain when PUBLIC_APP_URL is
 * unset or points at localhost — canonical tags must never reference localhost.
 */
function resolveSiteUrl(): string {
  const raw = env.PUBLIC_APP_URL?.replace(/\/$/, '');
  if (raw && !/localhost|127\.0\.0\.1/.test(raw)) return raw;
  return 'https://betakti.com';
}

export const SITE_URL = resolveSiteUrl();
export const DEFAULT_OG_IMAGE = `${SITE_URL}/brand/logo.png`;
export const TWITTER_HANDLE = '@betakti';

/** App install links. */
export const APP_STORE_URL = 'https://apps.apple.com/us/app/betakti-cards-design/id1460140608';
export const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=io.koapps.betakti';
/** Generic "download" link used in schema (defaults to the App Store listing). */
export const APP_DOWNLOAD_URL = APP_STORE_URL;

/** Mobile (App Store / Google Play) subscription prices, in USD. */
export const APP_PRICE_MONTHLY_USD = '4.99';
export const APP_PRICE_YEARLY_USD = '29.99';
export const APP_PRICE_CURRENCY = 'USD';
