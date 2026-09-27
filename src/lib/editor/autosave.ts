import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { db, storage, auth } from '$lib/firebase/client';
import { uploadInlineImages } from './assets';
import type { Editor } from './editor.svelte';
import type { Project } from './types';

export interface AutosaveHandle {
  stop: () => void;
  saveNow: () => Promise<void>;
  setProjectId: (id: string) => void;
}

type ExportFn = (pixelRatio: number, withWatermark: boolean) => Promise<string>;

interface Options {
  editor: Editor;
  getExport: () => ExportFn | null;
  onSaved?: (project: Project) => void;
  onFirstCreate?: (newId: string) => void;
  onPermissionDenied?: () => void;
  /**
   * The write was rejected as too large — in practice, images that couldn't be
   * hoisted into Storage and rode along inline instead.
   */
  onTooLarge?: () => void;
}

const INTERVAL_MS = 30_000;
const DEBOUNCE_MS = 2_000;

function projectToFirestore(project: Project): Record<string, unknown> {
  return {
    id: project.id,
    userId: project.userId,
    name: project.name,
    canvasSize: project.canvasSize,
    background: project.background,
    elements: project.elements,
    groups: project.groups ?? [],
    thumbnailUrl: project.thumbnailUrl ?? null,
    createdAt: Timestamp.fromMillis(project.createdAt),
    updatedAt: Timestamp.fromMillis(project.updatedAt)
  };
}

export function startAutosave(opts: Options): AutosaveHandle {
  let timer: ReturnType<typeof setInterval> | null = null;
  let debounceTimer: ReturnType<typeof setTimeout> | null = null;
  let stopped = false;
  let lastSnapshot = JSON.stringify(opts.editor.project);

  async function generateThumbnail(): Promise<string | null> {
    const exp = opts.getExport();
    if (!exp) return null;
    try {
      const dataUrl = await exp(0.4, false);
      const id = opts.editor.project.id;
      const sref = ref(storage, `thumbnails/${id}.png`);
      await uploadString(sref, dataUrl, 'data_url');
      return await getDownloadURL(sref);
    } catch {
      return null;
    }
  }

  async function saveNow(): Promise<void> {
    if (stopped) return;
    const project = opts.editor.project;
    if (!opts.editor.ui.isDirty) return;
    // No signed-in client SDK → Firestore would reject. Skip silently and let
    // the UI show a "login to save" hint instead of spamming errors.
    if (!auth.currentUser) return;
    opts.editor.setSaving(true);
    const wasNew = project.id === 'new';
    const newId = wasNew ? crypto.randomUUID() : project.id;
    const uid = auth.currentUser.uid;
    // Realign userId with the actual signed-in client uid. Without this, the
    // project might carry a stale uid (different account from server cookie,
    // template author's uid, etc.) and Firestore rules reject the write.
    if (project.userId !== uid) project.userId = uid;
    try {
      // Before anything else: a project carrying inline image bytes is over the
      // 1 MiB document limit long before it looks big, and the write would fail
      // wholesale. Hoist them into Storage first.
      await uploadInlineImages(project);
      const thumb = await generateThumbnail();
      if (thumb) project.thumbnailUrl = thumb;
      const payload = { ...projectToFirestore(project), id: newId, userId: uid };
      await setDoc(doc(db, 'projects', newId), payload, { merge: true });
      // Only mutate the URL / project id after the write actually succeeds.
      if (wasNew) {
        project.id = newId;
        opts.onFirstCreate?.(newId);
      }
      opts.editor.markSaved();
      lastSnapshot = JSON.stringify(project);
      opts.onSaved?.(project);
    } catch (err) {
      const code = (err as { code?: string } | null)?.code ?? '';
      if (code === 'permission-denied') {
        console.error('autosave: permission denied — client Firebase auth not signed in', err);
        opts.onPermissionDenied?.();
      } else if (code === 'invalid-argument' || /longer than.*bytes|maximum size/i.test(String(err))) {
        // Firestore caps a document at 1 MiB and rejects the whole write. The
        // only realistic way to get here now is an image that failed to upload,
        // so the project still carries its bytes inline.
        console.error('autosave: document too large — inline images still present', err);
        opts.onTooLarge?.();
      } else {
        console.error('autosave failed', err);
      }
    } finally {
      opts.editor.setSaving(false);
    }
  }

  timer = setInterval(() => {
    void saveNow();
  }, INTERVAL_MS);

  // Debounce: watch for changes, save after 2s idle.
  const unwatch = setInterval(() => {
    const current = JSON.stringify(opts.editor.project);
    if (current !== lastSnapshot) {
      lastSnapshot = current;
      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        void saveNow();
      }, DEBOUNCE_MS);
    }
  }, 500);

  return {
    stop: () => {
      stopped = true;
      if (timer) clearInterval(timer);
      if (debounceTimer) clearTimeout(debounceTimer);
      clearInterval(unwatch);
    },
    saveNow,
    setProjectId: (id: string) => {
      opts.editor.project.id = id;
    }
  };
}
