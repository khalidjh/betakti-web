'use client';

import { create } from 'zustand';
import type {
  CanvasBackground,
  CanvasElement,
  CanvasSize,
  Project,
} from '@/lib/types/canvas';

interface Snapshot {
  background: CanvasBackground;
  elements: CanvasElement[];
}

interface EditorState {
  projectId: string | null;
  name: string;
  canvasSize: CanvasSize;
  background: CanvasBackground;
  elements: CanvasElement[];
  selectedIds: string[];
  zoom: number;
  past: Snapshot[];
  future: Snapshot[];
  dirty: boolean;
}

interface EditorActions {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fabricCanvas: any | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setFabricCanvas: (c: any | null) => void;
  loadProject: (p: Project) => void;
  setName: (name: string) => void;
  setBackground: (bg: CanvasBackground) => void;
  addElement: (el: CanvasElement) => void;
  updateElement: (id: string, patch: Partial<CanvasElement>) => void;
  removeElement: (id: string) => void;
  duplicateElement: (id: string) => void;
  reorderLayer: (id: string, to: 'front' | 'back' | 'forward' | 'backward') => void;
  toggleLocked: (id: string) => void;
  toggleVisible: (id: string) => void;
  select: (ids: string[]) => void;
  setZoom: (z: number) => void;
  undo: () => void;
  redo: () => void;
  snapshot: () => void;
  markClean: () => void;
  // Apply a remote snapshot without pushing to history/dirty.
  applyRemote: (patch: { elements?: CanvasElement[]; background?: CanvasBackground; name?: string }) => void;
}

export type EditorStore = EditorState & EditorActions;

const DEFAULT_SIZE: CanvasSize = {
  id: 'square',
  nameAr: 'بوست مربع',
  nameEn: 'Square Post',
  width: 1080,
  height: 1080,
};

const HISTORY_LIMIT = 50;

function take(state: EditorState): Snapshot {
  return {
    background: structuredClone(state.background),
    elements: structuredClone(state.elements),
  };
}

export const useEditor = create<EditorStore>((set, get) => ({
  projectId: null,
  name: 'تصميم جديد',
  canvasSize: DEFAULT_SIZE,
  background: { type: 'color', color: '#ffffff' },
  elements: [],
  selectedIds: [],
  zoom: 1,
  past: [],
  future: [],
  dirty: false,
  fabricCanvas: null,
  setFabricCanvas: (c) => set({ fabricCanvas: c }),

  loadProject: (p) =>
    set({
      projectId: p.id,
      name: p.name,
      canvasSize: p.canvasSize,
      background: p.background,
      elements: p.elements,
      selectedIds: [],
      past: [],
      future: [],
      dirty: false,
    }),

  setName: (name) => set({ name, dirty: true }),

  snapshot: () => {
    const s = get();
    const past = [...s.past, take(s)];
    if (past.length > HISTORY_LIMIT) past.shift();
    set({ past, future: [] });
  },

  setBackground: (background) => {
    get().snapshot();
    set({ background, dirty: true });
  },

  addElement: (el) => {
    get().snapshot();
    set((s) => ({
      elements: [...s.elements, { ...el, zIndex: s.elements.length }],
      selectedIds: [el.id],
      dirty: true,
    }));
  },

  updateElement: (id, patch) => {
    set((s) => ({
      elements: s.elements.map((e) =>
        e.id === id ? ({ ...e, ...patch } as CanvasElement) : e,
      ),
      dirty: true,
    }));
  },

  removeElement: (id) => {
    get().snapshot();
    set((s) => ({
      elements: s.elements.filter((e) => e.id !== id),
      selectedIds: s.selectedIds.filter((x) => x !== id),
      dirty: true,
    }));
  },

  duplicateElement: (id) => {
    get().snapshot();
    set((s) => {
      const el = s.elements.find((e) => e.id === id);
      if (!el) return s;
      const copy: CanvasElement = {
        ...structuredClone(el),
        id: crypto.randomUUID(),
        x: el.x + 30,
        y: el.y + 30,
        zIndex: s.elements.length,
      };
      return {
        ...s,
        elements: [...s.elements, copy],
        selectedIds: [copy.id],
        dirty: true,
      };
    });
  },

  reorderLayer: (id, to) => {
    get().snapshot();
    set((s) => {
      const ordered = [...s.elements].sort((a, b) => a.zIndex - b.zIndex);
      const idx = ordered.findIndex((e) => e.id === id);
      if (idx === -1) return s;
      const [item] = ordered.splice(idx, 1);
      if (to === 'front') ordered.push(item);
      else if (to === 'back') ordered.unshift(item);
      else if (to === 'forward')
        ordered.splice(Math.min(idx + 1, ordered.length), 0, item);
      else ordered.splice(Math.max(idx - 1, 0), 0, item);
      return {
        ...s,
        elements: ordered.map((e, i) => ({ ...e, zIndex: i })),
        dirty: true,
      };
    });
  },

  toggleLocked: (id) =>
    set((s) => ({
      elements: s.elements.map((e) =>
        e.id === id ? { ...e, isLocked: !e.isLocked } : e,
      ),
      dirty: true,
    })),

  toggleVisible: (id) =>
    set((s) => ({
      elements: s.elements.map((e) =>
        e.id === id ? { ...e, isVisible: !e.isVisible } : e,
      ),
      dirty: true,
    })),

  select: (ids) => set({ selectedIds: ids }),

  setZoom: (zoom) => set({ zoom }),

  undo: () =>
    set((s) => {
      if (s.past.length === 0) return s;
      const prev = s.past[s.past.length - 1];
      return {
        ...s,
        past: s.past.slice(0, -1),
        future: [take(s), ...s.future],
        background: prev.background,
        elements: prev.elements,
        dirty: true,
      };
    }),

  redo: () =>
    set((s) => {
      if (s.future.length === 0) return s;
      const next = s.future[0];
      return {
        ...s,
        future: s.future.slice(1),
        past: [...s.past, take(s)],
        background: next.background,
        elements: next.elements,
        dirty: true,
      };
    }),

  markClean: () => set({ dirty: false }),

  applyRemote: (patch) =>
    set((s) => ({
      elements: patch.elements ?? s.elements,
      background: patch.background ?? s.background,
      name: patch.name ?? s.name,
    })),
}));
