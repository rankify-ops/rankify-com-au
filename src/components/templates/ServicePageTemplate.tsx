import { Header } from "@/components/layout/Header";
import { ContactFooter } from "@/components/sections/ContactFooter";
import { ServiceHero } from "@/components/service-page/ServiceHero";
import { CardGridSection } from "@/components/service-page/CardGridSection";
import { MarqueeSection } from "@/components/service-page/MarqueeSection";
import { PortfolioSection } from "@/components/service-page/PortfolioSection";
import { ComparisonSection } from "@/components/service-page/ComparisonSection";
import { ConfiguratorSection } from "@/components/service-page/ConfiguratorSection";
import { IndustriesSection } from "@/components/service-page/IndustriesSection";
import { PricingBlockSection } from "@/components/service-page/PricingBlockSection";
import { ServiceFaq } from "@/components/service-page/ServiceFaq";
import { Testimonials } from "@/components/sections/Testimonials";
import type { ServicePageData } from "@/content/service-pages/types";

export function ServicePageTemplate({ data }: { data: ServicePageData }) {
  let pricingIndex = 0;

  return (
    <>
      <Header />
      <ServiceHero hero={data.hero} />
      {data.blocks.map((block, i) => {
        // A flush block sits against the one above it, so that one has to give
        // up its bottom rounding or the join shows two curved notches.
        const next = data.blocks[i + 1];
        const mergeNext = next?.type === "cardgrid" && next.flush === true;

        switch (block.type) {
          case "cardgrid":
            return <CardGridSection key={i} block={block} mergeNext={mergeNext} />;
          case "marquee":
            return <MarqueeSection key={i} block={block} />;
          case "portfolio":
            return <PortfolioSection key={i} block={block} />;
          case "pricing": {
            const idx = pricingIndex++;
            return <PricingBlockSection key={i} block={block} index={idx} />;
          }
          case "industries":
            return <IndustriesSection key={i} block={block} mergeNext={mergeNext} />;
          case "configurator":
            return <ConfiguratorSection key={i} block={block} />;
          case "comparison":
            return <ComparisonSection key={i} block={block} />;
          case "testimonials":
            return (
              <Testimonials
                key={i}
                bare={block.bare}
                kicker={block.kicker}
                eyebrow={block.eyebrow}
                heading={block.heading}
                headingDim={block.headingDim}
              />
            );
          default:
            return null;
        }
      })}
      <ServiceFaq faq={data.faq} />
      <ContactFooter />
    </>
  );
}
