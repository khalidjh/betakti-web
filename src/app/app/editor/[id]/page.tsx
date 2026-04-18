'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
// useRef used for autosave timer
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowLeft, Download, Redo2, Save, Share2, Undo2, ZoomIn, ZoomOut } from 'lucide-react';
import { toast } from 'sonner';
import { CanvasStage } from '@/components/editor/canvas-stage';
import { LeftPanel } from '@/components/editor/left-panel';
import { RightPanel } from '@/components/editor/right-panel';
import { ExportDialog } from '@/components/editor/export-dialog';
import { PublishDialog } from '@/components/editor/publish-dialog';
import { PresenceLayer } from '@/components/editor/presence-layer';
import { Button } from '@/components/ui/button';
import { useEditor } from '@/lib/editor/store';
import { getProject, updateProject } from '@/lib/data/projects';
import { useAuth } from '@/lib/auth/context';
import { getUserDoc } from '@/lib/data/users';
import { generateThumbnail } from '@/lib/editor/export';
import { uploadThumbnail } from '@/lib/data/thumbnails';
import { subscribeProject } from '@/lib/editor/collab';

export default function EditorPage() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const { user, loading } = useAuth();

  const loadProject = useEditor((s) => s.loadProject);
  const applyRemote = useEditor((s) => s.applyRemote);
  const setName = useEditor((s) => s.setName);
  const name = useEditor((s) => s.name);
  const undo = useEditor((s) => s.undo);
  const redo = useEditor((s) => s.redo);
  const zoom = useEditor((s) => s.zoom);
  const setZoom = useEditor((s) => s.setZoom);
  const dirty = useEditor((s) => s.dirty);
  const markClean = useEditor((s) => s.markClean);
  const background = useEditor((s) => s.background);
  const elements = useEditor((s) => s.elements);
  const canvasSize = useEditor((s) => s.canvasSize);

  const [isPro, setIsPro] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [showPublish, setShowPublish] = useState(false);
  const [saving, setSaving] = useState(false);
  const autosaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.push('/auth/login');
      return;
    }
    (async () => {
      const p = await getProject(id);
      if (!p) {
        toast.error('Project not found');
        router.push('/app/projects');
        return;
      }
      loadProject(p);
      const u = await getUserDoc(user.uid);
      setIsPro(u?.subscription.tier === 'pro');
    })();
  }, [id, user, loading, router, loadProject]);

  // Live remote sync: apply other users' writes (skip our own).
  useEffect(() => {
    if (!user) return;
    return subscribeProject(id, (remote) => {
      if (!remote) return;
      if (remote.updatedBy === user.uid) return;
      if (useEditor.getState().dirty) return; // don't stomp local unsaved edits
      applyRemote({
        elements: remote.elements,
        background: remote.background,
        name: remote.name,
      });
    });
  }, [id, user, applyRemote]);

  const fabricCanvas = useEditor((s) => s.fabricCanvas);

  const save = useCallback(async () => {
    if (!user) return;
    setSaving(true);
    try {
      let thumbnailUrl: string | undefined;
      if (fabricCanvas) {
        try {
          const thumbData = await generateThumbnail(fabricCanvas, 512);
          thumbnailUrl = await uploadThumbnail(user.uid, id, thumbData);
        } catch {
          /* thumbnail failures are non-fatal */
        }
      }
      await updateProject(id, {
        userId: user.uid,
        name,
        canvasSize,
        background,
        elements,
        updatedBy: user.uid,
        ...(thumbnailUrl ? { thumbnailUrl } : {}),
      });
      markClean();
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setSaving(false);
    }
  }, [id, user, name, canvasSize, background, elements, markClean, fabricCanvas]);

  // Auto-save: debounce 30s after last change
  useEffect(() => {
    if (!dirty) return;
    if (autosaveTimer.current) clearTimeout(autosaveTimer.current);
    autosaveTimer.current = setTimeout(save, 30_000);
    return () => {
      if (autosaveTimer.current) clearTimeout(autosaveTimer.current);
    };
  }, [dirty, save]);

  // Ctrl+S
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        save();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [save]);

  return (
    <div className="fixed inset-0 flex flex-col bg-[color:var(--background)]">
      {/* Top bar */}
      <div className="h-14 border-b border-[color:var(--border)] flex items-center gap-2 px-3 shrink-0">
        <Link href="/app/home" className="p-2 rounded hover:bg-[color:var(--muted)]">
          <ArrowLeft size={18} />
        </Link>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-transparent text-sm font-medium outline-none border-b border-transparent focus:border-[color:var(--border)] px-1"
        />
        <span className="text-xs text-[color:var(--muted-foreground)]">
          {saving ? '…' : dirty ? '•' : '✓'}
        </span>
        <div className="flex-1" />
        <PresenceLayer projectId={id} />
        <Button variant="ghost" size="sm" onClick={undo} title="Undo">
          <Undo2 size={16} />
        </Button>
        <Button variant="ghost" size="sm" onClick={redo} title="Redo">
          <Redo2 size={16} />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => setZoom(Math.max(0.25, zoom - 0.1))}>
          <ZoomOut size={16} />
        </Button>
        <span className="text-xs w-10 text-center">{Math.round(zoom * 100)}%</span>
        <Button variant="ghost" size="sm" onClick={() => setZoom(Math.min(3, zoom + 0.1))}>
          <ZoomIn size={16} />
        </Button>
        <Button variant="ghost" size="sm" onClick={save} disabled={saving}>
          <Save size={16} />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => setShowPublish(true)} title="Publish">
          <Share2 size={16} />
        </Button>
        <Button size="sm" onClick={() => setShowExport(true)}>
          <Download size={16} />
          {t('editor.export')}
        </Button>
      </div>

      {/* Body */}
      <div className="flex-1 flex min-h-0">
        <LeftPanel />
        <CanvasStage />
        <RightPanel />
      </div>

      {showPublish && user && (
        <PublishDialog
          project={{
            id,
            userId: user.uid,
            name,
            canvasSize,
            background,
            elements,
            createdAt: Date.now(),
            updatedAt: Date.now(),
          }}
          authorName={user.displayName}
          onClose={() => setShowPublish(false)}
        />
      )}

      {showExport && (
        <ExportDialog
          canvas={fabricCanvas}
          elements={elements}
          onClose={() => setShowExport(false)}
          isPro={isPro}
          projectName={name}
        />
      )}

      <p className="sr-only">{locale}</p>
    </div>
  );
}
