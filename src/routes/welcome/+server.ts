import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

/**
 * `/welcome` → `/`.
 *
 * The landing page lived here while the root redirected into the editor. It is
 * back at the root, and this keeps every old link — and anything Google has
 * already indexed — pointing at one canonical page instead of two copies of
 * the same content.
 */
export const GET: RequestHandler = () => redirect(301, '/');
