import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  where,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '@/lib/firebase/client';

export interface CustomFont {
  id: string;
  userId: string;
  family: string;
  url: string;
  format: 'woff2' | 'woff' | 'ttf' | 'otf';
  createdAt: number;
}

const EXTS: Record<string, CustomFont['format']> = {
  woff2: 'woff2',
  woff: 'woff',
  ttf: 'ttf',
  otf: 'otf',
};

export async function uploadCustomFont(
  userId: string,
  file: File,
  family: string,
): Promise<CustomFont> {
  const ext = file.name.split('.').pop()?.toLowerCase() ?? 'ttf';
  const format = EXTS[ext] ?? 'ttf';
  const r = ref(storage, `fonts/${userId}/${Date.now()}-${file.name}`);
  await uploadBytes(r, file);
  const url = await getDownloadURL(r);
  const docRef = await addDoc(collection(db, 'custom_fonts'), {
    userId,
    family,
    url,
    format,
    createdAt: serverTimestamp(),
  });
  return { id: docRef.id, userId, family, url, format, createdAt: Date.now() };
}

export async function listCustomFonts(userId: string): Promise<CustomFont[]> {
  const q = query(
    collection(db, 'custom_fonts'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc'),
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      userId: data.userId,
      family: data.family,
      url: data.url,
      format: data.format,
      createdAt: data.createdAt?.toMillis?.() ?? Date.now(),
    };
  });
}

export async function deleteCustomFont(id: string): Promise<void> {
  await deleteDoc(doc(db, 'custom_fonts', id));
}

const injected = new Set<string>();

export async function registerCustomFont(font: CustomFont): Promise<void> {
  if (injected.has(font.family)) return;
  injected.add(font.family);
  const face = new FontFace(font.family, `url(${font.url}) format('${font.format}')`);
  await face.load();
  document.fonts.add(face);
}
