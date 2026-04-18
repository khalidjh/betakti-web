import {
  collection,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
  doc,
} from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import {
  CANVAS_SIZES,
  type CanvasSize,
  type DesignTemplate,
  type TemplateCategory,
} from '@/lib/types/canvas';

function resolveCanvasSize(id: string | undefined): CanvasSize {
  return CANVAS_SIZES.find((c) => c.id === id) ?? CANVAS_SIZES[1]; // default: square
}

function toTemplate(id: string, d: Record<string, unknown>): DesignTemplate {
  return {
    id,
    nameAr: (d.nameAr as string) ?? '',
    nameEn: (d.nameEn as string) ?? '',
    category: (d.category as TemplateCategory) ?? 'quotes',
    canvasSize: resolveCanvasSize(d.canvasSizeId as string),
    isPremium: Boolean(d.isPremium),
    section: d.section as string | undefined,
    sectionAr: d.sectionAr as string | undefined,
    sectionEn: d.sectionEn as string | undefined,
    sortOrder: (d.sortOrder as number) ?? 0,
    isActive: d.isActive !== false,
    project: {
      background: (d.background as DesignTemplate['project']['background']) ?? {
        type: 'color',
        color: '#ffffff',
      },
      elements: (d.elements as DesignTemplate['project']['elements']) ?? [],
    },
  };
}

export async function listTemplatesByCategory(
  category: TemplateCategory,
  max: number = 30,
): Promise<DesignTemplate[]> {
  const q = query(
    collection(db, 'dynamic_templates'),
    where('category', '==', category),
    where('isActive', '==', true),
    orderBy('sortOrder', 'asc'),
    limit(max),
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => toTemplate(d.id, d.data()));
}

export async function listTemplatesBySection(
  section: string,
  max: number = 30,
): Promise<DesignTemplate[]> {
  const q = query(
    collection(db, 'dynamic_templates'),
    where('section', '==', section),
    where('isActive', '==', true),
    orderBy('sortOrder', 'asc'),
    limit(max),
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => toTemplate(d.id, d.data()));
}

export async function listAllActiveTemplates(
  max: number = 100,
): Promise<DesignTemplate[]> {
  const q = query(
    collection(db, 'dynamic_templates'),
    where('isActive', '==', true),
    orderBy('sortOrder', 'asc'),
    limit(max),
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => toTemplate(d.id, d.data()));
}

export async function getTemplate(id: string): Promise<DesignTemplate | null> {
  const snap = await getDoc(doc(db, 'dynamic_templates', id));
  if (!snap.exists()) return null;
  return toTemplate(snap.id, snap.data());
}

export interface HomeSection {
  id: string;
  title: string;
  titleAr: string;
  titleEn: string;
  type: string;
  sortOrder: number;
  isActive: boolean;
}

export async function listHomeSections(): Promise<HomeSection[]> {
  const q = query(
    collection(db, 'home_sections'),
    where('isActive', '==', true),
    orderBy('sortOrder', 'asc'),
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      title: data.title ?? '',
      titleAr: data.titleAr ?? '',
      titleEn: data.titleEn ?? '',
      type: data.type ?? '',
      sortOrder: data.sortOrder ?? 0,
      isActive: data.isActive !== false,
    };
  });
}
