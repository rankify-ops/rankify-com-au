import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/service-page/SectionHeading";
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

  /* Ecommerce verticals — the Shopify page. */
  fashion: <path d="M9 3l3 2 3-2 5 3-2 4h-2v11H8V10H6L4 6z" strokeLinejoin="round" />,
  jewellery: (
    <>
      <path d="M6 3h12l3 6-9 12L3 9z" strokeLinejoin="round" />
      <path d="M3 9h18M9 3l-3 6 6 12 6-12-3-6" strokeLinejoin="round" />
    </>
  ),
  beauty: (
    <>
      <path d="M9 8h6v11a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2z" strokeLinejoin="round" />
      <path d="M10 8V4h4v4M12 12v4" strokeLinecap="round" />
    </>
  ),
  homewares: (
    <>
      <path d="M4 21V10l8-6 8 6v11" strokeLinejoin="round" />
      <path d="M4 15h16M9 21v-6h6v6" strokeLinejoin="round" />
    </>
  ),
  food: (
    <>
      <path d="M5 3v8a3 3 0 0 0 6 0V3M8 11v10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 3c-1.5 2-2 4-2 6s.5 3 2 3 2-1 2-3-.5-4-2-6zM17 12v9" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  supplements: (
    <>
      <path d="M8.5 3h7l-1 5h-5zM7 8h10l1 11a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2z" strokeLinejoin="round" />
      <path d="M12 12v5M9.5 14.5h5" strokeLinecap="round" />
    </>
  ),
  pets: (
    <>
      <path d="M12 13c3 0 5 2.5 5 4.8 0 1.8-1.6 2.7-3 2.2a6 6 0 0 0-4 0c-1.4.5-3-.4-3-2.2C7 15.5 9 13 12 13Z" strokeLinejoin="round" />
      <path d="M6.5 8.5h.01M17.5 8.5h.01M9.5 5.5h.01M14.5 5.5h.01" strokeLinecap="round" strokeWidth="3" />
    </>
  ),
  sporting: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3c3 3 3 15 0 18M3 12h18M5 6c4 3 10 3 14 0M5 18c4-3 10-3 14 0" strokeLinecap="round" />
    </>
  ),
  electronics: (
    <>
      <rect x="6" y="2.5" width="12" height="19" rx="2.5" />
      <path d="M10.5 18.5h3" strokeLinecap="round" />
    </>
  ),
  baby: (
    <>
      <path d="M6 8h12l-1 12a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2z" strokeLinejoin="round" />
      <path d="M9 8a3 3 0 0 1 6 0" strokeLinecap="round" />
    </>
  ),
  gifts: (
    <>
      <path d="M3 11h18v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1zM3 7.5h18V11H3zM12 7.5V21" strokeLinejoin="round" />
      <path d="M12 7.5S10.5 3 8 3a2.2 2.2 0 0 0 0 4.5zM12 7.5S13.5 3 16 3a2.2 2.2 0 0 1 0 4.5z" strokeLinejoin="round" />
    </>
  ),
  multistore: (
    <>
      <path d="M4 5h2l2.2 9.5h9L19 8H7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.5 19.5h.01M16.5 19.5h.01" strokeLinecap="round" strokeWidth="3" />
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
        <SectionHeading label={block.kicker} heading={block.heading} headingDim={block.headingDim} />

        {/* Two columns even on a phone — one column made twelve chips eat most
            of a screen. Long labels take a second line rather than shrinking
            below readable. */}
        <div className="mt-8 grid grid-cols-2 gap-2 sm:mt-12 sm:gap-3 lg:grid-cols-4">
          {block.items.map((item, i) => (
            <Reveal key={item.label} delay={Math.min(i, 7) * 0.04}>
              <span className="neu flex h-full items-center gap-2.5 rounded-xl border border-line bg-white px-3 py-3 sm:gap-3 sm:px-4 sm:py-[15px]">
                <svg
                  viewBox="0 0 24 24"
                  className="h-[18px] w-[18px] flex-none text-[color:var(--green-deep)] sm:h-5 sm:w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  {ICONS[item.icon]}
                </svg>
                <span className="text-[12.5px] font-semibold leading-tight tracking-[-0.01em] sm:text-[14.5px]">{item.label}</span>
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
