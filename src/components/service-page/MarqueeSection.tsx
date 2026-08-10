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
            className="flex w-[clamp(170px,17vw,250px)] flex-none items-center justify-center border-r border-line px-5 py-9 sm:px-7"
          >
            {/* Every logo is centred inside an identical box and scaled down to
                fit it. Constraining with max-height/max-width rather than a
                forced height means each keeps its own aspect — a forced height
                letterboxes anything that isn't the assumed shape, which is what
                left them sitting at different heights. */}
            <span className="flex h-[clamp(30px,3.1vw,44px)] w-full items-center justify-center">
              <Image
                src={asset(logo.src)}
                alt={i < block.logos.length ? logo.alt : ""}
                aria-hidden={i >= block.logos.length}
                width={logo.w ?? 160}
                height={logo.h ?? 70}
                // the track scrolls these in; lazy makes them pop
                loading="eager"
                className={`max-h-full max-w-full object-contain ${block.colour ? "" : "grayscale"}`}
              />
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
