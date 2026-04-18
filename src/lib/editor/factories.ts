'use client';

import type {
  CanvasElement,
  ShapeElement,
  ShapeType,
  StickerElement,
  TextElement,
  ImageElement,
} from '@/lib/types/canvas';

function base(
  partial: Partial<CanvasElement>,
): Pick<
  CanvasElement,
  'id' | 'rotation' | 'isLocked' | 'isVisible' | 'zIndex'
> & {
  x: number;
  y: number;
  width: number;
  height: number;
} {
  return {
    id: crypto.randomUUID(),
    x: partial.x ?? 100,
    y: partial.y ?? 100,
    width: partial.width ?? 200,
    height: partial.height ?? 200,
    rotation: 0,
    isLocked: false,
    isVisible: true,
    zIndex: 0,
  };
}

export function createText(text: string = 'نص', overrides: Partial<TextElement> = {}): TextElement {
  return {
    ...base(overrides),
    type: 'text',
    text,
    fontFamily: 'Cairo',
    fontSize: 48,
    color: '#111111',
    isBold: false,
    isItalic: false,
    isUnderline: false,
    textAlignment: 'center',
    letterSpacing: 0,
    lineHeight: 1.2,
    opacity: 1,
    width: 400,
    height: 80,
    ...overrides,
  };
}

export function createShape(shapeType: ShapeType, overrides: Partial<ShapeElement> = {}): ShapeElement {
  return {
    ...base(overrides),
    type: 'shape',
    shapeType,
    fillColor: '#6d28d9',
    strokeWidth: 0,
    cornerRadius: 0,
    opacity: 1,
    sides: shapeType === 'star' ? 5 : shapeType === 'polygon' ? 6 : undefined,
    innerRadius: shapeType === 'star' ? 40 : undefined,
    ...overrides,
  };
}

export function createSticker(content: string, overrides: Partial<StickerElement> = {}): StickerElement {
  return {
    ...base(overrides),
    type: 'sticker',
    stickerType: 'emoji',
    content,
    opacity: 1,
    flipHorizontal: false,
    flipVertical: false,
    width: 120,
    height: 120,
    ...overrides,
  };
}

export function createImage(src: string, overrides: Partial<ImageElement> = {}): ImageElement {
  return {
    ...base(overrides),
    type: 'image',
    imageSrc: src,
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
    width: 400,
    height: 400,
    ...overrides,
  };
}
