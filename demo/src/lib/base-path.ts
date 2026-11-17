/**
 * Base path the demo is served under. Empty for local development at the root;
 * "/demo" for the build published at mrbestcars.ca/demo (set by `npm run build:live`).
 * Next.js adds it to <Link> hrefs and its own assets automatically; use `asset()`
 * for raw paths from content (images, video, icons) that Next does not rewrite.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export function asset(src: string): string;
export function asset(src: string | undefined): string | undefined;
export function asset(src: string | undefined): string | undefined {
  if (!src || !src.startsWith('/') || src.startsWith('//')) return src;
  return `${BASE_PATH}${src}`;
}
