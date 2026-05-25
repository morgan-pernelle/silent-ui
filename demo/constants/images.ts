/**
 * Lorem Picsum — free placeholder photos (https://picsum.photos)
 */
export function imageUrl(seed: string, width: number, height: number) {
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/${width}/${height}`;
}

export const images = {
  hero: imageUrl("silent-hero", 1600, 900),
  temple: imageUrl("silent-temple", 1200, 800),
  garden: imageUrl("silent-garden", 1200, 800),
  workspace: imageUrl("silent-workspace", 1200, 800),
  architecture: imageUrl("silent-architecture", 900, 1200),
  portrait: imageUrl("silent-portrait", 400, 400),
  ink: imageUrl("silent-ink", 1200, 600),
  stone: imageUrl("silent-stone", 800, 800),
} as const;
