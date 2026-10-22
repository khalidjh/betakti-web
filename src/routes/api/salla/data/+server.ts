import { json, type RequestHandler } from '@sveltejs/kit';
import { adminGet, introspect, SallaError } from '$lib/salla/api.server';

/**
 * `GET /api/salla/data` — what the embedded page needs to design with: the
 * store's name, its products, active coupons and special offers. Nothing about
 * customers or orders; the app doesn't hold those scopes.
 *
 * Auth is the embedded session token from the iframe URL, sent as a Bearer
 * token and checked with Salla on every call. The merchant comes from Salla's
 * answer, never from the request.
 */

interface Money {
  amount: number;
  currency: string;
}

interface Product {
  id: number;
  name: string;
  price: Money;
  sale_price?: Money | null;
  status?: string;
  main_image?: string;
  thumbnail?: string;
  images?: { url?: string; main?: boolean }[];
  urls?: { customer?: string };
}

interface Coupon {
  code: string;
  type: string;
  status?: string;
  amount?: Money | number;
  expiry_date?: string;
}

interface Offer {
  name: string;
  message?: string;
  offer_type?: string;
  status?: string;
  expiry_date?: string;
}

interface Listing<T> {
  data?: T[];
}

export interface SallaData {
  store: { name: string | null; currency: string | null };
  products: {
    id: number;
    name: string;
    price: Money;
    sale_price: Money | null;
    image: string | null;
    url: string | null;
  }[];
  coupons: { code: string; type: 'percentage' | 'fixed'; amount: number; currency: string | null }[];
  offers: { name: string; message: string | null; type: string | null; expiry_date: string | null }[];
}

const TTL = 60_000;
const cache = new Map<number, { at: number; data: SallaData }>();

function image(p: Product): string | null {
  return (
    p.main_image ||
    p.images?.find((i) => i.main)?.url ||
    p.images?.[0]?.url ||
    p.thumbnail ||
    null
  );
}

async function optional<T>(merchant: number, path: string): Promise<T[]> {
  // Coupons and offers are extras: a scope Salla hasn't granted yet shouldn't
  // cost the merchant the product list.
  try {
    return (await adminGet<Listing<T>>(merchant, path)).data ?? [];
  } catch (e) {
    if (e instanceof SallaError && e.code !== 'upstream') throw e;
    console.warn(`[salla] ${path} for ${merchant}: ${(e as Error).message}`);
    return [];
  }
}

async function load(merchant: number): Promise<SallaData> {
  const [products, coupons, offers, info] = await Promise.all([
    adminGet<Listing<Product>>(merchant, '/products?per_page=50&status=sale'),
    optional<Coupon>(merchant, '/coupons?per_page=50'),
    optional<Offer>(merchant, '/specialoffers?per_page=20'),
    adminGet<{ data?: { name?: string; currency?: string } }>(merchant, '/store/info').catch(() => null)
  ]);

  return {
    store: { name: info?.data?.name ?? null, currency: info?.data?.currency ?? null },
    products: (products.data ?? [])
      .filter((p) => !p.status || p.status === 'sale')
      .map((p) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        sale_price: p.sale_price?.amount ? p.sale_price : null,
        image: image(p),
        url: p.urls?.customer ?? null
      })),
    coupons: coupons
      .filter((c) => !c.status || c.status === 'active')
      .map((c) => {
        const money = typeof c.amount === 'object' ? c.amount : null;
        const t = c.type?.toLowerCase();
        return {
          code: c.code,
          type: t === 'percentage' || t === 'p' ? ('percentage' as const) : ('fixed' as const),
          amount: Number(money ? money.amount : c.amount) || 0,
          currency: money?.currency ?? null
        };
      }),
    offers: offers
      .filter((o) => !o.status || o.status === 'active')
      .map((o) => ({
        name: o.name,
        message: o.message || null,
        type: o.offer_type ?? null,
        expiry_date: o.expiry_date ?? null
      }))
  };
}

const STATUS: Record<SallaError['code'], number> = {
  invalid_session: 401,
  not_installed: 409,
  refresh_unavailable: 503,
  reauthorize: 409,
  upstream: 502
};

export const GET: RequestHandler = async ({ request }) => {
  const auth = request.headers.get('authorization') ?? '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7).trim() : '';
  if (!token) return json({ error: 'invalid_session' }, { status: 401 });

  let merchant: number | null;
  try {
    merchant = await introspect(token);
  } catch {
    return json({ error: 'upstream' }, { status: 502 });
  }
  if (!merchant) return json({ error: 'invalid_session' }, { status: 401 });

  const hit = cache.get(merchant);
  if (hit && Date.now() - hit.at < TTL) return json(hit.data, { headers: { 'cache-control': 'no-store' } });

  try {
    const data = await load(merchant);
    cache.set(merchant, { at: Date.now(), data });
    return json(data, { headers: { 'cache-control': 'no-store' } });
  } catch (e) {
    if (e instanceof SallaError) {
      console.warn(`[salla] data for ${merchant}: ${e.code} — ${e.message}`);
      return json({ error: e.code }, { status: STATUS[e.code] });
    }
    console.error(`[salla] data for ${merchant}:`, (e as Error).message);
    return json({ error: 'upstream' }, { status: 502 });
  }
};
