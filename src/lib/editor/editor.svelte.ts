import { getContext, setContext } from 'svelte';
import type {
  CanvasBackground,
  CanvasElement,
  Project,
  ToolName,
  TextElement,
  ShapeElement,
  ImageElement,
  StickerElement
} from './types';

const KEY = Symbol('betakti-editor');

const MAX_HISTORY = 50;

function clone<T>(v: T): T {
  return $state.snapshot(v) as T;
}

interface ElementsSnapshot {
  elements: CanvasElement[];
  background: CanvasBackground;
  name: string;
  canvasSize: Project['canvasSize'];
}

function snapshot(project: Project): ElementsSnapshot {
  return {
    elements: clone(project.elements),
    background: clone(project.background),
    name: project.name,
    canvasSize: clone(project.canvasSize)
  };
}

function applySnapshot(project: Project, snap: ElementsSnapshot): void {
  project.elements = clone(snap.elements);
  project.background = clone(snap.background);
  project.name = snap.name;
  project.canvasSize = clone(snap.canvasSize);
}

export type Editor = ReturnType<typeof createEditor>;

export function createEditor(initial: Project) {
  const project = $state<Project>(clone(initial));
  const selectedIds = $state<string[]>([]);
  const history = $state<{ stack: ElementsSnapshot[]; index: number }>({
    stack: [snapshot(initial)],
    index: 0
  });
  const ui = $state({
    zoom: 1,
    pan: { x: 0, y: 0 },
    tool: 'select' as ToolName,
    isDirty: false,
    isSaving: false,
    inspectorVisible: true,
    gridVisible: true,
    containerSize: { w: 0, h: 0 }
  });

  function commit(): void {
    const snap = snapshot(project);
    history.stack = history.stack.slice(0, history.index + 1);
    history.stack.push(snap);
    if (history.stack.length > MAX_HISTORY) {
      history.stack.shift();
    } else {
      history.index += 1;
    }
    ui.isDirty = true;
    project.updatedAt = Date.now();
  }

  function undo(): void {
    if (history.index === 0) return;
    history.index -= 1;
    applySnapshot(project, history.stack[history.index]!);
    ui.isDirty = true;
  }

  function redo(): void {
    if (history.index >= history.stack.length - 1) return;
    history.index += 1;
    applySnapshot(project, history.stack[history.index]!);
    ui.isDirty = true;
  }

  function nextZ(): number {
    if (project.elements.length === 0) return 1;
    return Math.max(...project.elements.map((e) => e.zIndex)) + 1;
  }

  function addElement(partial: Omit<CanvasElement, 'zIndex'> & { zIndex?: number }): CanvasElement {
    const el = { ...partial, zIndex: partial.zIndex ?? nextZ() } as CanvasElement;
    project.elements.push(el);
    commit();
    return el;
  }

  function addCentered(partial: Omit<CanvasElement, 'zIndex'> & { zIndex?: number }): CanvasElement {
    const el = { ...partial, zIndex: partial.zIndex ?? nextZ() } as CanvasElement;
    el.x = project.canvasSize.width / 2 - el.width / 2;
    el.y = project.canvasSize.height / 2 - el.height / 2;
    project.elements.push(el);
    commit();
    return el;
  }

  function getElement(id: string): CanvasElement | undefined {
    return project.elements.find((e) => e.id === id);
  }

  function updateElement(id: string, patch: Partial<CanvasElement>, doCommit = true): void {
    const el = project.elements.find((e) => e.id === id);
    if (!el) return;
    Object.assign(el, patch);
    if (doCommit) commit();
    else {
      ui.isDirty = true;
      project.updatedAt = Date.now();
    }
  }

  function updateMany(ids: string[], patch: Partial<CanvasElement>, doCommit = true): void {
    for (const id of ids) updateElement(id, patch, false);
    if (doCommit) commit();
  }

  type AlignEdge = 'left' | 'centerX' | 'right' | 'top' | 'centerY' | 'bottom';

  function alignSelected(edge: AlignEdge): void {
    const els = selectedIds
      .map((id) => project.elements.find((e) => e.id === id))
      .filter((e): e is CanvasElement => !!e);
    if (els.length < 2) return;
    // Align to the group's bounding box
    const minX = Math.min(...els.map((e) => e.x));
    const maxX = Math.max(...els.map((e) => e.x + e.width));
    const minY = Math.min(...els.map((e) => e.y));
    const maxY = Math.max(...els.map((e) => e.y + e.height));
    const groupCx = (minX + maxX) / 2;
    const groupCy = (minY + maxY) / 2;
    for (const el of els) {
      const patch: Partial<CanvasElement> = {};
      if (edge === 'left') patch.x = minX;
      else if (edge === 'right') patch.x = maxX - el.width;
      else if (edge === 'centerX') patch.x = groupCx - el.width / 2;
      else if (edge === 'top') patch.y = minY;
      else if (edge === 'bottom') patch.y = maxY - el.height;
      else if (edge === 'centerY') patch.y = groupCy - el.height / 2;
      updateElement(el.id, patch, false);
    }
    commit();
  }

  function distributeSelected(axis: 'h' | 'v'): void {
    const els = selectedIds
      .map((id) => project.elements.find((e) => e.id === id))
      .filter((e): e is CanvasElement => !!e);
    if (els.length < 3) return;
    if (axis === 'h') {
      els.sort((a, b) => a.x + a.width / 2 - (b.x + b.width / 2));
      const first = els[0]!;
      const last = els[els.length - 1]!;
      const firstCx = first.x + first.width / 2;
      const lastCx = last.x + last.width / 2;
      const step = (lastCx - firstCx) / (els.length - 1);
      for (let i = 1; i < els.length - 1; i++) {
        const el = els[i]!;
        const targetCx = firstCx + step * i;
        updateElement(el.id, { x: targetCx - el.width / 2 }, false);
      }
    } else {
      els.sort((a, b) => a.y + a.height / 2 - (b.y + b.height / 2));
      const first = els[0]!;
      const last = els[els.length - 1]!;
      const firstCy = first.y + first.height / 2;
      const lastCy = last.y + last.height / 2;
      const step = (lastCy - firstCy) / (els.length - 1);
      for (let i = 1; i < els.length - 1; i++) {
        const el = els[i]!;
        const targetCy = firstCy + step * i;
        updateElement(el.id, { y: targetCy - el.height / 2 }, false);
      }
    }
    commit();
  }

  function deleteElements(ids: string[]): void {
    project.elements = project.elements.filter((e) => !ids.includes(e.id));
    for (let i = selectedIds.length - 1; i >= 0; i--) {
      if (ids.includes(selectedIds[i]!)) selectedIds.splice(i, 1);
    }
    commit();
  }

  function duplicateElements(ids: string[]): CanvasElement[] {
    const out: CanvasElement[] = [];
    for (const id of ids) {
      const el = project.elements.find((e) => e.id === id);
      if (!el) continue;
      const copy = clone(el);
      copy.id = crypto.randomUUID();
      copy.x += 30;
      copy.y += 30;
      copy.zIndex = nextZ();
      project.elements.push(copy);
      out.push(copy);
    }
    if (out.length) {
      selectedIds.splice(0, selectedIds.length, ...out.map((e) => e.id));
      commit();
    }
    return out;
  }

  function selectOnly(id: string | null): void {
    selectedIds.splice(0, selectedIds.length);
    if (id) selectedIds.push(id);
  }

  function toggleSelect(id: string): void {
    const i = selectedIds.indexOf(id);
    if (i >= 0) selectedIds.splice(i, 1);
    else selectedIds.push(id);
  }

  function clearSelection(): void {
    selectedIds.splice(0, selectedIds.length);
  }

  function selectAll(): void {
    selectedIds.splice(
      0,
      selectedIds.length,
      ...project.elements.filter((e) => e.isVisible && !e.isLocked).map((e) => e.id)
    );
  }

  function moveBy(dx: number, dy: number, doCommit = true): void {
    for (const id of selectedIds) {
      const el = project.elements.find((e) => e.id === id);
      if (!el || el.isLocked) continue;
      el.x += dx;
      el.y += dy;
    }
    if (doCommit) commit();
    else ui.isDirty = true;
  }

  function setPosition(id: string, x: number, y: number, doCommit = true): void {
    updateElement(id, { x, y } as Partial<CanvasElement>, doCommit);
  }

  function setSize(id: string, width: number, height: number, doCommit = true): void {
    updateElement(id, { width, height } as Partial<CanvasElement>, doCommit);
  }

  function setRotation(id: string, rotation: number, doCommit = true): void {
    updateElement(id, { rotation } as Partial<CanvasElement>, doCommit);
  }

  function reorderTo(id: string, newIndex: number): void {
    const sorted = [...project.elements].sort((a, b) => a.zIndex - b.zIndex);
    const currentIndex = sorted.findIndex((e) => e.id === id);
    if (currentIndex < 0) return;
    const [moved] = sorted.splice(currentIndex, 1);
    sorted.splice(newIndex, 0, moved!);
    sorted.forEach((e, i) => {
      e.zIndex = i + 1;
    });
    commit();
  }

  function bringForward(id: string): void {
    const sorted = [...project.elements].sort((a, b) => a.zIndex - b.zIndex);
    const i = sorted.findIndex((e) => e.id === id);
    if (i < 0 || i === sorted.length - 1) return;
    reorderTo(id, i + 1);
  }

  function sendBackward(id: string): void {
    const sorted = [...project.elements].sort((a, b) => a.zIndex - b.zIndex);
    const i = sorted.findIndex((e) => e.id === id);
    if (i <= 0) return;
    reorderTo(id, i - 1);
  }

  function bringToFront(id: string): void {
    reorderTo(id, project.elements.length - 1);
  }

  function sendToBack(id: string): void {
    reorderTo(id, 0);
  }

  function setBackground(bg: CanvasBackground): void {
    project.background = bg;
    commit();
  }

  function setZoom(z: number): void {
    ui.zoom = Math.max(0.1, Math.min(8, z));
  }

  function setPan(x: number, y: number): void {
    ui.pan = { x, y };
  }

  function setTool(t: ToolName): void {
    ui.tool = t;
  }

  function setName(name: string): void {
    project.name = name;
    commit();
  }

  function fitToScreen(containerSize?: { w: number; h: number }): void {
    const box = containerSize ?? ui.containerSize;
    if (!box.w || !box.h) return;
    const padding = 80;
    const zw = (box.w - padding) / project.canvasSize.width;
    const zh = (box.h - padding) / project.canvasSize.height;
    const z = Math.min(zw, zh, 1);
    ui.zoom = z;
    ui.pan = { x: 0, y: 0 };
  }

  function toggleInspector(): void {
    ui.inspectorVisible = !ui.inspectorVisible;
  }

  return {
    get project() {
      return project;
    },
    get selectedIds() {
      return selectedIds;
    },
    get ui() {
      return ui;
    },
    get history() {
      return history;
    },
    canUndo: () => history.index > 0,
    canRedo: () => history.index < history.stack.length - 1,
    markSaved: () => {
      ui.isDirty = false;
    },
    setSaving: (v: boolean) => {
      ui.isSaving = v;
    },
    addElement,
    addCentered,
    updateElement,
    updateMany,
    alignSelected,
    distributeSelected,
    getElement,
    deleteElements,
    duplicateElements,
    selectOnly,
    toggleSelect,
    clearSelection,
    selectAll,
    moveBy,
    setPosition,
    setSize,
    setRotation,
    reorderTo,
    bringForward,
    sendBackward,
    bringToFront,
    sendToBack,
    setBackground,
    setZoom,
    setPan,
    setTool,
    setName,
    fitToScreen,
    toggleInspector,
    undo,
    redo,
    commit
  };
}

export function provideEditor(editor: Editor): Editor {
  return setContext(KEY, editor);
}

export function getEditor(): Editor {
  const e = getContext<Editor | undefined>(KEY);
  if (!e) throw new Error('Editor context not found');
  return e;
}

export function createTextElement(partial: Partial<TextElement> = {}): TextElement {
  return {
    id: crypto.randomUUID(),
    type: 'text',
    x: 100,
    y: 100,
    width: 400,
    height: 80,
    rotation: 0,
    isLocked: false,
    isVisible: true,
    zIndex: 1,
    text: 'اكتب هنا',
    fontFamily: 'IBM Plex Sans Arabic',
    fontSize: 48,
    color: '#111111',
    isBold: false,
    isItalic: false,
    isUnderline: false,
    textAlignment: 'center',
    letterSpacing: 0,
    lineHeight: 1.3,
    opacity: 1,
    ...partial
  };
}

export function createShapeElement(partial: Partial<ShapeElement> = {}): ShapeElement {
  return {
    id: crypto.randomUUID(),
    type: 'shape',
    x: 200,
    y: 200,
    width: 200,
    height: 200,
    rotation: 0,
    isLocked: false,
    isVisible: true,
    zIndex: 1,
    shapeType: 'rectangle',
    fillColor: '#5b46f6',
    strokeWidth: 0,
    cornerRadius: 0,
    opacity: 1,
    ...partial
  };
}

export function createImageElement(partial: Partial<ImageElement> & { imageSrc: string }): ImageElement {
  return {
    id: crypto.randomUUID(),
    type: 'image',
    x: 100,
    y: 100,
    width: 400,
    height: 400,
    rotation: 0,
    isLocked: false,
    isVisible: true,
    zIndex: 1,
    fit: 'cover',
    opacity: 1,
    cornerRadius: 0,
    flipHorizontal: false,
    flipVertical: false,
    cropTop: 0,
    cropBottom: 0,
    cropLeft: 0,
    cropRight: 0,
    cropShape: 'none',
    brightness: 0,
    contrast: 0,
    saturation: 0,
    ...partial
  };
}

export function createStickerElement(partial: Partial<StickerElement> = {}): StickerElement {
  return {
    id: crypto.randomUUID(),
    type: 'sticker',
    x: 200,
    y: 200,
    width: 160,
    height: 160,
    rotation: 0,
    isLocked: false,
    isVisible: true,
    zIndex: 1,
    stickerType: 'emoji',
    content: '✨',
    opacity: 1,
    flipHorizontal: false,
    flipVertical: false,
    ...partial
  };
}
