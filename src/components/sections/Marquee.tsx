import Image from "next/image";
import { asset } from "@/lib/basePath";

const LOGOS = [
  { src: "/assets/images/FOGjLSJec0TAQCAifujN9P3s.webp", alt: "WordPress" },
  { src: "/assets/images/R2XUvEl0vRM2jpzdgyV94NyIg.webp", alt: "Google Analytics" },
  { src: "/assets/images/O8CbTI7JLhPRInNgXH6yrfNQ8E.webp", alt: "Semrush" },
  { src: "/assets/images/itYXCWTMEyLhUl5y8mb9eKNL4mY.webp", alt: "Shopify Partner" },
  { src: "/assets/images/935oTCNWEsRDajn00ZIGGiGBdK8.webp", alt: "Zapier" },
  { src: "/assets/images/TlTduHTU6bMglqZ83e07N9PIzUc.webp", alt: "Framer" },
];

export function Marquee() {
  const doubled = [...LOGOS, ...LOGOS];
  return (
    <section aria-label="Tools and platforms we work with" className="overflow-hidden border-y border-line bg-white">
      <div className="flex w-max animate-[marquee_36s_linear_infinite] hover:[animation-play-state:paused]">
        {doubled.map((logo, i) => (
          <div
            key={logo.alt + i}
            className="flex w-[clamp(180px,18vw,268px)] flex-none items-center justify-center border-r border-line py-10"
          >
            <Image
              src={asset(logo.src)}
              alt={i < LOGOS.length ? logo.alt : ""}
              aria-hidden={i >= LOGOS.length}
              width={200}
              height={96}
              className="h-[clamp(56px,6vw,96px)] w-auto object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
