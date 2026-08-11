export interface UnsplashOptions {
  width: number;
  height?: number;
  quality?: number;
  blur?: number;
}

export function unsplashUrl(photoId: string, options: UnsplashOptions): string {
  const params = new URLSearchParams({
    auto: "format",
    fit: "crop",
    w: String(options.width),
    q: String(options.quality ?? 80),
  });

  if (options.height) {
    params.set("h", String(options.height));
  }

  if (options.blur && options.blur > 0) {
    params.set("blur", String(options.blur));
  }

  return `https://images.unsplash.com/photo-${photoId}?${params.toString()}`;
}

export const HERO_LAYERS = {
  background: "1558591710-4b4a1ae0f04d",
  middle: "1611532736597-de2d4265fba3",
  foreground: "1471666875520-c75081f42081",
} as const;

export const ABOUT_IMAGE = "1493421419110-74f4e85ba126";
