import Image from "next/image";
import { asset } from "@/lib/basePath";
import type { MarqueeBlock } from "@/content/service-pages/types";

export function MarqueeSection({ block }: { block: MarqueeBlock }) {
  const doubled = [...block.logos, ...block.logos];
  return (
    <section className="mx-2 mt-2 overflow-hidden rounded-3xl border border-line bg-white">
      {block.label && (
        <p className="px-5 pt-6 text-[13px] text-grey sm:px-10">{block.label}</p>
      )}
      <div className="flex w-max animate-[marquee_32s_linear_infinite] hover:[animation-play-state:paused]">
        {doubled.map((logo, i) => (
          <div
            key={logo.alt + i}
            className="flex w-[clamp(160px,16vw,240px)] flex-none items-center justify-center border-r border-line py-9"
          >
            <Image
              src={asset(logo.src)}
              alt={i < block.logos.length ? logo.alt : ""}
              aria-hidden={i >= block.logos.length}
              width={160}
              height={70}
              // the track scrolls these in; lazy makes them pop
              loading="eager"
              className="h-[clamp(28px,3vw,42px)] w-auto object-contain grayscale"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
