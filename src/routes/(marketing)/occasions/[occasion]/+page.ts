import { error } from '@sveltejs/kit';
import { occasionBySlug } from '$lib/seo/occasions-content';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
  const page = occasionBySlug(params.occasion);
  if (!page) error(404, 'Page not found');
  return { page };
};
