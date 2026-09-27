import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ locals, url, route }) => {
  // The editor is open to guests so someone can try Betakti straight from a
  // template link without an account. Its own +page.server.ts narrows that to
  // /editor/new — a guest has no saved projects to open. Every other in-app
  // route still needs a session.
  //
  // Matched on route.id rather than the pathname because `/en/*` URLs keep
  // their locale prefix in `url` (reroute only affects route resolution).
  const guestAllowed = route.id?.startsWith('/(app)/editor/') ?? false;

  if (!locals.user && !guestAllowed) {
    const next = encodeURIComponent(url.pathname + url.search);
    throw redirect(303, `/auth/login?next=${next}`);
  }
  return { user: locals.user };
};
