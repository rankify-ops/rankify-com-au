import { Header } from "@/components/layout/Header";
import { ContactFooter } from "@/components/sections/ContactFooter";
import { ServiceHero } from "@/components/service-page/ServiceHero";
import { CardGridSection } from "@/components/service-page/CardGridSection";
import { MarqueeSection } from "@/components/service-page/MarqueeSection";
import { PortfolioSection } from "@/components/service-page/PortfolioSection";
import { ComparisonSection } from "@/components/service-page/ComparisonSection";
import { ConfiguratorSection } from "@/components/service-page/ConfiguratorSection";
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
        switch (block.type) {
          case "cardgrid":
            return <CardGridSection key={i} block={block} />;
          case "marquee":
            return <MarqueeSection key={i} block={block} />;
          case "portfolio":
            return <PortfolioSection key={i} block={block} />;
          case "pricing": {
            const idx = pricingIndex++;
            return <PricingBlockSection key={i} block={block} index={idx} />;
          }
          case "configurator":
            return <ConfiguratorSection key={i} block={block} />;
          case "comparison":
            return <ComparisonSection key={i} block={block} />;
          case "testimonials":
            return <Testimonials key={i} />;
          default:
            return null;
        }
      })}
      <ServiceFaq faq={data.faq} />
      <ContactFooter />
    </>
  );
}
