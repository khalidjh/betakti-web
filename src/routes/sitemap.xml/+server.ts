import type { RequestHandler } from './$types';
import { adminDb } from '$lib/firebase/admin';
import { SITE_URL } from '$lib/seo/config';
import { PLATFORM_PAGES } from '$lib/seo/landings';
import { OCCASION_PAGES } from '$lib/seo/occasions-content';

/** Bilingual marketing paths — each gets an Arabic (root) and English (/en) URL. */
const BILINGUAL_PATHS = [
  '/',
  '/pricing',
  '/templates',
  '/occasions',
  '/create',
  '/arabic-fonts',
  '/background-remover',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
  ...PLATFORM_PAGES.map((p) => `/create/${p.slug}`),
  ...OCCASION_PAGES.map((o) => `/occasions/${o.slug}`)
];

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

/** A pair of <url> entries (ar + en) that advertise both language variants via hreflang. */
function bilingualEntry(path: string): string {
  const ar = SITE_URL + path;
  const en = SITE_URL + (path === '/' ? '/en' : '/en' + path);
  const alternates =
    `    <xhtml:link rel="alternate" hreflang="ar" href="${xmlEscape(ar)}"/>\n` +
    `    <xhtml:link rel="alternate" hreflang="en" href="${xmlEscape(en)}"/>\n` +
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${xmlEscape(ar)}"/>\n`;
  return (
    `  <url>\n    <loc>${xmlEscape(ar)}</loc>\n${alternates}  </url>\n` +
    `  <url>\n    <loc>${xmlEscape(en)}</loc>\n${alternates}  </url>`
  );
}

function singleEntry(loc: string, lastmod?: string): string {
  return (
    `  <url>\n    <loc>${xmlEscape(loc)}</loc>\n` +
    (lastmod ? `    <lastmod>${lastmod}</lastmod>\n` : '') +
    `  </url>`
  );
}

export const GET: RequestHandler = async () => {
  const entries: string[] = BILINGUAL_PATHS.map(bilingualEntry);

  // Dynamic template detail pages (Arabic / root only).
  try {
    const snap = await adminDb()
      .collection('dynamic_templates')
      .where('isActive', '==', true)
      .where('isPremium', '==', false)
      .limit(5000)
      .get();
    for (const doc of snap.docs) {
      const lastmod = toIso(doc.data().updatedAt) ?? undefined;
      entries.push(singleEntry(`${SITE_URL}/templates/${doc.id}`, lastmod));
    }
  } catch {
    // fall back to static-only sitemap on admin/query failure
  }

  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n` +
    entries.join('\n') +
    `\n</urlset>\n`;

  return new Response(body, {
    headers: {
      'content-type': 'application/xml; charset=utf-8',
      'cache-control': 'public, max-age=3600'
    }
  });
};
