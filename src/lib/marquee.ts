/**
 * The marquee keyframe shifts the track by -50%, so the loop only looks
 * seamless while one half of the track is at least as wide as the viewport.
 * Four logos at 240px is a 960px half — fine on a laptop, but on a 1920px
 * screen it drags 960px of empty track past the viewport before repeating.
 *
 * Repeat the set enough times that a half spans the widest screen we care
 * about, then the caller doubles the result to build the track.
 */
const WIDEST_VIEWPORT = 2560;

export function marqueeHalf<T>(items: T[], itemMaxWidth: number): T[] {
  const setWidth = items.length * itemMaxWidth;
  const repeats = Math.max(1, Math.ceil(WIDEST_VIEWPORT / setWidth));
  return Array.from({ length: repeats }, () => items).flat();
}
