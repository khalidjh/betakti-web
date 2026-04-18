'use client';

import { collection, onSnapshot, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import type { CanvasBackground, CanvasElement } from '@/lib/types/canvas';

export interface CollabPeer {
  userId: string;
  displayName: string | null;
  color: string;
  cursor?: { x: number; y: number } | null;
  selectedIds?: string[];
  updatedAt: number;
}

export interface CollabDoc {
  elements: CanvasElement[];
  background: CanvasBackground;
  name: string;
  updatedBy: string;
  updatedAt: number;
}

const COLORS = ['#ef4444', '#10b981', '#3b82f6', '#f59e0b', '#ec4899', '#8b5cf6'];

export function colorForUser(uid: string): string {
  let h = 0;
  for (const c of uid) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return COLORS[h % COLORS.length];
}

export function subscribeProject(
  projectId: string,
  onChange: (d: CollabDoc | null) => void,
): () => void {
  return onSnapshot(doc(db, 'projects', projectId), (snap) => {
    if (!snap.exists()) return onChange(null);
    const data = snap.data();
    onChange({
      elements: data.elements ?? [],
      background: data.background,
      name: data.name ?? '',
      updatedBy: data.updatedBy ?? '',
      updatedAt: data.updatedAt?.toMillis?.() ?? Date.now(),
    });
  });
}

export async function publishPresence(
  projectId: string,
  userId: string,
  peer: Omit<CollabPeer, 'updatedAt'>,
): Promise<void> {
  await setDoc(doc(db, 'projects', projectId, 'presence', userId), {
    ...peer,
    updatedAt: serverTimestamp(),
  });
}

export function subscribePresence(
  projectId: string,
  onPeers: (peers: CollabPeer[]) => void,
): () => void {
  return onSnapshot(collection(db, 'projects', projectId, 'presence'), (snap) => {
    const now = Date.now();
    const peers: CollabPeer[] = snap.docs
      .map((d) => {
        const data = d.data();
        return {
          userId: data.userId ?? d.id,
          displayName: data.displayName ?? null,
          color: data.color ?? '#6d28d9',
          cursor: data.cursor ?? null,
          selectedIds: data.selectedIds ?? [],
          updatedAt: data.updatedAt?.toMillis?.() ?? 0,
        };
      })
      // Filter stale peers (>30s since last heartbeat)
      .filter((p) => now - p.updatedAt < 30_000);
    onPeers(peers);
  });
}
