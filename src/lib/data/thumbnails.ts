import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { storage } from '@/lib/firebase/client';

export async function uploadThumbnail(
  userId: string,
  projectId: string,
  dataUrl: string,
): Promise<string> {
  const r = ref(storage, `thumbnails/${userId}/${projectId}.jpg`);
  await uploadString(r, dataUrl, 'data_url');
  return getDownloadURL(r);
}
