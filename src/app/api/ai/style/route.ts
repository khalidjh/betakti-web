import { NextRequest, NextResponse } from 'next/server';
import { fal } from '@fal-ai/client';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { getStyle } from '@/lib/ai/styles';

// POST body: { imageUrl: string, styleId: string, idToken: string }
export async function POST(req: NextRequest) {
  const key = process.env.FAL_API_KEY;
  if (!key) return NextResponse.json({ error: 'FAL_API_KEY missing' }, { status: 500 });
  fal.config({ credentials: key });

  let body: { imageUrl?: string; styleId?: string; idToken?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid json' }, { status: 400 });
  }
  const { imageUrl, styleId, idToken } = body;
  if (!imageUrl || !styleId || !idToken) {
    return NextResponse.json({ error: 'missing fields' }, { status: 400 });
  }

  // Verify Firebase ID token and enforce Pro gating.
  let uid: string;
  try {
    uid = (await adminAuth.verifyIdToken(idToken)).uid;
  } catch {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  const userSnap = await adminDb.collection('users').doc(uid).get();
  const tier = userSnap.data()?.subscription?.tier;
  if (tier !== 'pro') {
    return NextResponse.json({ error: 'pro_required' }, { status: 402 });
  }

  let preset;
  try {
    preset = getStyle(styleId);
  } catch {
    return NextResponse.json({ error: 'unknown style' }, { status: 400 });
  }

  try {
    // Flux Dev image-to-image via fal.ai
    const result = await fal.subscribe('fal-ai/flux/dev/image-to-image', {
      input: {
        image_url: imageUrl,
        prompt: preset.prompt,
        strength: preset.strength,
        num_inference_steps: 28,
        guidance_scale: 3.5,
      },
      logs: false,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const images = (result.data as any)?.images;
    const url = images?.[0]?.url;
    if (!url) return NextResponse.json({ error: 'no output' }, { status: 500 });
    return NextResponse.json({ url, styleId });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
