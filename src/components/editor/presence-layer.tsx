'use client';

import { useEffect, useState } from 'react';
import {
  colorForUser,
  publishPresence,
  subscribePresence,
  type CollabPeer,
} from '@/lib/editor/collab';
import { useAuth } from '@/lib/auth/context';

export function PresenceLayer({ projectId }: { projectId: string }) {
  const { user } = useAuth();
  const [peers, setPeers] = useState<CollabPeer[]>([]);

  // Subscribe
  useEffect(() => {
    if (!user) return;
    return subscribePresence(projectId, (list) =>
      setPeers(list.filter((p) => p.userId !== user.uid)),
    );
  }, [projectId, user]);

  // Heartbeat
  useEffect(() => {
    if (!user) return;
    const beat = () =>
      publishPresence(projectId, user.uid, {
        userId: user.uid,
        displayName: user.displayName,
        color: colorForUser(user.uid),
        cursor: null,
      }).catch(() => {});
    beat();
    const t = setInterval(beat, 10_000);
    return () => clearInterval(t);
  }, [projectId, user]);

  return (
    <div className="flex items-center gap-1">
      {peers.map((p) => (
        <div
          key={p.userId}
          title={p.displayName ?? p.userId}
          className="h-7 w-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 border-[color:var(--background)]"
          style={{ backgroundColor: p.color }}
        >
          {(p.displayName ?? '?').slice(0, 1).toUpperCase()}
        </div>
      ))}
    </div>
  );
}
