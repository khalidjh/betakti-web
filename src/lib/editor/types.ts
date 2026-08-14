export interface ElementAnimation {
  type:
    | 'fadeIn'
    | 'fadeOut'
    | 'slideInLeft'
    | 'slideInRight'
    | 'slideInTop'
    | 'slideInBottom'
    | 'scaleIn'
    | 'scaleOut'
    | 'bounceIn'
    | 'rotateIn'
    | 'pulse'
    | 'shake'
    | 'typewriter';
  duration: number;
  delay: number;
  easing: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut' | 'bounceOut' | 'elasticOut';
  loop: boolean;
}

export interface ElementShadow {
  color: string;
  blurRadius: number;
  offsetX: number;
  offsetY: number;
}

export interface BaseElement {
  id: string;
  type: 'text' | 'image' | 'shape' | 'sticker';
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  isLocked: boolean;
  isVisible: boolean;
  zIndex: number;
  animation?: ElementAnimation;
  shadow?: ElementShadow;
  /**
   * Membership in a `Project.groups` entry, or absent when ungrouped.
   *
   * Grouping is deliberately expressed as a flat tag rather than by nesting
   * `elements`, because the Flutter app and every stored template read this
   * same array. Children keep absolute coordinates, so any reader that ignores
   * `groupId` — mobile, old templates, the export path — renders pixel-identical
   * output and simply doesn't offer grouping.
   */
  groupId?: string;
}

export interface TextElement extends BaseElement {
  type: 'text';
  text: string;
  fontFamily: string;
  fontSize: number;
  color: string;
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
  textAlignment: 'left' | 'center' | 'right';
  letterSpacing: number;
  lineHeight: number;
  gradientColors?: string[];
  backgroundColor?: string;
  outlineColor?: string;
  outlineWidth?: number;
  opacity: number;
}

export interface ImageElement extends BaseElement {
  type: 'image';
  imageSrc: string;
  fit: 'fill' | 'contain' | 'cover' | 'fitWidth' | 'fitHeight';
  opacity: number;
  cornerRadius: number;
  borderColor?: string;
  borderWidth?: number;
  flipHorizontal: boolean;
  flipVertical: boolean;
  cropTop: number;
  cropBottom: number;
  cropLeft: number;
  cropRight: number;
  cropShape: 'none' | 'circle' | 'roundedRect' | 'triangle' | 'star' | 'heart' | 'hexagon';
  brightness: number;
  contrast: number;
  saturation: number;
}

export type ShapeType =
  | 'rectangle'
  | 'circle'
  | 'triangle'
  | 'line'
  | 'arrow'
  | 'star'
  | 'polygon'
  | 'diamond'
  | 'heart'
  | 'hexagon'
  | 'crescent';

export interface ShapeElement extends BaseElement {
  type: 'shape';
  shapeType: ShapeType;
  fillColor: string;
  strokeColor?: string;
  strokeWidth: number;
  cornerRadius: number;
  sides?: number;
  innerRadius?: number;
  gradientColors?: string[];
  gradientStart?: string;
  gradientEnd?: string;
  opacity: number;
}

export interface StickerElement extends BaseElement {
  type: 'sticker';
  stickerType: 'emoji' | 'asset' | 'custom' | 'cursive' | 'lottie';
  content: string;
  fontFamily?: string;
  color?: string;
  gradientColors?: string[];
  imageFill?: string;
  opacity: number;
  flipHorizontal: boolean;
  flipVertical: boolean;
}

export type CanvasElement = TextElement | ImageElement | ShapeElement | StickerElement;

export interface CanvasSize {
  id: string;
  nameAr: string;
  nameEn: string;
  width: number;
  height: number;
}

export interface GradientStop {
  color: string;
  offset: number;
}

export type CanvasBackground =
  | { type: 'color'; color: string }
  | {
      type: 'gradient';
      stops: GradientStop[];
      angle: number;
    }
  | {
      type: 'image';
      src: string;
      fit: 'fill' | 'contain' | 'cover' | 'fitWidth' | 'fitHeight';
    }
  | {
      type: 'pattern';
      character: string;
      fontFamily: string;
      fontSize: number;
      spacing: number;
      rotation: number;
      color: string;
      opacity: number;
    };

export interface CanvasGroup {
  id: string;
  name?: string;
  /** Set when this group is nested inside another. */
  parentId?: string;
  isCollapsed?: boolean;
}

export interface Project {
  id: string;
  name: string;
  canvasSize: CanvasSize;
  background: CanvasBackground;
  elements: CanvasElement[];
  /** Purely additive: readers that don't know about groups ignore it. */
  groups: CanvasGroup[];
  createdAt: number;
  updatedAt: number;
  thumbnailUrl?: string;
  userId: string;
}

export type ToolName = 'select' | 'text' | 'shape' | 'image' | 'sticker' | 'background';

export const DEFAULT_CANVAS_SIZES: CanvasSize[] = [
  { id: 'square', nameAr: 'بوست مربع', nameEn: 'Square Post', width: 1080, height: 1080 },
  { id: 'story', nameAr: 'ستوري انستقرام', nameEn: 'Instagram Story', width: 1080, height: 1920 },
  { id: 'fb_post', nameAr: 'بوست فيسبوك', nameEn: 'Facebook Post', width: 1200, height: 630 },
  { id: 'x_post', nameAr: 'بوست تويتر', nameEn: 'X Post', width: 1200, height: 675 },
  { id: 'yt_thumb', nameAr: 'صورة يوتيوب', nameEn: 'YouTube Thumbnail', width: 1280, height: 720 },
  { id: 'pin', nameAr: 'بن بنترست', nameEn: 'Pinterest Pin', width: 1000, height: 1500 },
  { id: 'li_post', nameAr: 'بوست لينكدإن', nameEn: 'LinkedIn Post', width: 1200, height: 627 }
];

export function createBlankProject(userId: string, id: string): Project {
  return {
    id,
    name: 'تصميم جديد',
    canvasSize: DEFAULT_CANVAS_SIZES[0]!,
    background: { type: 'color', color: '#ffffff' },
    elements: [],
    groups: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
    userId
  };
}
