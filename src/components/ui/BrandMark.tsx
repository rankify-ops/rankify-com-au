/**
 * Real brand marks, in the brands' own colours.
 *
 * The cards used to carry hand-drawn line icons -- a megaphone for Ad
 * Sidekick, a generic bag for Shopify, a reticle for Google Ads. The repo's
 * existing partner SVGs could not stand in: they are Simple Icons, single
 * monochrome paths flattened to #ffffff for the dark hero, so Meta's
 * gradient, Shopify's white S and Google Ads' three colours do not survive
 * in them, and the Google file is the Google "G" rather than Google Ads at
 * all.
 *
 * So these are the published marks. No path here was typed out by hand --
 * BrandMark.tsx is generated from the downloaded files, because a logo
 * redrawn from memory is a trademark reproduced wrongly.
 *
 * Shopify ships only a lockup, so the bag is the lockup with the wordmark
 * path dropped and the viewBox tightened to the glyph's own bounding box,
 * measured in the browser rather than guessed.
 *
 * Each sits in a neutral tile, not the green-tinted one the line icons use:
 * a green wash under Meta blue and Shopify green muddies both.
 */

/**
 * 29px, not the 26px the others use.
 *
 * Meta's mark is wide and short (287x191), so a square box letterboxes it:
 * at a shared size it paints about a quarter less ink than Shopify or
 * Google Ads, which reads as a smaller logo rather
 * than a wider one. Sized by painted area, measured, not guessed.
 */
export function MetaMark({ className = "h-[29px] w-[29px]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 287.56 191" className={className} role="img" aria-label="Meta">
      <defs>
        <linearGradient id="rk-meta-a" x1="61" y1="117" x2="259" y2="127" gradientUnits="userSpaceOnUse">
<stop stopColor="#0064e1" offset="0" />
<stop stopColor="#0064e1" offset="0.4" />
<stop stopColor="#0073ee" offset="0.83" />
<stop stopColor="#0082fb" offset="1" />
</linearGradient>
        <linearGradient id="rk-meta-b" x1="45" y1="139" x2="45" y2="66" gradientUnits="userSpaceOnUse">
<stop stopColor="#0082fb" offset="0" />
<stop stopColor="#0064e0" offset="1" />
</linearGradient>
      </defs>
      <path fill="#0081fb" d="m31.06,125.96c0,10.98 2.41,19.41 5.56,24.51 4.13,6.68 10.29,9.51 16.57,9.51 8.1,0 15.51-2.01 29.79-21.76 11.44-15.83 24.92-38.05 33.99-51.98l15.36-23.6c10.67-16.39 23.02-34.61 37.18-46.96 11.56-10.08 24.03-15.68 36.58-15.68 21.07,0 41.14,12.21 56.5,35.11 16.81,25.08 24.97,56.67 24.97,89.27 0,19.38-3.82,33.62-10.32,44.87-6.28,10.88-18.52,21.75-39.11,21.75l0-31.02c17.63,0 22.03-16.2 22.03-34.74 0-26.42-6.16-55.74-19.73-76.69-9.63-14.86-22.11-23.94-35.84-23.94-14.85,0-26.8,11.2-40.23,31.17-7.14,10.61-14.47,23.54-22.7,38.13l-9.06,16.05c-18.2,32.27-22.81,39.62-31.91,51.75-15.95,21.24-29.57,29.29-47.5,29.29-21.27,0-34.72-9.21-43.05-23.09-6.8-11.31-10.14-26.15-10.14-43.06z" />
      <path fill="url(#rk-meta-a)" d="m24.49,37.3c14.24-21.95 34.79-37.3 58.36-37.3 13.65,0 27.22,4.04 41.39,15.61 15.5,12.65 32.02,33.48 52.63,67.81l7.39,12.32c17.84,29.72 27.99,45.01 33.93,52.22 7.64,9.26 12.99,12.02 19.94,12.02 17.63,0 22.03-16.2 22.03-34.74l27.4-.86c0,19.38-3.82,33.62-10.32,44.87-6.28,10.88-18.52,21.75-39.11,21.75-12.8,0-24.14-2.78-36.68-14.61-9.64-9.08-20.91-25.21-29.58-39.71l-25.79-43.08c-12.94-21.62-24.81-37.74-31.68-45.04-7.39-7.85-16.89-17.33-32.05-17.33-12.27,0-22.69,8.61-31.41,21.78z" />
      <path fill="url(#rk-meta-b)" d="m82.35,31.23c-12.27,0-22.69,8.61-31.41,21.78-12.33,18.61-19.88,46.33-19.88,72.95 0,10.98 2.41,19.41 5.56,24.51l-26.48,17.44c-6.8-11.31-10.14-26.15-10.14-43.06 0-30.75 8.44-62.8 24.49-87.55 14.24-21.95 34.79-37.3 58.36-37.3z" />
    </svg>
  );
}

export function ShopifyMark({ className = "h-[26px] w-[26px]" }: { className?: string }) {
  return (
    <svg viewBox="-0.1 308.7 150.2 170.7" className={className} role="img" aria-label="Shopify">
      <path fill="#95BF47" d="M131.5 341.9c-.1-.9-.9-1.3-1.5-1.3s-13.7-1-13.7-1-9.1-9.1-10.2-10c-1-1-2.9-.7-3.7-.5-.1 0-2 .6-5.1 1.6-3.1-8.9-8.4-17-17.9-17h-.9c-2.6-3.4-6-5-8.8-5-22 0-32.6 27.5-35.9 41.5-8.6 2.7-14.7 4.5-15.4 4.8-4.8 1.5-4.9 1.6-5.5 6.1-.5 3.4-13 100.1-13 100.1l97.3 18.2L150 468c.1-.2-18.4-125.2-18.5-126.1zm-39.6-9.8c-2.4.7-5.3 1.6-8.2 2.6v-1.8c0-5.4-.7-9.8-2-13.3 5 .6 8.1 6.1 10.2 12.5zm-16.3-11.4c1.3 3.4 2.2 8.2 2.2 14.8v1c-5.4 1.7-11.1 3.4-17 5.3 3.3-12.6 9.6-18.8 14.8-21.1zm-6.4-6.2c1 0 2 .4 2.8 1-7.1 3.3-14.6 11.6-17.7 28.4-4.7 1.5-9.2 2.8-13.5 4.2 3.6-12.8 12.6-33.6 28.4-33.6z" />
      <path fill="#5E8E3E" d="M130 340.4c-.6 0-13.7-1-13.7-1s-9.1-9.1-10.2-10c-.4-.4-.9-.6-1.3-.6l-7.3 150.6 52.8-11.4s-18.5-125.2-18.6-126.1c-.4-.9-1.1-1.3-1.7-1.5z" />
      <path fill="#FFF" d="M79.4 369.6L73 388.9s-5.8-3.1-12.7-3.1c-10.3 0-10.8 6.5-10.8 8.1 0 8.8 23 12.2 23 32.9 0 16.3-10.3 26.8-24.2 26.8-16.8 0-25.2-10.4-25.2-10.4l4.5-14.8s8.8 7.6 16.2 7.6c4.9 0 6.9-3.8 6.9-6.6 0-11.5-18.8-12-18.8-31 0-15.9 11.4-31.3 34.5-31.3 8.6-.1 13 2.5 13 2.5z" />
    </svg>
  );
}

export function GoogleAdsMark({ className = "h-[26px] w-[26px]" }: { className?: string }) {
  return (
    <svg viewBox="0 -13 256 256" className={className} role="img" aria-label="Google Ads">
      <path fill="#FBBC04" d="M5.888,166.405103 L90.88,20.9 C101.676138,27.2558621 156.115862,57.3844138 164.908138,63.1135172 L79.9161379,208.627448 C70.6206897,220.906621 -5.888,185.040138 5.888,166.396276 L5.888,166.405103 Z" />
      <path fill="#4285F4" d="M250.084224,166.401789 L165.092224,20.9055131 C153.210293,1.13172 127.619121,-6.05393517 106.600638,5.62496138 C85.582155,17.3038579 79.182155,42.4624786 91.0640861,63.1190303 L176.056086,208.632961 C187.938017,228.397927 213.52919,235.583582 234.547672,223.904686 C254.648086,212.225789 261.966155,186.175582 250.084224,166.419444 L250.084224,166.401789 Z" />
      <ellipse fill="#34A853" cx="42.6637241" cy="187.924414" rx="42.6637241" ry="41.6044138" />
    </svg>
  );
}
