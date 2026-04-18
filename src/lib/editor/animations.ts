'use client';

import type { CanvasElement, ElementAnimation } from '@/lib/types/canvas';

// Returns a style transform for a given element at a given playback time `t` (ms).
// Used for GIF frame rendering as well as runtime preview.
export interface AnimationFrame {
  translateX: number;
  translateY: number;
  scale: number;
  rotate: number; // degrees
  opacity: number;
  visible: boolean;
}

const IDENTITY: AnimationFrame = {
  translateX: 0,
  translateY: 0,
  scale: 1,
  rotate: 0,
  opacity: 1,
  visible: true,
};

function easing(t: number, kind: ElementAnimation['easing']): number {
  switch (kind) {
    case 'linear':
      return t;
    case 'easeIn':
      return t * t;
    case 'easeOut':
      return 1 - (1 - t) * (1 - t);
    case 'easeInOut':
      return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    case 'bounceOut': {
      const n1 = 7.5625;
      const d1 = 2.75;
      if (t < 1 / d1) return n1 * t * t;
      if (t < 2 / d1) return n1 * (t -= 1.5 / d1) * t + 0.75;
      if (t < 2.5 / d1) return n1 * (t -= 2.25 / d1) * t + 0.9375;
      return n1 * (t -= 2.625 / d1) * t + 0.984375;
    }
    case 'elasticOut':
      return t === 0 || t === 1
        ? t
        : Math.pow(2, -10 * t) * Math.sin(((t - 0.1) * (2 * Math.PI)) / 0.4) + 1;
    default:
      return t;
  }
}

export function animationFrame(
  el: CanvasElement,
  nowMs: number,
  canvasWidth: number,
  canvasHeight: number,
): AnimationFrame {
  const a = el.animation;
  if (!a) return IDENTITY;

  const effective = a.loop
    ? ((nowMs - a.delay) % (a.duration || 1)) / (a.duration || 1)
    : Math.max(0, Math.min(1, (nowMs - a.delay) / (a.duration || 1)));
  if (nowMs < a.delay) return { ...IDENTITY, opacity: 0, visible: false };

  const p = easing(effective, a.easing);
  const f: AnimationFrame = { ...IDENTITY };

  switch (a.type) {
    case 'fadeIn':
      f.opacity = p;
      break;
    case 'fadeOut':
      f.opacity = 1 - p;
      break;
    case 'slideInLeft':
      f.translateX = -canvasWidth * (1 - p);
      f.opacity = p;
      break;
    case 'slideInRight':
      f.translateX = canvasWidth * (1 - p);
      f.opacity = p;
      break;
    case 'slideInTop':
      f.translateY = -canvasHeight * (1 - p);
      f.opacity = p;
      break;
    case 'slideInBottom':
      f.translateY = canvasHeight * (1 - p);
      f.opacity = p;
      break;
    case 'scaleIn':
      f.scale = p;
      f.opacity = p;
      break;
    case 'scaleOut':
      f.scale = 1 + p * 0.5;
      f.opacity = 1 - p;
      break;
    case 'bounceIn':
      f.scale = p;
      f.opacity = Math.min(1, p * 2);
      break;
    case 'rotateIn':
      f.rotate = -180 * (1 - p);
      f.opacity = p;
      break;
    case 'pulse':
      f.scale = 1 + Math.sin(p * Math.PI * 2) * 0.1;
      break;
    case 'shake':
      f.translateX = Math.sin(p * Math.PI * 6) * 10;
      break;
    case 'typewriter':
      // Approximate: treat as fade-in for GIF purposes.
      f.opacity = p;
      break;
  }
  return f;
}

export function hasAnimations(elements: CanvasElement[]): boolean {
  return elements.some((e) => !!e.animation);
}

export function totalAnimationDuration(elements: CanvasElement[]): number {
  let max = 0;
  for (const el of elements) {
    if (!el.animation) continue;
    const end = el.animation.delay + el.animation.duration;
    if (end > max) max = end;
    if (el.animation.loop && el.animation.duration > max) max = el.animation.duration;
  }
  return Math.max(max, 1000);
}
