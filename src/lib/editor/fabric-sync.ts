'use client';

import * as fabric from 'fabric';
import type {
  CanvasBackground,
  CanvasElement,
  ShapeElement,
  StickerElement,
  TextElement,
  ImageElement,
} from '@/lib/types/canvas';
import { loadFont } from './fonts';

// ----- Background -----
export function applyBackground(canvas: fabric.Canvas, bg: CanvasBackground) {
  const w = canvas.getWidth();
  const h = canvas.getHeight();

  if (bg.type === 'color') {
    canvas.backgroundColor = bg.color;
    canvas.backgroundImage = undefined;
  } else if (bg.type === 'gradient') {
    canvas.backgroundColor = gradientToCssDataUrl(bg.colors, bg.start, bg.end, w, h);
    canvas.backgroundImage = undefined;
  } else if (bg.type === 'image') {
    fabric.FabricImage.fromURL(bg.src, { crossOrigin: 'anonymous' }).then((img) => {
      img.scaleX = w / (img.width ?? 1);
      img.scaleY = h / (img.height ?? 1);
      canvas.backgroundImage = img;
      canvas.requestRenderAll();
    });
  } else if (bg.type === 'pattern') {
    const url = patternToDataUrl(bg, w, h);
    fabric.FabricImage.fromURL(url).then((img) => {
      canvas.backgroundImage = img;
      canvas.requestRenderAll();
    });
  }
  canvas.requestRenderAll();
}

function gradientToCssDataUrl(
  colors: string[],
  start: string,
  end: string,
  w: number,
  h: number,
): string {
  // Map alignment strings like "topLeft" → angle
  const angle = alignmentAngle(start, end);
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const ctx = c.getContext('2d')!;
  const rad = (angle * Math.PI) / 180;
  const x = Math.cos(rad);
  const y = Math.sin(rad);
  const g = ctx.createLinearGradient(
    (1 - x) * 0.5 * w,
    (1 - y) * 0.5 * h,
    (1 + x) * 0.5 * w,
    (1 + y) * 0.5 * h,
  );
  colors.forEach((col, i) => g.addColorStop(i / Math.max(1, colors.length - 1), col));
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
  return c.toDataURL('image/png');
}

function alignmentAngle(start: string, end: string): number {
  const map: Record<string, [number, number]> = {
    top: [0, -1],
    bottom: [0, 1],
    left: [-1, 0],
    right: [1, 0],
    topLeft: [-1, -1],
    topRight: [1, -1],
    bottomLeft: [-1, 1],
    bottomRight: [1, 1],
    center: [0, 0],
  };
  const s = map[start] ?? [-1, -1];
  const e = map[end] ?? [1, 1];
  const dx = e[0] - s[0];
  const dy = e[1] - s[1];
  return (Math.atan2(dy, dx) * 180) / Math.PI;
}

function patternToDataUrl(
  bg: Extract<CanvasBackground, { type: 'pattern' }>,
  w: number,
  h: number,
): string {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const ctx = c.getContext('2d')!;
  ctx.save();
  ctx.globalAlpha = bg.opacity;
  ctx.fillStyle = bg.color;
  ctx.font = `${bg.fontSize}px ${bg.fontFamily}`;
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  const step = bg.fontSize + bg.spacing;
  for (let y = 0; y < h + step; y += step) {
    for (let x = 0; x < w + step; x += step) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((bg.rotation * Math.PI) / 180);
      ctx.fillText(bg.character, 0, 0);
      ctx.restore();
    }
  }
  ctx.restore();
  return c.toDataURL('image/png');
}

// ----- Element → Fabric object -----
export async function elementToFabric(
  el: CanvasElement,
): Promise<fabric.Object | null> {
  let obj: fabric.Object | null = null;

  if (el.type === 'text') {
    await loadFont(el.fontFamily);
    obj = textToFabric(el);
  } else if (el.type === 'shape') {
    obj = shapeToFabric(el);
  } else if (el.type === 'sticker') {
    obj = stickerToFabric(el);
  } else if (el.type === 'image') {
    obj = await imageToFabric(el);
  }

  if (!obj) return null;
  obj.set({
    left: el.x,
    top: el.y,
    angle: (el.rotation * 180) / Math.PI,
    selectable: !el.isLocked,
    evented: !el.isLocked,
    visible: el.isVisible,
    lockMovementX: el.isLocked,
    lockMovementY: el.isLocked,
    lockScalingX: el.isLocked,
    lockScalingY: el.isLocked,
    lockRotation: el.isLocked,
  });
  // Attach id so we can map back
  (obj as fabric.Object & { _elId?: string })._elId = el.id;

  if (el.shadow) {
    obj.shadow = new fabric.Shadow({
      color: el.shadow.color,
      blur: el.shadow.blurRadius,
      offsetX: el.shadow.offsetX,
      offsetY: el.shadow.offsetY,
    });
  }
  return obj;
}

function textToFabric(el: TextElement): fabric.Textbox {
  const tb = new fabric.Textbox(el.text, {
    width: el.width,
    fontFamily: el.fontFamily,
    fontSize: el.fontSize,
    fill: el.color,
    fontWeight: el.isBold ? 'bold' : 'normal',
    fontStyle: el.isItalic ? 'italic' : 'normal',
    underline: el.isUnderline,
    textAlign: el.textAlignment,
    charSpacing: el.letterSpacing * 1000,
    lineHeight: el.lineHeight,
    opacity: el.opacity,
    stroke: el.outlineColor,
    strokeWidth: el.outlineWidth ?? 0,
    backgroundColor: el.backgroundColor,
  });
  return tb;
}

function shapeToFabric(el: ShapeElement): fabric.Object {
  const common = {
    width: el.width,
    height: el.height,
    fill: el.fillColor,
    stroke: el.strokeColor,
    strokeWidth: el.strokeWidth,
    opacity: el.opacity,
  };
  switch (el.shapeType) {
    case 'circle':
      return new fabric.Circle({
        ...common,
        radius: el.width / 2,
      });
    case 'triangle':
      return new fabric.Triangle(common);
    case 'line':
      return new fabric.Line([0, 0, el.width, 0], {
        stroke: el.strokeColor ?? el.fillColor,
        strokeWidth: el.strokeWidth || 2,
        opacity: el.opacity,
      });
    case 'star':
      return makePolygonStar(el);
    case 'polygon':
      return makePolygon(el);
    case 'diamond':
      return new fabric.Polygon(
        [
          { x: el.width / 2, y: 0 },
          { x: el.width, y: el.height / 2 },
          { x: el.width / 2, y: el.height },
          { x: 0, y: el.height / 2 },
        ],
        common,
      );
    case 'rectangle':
    default:
      return new fabric.Rect({
        ...common,
        rx: el.cornerRadius,
        ry: el.cornerRadius,
      });
  }
}

function makePolygonStar(el: ShapeElement): fabric.Polygon {
  const points: { x: number; y: number }[] = [];
  const spikes = el.sides ?? 5;
  const outer = el.width / 2;
  const inner = el.innerRadius ?? outer / 2;
  for (let i = 0; i < spikes * 2; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = (i * Math.PI) / spikes - Math.PI / 2;
    points.push({ x: outer + r * Math.cos(a), y: outer + r * Math.sin(a) });
  }
  return new fabric.Polygon(points, {
    fill: el.fillColor,
    stroke: el.strokeColor,
    strokeWidth: el.strokeWidth,
    opacity: el.opacity,
  });
}

function makePolygon(el: ShapeElement): fabric.Polygon {
  const sides = el.sides ?? 6;
  const r = el.width / 2;
  const points = Array.from({ length: sides }, (_, i) => {
    const a = (i * 2 * Math.PI) / sides - Math.PI / 2;
    return { x: r + r * Math.cos(a), y: r + r * Math.sin(a) };
  });
  return new fabric.Polygon(points, {
    fill: el.fillColor,
    stroke: el.strokeColor,
    strokeWidth: el.strokeWidth,
    opacity: el.opacity,
  });
}

function stickerToFabric(el: StickerElement): fabric.Text {
  return new fabric.Text(el.content, {
    fontSize: el.height,
    fontFamily: el.fontFamily ?? 'Cairo',
    fill: el.color ?? '#000',
    opacity: el.opacity,
    flipX: el.flipHorizontal,
    flipY: el.flipVertical,
  });
}

async function imageToFabric(el: ImageElement): Promise<fabric.FabricImage | null> {
  try {
    const img = await fabric.FabricImage.fromURL(el.imageSrc, {
      crossOrigin: 'anonymous',
    });
    const scaleX = el.width / (img.width ?? 1);
    const scaleY = el.height / (img.height ?? 1);
    img.set({
      scaleX,
      scaleY,
      opacity: el.opacity,
      flipX: el.flipHorizontal,
      flipY: el.flipVertical,
    });

    const filters: fabric.filters.BaseFilter<string>[] = [];
    if (el.brightness) {
      filters.push(new fabric.filters.Brightness({ brightness: el.brightness }));
    }
    if (el.contrast) {
      filters.push(new fabric.filters.Contrast({ contrast: el.contrast }));
    }
    if (el.saturation) {
      filters.push(new fabric.filters.Saturation({ saturation: el.saturation }));
    }
    if (filters.length) {
      img.filters = filters;
      img.applyFilters();
    }
    return img;
  } catch {
    return null;
  }
}
