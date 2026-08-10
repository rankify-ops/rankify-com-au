import { Reveal } from "@/components/ui/Reveal";
import { PlusIcon } from "@/components/ui/PlusIcon";
import type { IndustriesBlock, IndustryIcon } from "@/content/service-pages/types";

/* Paths lifted from the Adalytical lead-gen page so the two stay recognisably
   the same section. */
const ICONS: Record<IndustryIcon, React.ReactNode> = {
  trades: <path d="M14.5 5.5a3.5 3.5 0 0 0-4.9 4.9L4 16v4h4l5.6-5.6a3.5 3.5 0 0 0 4.9-4.9L16 12l-2-2z" strokeLinejoin="round" />,
  plumbing: <path d="M8 4v5a4 4 0 0 0 8 0V4M12 13v7M8 20h8" strokeLinecap="round" strokeLinejoin="round" />,
  electrical: <path d="M13 2 4 14h6l-1 8 9-12h-6z" strokeLinejoin="round" />,
  hvac: <path d="M3 12a9 9 0 0 1 18 0M6 12v6M12 12v6M18 12v6" strokeLinecap="round" />,
  cleaning: (
    <>
      <path d="M4 20l6-6M14 4l6 6-9 9-6-6z" strokeLinejoin="round" />
      <path d="M14 4l2-2 4 4-2 2" strokeLinejoin="round" />
    </>
  ),
  landscaping: <path d="M12 3v18M7 8c0-3 10-3 10 0M7 16c0 3 10 3 10 0" strokeLinecap="round" />,
  accounting: <path d="M3 3v18h18M7 14l4-4 3 3 5-6" strokeLinecap="round" strokeLinejoin="round" />,
  legal: <path d="M12 3v18M5 7h14M6 7l-2 6a3 3 0 0 0 6 0zM18 7l-2 6a3 3 0 0 0 6 0z" strokeLinejoin="round" />,
  dental: (
    <>
      <path d="M9 3v6c0 3-2 4-2 7a5 5 0 0 0 10 0c0-3-2-4-2-7V3z" strokeLinejoin="round" />
      <path d="M9 3h6" strokeLinecap="round" />
    </>
  ),
  medical: (
    <>
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
      <circle cx="12" cy="12" r="9" />
    </>
  ),
  realestate: (
    <>
      <path d="M4 20V9l8-5 8 5v11" strokeLinejoin="round" />
      <path d="M9 20v-6h6v6" strokeLinejoin="round" />
    </>
  ),
  finance: (
    <>
      <path d="M3 21h18M6 21V8l6-4 6 4v13" strokeLinejoin="round" />
      <path d="M10 21v-5h4v5" strokeLinejoin="round" />
    </>
  ),
};

export function IndustriesSection({ block }: { block: IndustriesBlock }) {
  return (
    <section
      id={block.anchorId}
      className="mx-2 mt-8 scroll-mt-24 rounded-3xl bg-paper text-ink sm:mt-12 lg:mt-20"
    >
      <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-10 sm:py-16 lg:py-20">
        {/* Same header shape as the card grids — kicker left, title right. */}
        <div className="grid gap-8 lg:grid-cols-[minmax(180px,1fr)_2.2fr] lg:gap-20">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-[15px] font-medium">
              <PlusIcon dark className="h-[18px] w-[18px]" />
              {block.kicker}
            </span>
          </Reveal>
          <div>
            <Reveal>
              <p className="mb-3.5 font-semibold text-grey">{block.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-[clamp(32px,3.1vw,58px)] font-medium leading-[0.96] tracking-[-0.05em]">
                {block.heading} <span className="text-grey">{block.headingDim}</span>
              </h2>
            </Reveal>
          </div>
        </div>

        <div className="mt-8 grid gap-2.5 sm:mt-12 sm:grid-cols-2 sm:gap-3 lg:grid-cols-4">
          {block.items.map((item, i) => (
            <Reveal key={item.label} delay={Math.min(i, 7) * 0.04}>
              <span className="neu flex items-center gap-3 rounded-xl border border-line bg-white px-4 py-[15px]">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 flex-none text-[color:var(--green-deep)]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  {ICONS[item.icon]}
                </svg>
                <span className="text-[14.5px] font-semibold tracking-[-0.01em]">{item.label}</span>
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
