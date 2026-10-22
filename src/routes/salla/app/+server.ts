import type { RequestHandler } from './$types';
import page from './page.html?raw';

/**
 * `/salla/app` — the embedded page of the Salla app (App ID 537359223,
 * page path `designs`). Salla loads it in an iframe inside the merchant
 * dashboard and appends `?token=…&theme=light|dark&lang=ar|en`.
 *
 * It's a plain HTML page rather than a Svelte route: it has to wear Salla's
 * design system, not the site's, and nothing from the site layout may leak
 * into the iframe.
 *
 * Framing is allowed for Salla's dashboard only, and only on this path.
 */
export const GET: RequestHandler = () =>
  new Response(page, {
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'content-security-policy': 'frame-ancestors https://s.salla.sa https://*.salla.sa',
      'cache-control': 'no-store'
    }
  });
