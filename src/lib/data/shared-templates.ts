import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  where,
} from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import type { Project, DesignTemplate, TemplateCategory } from '@/lib/types/canvas';

// "Community templates" — user-submitted projects published as templates.
export interface SharedTemplate extends DesignTemplate {
  authorId: string;
  authorName: string | null;
  createdAt: number;
  likes: number;
}

export async function publishProject(
  p: Project,
  meta: {
    authorName: string | null;
    category: TemplateCategory;
    nameAr: string;
    nameEn: string;
  },
): Promise<string> {
  const ref = await addDoc(collection(db, 'shared_templates'), {
    authorId: p.userId,
    authorName: meta.authorName,
    nameAr: meta.nameAr,
    nameEn: meta.nameEn,
    category: meta.category,
    canvasSizeId: p.canvasSize.id,
    canvasSize: p.canvasSize,
    background: p.background,
    elements: p.elements,
    thumbnailUrl: p.thumbnailUrl ?? null,
    isPremium: false,
    isActive: true,
    likes: 0,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function listShared(
  max: number = 60,
  category?: TemplateCategory,
): Promise<SharedTemplate[]> {
  const q = category
    ? query(
        collection(db, 'shared_templates'),
        where('isActive', '==', true),
        where('category', '==', category),
        orderBy('createdAt', 'desc'),
        limit(max),
      )
    : query(
        collection(db, 'shared_templates'),
        where('isActive', '==', true),
        orderBy('createdAt', 'desc'),
        limit(max),
      );
  const snap = await getDocs(q);
  return snap.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      authorId: data.authorId,
      authorName: data.authorName ?? null,
      nameAr: data.nameAr ?? '',
      nameEn: data.nameEn ?? '',
      category: data.category,
      canvasSize: data.canvasSize,
      isPremium: Boolean(data.isPremium),
      likes: data.likes ?? 0,
      createdAt: data.createdAt?.toMillis?.() ?? Date.now(),
      project: { background: data.background, elements: data.elements ?? [] },
    };
  });
}

export async function unpublish(id: string): Promise<void> {
  await deleteDoc(doc(db, 'shared_templates', id));
}
