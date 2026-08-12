import Image from "next/image";
import { asset } from "@/lib/basePath";
import { marqueeHalf } from "@/lib/marquee";

const LOGOS = [
  { src: "/assets/images/FOGjLSJec0TAQCAifujN9P3s.webp", alt: "WordPress" },
  { src: "/assets/images/R2XUvEl0vRM2jpzdgyV94NyIg.webp", alt: "Google Analytics" },
  { src: "/assets/images/O8CbTI7JLhPRInNgXH6yrfNQ8E.webp", alt: "Semrush" },
  { src: "/assets/images/itYXCWTMEyLhUl5y8mb9eKNL4mY.webp", alt: "Shopify Partner" },
  { src: "/assets/images/935oTCNWEsRDajn00ZIGGiGBdK8.webp", alt: "Zapier" },
  { src: "/assets/images/TlTduHTU6bMglqZ83e07N9PIzUc.webp", alt: "Framer" },
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
