import type { ImageMetadata } from 'astro';

const modules = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/images/*.{jpg,png}',
  { eager: true },
);

export const images: Record<string, ImageMetadata> = Object.fromEntries(
  Object.entries(modules).map(([path, mod]) => [path.split('/').pop()!, mod.default]),
);

export function img(name: string): ImageMetadata {
  const found = images[name];
  if (!found) throw new Error(`Image not found in src/assets/images: ${name}`);
  return found;
}
