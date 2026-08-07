import { Reveal } from "@/components/ui/Reveal";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import type { ServicePageData } from "@/content/service-pages/types";

export function ServiceFaq({ faq }: { faq: ServicePageData["faq"] }) {
  return (
    <section id="faq" className="mx-2 mt-12 scroll-mt-24 rounded-3xl bg-paper text-ink sm:mt-24 lg:mt-48">
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-10 sm:py-24 lg:py-32">
        <div className="grid gap-10 lg:grid-cols-[minmax(220px,1fr)_2.2fr] lg:gap-16">
          <div>
            <Reveal>
              <h2 className="text-[clamp(40px,3.55vw,68px)] font-medium leading-[0.92] tracking-[-0.06em]">
                {faq.heading}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 max-w-[300px] text-grey">{faq.subheading}</p>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <Accordion type="single" collapsible defaultValue="faq-0" className="gap-3">
              {faq.items.map((f, i) => (
                <AccordionItem
                  key={f.q}
                  value={`faq-${i}`}
                  className="mb-3 overflow-hidden rounded-xl border border-line bg-white px-6"
                >
                  <AccordionTrigger className="py-5 text-[clamp(16px,1.2vw,19px)] font-semibold tracking-[-0.01em] hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="max-w-[720px] text-[15.5px] text-[#555]">{f.a}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>

        {faq.closingNote && (
          <Reveal delay={0.15} className="mt-16 grid gap-6 border-t border-line pt-10 lg:grid-cols-[minmax(220px,1fr)_2.2fr] lg:gap-16 sm:mt-24">
            <span className="inline-flex items-center gap-2 text-[15px] font-medium">What else?</span>
            <p className="max-w-[640px] text-[17px] font-medium leading-snug text-grey">{faq.closingNote}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
