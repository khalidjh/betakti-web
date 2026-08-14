import { getContext, setContext } from 'svelte';
import { compare, applyPatch, type Operation } from 'fast-json-patch';
import type {
  CanvasBackground,
  CanvasElement,
  CanvasGroup,
  Project,
  ToolName,
  TextElement,
  ShapeElement,
  ImageElement,
  StickerElement
} from './types';

const KEY = Symbol('betakti-editor');

// Each step costs a diff rather than a copy of the whole document, so we can
// afford far more of them than the old snapshot stack could.
const MAX_HISTORY = 200;

function clone<T>(v: T): T {
  return $state.snapshot(v) as T;
}

/** The slice of the project that undo/redo restores. */
interface TrackedState {
  elements: CanvasElement[];
  groups: CanvasGroup[];
  background: CanvasBackground;
  name: string;
  canvasSize: Project['canvasSize'];
}

interface HistoryEntry {
  /** Ops that move the document back one step. */
  undo: Operation[];
  /** Ops that move it forward again. */
  redo: Operation[];
}

function tracked(project: Project): TrackedState {
  return {
    elements: clone(project.elements),
    groups: clone(project.groups),
    background: clone(project.background),
    name: project.name,
    canvasSize: clone(project.canvasSize)
  };
}

export type Editor = ReturnType<typeof createEditor>;

export function createEditor(initial: Project) {
  const initialProject = clone(initial);
  // Projects saved before groups existed (and everything the Flutter app
  // writes) have no `groups` field.
  if (!Array.isArray(initialProject.groups)) initialProject.groups = [];
  const project = $state<Project>(initialProject);
  const selectedIds = $state<string[]>([]);
  // Plain, non-reactive mirror of the last committed state. Diffing the live
  // project against it is what turns an edit into a pair of patches.
  let baseline: TrackedState = tracked(project);
  // The patch log itself stays out of $state: nothing renders it, and letting
  // Svelte deep-proxy hundreds of op arrays would both cost more than the
  // patches save and break structuredClone (it throws on a Proxy). Only the two
  // numbers the toolbar reads are reactive.
  const entries: HistoryEntry[] = [];
  const history = $state<{ index: number; length: number }>({ index: 0, length: 0 });
  const ui = $state({
    zoom: 1,
    pan: { x: 0, y: 0 },
    tool: 'select' as ToolName,
    isDirty: false,
    isSaving: false,
    inspectorVisible: true,
    gridVisible: true,
    snapEnabled: true,
    containerSize: { w: 0, h: 0 }
  });

  /**
   * Replay ops onto both the live project and the baseline mirror.
   *
   * Stored ops get replayed many times across a session, and their `value`
   * objects would otherwise end up shared between the reactive project, the
   * plain baseline, and the history entry itself — a write through any one of
   * them would silently corrupt the others. Hence a fresh clone per target.
   */
  function applyOps(ops: Operation[]): void {
    if (ops.length === 0) return;
    applyPatch(project, structuredClone(ops), false, true);
    applyPatch(baseline, structuredClone(ops), false, true);
  }

  function commit(): void {
    const current = tracked(project);
    const redoOps = compare(baseline, current);
    // Callers commit defensively (gesture end, inspector blur); an edit that
    // changed nothing shouldn't cost an undo step.
    if (redoOps.length === 0) return;
    const undoOps = compare(current, baseline);

    if (history.index < entries.length) entries.length = history.index;
    entries.push({ undo: undoOps, redo: redoOps });
    // Dropping the oldest entry keeps index pointing at the same position.
    if (entries.length > MAX_HISTORY) entries.shift();
    else history.index += 1;
    history.length = entries.length;

    baseline = current;
    ui.isDirty = true;
    project.updatedAt = Date.now();
  }

  function undo(): void {
    if (history.index === 0) return;
    applyOps(entries[history.index - 1]!.undo);
    history.index -= 1;
    ui.isDirty = true;
  }

  function redo(): void {
    if (history.index >= entries.length) return;
    applyOps(entries[history.index]!.redo);
    history.index += 1;
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

  // ---------------------------------------------------------------------------
  // Groups
  //
  // Membership is a flat `groupId` tag rather than a nested tree, so the stored
  // document stays readable by the Flutter app (see BaseElement.groupId).
  // Children always hold absolute coordinates; a group has no transform of its
  // own, it is purely a selection and ordering concept.
  // ---------------------------------------------------------------------------

  function getGroup(id: string | undefined): CanvasGroup | undefined {
    if (!id) return undefined;
    return project.groups.find((g) => g.id === id);
  }

  /** Outermost group containing an element, walking nesting upwards. */
  function rootGroupIdOf(elementId: string): string | undefined {
    let gid = project.elements.find((e) => e.id === elementId)?.groupId;
    // Documents come from storage, so defend against dangling ids and cycles.
    const seen = new Set<string>();
    while (gid) {
      if (seen.has(gid)) return undefined;
      seen.add(gid);
      const g = getGroup(gid);
      if (!g) return undefined;
      if (!g.parentId) return gid;
      gid = g.parentId;
    }
    return undefined;
  }

  /** `groupId` plus every group nested beneath it. */
  function groupSubtree(groupId: string): Set<string> {
    const out = new Set<string>([groupId]);
    let grew = true;
    while (grew) {
      grew = false;
      for (const g of project.groups) {
        if (g.parentId && out.has(g.parentId) && !out.has(g.id)) {
          out.add(g.id);
          grew = true;
        }
      }
    }
    return out;
  }

  function elementIdsInGroup(groupId: string): string[] {
    const subtree = groupSubtree(groupId);
    return project.elements.filter((e) => e.groupId && subtree.has(e.groupId)).map((e) => e.id);
  }

  /** Clicking any member of a group selects the whole group. */
  function expandToGroups(ids: string[]): string[] {
    const out = new Set<string>();
    for (const id of ids) {
      const root = rootGroupIdOf(id);
      if (root) for (const m of elementIdsInGroup(root)) out.add(m);
      else out.add(id);
    }
    return [...out];
  }

  function selectGroup(groupId: string): void {
    const ids = elementIdsInGroup(groupId);
    if (ids.length) selectedIds.splice(0, selectedIds.length, ...ids);
  }

  /**
   * Keep a group's members adjacent in z-order. Without this an ungrouped
   * element can sit between them and the group renders in two visual pieces.
   */
  function restackGroupContiguously(groupId: string): void {
    const memberIds = new Set(elementIdsInGroup(groupId));
    if (memberIds.size === 0) return;
    const sorted = [...project.elements].sort((a, b) => a.zIndex - b.zIndex);
    const members = sorted.filter((e) => memberIds.has(e.id));
    const others = sorted.filter((e) => !memberIds.has(e.id));
    const top = members[members.length - 1]!;
    // Land the block just above everything that was already below its top.
    const below = others.filter((e) => e.zIndex < top.zIndex).length;
    const next = [...others];
    next.splice(below, 0, ...members);
    next.forEach((e, i) => {
      e.zIndex = i + 1;
    });
  }

  /** Drop groups that no longer hold anything, cascading to their parents. */
  function pruneEmptyGroups(): void {
    let changed = true;
    while (changed) {
      changed = false;
      for (let i = project.groups.length - 1; i >= 0; i--) {
        const g = project.groups[i]!;
        const hasElements = project.elements.some((e) => e.groupId === g.id);
        const hasChildren = project.groups.some((x) => x.parentId === g.id);
        if (!hasElements && !hasChildren) {
          project.groups.splice(i, 1);
          changed = true;
        }
      }
    }
  }

  function setGroupCollapsed(groupId: string, collapsed: boolean): void {
    const g = getGroup(groupId);
    if (!g) return;
    // View state only — deliberately not committed, so expanding a group in the
    // layers panel doesn't land in the undo stack.
    g.isCollapsed = collapsed;
  }

  function groupSelected(): string | null {
    const els = selectedIds
      .map((id) => project.elements.find((e) => e.id === id))
      .filter((e): e is CanvasElement => !!e);
    if (els.length < 2) return null;

    // Snapshot the existing roots first — tagging below changes what
    // rootGroupIdOf reports.
    const rootsInSelection = new Set<string>();
    for (const el of els) {
      const root = rootGroupIdOf(el.id);
      if (root) rootsInSelection.add(root);
    }
    // Already exactly one group and nothing else? Grouping again is a no-op.
    if (rootsInSelection.size === 1 && els.every((e) => rootGroupIdOf(e.id))) {
      const only = [...rootsInSelection][0]!;
      if (elementIdsInGroup(only).length === els.length) return null;
    }

    const id = crypto.randomUUID();
    project.groups.push({ id, name: `Group ${project.groups.length + 1}` });
    // Whole groups inside the selection become subgroups; loose elements get
    // tagged directly.
    for (const rootId of rootsInSelection) {
      const g = getGroup(rootId);
      if (g) g.parentId = id;
    }
    for (const el of els) {
      if (!rootGroupIdOf(el.id)) el.groupId = id;
    }

    restackGroupContiguously(id);
    selectGroup(id);
    commit();
    return id;
  }

  /** Peel one level off whichever groups the selection sits in. */
  function ungroupSelected(): void {
    const roots = new Set<string>();
    for (const id of selectedIds) {
      const r = rootGroupIdOf(id);
      if (r) roots.add(r);
    }
    if (roots.size === 0) return;
    for (const rootId of roots) {
      for (const el of project.elements) if (el.groupId === rootId) delete el.groupId;
      for (const g of project.groups) if (g.parentId === rootId) delete g.parentId;
      const i = project.groups.findIndex((g) => g.id === rootId);
      if (i >= 0) project.groups.splice(i, 1);
    }
    commit();
  }

  function deleteElements(ids: string[]): void {
    project.elements = project.elements.filter((e) => !ids.includes(e.id));
    pruneEmptyGroups();
    for (let i = selectedIds.length - 1; i >= 0; i--) {
      if (ids.includes(selectedIds[i]!)) selectedIds.splice(i, 1);
    }
    commit();
  }

  function duplicateElements(ids: string[]): CanvasElement[] {
    const out: CanvasElement[] = [];
    // Copies of a grouped element join a *new* group — sharing the original's
    // id would make dragging the duplicate drag the original too.
    const groupRemap = new Map<string, string>();
    for (const id of ids) {
      const el = project.elements.find((e) => e.id === id);
      if (!el) continue;
      const copy = clone(el);
      copy.id = crypto.randomUUID();
      copy.x += 30;
      copy.y += 30;
      copy.zIndex = nextZ();
      if (copy.groupId) {
        let mapped = groupRemap.get(copy.groupId);
        if (!mapped) {
          mapped = crypto.randomUUID();
          groupRemap.set(copy.groupId, mapped);
          project.groups.push({ id: mapped, name: getGroup(copy.groupId)?.name });
        }
        copy.groupId = mapped;
      }
      project.elements.push(copy);
      out.push(copy);
    }
    // Re-link nesting between the groups we just cloned.
    for (const [srcId, newId] of groupRemap) {
      const srcParent = getGroup(srcId)?.parentId;
      const mappedParent = srcParent ? groupRemap.get(srcParent) : undefined;
      if (mappedParent) {
        const g = getGroup(newId);
        if (g) g.parentId = mappedParent;
      }
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

  function toggleSnap(): void {
    ui.snapEnabled = !ui.snapEnabled;
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
    canRedo: () => history.index < history.length,
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
    getGroup,
    rootGroupIdOf,
    elementIdsInGroup,
    expandToGroups,
    selectGroup,
    setGroupCollapsed,
    groupSelected,
    ungroupSelected,
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
    toggleSnap,
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
