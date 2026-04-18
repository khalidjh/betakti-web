import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import type { Project } from '@/lib/types/canvas';

type StoredProject = Omit<Project, 'id' | 'createdAt' | 'updatedAt'>;

function toProject(id: string, d: Record<string, unknown>): Project {
  return {
    id,
    userId: (d.userId as string) ?? '',
    name: (d.name as string) ?? 'تصميم جديد',
    canvasSize: d.canvasSize as Project['canvasSize'],
    background: d.background as Project['background'],
    elements: (d.elements as Project['elements']) ?? [],
    thumbnailUrl: d.thumbnailUrl as string | undefined,
    createdAt: (d.createdAt as { toMillis?: () => number })?.toMillis?.() ?? Date.now(),
    updatedAt: (d.updatedAt as { toMillis?: () => number })?.toMillis?.() ?? Date.now(),
  };
}

export async function createProject(p: StoredProject): Promise<string> {
  const ref = await addDoc(collection(db, 'projects'), {
    ...p,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function getProject(id: string): Promise<Project | null> {
  const snap = await getDoc(doc(db, 'projects', id));
  if (!snap.exists()) return null;
  return toProject(snap.id, snap.data());
}

export async function updateProject(
  id: string,
  patch: Partial<StoredProject> & { updatedBy?: string },
): Promise<void> {
  await updateDoc(doc(db, 'projects', id), {
    ...patch,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteProject(id: string): Promise<void> {
  await deleteDoc(doc(db, 'projects', id));
}

export async function listUserProjects(
  userId: string,
  max: number = 50,
): Promise<Project[]> {
  const q = query(
    collection(db, 'projects'),
    where('userId', '==', userId),
    orderBy('updatedAt', 'desc'),
    limit(max),
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => toProject(d.id, d.data()));
}
