import Image from "next/image";
import { asset } from "@/lib/basePath";
import { Reveal } from "@/components/ui/Reveal";
import type { PortfolioBlock } from "@/content/service-pages/types";

export function PortfolioSection({ block }: { block: PortfolioBlock }) {
  return (
    <section className="mx-2 mt-12 sm:mt-24 lg:mt-48 rounded-3xl bg-paper text-ink">
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-10 sm:py-24 lg:py-32">
        <div className="mb-10 grid gap-6 sm:mb-16 lg:mb-24">
          {block.eyebrow && (
            <Reveal>
              <span className="block text-[clamp(24px,2vw,38px)] font-medium tracking-[-0.04em] text-[#b5b5b5]">
                {block.eyebrow}
              </span>
            </Reveal>
          )}
          <Reveal delay={0.15}>
            <h2 className="text-[clamp(40px,3.55vw,68px)] font-medium leading-[0.92] tracking-[-0.06em]">
              {block.heading}
            </h2>
          </Reveal>
          {block.subheading && (
            <Reveal delay={0.1}>
              <span className="block max-w-[380px] text-base text-grey">{block.subheading}</span>
            </Reveal>
          )}
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {block.items.map((p, i) => {
            const content = (
              <>
                <div className="relative aspect-[4/3.4] overflow-hidden rounded-2xl bg-[#e9e9e9]">
                  <Image src={asset(p.image)} alt={`${p.name} website`} fill className="object-cover" />
                  {p.logo && (
                    <Image
                      src={asset(p.logo)}
                      alt=""
                      width={180}
                      height={180}
                      className="absolute inset-0 z-[2] m-auto w-[clamp(100px,12vw,180px)] h-auto drop-shadow-[0_6px_24px_rgba(0,0,0,0.25)]"
                    />
                  )}
                </div>
                <div className="flex items-baseline gap-3.5 pt-4 text-sm text-grey">
                  <strong className="mr-auto text-[clamp(20px,1.6vw,28px)] font-semibold tracking-[-0.03em] text-ink">
                    {p.name}
                  </strong>
                  <span>{p.sub}</span>
                </div>
              </>
            );
            return (
              <Reveal key={p.name} delay={i * 0.1}>
                {p.href ? (
                  <a href={p.href} target="_blank" rel="noopener noreferrer" className="group block">
                    {content}
                  </a>
                ) : (
                  <div>{content}</div>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
