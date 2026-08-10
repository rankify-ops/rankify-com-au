import Image from "next/image";
import { asset } from "@/lib/basePath";
import { marqueeHalf } from "@/lib/marquee";
import type { MarqueeBlock } from "@/content/service-pages/types";

export function MarqueeSection({ block }: { block: MarqueeBlock }) {
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
            className="flex w-[clamp(160px,16vw,240px)] flex-none items-center justify-center border-r border-line px-5 py-9 sm:px-7"
          >
            <Image
              src={asset(logo.src)}
              alt={i < block.logos.length ? logo.alt : ""}
              aria-hidden={i >= block.logos.length}
              width={160}
              height={70}
              // the track scrolls these in; lazy makes them pop
              loading="eager"
              // max-w so a very wide wordmark shrinks to the cell instead of
              // bleeding into its neighbour; object-contain keeps the aspect
              className="h-[clamp(28px,3vw,42px)] w-auto max-w-full object-contain grayscale"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
