import { error } from '@sveltejs/kit';
import { platformBySlug } from '$lib/seo/landings';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
  const page = platformBySlug(params.type);
  if (!page) error(404, 'Page not found');
  return { page };
};
