import { error, redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ locals, url }) => {
  if (!locals.user) {
    const next = encodeURIComponent(url.pathname + url.search);
    throw redirect(303, `/auth/login?next=${next}`);
  }
  if (!locals.user.isAdmin) throw error(404, 'Not found');
  return { user: locals.user };
};
