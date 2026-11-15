import Image from "next/image";
import { asset } from "@/lib/basePath";
import { marqueeHalf } from "@/lib/marquee";

/**
 * The tools strip.
 *
 * Every alt here used to be shifted one place against the file it labelled,
 * so all six logos were announced under the wrong name — the WordPress mark
 * read as "Zapier", the Semrush one as "WordPress", and so on. The names
 * below were read off the images themselves, not carried over.
 *
 * WordPress (935oTCNWEsRDajn00ZIGGiGBdK8.webp) is deliberately left out: it
 * led the row with the one platform Tom would rather not be hired for, and
 * this strip is what visitors ask about. The file is still in
 * public/assets/images if it ever comes back.
 */
const LOGOS = [
  { src: "/assets/images/FOGjLSJec0TAQCAifujN9P3s.webp", alt: "Semrush" },
  { src: "/assets/images/R2XUvEl0vRM2jpzdgyV94NyIg.webp", alt: "Shopify Partner" },
  { src: "/assets/images/O8CbTI7JLhPRInNgXH6yrfNQ8E.webp", alt: "Zapier" },
  { src: "/assets/images/itYXCWTMEyLhUl5y8mb9eKNL4mY.webp", alt: "Framer" },
  { src: "/assets/images/TlTduHTU6bMglqZ83e07N9PIzUc.webp", alt: "Google Analytics" },
];

export function Marquee() {
  // repeat enough that one half of the track spans the widest screen
  const half = marqueeHalf(LOGOS, 240);
  const doubled = [...half, ...half];
  return (
    <section aria-label="Tools and platforms we work with" className="overflow-hidden border-y border-line bg-white">
      <div className="flex w-max animate-[marquee_36s_linear_infinite] hover:[animation-play-state:paused]">
        {doubled.map((logo, i) => (
          <div
            key={logo.alt + i}
            className="flex w-[clamp(160px,16vw,240px)] flex-none items-center justify-center border-r border-line px-4 py-9"
          >
            {/* Bounded box rather than a raw height, so every logo lands on
                the same optical line whatever its aspect — the same geometry
                the service-page marquee uses. Was rendering at 84px tall
                against the Shopify page's 42px. */}
            <span className="flex h-[clamp(28px,3vw,42px)] w-full items-center justify-center">
              <Image
                src={asset(logo.src)}
                alt={i < LOGOS.length ? logo.alt : ""}
                aria-hidden={i >= LOGOS.length}
                width={200}
                height={96}
                // the track scrolls these in; lazy makes them pop
                loading="eager"
                className="max-h-full max-w-full object-contain"
              />
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
