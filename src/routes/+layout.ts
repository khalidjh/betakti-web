import type { LayoutLoad } from './$types';
import { browser } from '$app/environment';
import { setLocale } from '$lib/paraglide/runtime.js';
import { isLocale } from '$lib/i18n';

/**
 * Keep Paraglide's client locale in sync with the server's per-URL decision
 * (`data.locale` comes from hooks.server → +layout.server). Without this, after
 * hydration the client's getLocale() falls back to the cookie/base locale and
 * reactive m()/t() calls flip /en pages back to Arabic.
 *
 * Client-only: the server already set the locale in hooks.server, and writing
 * the shared module-level locale from load on a long-running server would add
 * cross-request races. Universal load re-runs on the client at hydration, so
 * this sets the correct locale before components render. reload:false avoids a
 * reload; setLocale no-ops when the locale already matches.
 */
export const load: LayoutLoad = ({ data }) => {
  if (browser && isLocale(data?.locale)) {
    setLocale(data.locale, { reload: false });
  }
  return data;
};
