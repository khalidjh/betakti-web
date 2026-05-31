import type { Handle } from '@sveltejs/kit';
import { adminAuth } from '$lib/firebase/admin';
import { isLocale, type Locale } from '$lib/i18n';
import { isAppPath, localeFromPath } from '$lib/locale-path';
import { setLocale } from '$lib/paraglide/runtime.js';

async function loadUser(cookie: string | undefined): Promise<App.Locals['user']> {
  if (!cookie) return null;
  try {
    const decoded = await adminAuth().verifySessionCookie(cookie, true);
    return {
      uid: decoded.uid,
      email: decoded.email ?? null,
      subscription: (decoded.subscription as 'free' | 'pro' | undefined) ?? null,
      isAdmin: decoded.admin === true
    };
  } catch {
    return null;
  }
}

function negotiateLocale(event: Parameters<Handle>[0]['event']): Locale {
  const path = event.url.pathname;

  // 1. URL prefix is the source of truth for SEO: `/en/*` is always English.
  if (localeFromPath(path) === 'en') return 'en';

  // 2. Marketing pages are deterministic per URL — the un-prefixed path is
  //    always the Arabic (base) canonical, regardless of any saved preference.
  //    This keeps one language per URL so both can be indexed independently.
  if (!isAppPath(path)) return 'ar';

  // 3. In-app pages honour the user's saved/negotiated preference.
  const paraglide = event.cookies.get('PARAGLIDE_LOCALE');
  if (isLocale(paraglide)) return paraglide;
  const cookieLocale = event.cookies.get('locale');
  if (isLocale(cookieLocale)) return cookieLocale;

  const header = event.request.headers.get('accept-language');
  if (header) {
    const parts = header.split(',').map((p) => p.split(';')[0]!.trim().toLowerCase());
    for (const part of parts) {
      if (part.startsWith('ar')) return 'ar';
      if (part.startsWith('en')) return 'en';
    }
  }
  return 'ar';
}

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.user = await loadUser(event.cookies.get('__session'));
  event.locals.locale = negotiateLocale(event);
  // Only persist the language cookie from in-app pages, where it stores the
  // user's preference. Marketing pages are locale-by-URL, so writing the cookie
  // there would clobber an app user's choice when they visit a public page.
  if (
    isAppPath(event.url.pathname) &&
    event.cookies.get('PARAGLIDE_LOCALE') !== event.locals.locale
  ) {
    event.cookies.set('PARAGLIDE_LOCALE', event.locals.locale, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax'
    });
  }
  setLocale(event.locals.locale, { reload: false });

  return resolve(event, {
    transformPageChunk: ({ html }) =>
      html
        .replace('%lang%', event.locals.locale)
        .replace('%dir%', event.locals.locale === 'ar' ? 'rtl' : 'ltr')
  });
};
