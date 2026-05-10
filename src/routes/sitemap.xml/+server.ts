import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/public';
import { adminDb } from '$lib/firebase/admin';

const STATIC_PATHS = ['/', '/pricing', '/templates', '/privacy', '/terms'];

function xmlEscape(s: string): string {
  return s.replace(/[<>&'"]/g, (c) =>
    c === '<' ? '&lt;' : c === '>' ? '&gt;' : c === '&' ? '&amp;' : c === "'" ? '&apos;' : '&quot;'
  );
}

function toIso(ts: unknown): string | null {
  if (!ts) return null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const t = ts as any;
  if (typeof t?.toDate === 'function') return t.toDate().toISOString();
  if (typeof t === 'number') return new Date(t).toISOString();
  if (t?.seconds) return new Date(t.seconds * 1000).toISOString();
  return null;
}

export const GET: RequestHandler = async () => {
  const base = (env.PUBLIC_APP_URL ?? 'http://localhost:5173').replace(/\/$/, '');

  const urls: { loc: string; lastmod?: string }[] = STATIC_PATHS.map((p) => ({
    loc: `${base}${p}`
  }));

  try {
    const snap = await adminDb()
      .collection('dynamic_templates')
      .where('isActive', '==', true)
      .where('isPremium', '==', false)
      .limit(5000)
      .get();
    for (const doc of snap.docs) {
      const data = doc.data();
      const lastmod = toIso(data.updatedAt) ?? undefined;
      urls.push({ loc: `${base}/templates/${doc.id}`, lastmod });
    }
  } catch {
    // fall back to static-only sitemap on admin/query failure
  }

  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls
      .map(
        (u) =>
          `  <url>\n    <loc>${xmlEscape(u.loc)}</loc>\n` +
          (u.lastmod ? `    <lastmod>${u.lastmod}</lastmod>\n` : '') +
          `  </url>`
      )
      .join('\n') +
    `\n</urlset>\n`;

  return new Response(body, {
    headers: {
      'content-type': 'application/xml; charset=utf-8',
      'cache-control': 'public, max-age=3600'
    }
  });
};
