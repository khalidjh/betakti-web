// Canvas data model — mirrors the Flutter app so projects are portable.

export type TemplateCategory =
  | 'quotes'
  | 'announcements'
  | 'sales'
  | 'events'
  | 'social'
  | 'ramadan'
  | 'eid'
  | 'whatsappStatus'
  | 'graduation'
  | 'wedding'
  | 'nationalDay';

export interface CanvasSize {
  id: string;
  nameAr: string;
  nameEn: string;
  width: number;
  height: number;
}

export const CANVAS_SIZES: CanvasSize[] = [
  { id: 'ig_story', nameAr: 'ستوري انستقرام', nameEn: 'Instagram Story', width: 1080, height: 1920 },
  { id: 'square', nameAr: 'بوست مربع', nameEn: 'Square Post', width: 1080, height: 1080 },
  { id: 'fb_post', nameAr: 'بوست فيسبوك', nameEn: 'Facebook Post', width: 1200, height: 630 },
  { id: 'x_post', nameAr: 'بوست تويتر', nameEn: 'Twitter/X Post', width: 1200, height: 675 },
  { id: 'yt_thumb', nameAr: 'صورة يوتيوب', nameEn: 'YouTube Thumbnail', width: 1280, height: 720 },
  { id: 'pin', nameAr: 'بن بنترست', nameEn: 'Pinterest Pin', width: 1000, height: 1500 },
  { id: 'linkedin', nameAr: 'بوست لينكدإن', nameEn: 'LinkedIn Post', width: 1200, height: 627 },
  { id: 'tiktok', nameAr: 'فيديو تيكتوك', nameEn: 'TikTok Video', width: 1080, height: 1920 },
  { id: 'snap', nameAr: 'ستوري سناب', nameEn: 'Snapchat Story', width: 1080, height: 1920 },
  { id: 'wa_status', nameAr: 'حالة واتساب', nameEn: 'WhatsApp Status', width: 1080, height: 1920 },
];

// ---------- Backgrounds ----------
export type CanvasBackground =
  | { type: 'color'; color: string }
  | { type: 'gradient'; colors: string[]; start: string; end: string }
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

// ---------- Elements ----------
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
  cropShape:
    | 'none'
    | 'circle'
    | 'roundedRect'
    | 'triangle'
    | 'star'
    | 'heart'
    | 'hexagon';
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

export type CanvasElement =
  | TextElement
  | ImageElement
  | ShapeElement
  | StickerElement;

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

// ---------- Project ----------
export interface Project {
  id: string;
  userId: string;
  name: string;
  canvasSize: CanvasSize;
  background: CanvasBackground;
  elements: CanvasElement[];
  createdAt: number;
  updatedAt: number;
  thumbnailUrl?: string;
}

export interface DesignTemplate {
  id: string;
  nameAr: string;
  nameEn: string;
  category: TemplateCategory;
  canvasSize: CanvasSize;
  isPremium: boolean;
  section?: string;
  sectionAr?: string;
  sectionEn?: string;
  sortOrder?: number;
  isActive?: boolean;
  project: Pick<Project, 'background' | 'elements'>;
}
