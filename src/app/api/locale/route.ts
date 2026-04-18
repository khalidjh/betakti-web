import { NextResponse } from 'next/server';
import { locales, type Locale } from '@/i18n/config';

export async function POST(req: Request) {
  const { locale } = (await req.json()) as { locale: Locale };
  if (!locales.includes(locale)) {
    return NextResponse.json({ error: 'invalid locale' }, { status: 400 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set('NEXT_LOCALE', locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  });
  return res;
}
