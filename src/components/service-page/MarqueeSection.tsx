import Image from "next/image";
import { asset } from "@/lib/basePath";
import { marqueeHalf } from "@/lib/marquee";
import type { MarqueeBlock, MarqueeVariant } from "@/content/service-pages/types";

/**
 * Two logo rows, two treatments, deliberately not sharing any sizing.
 *
 * `canvas` — the web dev page. Each logo is already positioned and scaled
 * inside a shared 1054x465 frame, so the frame does the aligning: keep it
 * whole, drop every file into an identically sized box, run them in colour.
 *
 * `ink` — the Shopify pages. Logos sized off their own artwork at a fixed
 * height, desaturated.
 *
 * The two blocks below are independent on purpose: changing one row must not
 * move the other, which is exactly what a single shared treatment kept doing.
 */
const VARIANTS: Record<
  MarqueeVariant,
  { cell: string; box: string; img: string }
> = {
  canvas: {
    cell: "w-[clamp(170px,17vw,250px)] px-5 py-6 sm:px-7 sm:py-7",
    box: "h-[clamp(48px,5.1vw,71px)] w-[85%]",
    img: "max-h-full max-w-full object-contain",
  },
  ink: {
    cell: "w-[clamp(160px,16vw,240px)] px-4 py-9",
    box: "h-[clamp(28px,3vw,42px)] w-full",
    img: "max-h-full max-w-full object-contain grayscale",
  },
};

export function MarqueeSection({ block }: { block: MarqueeBlock }) {
  const v = VARIANTS[block.variant ?? "ink"];
  // repeat enough that one half of the track spans the widest screen
  const half = marqueeHalf(block.logos, 240);
  const doubled = [...half, ...half];

  return (
    <section className="mx-2 mt-2 overflow-hidden rounded-3xl border border-line bg-white">
      {block.label && (
        <p className="px-5 pt-6 text-[13px] text-grey sm:px-10">{block.label}</p>
      )}
      <div className="flex w-max animate-[marquee_32s_linear_infinite] hover:[animation-play-state:paused]">
        {doubled.map((logo, i) => (
          <div
            key={logo.alt + i}
            className={`flex flex-none items-center justify-center border-r border-line ${v.cell}`}
          >
            <span className={`flex items-center justify-center ${v.box}`}>
              <Image
                src={asset(logo.src)}
                alt={i < block.logos.length ? logo.alt : ""}
                aria-hidden={i >= block.logos.length}
                width={logo.w ?? 160}
                height={logo.h ?? 70}
                // the track scrolls these in; lazy makes them pop
                loading="eager"
                className={v.img}
              />
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
