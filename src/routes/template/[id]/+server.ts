import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

/**
 * `/template/<id>` → `/templates/<id>`.
 *
 * The app builds the singular form (`DeepLinkService.createTemplateLink`) and
 * the site serves the plural one. Rather than a second copy of the template
 * page, forward — the existing page already loads the template, sets its OG
 * tags and offers the editor.
 */
export const GET: RequestHandler = ({ params }) => {
  const id = encodeURIComponent(params.id);
  redirect(301, `/templates/${id}`);
};
