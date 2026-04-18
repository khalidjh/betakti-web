import type { CanvasBackground, CanvasSize, Project } from './types/canvas';

export function emptyProject(
  userId: string,
  canvasSize: CanvasSize,
  name: string = 'تصميم جديد',
): Omit<Project, 'id' | 'createdAt' | 'updatedAt'> {
  const background: CanvasBackground = { type: 'color', color: '#ffffff' };
  return { userId, name, canvasSize, background, elements: [] };
}
