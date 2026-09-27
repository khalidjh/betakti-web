import type { Editor } from './editor.svelte';
import type { CanvasElement, ToolName } from './types';

export interface ShortcutOptions {
  onSave: () => void;
  onExport: () => void;
  onToggleShortcuts: () => void;
}

let clipboard: CanvasElement[] = [];

function isInputTarget(t: EventTarget | null): boolean {
  if (!t || !(t instanceof HTMLElement)) return false;
  return t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable;
}

export function attachShortcuts(editor: Editor, opts: ShortcutOptions): () => void {
  function onKeyDown(e: KeyboardEvent): void {
    if (isInputTarget(e.target)) return;
    const mod = e.metaKey || e.ctrlKey;

    if (mod && e.key.toLowerCase() === 'z' && !e.shiftKey) {
      e.preventDefault();
      editor.undo();
      return;
    }
    if (mod && e.shiftKey && e.key.toLowerCase() === 'z') {
      e.preventDefault();
      editor.redo();
      return;
    }
    if (mod && e.key.toLowerCase() === 'y') {
      e.preventDefault();
      editor.redo();
      return;
    }
    if (mod && e.key.toLowerCase() === 'a') {
      e.preventDefault();
      editor.selectAll();
      return;
    }
    if (mod && e.key.toLowerCase() === 's') {
      e.preventDefault();
      opts.onSave();
      return;
    }
    if (mod && e.key.toLowerCase() === 'e') {
      e.preventDefault();
      opts.onExport();
      return;
    }
    if (mod && e.key.toLowerCase() === 'c') {
      clipboard = editor.selectedIds
        .map((id) => editor.getElement(id))
        .filter((e): e is CanvasElement => !!e)
        .map((el) => structuredClone(el));
      return;
    }
    if (mod && e.key.toLowerCase() === 'v') {
      if (clipboard.length === 0) return;
      e.preventDefault();
      for (const el of clipboard) {
        const copy = structuredClone(el);
        copy.id = crypto.randomUUID();
        copy.x += 30;
        copy.y += 30;
        editor.addElement(copy);
      }
      return;
    }
    if (mod && e.key.toLowerCase() === 'd') {
      e.preventDefault();
      editor.duplicateElements(editor.selectedIds);
      return;
    }
    if (e.key === 'Delete' || e.key === 'Backspace') {
      if (editor.selectedIds.length) {
        e.preventDefault();
        editor.deleteElements([...editor.selectedIds]);
      }
      return;
    }
    if (e.key === 'Escape') {
      editor.clearSelection();
      return;
    }
    if (e.key === ']') {
      editor.toggleInspector();
      return;
    }
    if (e.key === '?') {
      opts.onToggleShortcuts();
      return;
    }
    if (e.key === 'f' || e.key === 'F') {
      editor.fitToScreen();
      return;
    }
    const toolMap: Record<string, ToolName> = {
      v: 'select',
      t: 'text',
      s: 'shape',
      i: 'image',
      k: 'sticker',
      b: 'background'
    };
    const tool = toolMap[e.key.toLowerCase()];
    if (tool && !mod) {
      editor.setTool(tool);
      return;
    }
    if (
      e.key === 'ArrowLeft' ||
      e.key === 'ArrowRight' ||
      e.key === 'ArrowUp' ||
      e.key === 'ArrowDown'
    ) {
      if (!editor.selectedIds.length) return;
      e.preventDefault();
      const step = e.shiftKey ? 10 : 1;
      const dx = e.key === 'ArrowLeft' ? -step : e.key === 'ArrowRight' ? step : 0;
      const dy = e.key === 'ArrowUp' ? -step : e.key === 'ArrowDown' ? step : 0;
      editor.moveBy(dx, dy, true);
    }
  }

  window.addEventListener('keydown', onKeyDown);
  return () => window.removeEventListener('keydown', onKeyDown);
}
