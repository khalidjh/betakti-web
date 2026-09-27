<script lang="ts">
  import { onMount } from 'svelte';
  import { Copy, Trash2, ArrowUp, ArrowDown, Bold, Italic } from 'lucide-svelte';
  import { getEditor } from './editor.svelte';
  import { shapePath, hasCustomPath } from './shapes';
  import type {
    CanvasElement,
    ImageElement,
    ShapeElement,
    StickerElement,
    TextElement,
    CanvasBackground
  } from './types';

  interface Props {
    registerExport?: (fn: (pixelRatio: number, withWatermark: boolean) => Promise<string>) => void;
  }
  const { registerExport }: Props = $props();

  const editor = getEditor();

  let container = $state<HTMLDivElement | null>(null);
  let canvasEl: HTMLCanvasElement | null = null;

  type FabricNS = typeof import('fabric');
  let F: FabricNS | null = null;

  type FObject = import('fabric').FabricObject;
  let canvas: import('fabric').Canvas | null = null;
  let artboardBg: import('fabric').Rect | null = null;

  const nodeMap = new Map<string, FObject>();
  // When we sync object → element, we mutate the project, which fires the
  // reverse "element → object" effect. Use a re-entrancy guard so we don't
  // fight ourselves mid-drag.
  let suspendElementSync = false;
  // Same in reverse: when we set selection from the editor, ignore the
  // selection events Fabric fires back at us.
  let suspendSelectionSync = false;
  let isEditingText = $state(false);
  let isInteracting = $state(false);
  let rotatingBadge = $state<{ angle: number; left: number; top: number } | null>(null);

  let spacePressed = $state(false);
  let isPanning = $state(false);
  let panStart = { x: 0, y: 0 };

  const contextBar = $derived.by<{ left: number; top: number; el: CanvasElement } | null>(() => {
    if (editor.selectedIds.length !== 1 || isEditingText || isPanning || isInteracting || !canvas) return null;
    const id = editor.selectedIds[0]!;
    const el = editor.getElement(id);
    if (!el) return null;
    const z = editor.ui.zoom;
    const tl = worldToScreen(el.x + el.width / 2, el.y);
    return { left: tl.x, top: tl.y - 12, el };
  });

  function worldToScreen(wx: number, wy: number): { x: number; y: number } {
    if (!canvas) return { x: 0, y: 0 };
    const vt = canvas.viewportTransform!;
    return { x: wx * vt[0] + vt[4], y: wy * vt[3] + vt[5] };
  }

  onMount(() => {
    let cleanup = () => {};
    (async () => {
      F = await import('fabric');
      if (!container) return;
      init();
      cleanup = () => {
        const touchTarget = container ?? canvasEl;
        if (touchTarget) {
          touchTarget.removeEventListener('touchstart', onTouchStart as EventListener);
          touchTarget.removeEventListener('touchmove', onTouchMove as EventListener);
          touchTarget.removeEventListener('touchend', onTouchEnd as EventListener);
          touchTarget.removeEventListener('touchcancel', onTouchEnd as EventListener);
        }
        canvas?.dispose();
        window.removeEventListener('keydown', handleKey);
        window.removeEventListener('keyup', handleKeyUp);
        window.removeEventListener('pointerup', releaseTransform);
        window.removeEventListener('blur', releaseTransform);
        if (typeof document !== 'undefined' && document.fonts) {
          document.fonts.removeEventListener('loadingdone', requestRender);
        }
        ro?.disconnect();
      };
    })();
    return () => cleanup();
  });

  let ro: ResizeObserver | null = null;

  // Pinch-zoom state for two-finger touch gestures. While `pinch` is non-null
  // we are mid-gesture and Fabric's selection is suppressed.
  let pinch: {
    d0: number;
    z0: number;
    wx0: number;
    wy0: number;
  } | null = null;

  function touchMidpoint(t: TouchList): { x: number; y: number } {
    return {
      x: (t[0].clientX + t[1].clientX) / 2,
      y: (t[0].clientY + t[1].clientY) / 2
    };
  }
  function touchDistance(t: TouchList): number {
    return Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY);
  }

  function onTouchStart(e: TouchEvent): void {
    if (!canvas || !canvasEl || e.touches.length !== 2) return;
    e.preventDefault();
    const rect = canvasEl.getBoundingClientRect();
    const m = touchMidpoint(e.touches);
    const cx = m.x - rect.left;
    const cy = m.y - rect.top;
    const z0 = editor.ui.zoom;
    const vt = canvas.viewportTransform!;
    pinch = {
      d0: touchDistance(e.touches),
      z0,
      wx0: (cx - vt[4]) / z0,
      wy0: (cy - vt[5]) / z0
    };
    canvas.discardActiveObject();
    canvas.selection = false;
    canvas.requestRenderAll();
  }

  function onTouchMove(e: TouchEvent): void {
    if (!pinch || !canvas || !canvasEl || e.touches.length !== 2) return;
    e.preventDefault();
    const rect = canvasEl.getBoundingClientRect();
    const m = touchMidpoint(e.touches);
    const cx = m.x - rect.left;
    const cy = m.y - rect.top;
    const d1 = touchDistance(e.touches);
    const factor = d1 / pinch.d0;
    const newZoom = Math.max(0.1, Math.min(8, pinch.z0 * factor));
    // Pin the world point that was under the pinch center at start to remain
    // under the (possibly moved) midpoint — gives natural pinch + two-finger pan.
    const cw = editor.project.canvasSize.width;
    const ch = editor.project.canvasSize.height;
    const sw = canvas.getWidth();
    const sh = canvas.getHeight();
    const newTx = cx - pinch.wx0 * newZoom;
    const newTy = cy - pinch.wy0 * newZoom;
    const centerTx = (sw - cw * newZoom) / 2;
    const centerTy = (sh - ch * newZoom) / 2;
    editor.setZoom(newZoom);
    editor.setPan(newTx - centerTx, newTy - centerTy);
  }

  function onTouchEnd(e: TouchEvent): void {
    if (e.touches.length < 2 && pinch) {
      pinch = null;
      if (canvas) canvas.selection = true;
    }
  }

  function init(): void {
    if (!F || !container) return;
    canvasEl = document.createElement('canvas');
    canvasEl.style.display = 'block';
    // Disable browser-level pinch/scroll on the canvas so our two-finger
    // gesture handler can drive zoom+pan instead of the page zooming.
    canvasEl.style.touchAction = 'none';
    container.appendChild(canvasEl);

    canvas = new F.Canvas(canvasEl, {
      width: container.clientWidth,
      height: container.clientHeight,
      backgroundColor: 'transparent',
      preserveObjectStacking: true,
      selection: true,
      stopContextMenu: true,
      fireRightClick: true
    });

    // Artboard background lives in world-space at (0,0)
    artboardBg = new F.Rect({
      left: 0,
      top: 0,
      width: editor.project.canvasSize.width,
      height: editor.project.canvasSize.height,
      fill: '#ffffff',
      selectable: false,
      evented: false,
      hoverCursor: 'default',
      excludeFromExport: false
    });
    canvas.add(artboardBg);

    // Selection styling
    F.FabricObject.prototype.set({
      borderColor: '#5b46f6',
      borderScaleFactor: 1.25,
      cornerColor: '#ffffff',
      cornerStrokeColor: '#5b46f6',
      transparentCorners: false,
      cornerSize: 12,
      touchCornerSize: 28,
      padding: 2,
      snapAngle: 15,
      snapThreshold: 7
    });

    // Custom control renderers: rounded-square corners + pill mid-handles, both
    // with a soft shadow so they read well on busy backgrounds.
    const BRAND = '#5b46f6';
    const drawHandle = (
      ctx: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      w: number,
      h: number,
      r: number,
      angle: number
    ) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate((angle * Math.PI) / 180);
      ctx.shadowColor = 'rgba(15, 23, 42, 0.18)';
      ctx.shadowBlur = 6;
      ctx.shadowOffsetY = 1;
      ctx.beginPath();
      const x = -w / 2;
      const y = -h / 2;
      const rr = Math.min(r, w / 2, h / 2);
      ctx.moveTo(x + rr, y);
      ctx.lineTo(x + w - rr, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + rr);
      ctx.lineTo(x + w, y + h - rr);
      ctx.quadraticCurveTo(x + w, y + h, x + w - rr, y + h);
      ctx.lineTo(x + rr, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - rr);
      ctx.lineTo(x, y + rr);
      ctx.quadraticCurveTo(x, y, x + rr, y);
      ctx.closePath();
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.shadowColor = 'transparent';
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = BRAND;
      ctx.stroke();
      ctx.restore();
    };

    const cornerRender = function (
      this: import('fabric').Control,
      ctx: CanvasRenderingContext2D,
      left: number,
      top: number,
      _styleOverride: unknown,
      fabricObject: FObject
    ) {
      const angle = fabricObject.getTotalAngle?.() ?? 0;
      drawHandle(ctx, left, top, 12, 12, 3, angle);
    };

    const sideRender = (orientation: 'h' | 'v') =>
      function (
        this: import('fabric').Control,
        ctx: CanvasRenderingContext2D,
        left: number,
        top: number,
        _styleOverride: unknown,
        fabricObject: FObject
      ) {
        const angle = fabricObject.getTotalAngle?.() ?? 0;
        // 'h' = mid-top/bottom handle → horizontal pill (resizes height)
        // 'v' = mid-left/right handle → vertical pill (resizes width)
        const w = orientation === 'h' ? 18 : 6;
        const h = orientation === 'h' ? 6 : 18;
        drawHandle(ctx, left, top, w, h, 3, angle);
      };

    const mtrRender = function (
      this: import('fabric').Control,
      ctx: CanvasRenderingContext2D,
      left: number,
      top: number,
      _styleOverride: unknown,
      _fabricObject: FObject
    ) {
      ctx.save();
      ctx.shadowColor = 'rgba(15, 23, 42, 0.2)';
      ctx.shadowBlur = 6;
      ctx.shadowOffsetY = 1;
      ctx.beginPath();
      ctx.arc(left, top, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.shadowColor = 'transparent';
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = BRAND;
      ctx.stroke();
      ctx.restore();
    };

    // In Fabric v6 controls live per-instance, so we attach renderers on add.
    const applyControlRenderers = (obj: FObject | undefined | null) => {
      if (!obj || !obj.controls) return;
      const c = obj.controls as Record<string, import('fabric').Control>;
      if (c.tl) c.tl.render = cornerRender;
      if (c.tr) c.tr.render = cornerRender;
      if (c.bl) c.bl.render = cornerRender;
      if (c.br) c.br.render = cornerRender;
      if (c.mt) c.mt.render = sideRender('h');
      if (c.mb) c.mb.render = sideRender('h');
      if (c.ml) c.ml.render = sideRender('v');
      if (c.mr) c.mr.render = sideRender('v');
      // Text height is auto-driven by font size & content, so vertical-resize
      // handles aren't useful — hide them on Textbox instances.
      if (F && obj instanceof F.Textbox) {
        if (c.mt) c.mt.visible = false;
        if (c.mb) c.mb.visible = false;
      }
      if (c.mtr) {
        // Default mtr sits above the object, where the floating action toolbar
        // lives — move it below so the two don't overlap.
        c.mtr.y = 0.5;
        c.mtr.offsetY = 28;
        c.mtr.render = mtrRender;
      }
    };
    canvas.on('object:added', (e) => applyControlRenderers(e.target as FObject));

    canvas.on('selection:created', onSelectionFromCanvas);
    canvas.on('selection:updated', onSelectionFromCanvas);
    canvas.on('selection:cleared', () => {
      if (suspendSelectionSync) return;
      editor.clearSelection();
    });
    // Only live-sync moves; scale/rotate are committed once at gesture-end
    // so we don't fight Fabric's in-flight transform deltas.
    canvas.on('object:moving', onObjectChanging);
    canvas.on('object:rotating', (e) => {
      const t = e.target as FObject | undefined;
      if (!t) return;
      const angle = ((t.angle ?? 0) % 360 + 360) % 360;
      const center = t.getCenterPoint();
      const screen = worldToScreen(center.x, center.y);
      rotatingBadge = { angle, left: screen.x, top: screen.y };
    });
    canvas.on('object:modified', () => {
      rotatingBadge = null;
      onObjectModified();
    });
    canvas.on('mouse:wheel', onWheel);
    canvas.on('mouse:down:before', onMouseDownBefore);
    canvas.on('mouse:up', onMouseUp);
    canvas.on('mouse:move', onMouseMove);

    // Two-finger pinch + pan for touch devices. Listeners go on the wrapper
    // container (not just canvasEl) so the gesture works whether fingers are
    // over the canvas or its overlay layer.
    const touchTarget = container ?? canvasEl;
    if (touchTarget) {
      touchTarget.addEventListener('touchstart', onTouchStart as EventListener, { passive: false });
      touchTarget.addEventListener('touchmove', onTouchMove as EventListener, { passive: false });
      touchTarget.addEventListener('touchend', onTouchEnd as EventListener, { passive: false });
      touchTarget.addEventListener('touchcancel', onTouchEnd as EventListener, { passive: false });
    }
    canvas.on('before:transform', () => {
      isInteracting = true;
    });
    canvas.on('mouse:down', (opt) => {
      if (opt.target) isInteracting = true;
    });

    // Safety net: if mouseup ever lands outside the canvas (e.g. on an overlay
    // that briefly covered the cursor), force-release any in-flight transform
    // so the element doesn't stick to the cursor.
    window.addEventListener('pointerup', releaseTransform);
    window.addEventListener('blur', releaseTransform);
    canvas.on('text:editing:entered', () => {
      isEditingText = true;
    });
    canvas.on('text:editing:exited', () => {
      isEditingText = false;
      onObjectModified();
    });

    window.addEventListener('keydown', handleKey);
    window.addEventListener('keyup', handleKeyUp);

    if (typeof document !== 'undefined' && document.fonts) {
      document.fonts.ready.then(requestRender);
      document.fonts.addEventListener('loadingdone', requestRender);
    }

    ro = new ResizeObserver(() => {
      if (!canvas || !container) return;
      canvas.setDimensions({ width: container.clientWidth, height: container.clientHeight });
      editor.ui.containerSize = { w: container.clientWidth, h: container.clientHeight };
      applyViewport();
    });
    ro.observe(container);
    editor.ui.containerSize = { w: container.clientWidth, h: container.clientHeight };
    editor.fitToScreen({ w: container.clientWidth, h: container.clientHeight });

    registerExport?.(exportImage);

    $effect.root(() => {
      // Background + canvas size
      $effect(() => {
        void editor.project.background;
        void editor.project.canvasSize.width;
        void editor.project.canvasSize.height;
        renderBackground();
      });
      // Reconcile element list (add/remove/reorder)
      $effect(() => {
        void editor.project.elements.length;
        void editor.project.elements.map((e) => e.id + '|' + e.zIndex).join(',');
        reconcile();
      });
      // Apply per-element prop changes
      $effect(() => {
        for (const el of editor.project.elements) {
          // Touch every relevant prop so the effect re-runs on change.
          void el.x;
          void el.y;
          void el.width;
          void el.height;
          void el.rotation;
          void el.isVisible;
          void el.isLocked;
          if (el.type === 'text') {
            void el.text;
            void el.fontFamily;
            void el.fontSize;
            void el.color;
            void el.isBold;
            void el.isItalic;
            void el.isUnderline;
            void el.textAlignment;
            void el.lineHeight;
            void el.letterSpacing;
            void el.opacity;
          } else if (el.type === 'shape') {
            void el.fillColor;
            void el.strokeColor;
            void el.strokeWidth;
            void el.cornerRadius;
            void el.opacity;
          } else if (el.type === 'image') {
            void el.imageSrc;
            void el.cornerRadius;
            void el.flipHorizontal;
            void el.flipVertical;
            void el.opacity;
          } else if (el.type === 'sticker') {
            void el.content;
            void el.color;
            void el.fontFamily;
            void el.opacity;
          }
          const obj = nodeMap.get(el.id);
          if (obj && !suspendElementSync) applyElementToObject(obj, el);
        }
        canvas?.requestRenderAll();
      });
      // Selection
      $effect(() => {
        void editor.selectedIds.join(',');
        applySelectionFromEditor();
      });
      // Viewport (zoom / pan)
      $effect(() => {
        void editor.ui.zoom;
        void editor.ui.pan.x;
        void editor.ui.pan.y;
        void editor.project.canvasSize.width;
        void editor.project.canvasSize.height;
        applyViewport();
      });
      // Cursor
      $effect(() => {
        if (!container) return;
        void editor.ui.tool;
        if (isPanning) container.style.cursor = 'grabbing';
        else if (spacePressed) container.style.cursor = 'grab';
        else if (editor.ui.tool === 'select') container.style.cursor = 'default';
        else container.style.cursor = 'crosshair';
      });
    });
  }

  function requestRender(): void {
    canvas?.requestRenderAll();
  }

  function applyViewport(): void {
    if (!canvas) return;
    const z = editor.ui.zoom;
    const cw = editor.project.canvasSize.width;
    const ch = editor.project.canvasSize.height;
    const sw = canvas.getWidth();
    const sh = canvas.getHeight();
    const tx = (sw - cw * z) / 2 + editor.ui.pan.x;
    const ty = (sh - ch * z) / 2 + editor.ui.pan.y;
    canvas.setViewportTransform([z, 0, 0, z, tx, ty]);
    canvas.requestRenderAll();
  }

  function renderBackground(): void {
    if (!canvas || !F || !artboardBg) return;
    const w = editor.project.canvasSize.width;
    const h = editor.project.canvasSize.height;
    artboardBg.set({ width: w, height: h });
    const bg = editor.project.background;
    if (bg.type === 'color') {
      artboardBg.set({ fill: bg.color });
    } else if (bg.type === 'gradient') {
      const angle = (bg.angle * Math.PI) / 180;
      const r = Math.sqrt(w * w + h * h) / 2;
      const cx = w / 2;
      const cy = h / 2;
      const x1 = cx - Math.cos(angle) * r;
      const y1 = cy - Math.sin(angle) * r;
      const x2 = cx + Math.cos(angle) * r;
      const y2 = cy + Math.sin(angle) * r;
      const grad = new F.Gradient({
        type: 'linear',
        coords: { x1, y1, x2, y2 },
        colorStops: bg.stops.map((s) => ({ color: s.color, offset: s.offset }))
      });
      artboardBg.set({ fill: grad });
    } else if (bg.type === 'image') {
      const fit = bg.fit;
      F.FabricImage.fromURL(bg.src, { crossOrigin: 'anonymous' })
        .then((img) => {
          if (!canvas || !artboardBg || !F) return;
          artboardBg.set({ fill: '#ffffff' });
          const iw = img.width || w;
          const ih = img.height || h;

          if (fit === 'fill') {
            // Non-uniform stretch — only when explicitly requested.
            img.set({ left: 0, top: 0, scaleX: w / iw, scaleY: h / ih, cropX: 0, cropY: 0, width: iw, height: ih });
          } else {
            // For uniform fits we crop in image space (cropX/cropY + width/
            // height) so the image always sits exactly at (0,0) covering the
            // artboard with no overflow — no clipPath required.
            let scale: number;
            if (fit === 'contain') scale = Math.min(w / iw, h / ih);
            else if (fit === 'fitWidth') scale = w / iw;
            else if (fit === 'fitHeight') scale = h / ih;
            else scale = Math.max(w / iw, h / ih); // 'cover' default

            // Source-pixel slice that, scaled by `scale`, fills the artboard.
            const srcW = Math.min(iw, w / scale);
            const srcH = Math.min(ih, h / scale);
            const cropX = Math.max(0, (iw - srcW) / 2);
            const cropY = Math.max(0, (ih - srcH) / 2);

            // Drawn dimensions; for contain / fitWidth / fitHeight these
            // may be smaller than the artboard, so center the result.
            const drawW = srcW * scale;
            const drawH = srcH * scale;

            img.set({
              cropX,
              cropY,
              width: srcW,
              height: srcH,
              scaleX: scale,
              scaleY: scale,
              left: (w - drawW) / 2,
              top: (h - drawH) / 2
            });
          }

          img.set({
            originX: 'left',
            originY: 'top',
            selectable: false,
            evented: false,
            excludeFromExport: false
          });
          img.set('data', { kind: 'background-image' });

          for (const o of canvas.getObjects()) {
            if ((o as { data?: { kind?: string } }).data?.kind === 'background-image') canvas.remove(o);
          }
          canvas.add(img);
          canvas.sendObjectToBack(img);
          canvas.sendObjectToBack(artboardBg);
          canvas.requestRenderAll();
        })
        .catch(() => {});
    }
    canvas.requestRenderAll();
  }

  function reconcile(): void {
    if (!canvas || !F) return;
    const desired = new Map<string, CanvasElement>();
    for (const el of editor.project.elements) desired.set(el.id, el);

    // Remove gone
    for (const [id, obj] of [...nodeMap.entries()]) {
      if (!desired.has(id)) {
        canvas.remove(obj);
        nodeMap.delete(id);
      }
    }
    // Add new
    for (const el of editor.project.elements) {
      if (!nodeMap.has(el.id)) {
        const obj = createObject(el);
        if (!obj) continue;
        nodeMap.set(el.id, obj);
        canvas.add(obj);
      }
    }
    // Re-stack: artboardBg at very back, then elements in zIndex order, plus any background-image just above artboardBg.
    const sorted = [...editor.project.elements].sort((a, b) => a.zIndex - b.zIndex);
    if (artboardBg) canvas.sendObjectToBack(artboardBg);
    for (const o of canvas.getObjects()) {
      if ((o as { data?: { kind?: string } }).data?.kind === 'background-image') {
        canvas.sendObjectToBack(o);
        if (artboardBg) canvas.sendObjectToBack(artboardBg);
      }
    }
    for (const el of sorted) {
      const obj = nodeMap.get(el.id);
      if (obj) canvas.bringObjectToFront(obj);
    }
    canvas.requestRenderAll();
  }

  function createObject(el: CanvasElement): FObject | null {
    if (!F) return null;
    let obj: FObject | null = null;
    if (el.type === 'text') {
      obj = new F.Textbox(el.text, {
        left: el.x,
        top: el.y,
        width: el.width,
        fontFamily: el.fontFamily,
        fontSize: el.fontSize,
        fill: el.color,
        textAlign: el.textAlignment,
        fontWeight: el.isBold ? 'bold' : 'normal',
        fontStyle: el.isItalic ? 'italic' : 'normal',
        underline: el.isUnderline,
        lineHeight: el.lineHeight,
        charSpacing: (el.letterSpacing / Math.max(1, el.fontSize)) * 1000,
        opacity: el.opacity,
        editable: true,
        splitByGrapheme: false
      });
    } else if (el.type === 'shape') {
      obj = createShapeObject(el);
    } else if (el.type === 'image') {
      // Async image load; create a placeholder rect that gets swapped on load.
      const placeholder = new F.Rect({
        left: el.x,
        top: el.y,
        width: el.width,
        height: el.height,
        fill: 'rgba(0,0,0,0.04)',
        stroke: '#d1d5db',
        strokeDashArray: [4, 4],
        strokeUniform: true
      });
      placeholder.set('data', { elementId: el.id, type: 'image-loading' });
      F.FabricImage.fromURL(el.imageSrc, { crossOrigin: 'anonymous' })
        .then((img) => {
          if (!canvas) return;
          const current = nodeMap.get(el.id);
          if (current !== placeholder) return; // got replaced before load
          img.set({
            left: el.x,
            top: el.y,
            scaleX: el.width / (img.width || el.width),
            scaleY: el.height / (img.height || el.height),
            opacity: el.opacity,
            flipX: el.flipHorizontal,
            flipY: el.flipVertical
          });
          img.set('data', { elementId: el.id });
          if (el.cornerRadius > 0 && F) {
            img.clipPath = new F.Rect({
              width: img.width,
              height: img.height,
              rx: (el.cornerRadius * (img.width || 1)) / el.width,
              ry: (el.cornerRadius * (img.height || 1)) / el.height,
              originX: 'center',
              originY: 'center'
            });
          }
          canvas.remove(placeholder);
          nodeMap.set(el.id, img);
          canvas.add(img);
          // restore z order
          const sorted = [...editor.project.elements].sort((a, b) => a.zIndex - b.zIndex);
          for (const e of sorted) {
            const o = nodeMap.get(e.id);
            if (o) canvas.bringObjectToFront(o);
          }
          canvas.requestRenderAll();
        })
        .catch(() => {});
      obj = placeholder;
    } else if (el.type === 'sticker') {
      obj = new F.Textbox(el.content, {
        left: el.x,
        top: el.y,
        width: el.width,
        fontSize: el.height * 0.8,
        fontFamily: el.fontFamily ?? 'system-ui',
        fill: el.color ?? '#111111',
        textAlign: 'center',
        opacity: el.opacity,
        flipX: el.flipHorizontal,
        flipY: el.flipVertical,
        editable: false
      });
    }
    if (!obj) return null;
    obj.set({
      angle: (el.rotation * 180) / Math.PI,
      visible: el.isVisible,
      selectable: !el.isLocked,
      evented: !el.isLocked,
      lockMovementX: el.isLocked,
      lockMovementY: el.isLocked,
      lockRotation: el.isLocked,
      lockScalingX: el.isLocked,
      lockScalingY: el.isLocked,
      originX: 'left',
      originY: 'top'
    });
    obj.set('data', { ...((obj.get('data') as object | undefined) ?? {}), elementId: el.id });
    return obj;
  }

  function createShapeObject(el: ShapeElement): FObject | null {
    if (!F) return null;
    const base = {
      left: el.x,
      top: el.y,
      width: el.width,
      height: el.height,
      fill: el.fillColor,
      stroke: el.strokeColor ?? '',
      strokeWidth: el.strokeWidth,
      strokeUniform: true,
      opacity: el.opacity
    };
    switch (el.shapeType) {
      case 'rectangle':
        return new F.Rect({ ...base, rx: el.cornerRadius, ry: el.cornerRadius });
      case 'circle':
        return new F.Ellipse({ ...base, rx: el.width / 2, ry: el.height / 2 });
      case 'triangle':
        return new F.Triangle(base);
      case 'line':
        return new F.Line([0, el.height / 2, el.width, el.height / 2], {
          left: el.x,
          top: el.y,
          stroke: el.fillColor,
          strokeWidth: Math.max(el.strokeWidth, 4),
          strokeUniform: true,
          opacity: el.opacity
        });
      case 'arrow': {
        const path = `M 0 ${el.height / 2} L ${el.width - 16} ${el.height / 2} M ${el.width - 16} ${el.height / 2 - 8} L ${el.width} ${el.height / 2} L ${el.width - 16} ${el.height / 2 + 8} Z`;
        return new F.Path(path, {
          left: el.x,
          top: el.y,
          fill: el.fillColor,
          stroke: el.fillColor,
          strokeWidth: Math.max(el.strokeWidth, 4),
          strokeUniform: true,
          opacity: el.opacity
        });
      }
      case 'star': {
        const points: { x: number; y: number }[] = [];
        const numPoints = el.sides ?? 5;
        const outer = el.width / 2;
        const inner = el.innerRadius ?? outer / 2;
        const cx = el.width / 2;
        const cy = el.height / 2;
        for (let i = 0; i < numPoints * 2; i++) {
          const r = i % 2 === 0 ? outer : inner;
          const a = (i / (numPoints * 2)) * Math.PI * 2 - Math.PI / 2;
          points.push({ x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r });
        }
        return new F.Polygon(points, base);
      }
      case 'polygon': {
        const points: { x: number; y: number }[] = [];
        const sides = el.sides ?? 6;
        const r = el.width / 2;
        const cx = el.width / 2;
        const cy = el.height / 2;
        for (let i = 0; i < sides; i++) {
          const a = (i / sides) * Math.PI * 2 - Math.PI / 2;
          points.push({ x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r });
        }
        return new F.Polygon(points, base);
      }
      case 'diamond':
      case 'heart':
      case 'hexagon':
      case 'crescent': {
        if (!hasCustomPath(el.shapeType)) return null;
        const path = new F.Path(shapePath(el.shapeType), {
          left: el.x,
          top: el.y,
          fill: el.fillColor,
          stroke: el.strokeColor ?? '',
          strokeWidth: el.strokeWidth,
          strokeUniform: true,
          opacity: el.opacity
        });
        path.set({ scaleX: el.width / 100, scaleY: el.height / 100 });
        return path;
      }
      default:
        return new F.Rect(base);
    }
  }

  function applyElementToObject(obj: FObject, el: CanvasElement): void {
    // Skip while user is interacting with this object — Fabric owns its state
    // during a transform; we'd just fight with the gesture.
    const ct = (canvas as { _currentTransform?: { target?: FObject } } | null)?._currentTransform;
    if (ct?.target === obj) return;
    if ((obj as { isMoving?: boolean }).isMoving) return;

    obj.set({
      left: el.x,
      top: el.y,
      angle: (el.rotation * 180) / Math.PI,
      visible: el.isVisible,
      selectable: !el.isLocked,
      evented: !el.isLocked,
      opacity: 'opacity' in el ? el.opacity : 1
    });

    if (el.type === 'text') {
      const t = obj as import('fabric').Textbox;
      if (t.text !== el.text && !t.isEditing) t.set({ text: el.text });
      t.set({
        width: el.width,
        fontFamily: el.fontFamily,
        fontSize: el.fontSize,
        fill: el.color,
        textAlign: el.textAlignment,
        fontWeight: el.isBold ? 'bold' : 'normal',
        fontStyle: el.isItalic ? 'italic' : 'normal',
        underline: el.isUnderline,
        lineHeight: el.lineHeight,
        charSpacing: (el.letterSpacing / Math.max(1, el.fontSize)) * 1000,
        scaleX: 1,
        scaleY: 1
      });
    } else if (el.type === 'shape') {
      const s = el;
      // For path-based shapes scale via scaleX/scaleY; for primitives set width/height directly.
      if (
        s.shapeType === 'rectangle' ||
        s.shapeType === 'triangle' ||
        s.shapeType === 'star' ||
        s.shapeType === 'polygon'
      ) {
        obj.set({ width: s.width, height: s.height, scaleX: 1, scaleY: 1 });
      } else if (s.shapeType === 'circle') {
        (obj as import('fabric').Ellipse).set({ rx: s.width / 2, ry: s.height / 2, width: s.width, height: s.height, scaleX: 1, scaleY: 1 });
      } else if (s.shapeType === 'line') {
        const ln = obj as import('fabric').Line;
        ln.set({ x1: 0, y1: s.height / 2, x2: s.width, y2: s.height / 2 });
      } else if (hasCustomPath(s.shapeType)) {
        obj.set({ scaleX: s.width / 100, scaleY: s.height / 100 });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- shared shape props
      (obj as any).set?.({ fill: s.fillColor });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- shared shape props
      (obj as any).set?.({ stroke: s.strokeColor ?? '' });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- shared shape props
      (obj as any).set?.({ strokeWidth: s.strokeWidth });
      if (s.shapeType === 'rectangle') {
        (obj as import('fabric').Rect).set({ rx: s.cornerRadius, ry: s.cornerRadius });
      }
    } else if (el.type === 'image') {
      const img = obj as import('fabric').FabricImage;
      // Width/height come from image natural size × scale; sync via scale.
      const natW = img.width || el.width;
      const natH = img.height || el.height;
      img.set({
        scaleX: (el.flipHorizontal ? -1 : 1) * (el.width / natW),
        scaleY: (el.flipVertical ? -1 : 1) * (el.height / natH),
        flipX: false,
        flipY: false
      });
    } else if (el.type === 'sticker') {
      const t = obj as import('fabric').Textbox;
      t.set({
        text: el.content,
        width: el.width,
        fontSize: el.height * 0.8,
        fontFamily: el.fontFamily ?? 'system-ui',
        fill: el.color ?? '#111111',
        flipX: el.flipHorizontal,
        flipY: el.flipVertical
      });
    }
    obj.setCoords();
  }

  function syncObjectToElement(obj: FObject): void {
    const id = (obj.get('data') as { elementId?: string } | undefined)?.elementId;
    if (!id) return;
    const el = editor.getElement(id);
    if (!el) return;

    const patch: Partial<CanvasElement> = {
      x: obj.left ?? el.x,
      y: obj.top ?? el.y,
      rotation: ((obj.angle ?? 0) * Math.PI) / 180
    };

    // Bake scale into width/height for non-image types so the model stays consistent.
    const sx = obj.scaleX ?? 1;
    const sy = obj.scaleY ?? 1;
    if (el.type === 'text' || el.type === 'sticker') {
      const newW = (obj.width ?? el.width) * Math.abs(sx);
      const newH = (obj.height ?? el.height) * Math.abs(sy);
      (patch as Partial<TextElement>).width = newW;
      (patch as Partial<TextElement>).height = newH;
      // Reset object scale so later renders don't double-apply
      obj.set({ scaleX: 1, scaleY: 1, width: newW, height: newH });
      if (el.type === 'text') {
        const t = obj as import('fabric').Textbox;
        if (typeof t.text === 'string') (patch as Partial<TextElement>).text = t.text;
      }
    } else if (el.type === 'shape') {
      const newW = (obj.width ?? el.width) * Math.abs(sx);
      const newH = (obj.height ?? el.height) * Math.abs(sy);
      (patch as Partial<ShapeElement>).width = newW;
      (patch as Partial<ShapeElement>).height = newH;
      if (el.shapeType !== 'diamond' && el.shapeType !== 'heart' && el.shapeType !== 'hexagon' && el.shapeType !== 'crescent') {
        obj.set({ scaleX: 1, scaleY: 1, width: newW, height: newH });
      }
    } else if (el.type === 'image') {
      const img = obj as import('fabric').FabricImage;
      const natW = img.width || el.width;
      const natH = img.height || el.height;
      const newW = natW * Math.abs(sx);
      const newH = natH * Math.abs(sy);
      (patch as Partial<ImageElement>).width = newW;
      (patch as Partial<ImageElement>).height = newH;
      (patch as Partial<ImageElement>).flipHorizontal = sx < 0;
      (patch as Partial<ImageElement>).flipVertical = sy < 0;
    }

    suspendElementSync = true;
    editor.updateElement(id, patch, false);
    suspendElementSync = false;
  }

  function onObjectChanging(): void {
    const active = canvas?.getActiveObject();
    if (!active) return;
    if (active.type === 'activeselection') {
      const sel = active as import('fabric').ActiveSelection;
      for (const o of sel.getObjects()) syncObjectToElement(o);
    } else {
      syncObjectToElement(active);
    }
  }

  function onObjectModified(): void {
    onObjectChanging();
    editor.commit();
    isInteracting = false;
  }

  function onSelectionFromCanvas(): void {
    if (suspendSelectionSync || !canvas) return;
    const active = canvas.getActiveObject();
    if (!active) return;
    let ids: string[] = [];
    if (active.type === 'activeselection') {
      const sel = active as import('fabric').ActiveSelection;
      ids = sel
        .getObjects()
        .map((o) => (o.get('data') as { elementId?: string } | undefined)?.elementId)
        .filter((x): x is string => !!x);
    } else {
      const id = (active.get('data') as { elementId?: string } | undefined)?.elementId;
      if (id) ids = [id];
    }
    editor.selectedIds.splice(0, editor.selectedIds.length, ...ids);
  }

  function applySelectionFromEditor(): void {
    if (!canvas || !F) return;
    suspendSelectionSync = true;
    try {
      const ids = editor.selectedIds;
      if (ids.length === 0) {
        canvas.discardActiveObject();
      } else if (ids.length === 1) {
        const obj = nodeMap.get(ids[0]!);
        if (obj && canvas.getActiveObject() !== obj) canvas.setActiveObject(obj);
      } else {
        const objs = ids.map((id) => nodeMap.get(id)).filter((o): o is FObject => !!o);
        if (objs.length > 1) {
          canvas.discardActiveObject();
          const sel = new F.ActiveSelection(objs, { canvas });
          canvas.setActiveObject(sel);
        }
      }
      canvas.requestRenderAll();
    } finally {
      suspendSelectionSync = false;
    }
  }

  function onWheel(opt: { e: WheelEvent }): void {
    if (!canvas) return;
    const e = opt.e;
    e.preventDefault();
    e.stopPropagation();
    const isZoomGesture = e.ctrlKey || e.metaKey;
    if (!isZoomGesture) {
      editor.setPan(editor.ui.pan.x - e.deltaX, editor.ui.pan.y - e.deltaY);
      return;
    }
    const oldZoom = editor.ui.zoom;
    const factor = Math.exp(-e.deltaY * 0.0015);
    const newZoom = Math.max(0.1, Math.min(8, oldZoom * factor));
    // Zoom toward the cursor: keep the world-point under the pointer fixed.
    const rect = canvasEl?.getBoundingClientRect();
    if (!rect) return;
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const vt = canvas.viewportTransform!;
    const wx = (px - vt[4]) / oldZoom;
    const wy = (py - vt[5]) / oldZoom;
    // Solve for pan such that wx*newZoom + tx = px, etc.
    const cw = editor.project.canvasSize.width;
    const ch = editor.project.canvasSize.height;
    const sw = canvas.getWidth();
    const sh = canvas.getHeight();
    const newTx = px - wx * newZoom;
    const newTy = py - wy * newZoom;
    const centerTx = (sw - cw * newZoom) / 2;
    const centerTy = (sh - ch * newZoom) / 2;
    editor.setZoom(newZoom);
    editor.setPan(newTx - centerTx, newTy - centerTy);
  }

  function onMouseDownBefore(opt: { e: MouseEvent | TouchEvent; target?: FObject }): void {
    if (spacePressed && canvas) {
      isPanning = true;
      // Disable selection during pan so Fabric doesn't start a marquee.
      canvas.selection = false;
      const e = opt.e as MouseEvent;
      panStart = { x: e.clientX, y: e.clientY };
    }
  }

  function onMouseMove(opt: { e: MouseEvent | TouchEvent }): void {
    if (!isPanning || !canvas) return;
    const e = opt.e as MouseEvent;
    const dx = e.clientX - panStart.x;
    const dy = e.clientY - panStart.y;
    panStart = { x: e.clientX, y: e.clientY };
    editor.setPan(editor.ui.pan.x + dx, editor.ui.pan.y + dy);
  }

  function onMouseUp(): void {
    if (isPanning && canvas) {
      isPanning = false;
      canvas.selection = true;
    }
    isInteracting = false;
    rotatingBadge = null;
  }

  function releaseTransform(): void {
    if (!canvas) return;
    const c = canvas as unknown as {
      _currentTransform?: unknown;
      _isCurrentlyDrawing?: boolean;
      __onMouseUp?: (e: PointerEvent) => void;
    };
    if (c._currentTransform) {
      // Fabric expects a real event; synthesize a minimal one. If the internal
      // handler isn't there, just clear the transform state directly.
      try {
        c.__onMouseUp?.(new PointerEvent('pointerup'));
      } catch {
        c._currentTransform = undefined;
      }
    }
    isInteracting = false;
    if (isPanning) {
      isPanning = false;
      canvas.selection = true;
    }
  }

  function handleKey(e: KeyboardEvent): void {
    if (e.code === 'Space' && !isInputTarget(e.target)) {
      spacePressed = true;
      e.preventDefault();
    }
  }
  function handleKeyUp(e: KeyboardEvent): void {
    if (e.code === 'Space') spacePressed = false;
  }
  function isInputTarget(t: EventTarget | null): boolean {
    if (!t || !(t instanceof HTMLElement)) return false;
    return t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable;
  }

  async function exportImage(pixelRatio: number, withWatermark: boolean): Promise<string> {
    if (!canvas || !F) throw new Error('Canvas not ready');
    const w = editor.project.canvasSize.width;
    const h = editor.project.canvasSize.height;

    const savedVT = [...canvas.viewportTransform!] as [number, number, number, number, number, number];
    const savedW = canvas.getWidth();
    const savedH = canvas.getHeight();
    canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
    canvas.setDimensions({ width: w, height: h });

    let watermark: import('fabric').Textbox | null = null;
    if (withWatermark) {
      const fontSize = Math.round(w * 0.03);
      watermark = new F.Textbox('صُمم بـ Betakti', {
        left: w - fontSize * 8,
        top: h - fontSize * 1.6,
        width: fontSize * 8,
        fontSize,
        fontFamily: 'IBM Plex Sans Arabic, Readex Pro, system-ui',
        fill: '#000000',
        opacity: 0.5,
        selectable: false,
        evented: false,
        textAlign: 'right'
      });
      canvas.add(watermark);
      canvas.requestRenderAll();
    }

    const dataUrl = canvas.toDataURL({
      format: 'png',
      multiplier: pixelRatio,
      left: 0,
      top: 0,
      width: w,
      height: h
    });

    if (watermark) canvas.remove(watermark);
    canvas.setDimensions({ width: savedW, height: savedH });
    canvas.setViewportTransform(savedVT);
    canvas.requestRenderAll();
    return dataUrl;
  }
</script>

<div
  bind:this={container}
  class="relative w-full h-full overflow-hidden"
  style:background={editor.ui.gridVisible
    ? 'radial-gradient(color-mix(in srgb, var(--color-ink) 8%, transparent) 1px, transparent 1px) 0 0 / 24px 24px, var(--color-surface-2)'
    : 'var(--color-surface-2)'}
></div>

{#if rotatingBadge}
  {@const a = Math.round(rotatingBadge.angle)}
  {@const isSnap = a % 15 === 0}
  <div
    class="absolute z-30 pointer-events-none px-2 py-1 rounded-[8px] text-xs font-semibold tabular-nums shadow-[var(--shadow-2)]"
    style:left="{rotatingBadge.left}px"
    style:top="{rotatingBadge.top}px"
    style:transform="translate(-50%, -50%)"
    style:background={isSnap ? '#5b46f6' : 'var(--color-surface)'}
    style:color={isSnap ? '#ffffff' : 'var(--color-ink)'}
    style:border="1px solid {isSnap ? '#5b46f6' : 'var(--color-border)'}"
  >
    {a}°
  </div>
{/if}

{#if contextBar}
  <div
    class="absolute z-20 pointer-events-auto"
    style:left="{contextBar.left}px"
    style:top="{contextBar.top}px"
    style:transform="translate(-50%, -100%)"
  >
    <div
      class="flex items-center gap-0.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[10px] shadow-[var(--shadow-2)] p-1"
    >
      {#if contextBar.el.type === 'text'}
        <button
          class="w-7 h-7 flex items-center justify-center rounded-[6px] hover:bg-[var(--color-surface-2)] {(contextBar.el as TextElement).isBold ? 'text-[var(--color-accent)] bg-[var(--color-surface-2)]' : 'text-[var(--color-ink-2)]'}"
          onclick={() => {
            const te = contextBar!.el as TextElement;
            editor.updateElement(te.id, { isBold: !te.isBold });
          }}
          title="Bold (Ctrl+B)"
          aria-label="Bold"
        >
          <Bold size={13} strokeWidth={2.2} />
        </button>
        <button
          class="w-7 h-7 flex items-center justify-center rounded-[6px] hover:bg-[var(--color-surface-2)] {(contextBar.el as TextElement).isItalic ? 'text-[var(--color-accent)] bg-[var(--color-surface-2)]' : 'text-[var(--color-ink-2)]'}"
          onclick={() => {
            const te = contextBar!.el as TextElement;
            editor.updateElement(te.id, { isItalic: !te.isItalic });
          }}
          title="Italic (Ctrl+I)"
          aria-label="Italic"
        >
          <Italic size={13} strokeWidth={2.2} />
        </button>
        <span class="w-px h-4 bg-[var(--color-border)] mx-0.5"></span>
      {/if}
      <button
        class="w-7 h-7 flex items-center justify-center rounded-[6px] hover:bg-[var(--color-surface-2)] text-[var(--color-ink-2)]"
        onclick={() => editor.bringForward(contextBar!.el.id)}
        title="Bring forward"
        aria-label="Bring forward"
      >
        <ArrowUp size={13} strokeWidth={2} />
      </button>
      <button
        class="w-7 h-7 flex items-center justify-center rounded-[6px] hover:bg-[var(--color-surface-2)] text-[var(--color-ink-2)]"
        onclick={() => editor.sendBackward(contextBar!.el.id)}
        title="Send backward"
        aria-label="Send backward"
      >
        <ArrowDown size={13} strokeWidth={2} />
      </button>
      <span class="w-px h-4 bg-[var(--color-border)] mx-0.5"></span>
      <button
        class="w-7 h-7 flex items-center justify-center rounded-[6px] hover:bg-[var(--color-surface-2)] text-[var(--color-ink-2)]"
        onclick={() => {
          const [copy] = editor.duplicateElements([contextBar!.el.id]);
          if (copy) editor.selectOnly(copy.id);
        }}
        title="Duplicate (Ctrl+D)"
        aria-label="Duplicate"
      >
        <Copy size={13} strokeWidth={2} />
      </button>
      <button
        class="w-7 h-7 flex items-center justify-center rounded-[6px] hover:bg-[var(--color-surface-2)] text-[var(--color-danger)]"
        onclick={() => editor.deleteElements([contextBar!.el.id])}
        title="Delete"
        aria-label="Delete"
      >
        <Trash2 size={13} strokeWidth={2} />
      </button>
    </div>
  </div>
{/if}
