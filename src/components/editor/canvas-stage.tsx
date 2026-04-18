'use client';

import { useEffect, useRef } from 'react';
import * as fabric from 'fabric';
import { useEditor } from '@/lib/editor/store';
import { applyBackground, elementToFabric } from '@/lib/editor/fabric-sync';

type FabricWithId = fabric.Object & { _elId?: string };

export function CanvasStage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const elements = useEditor((s) => s.elements);
  const background = useEditor((s) => s.background);
  const canvasSize = useEditor((s) => s.canvasSize);
  const zoom = useEditor((s) => s.zoom);
  const select = useEditor((s) => s.select);
  const updateElement = useEditor((s) => s.updateElement);
  const snapshot = useEditor((s) => s.snapshot);
  const removeElement = useEditor((s) => s.removeElement);
  const duplicateElement = useEditor((s) => s.duplicateElement);
  const undo = useEditor((s) => s.undo);
  const redo = useEditor((s) => s.redo);
  const selectedIds = useEditor((s) => s.selectedIds);

  // Init canvas once
  useEffect(() => {
    if (!canvasRef.current) return;
    const c = new fabric.Canvas(canvasRef.current, {
      preserveObjectStacking: true,
      backgroundColor: '#ffffff',
    });
    fabricRef.current = c;
    useEditor.getState().setFabricCanvas(c);

    c.on('selection:created', (e) => {
      select((e.selected ?? []).map((o) => (o as FabricWithId)._elId!).filter(Boolean));
    });
    c.on('selection:updated', (e) => {
      select((e.selected ?? []).map((o) => (o as FabricWithId)._elId!).filter(Boolean));
    });
    c.on('selection:cleared', () => select([]));

    c.on('object:modified', (e) => {
      const o = e.target as FabricWithId | undefined;
      if (!o?._elId) return;
      snapshot();
      updateElement(o._elId, {
        x: o.left ?? 0,
        y: o.top ?? 0,
        width: (o.width ?? 0) * (o.scaleX ?? 1),
        height: (o.height ?? 0) * (o.scaleY ?? 1),
        rotation: ((o.angle ?? 0) * Math.PI) / 180,
      });
    });

    // Pan + zoom
    c.on('mouse:wheel', (opt) => {
      const e = opt.e as WheelEvent;
      let z = c.getZoom();
      z *= 0.999 ** e.deltaY;
      z = Math.min(Math.max(z, 0.1), 4);
      c.zoomToPoint(new fabric.Point(e.offsetX, e.offsetY), z);
      e.preventDefault();
      e.stopPropagation();
    });

    return () => {
      c.dispose();
      fabricRef.current = null;
      useEditor.getState().setFabricCanvas(null);
    };
  }, [select, snapshot, updateElement]);

  // Size + background
  useEffect(() => {
    const c = fabricRef.current;
    const container = containerRef.current;
    if (!c || !container) return;

    const pad = 48;
    const cw = container.clientWidth - pad;
    const ch = container.clientHeight - pad;
    const scale = Math.min(cw / canvasSize.width, ch / canvasSize.height, 1);
    c.setDimensions({
      width: canvasSize.width * scale,
      height: canvasSize.height * scale,
    });
    c.setZoom(scale * zoom);
    applyBackground(c, background);
  }, [canvasSize, background, zoom]);

  // Sync elements
  useEffect(() => {
    const c = fabricRef.current;
    if (!c) return;
    (async () => {
      c.getObjects().forEach((o) => c.remove(o));
      const sorted = [...elements].sort((a, b) => a.zIndex - b.zIndex);
      for (const el of sorted) {
        const obj = await elementToFabric(el);
        if (obj) c.add(obj);
      }
      c.requestRenderAll();
    })();
  }, [elements]);

  // Sync selection
  useEffect(() => {
    const c = fabricRef.current;
    if (!c) return;
    if (selectedIds.length === 0) {
      c.discardActiveObject();
    } else {
      const match = c
        .getObjects()
        .find((o) => selectedIds.includes((o as FabricWithId)._elId ?? ''));
      if (match) c.setActiveObject(match);
    }
    c.requestRenderAll();
  }, [selectedIds]);

  // Keyboard shortcuts
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;

      if ((e.metaKey || e.ctrlKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      } else if (
        ((e.metaKey || e.ctrlKey) && e.key === 'z' && e.shiftKey) ||
        ((e.metaKey || e.ctrlKey) && e.key === 'y')
      ) {
        e.preventDefault();
        redo();
      } else if ((e.metaKey || e.ctrlKey) && e.key === 'd') {
        e.preventDefault();
        selectedIds.forEach(duplicateElement);
      } else if (e.key === 'Delete' || e.key === 'Backspace') {
        if (selectedIds.length) {
          e.preventDefault();
          selectedIds.forEach(removeElement);
        }
      } else if (e.key.startsWith('Arrow') && selectedIds.length) {
        e.preventDefault();
        const d = 1;
        const [id] = selectedIds;
        const el = useEditor.getState().elements.find((x) => x.id === id);
        if (!el) return;
        const dx = e.key === 'ArrowLeft' ? -d : e.key === 'ArrowRight' ? d : 0;
        const dy = e.key === 'ArrowUp' ? -d : e.key === 'ArrowDown' ? d : 0;
        updateElement(id, { x: el.x + dx, y: el.y + dy });
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedIds, undo, redo, duplicateElement, removeElement, updateElement]);

  return (
    <div
      ref={containerRef}
      className="flex-1 flex items-center justify-center bg-[color:var(--muted)] overflow-hidden"
    >
      <canvas ref={canvasRef} className="shadow-lg bg-white" />
    </div>
  );
}
