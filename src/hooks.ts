import type { Reroute } from '@sveltejs/kit';
import { stripLocalePrefix } from '$lib/locale-path';

/**
 * Map `/en/*` URLs onto the underlying (Arabic-base) routes so a single set of
 * route files serves both languages. The locale itself is resolved from the
 * original `event.url.pathname` in `hooks.server.ts` (which is untouched by
 * rerouting). Runs on both server and client.
 */
export const reroute: Reroute = ({ url }) => {
  if (url.pathname === '/en' || url.pathname.startsWith('/en/')) {
    return stripLocalePrefix(url.pathname);
  }
};
