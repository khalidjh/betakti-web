import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const key = process.env.PEXELS_API_KEY;
  if (!key) {
    return NextResponse.json({ error: 'PEXELS_API_KEY missing' }, { status: 500 });
  }
  const q = req.nextUrl.searchParams.get('q') ?? 'nature';
  const page = req.nextUrl.searchParams.get('page') ?? '1';
  const perPage = req.nextUrl.searchParams.get('per_page') ?? '24';

  const res = await fetch(
    `https://api.pexels.com/v1/search?query=${encodeURIComponent(q)}&page=${page}&per_page=${perPage}`,
    {
      headers: { Authorization: key },
      next: { revalidate: 3600 },
    },
  );
  if (!res.ok) {
    return NextResponse.json({ error: 'pexels failed' }, { status: res.status });
  }
  const data = await res.json();
  return NextResponse.json(data);
}
