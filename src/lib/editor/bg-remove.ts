'use client';

export async function removeBackground(imageSrc: string): Promise<string> {
  const { removeBackground } = await import('@imgly/background-removal');
  const blob = await removeBackground(imageSrc);
  return URL.createObjectURL(blob);
}
