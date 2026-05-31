import type { RequestHandler } from './$types';
import { SITE_URL } from '$lib/seo/config';

export const prerender = true;

export const GET: RequestHandler = () => {
  const body =
    `User-agent: *\n` +
    `Allow: /\n` +
    `Disallow: /admin\n` +
    `Disallow: /api/\n` +
    `Disallow: /editor/\n` +
    `Disallow: /settings\n` +
    `Sitemap: ${SITE_URL}/sitemap.xml\n`;
  return new Response(body, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, max-age=3600'
    }
  });
};
