import type { ShapeType } from './types';

// Normalised path data drawn on a 100x100 box; Konva Path will scale via transform.
export function shapePath(type: ShapeType): string {
  switch (type) {
    case 'diamond':
      return 'M 50 0 L 100 50 L 50 100 L 0 50 Z';
    case 'heart':
      return 'M 50 90 C 10 60, 0 30, 25 15 C 40 6, 50 20, 50 20 C 50 20, 60 6, 75 15 C 100 30, 90 60, 50 90 Z';
    case 'hexagon':
      return 'M 25 7 L 75 7 L 100 50 L 75 93 L 25 93 L 0 50 Z';
    case 'crescent':
      return 'M 80 50 A 30 30 0 1 1 30 26 A 22 22 0 1 0 80 50 Z';
    case 'triangle':
      return 'M 50 0 L 100 100 L 0 100 Z';
    default:
      return '';
  }
}

export function hasCustomPath(type: ShapeType): boolean {
  return ['diamond', 'heart', 'hexagon', 'crescent'].includes(type);
}
