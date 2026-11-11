import type { RequestHandler } from './$types';

/**
 * `GET /api/salla/image?u=<url>` — a merchant's product photo, re-served from
 * betakti.com so the embedded page can draw it on a canvas and still export
 * the canvas. (Salla's CDN and S3 buckets don't send CORS headers, and a
 * canvas with a cross-origin image in it refuses toBlob.)
 *
 * Only Salla's own image hosts, only raster images, at most 10 MB. It isn't
 * an open proxy: anything else is a 400.
 */

const HOSTS = [
  /^cdn\.salla\.sa$/,
  /^[a-z0-9-]+\.salla\.sa$/,
  /^cdn\.salla\.network$/,
  /^salla-[a-z0-9-]+\.s3\.[a-z0-9-]+\.amazonaws\.com$/,
  /^salla-[a-z0-9-]+\.s3\.amazonaws\.com$/
];
const TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif']);
const MAX = 10 * 1024 * 1024;

function allowed(raw: string | null): URL | null {
  if (!raw) return null;
  try {
    const u = new URL(raw);
    if (u.protocol !== 'https:' || u.username || u.password || u.port) return null;
    return HOSTS.some((h) => h.test(u.hostname)) ? u : null;
  } catch {
    return null;
  }
}

const bad = (status: number) => new Response(null, { status, headers: { 'cache-control': 'no-store' } });

export const GET: RequestHandler = async ({ url }) => {
  const target = allowed(url.searchParams.get('u'));
  if (!target) return bad(400);

  let res: Response;
  try {
    // Redirects are followed by hand so each hop is checked against the list.
    let next = target;
    for (let hop = 0; ; hop++) {
      res = await fetch(next, { redirect: 'manual', signal: AbortSignal.timeout(10_000) });
      if (res.status < 300 || res.status >= 400) break;
      const loc = res.headers.get('location');
      const to = loc ? allowed(new URL(loc, next).toString()) : null;
      if (!to || hop >= 3) return bad(502);
      next = to;
    }
  } catch {
    return bad(502);
  }
  if (!res.ok) return bad(res.status === 404 ? 404 : 502);

  const type = (res.headers.get('content-type') ?? '').split(';')[0].trim().toLowerCase();
  if (!TYPES.has(type)) return bad(415);
  if (Number(res.headers.get('content-length') ?? 0) > MAX) return bad(413);

  const body = new Uint8Array(await res.arrayBuffer());
  if (body.byteLength > MAX) return bad(413);

  return new Response(body, {
    headers: {
      'content-type': type,
      'cache-control': 'public, max-age=86400',
      'x-content-type-options': 'nosniff',
      'content-security-policy': "default-src 'none'"
    }
  });
};
