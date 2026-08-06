import { Reveal } from "@/components/ui/Reveal";

export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[] }
  | { type: "contact" };

export type LegalSection = {
  heading: string;
  blocks: LegalBlock[];
};

function ContactBlock() {
  return (
    <div className="text-[15px] leading-relaxed text-[#555]">
      <p className="font-semibold text-ink">Rankify</p>
      <p>
        <a href="tel:1300880860" className="hover:underline">
          1300 880 860
        </a>
      </p>
      <p>
        <a href="mailto:hello@rankify.com.au" className="font-semibold text-ink hover:underline">
          hello@rankify.com.au
        </a>
      </p>
    </div>
  );
}

function Block({ block }: { block: LegalBlock }) {
  switch (block.type) {
    case "p":
      return <p className="text-[15px] leading-relaxed text-[#555]">{block.text}</p>;
    case "h3":
      return <h3 className="mt-1 text-[15px] font-semibold text-ink">{block.text}</h3>;
    case "list":
      return (
        <ul className="grid gap-1.5 pl-5 text-[15px] leading-relaxed text-[#555]">
          {block.items.map((item, i) => (
            <li key={i} className="list-disc">
              {item}
            </li>
          ))}
        </ul>
      );
    case "contact":
      return <ContactBlock />;
  }
}

export function LegalPageTemplate({
  title,
  lastUpdated,
  intro,
  sections,
}: {
  title: string;
  lastUpdated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <section className="mx-2 rounded-3xl bg-paper text-ink">
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-10 sm:py-24 lg:py-32">
        <Reveal>
          <h1 className="text-[clamp(40px,3.55vw,68px)] font-medium leading-[0.92] tracking-[-0.06em]">
            {title}
          </h1>
        </Reveal>

        <div className="mt-10 grid gap-10 sm:mt-16 lg:grid-cols-[minmax(200px,1fr)_2.2fr] lg:gap-16">
          <Reveal delay={0.1}>
            <span className="block text-[13px] text-grey">Last updated</span>
            <span className="mt-1 block text-[15px] font-semibold">{lastUpdated}</span>
          </Reveal>

          <div className="max-w-[720px]">
            <Reveal delay={0.05}>
              <p className="text-[15.5px] leading-relaxed text-grey">{intro}</p>
            </Reveal>

            <div className="mt-10 grid gap-10">
              {sections.map((section, i) => (
                <Reveal key={section.heading} delay={0.03 * (i % 5)}>
                  <h2 className="mb-3 text-[19px] font-semibold tracking-[-0.01em]">{section.heading}</h2>
                  <div className="grid gap-3">
                    {section.blocks.map((block, j) => (
                      <Block key={j} block={block} />
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
