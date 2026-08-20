import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { adminDb } from '$lib/firebase/admin';
import { normalizeTemplate, type DynamicTemplate } from '$lib/data/templates';

/**
 * Template catalogue for the in-editor picker.
 *
 * The marketing pages render templates server-side, but the editor needs them
 * on demand — `/` now lands guests straight on a blank canvas, and browsing
 * templates can't mean leaving the design you already started.
 *
 * Premium templates are included but flagged, so the picker can show them and
 * let the gate happen at apply time rather than hiding what the product offers.
 */
export const GET: RequestHandler = async ({ setHeaders }) => {
  setHeaders({ 'cache-control': 'public, max-age=300' });
  try {
    const snap = await adminDb()
      .collection('dynamic_templates')
      .where('isActive', '==', true)
      .limit(500)
      .get();

    const templates = snap.docs
      .map((d) => normalizeTemplate(d.id, d.data()))
      .filter((t): t is DynamicTemplate => t !== null)
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((t) => ({
        id: t.id,
        nameAr: t.nameAr,
        nameEn: t.nameEn,
        category: t.category,
        isPremium: t.isPremium,
        canvasSize: t.canvasSize,
        // Cheapest thing that renders as a tile: the stored thumbnail, else the
        // background image itself.
        preview: t.thumbnailUrl ?? (t.background.type === 'image' ? t.background.src : null)
      }));

    return json({ templates });
  } catch (err) {
    console.error('[api/templates] query failed:', err);
    return json({ templates: [] });
  }
};
