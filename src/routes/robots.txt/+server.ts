import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/public';

export const prerender = true;

export const GET: RequestHandler = () => {
  const base = env.PUBLIC_APP_URL ?? 'http://localhost:5173';
  const body = `User-agent: *\nAllow: /\nSitemap: ${base}/sitemap.xml\n`;
  return new Response(body, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, max-age=3600'
    }
  });
};
