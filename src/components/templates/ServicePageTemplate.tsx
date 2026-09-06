import { Header } from "@/components/layout/Header";
import { ContactFooter } from "@/components/sections/ContactFooter";
import { ServiceHero } from "@/components/service-page/ServiceHero";
import { CardGridSection } from "@/components/service-page/CardGridSection";
import { MarqueeSection } from "@/components/service-page/MarqueeSection";
import { PortfolioSection } from "@/components/service-page/PortfolioSection";
import { ComparisonSection } from "@/components/service-page/ComparisonSection";
import { ServiceProjects } from "@/components/service-page/ServiceProjects";
import { GuaranteeSection } from "@/components/service-page/GuaranteeSection";
import { QuoteBand } from "@/components/service-page/QuoteBand";
import { CaseStudyRow } from "@/components/service-page/CaseStudyRow";
import { PartnerCard } from "@/components/service-page/PartnerCard";
import { DevCard } from "@/components/service-page/DevCard";
import { ConfiguratorSection } from "@/components/service-page/ConfiguratorSection";
import { IndustriesSection } from "@/components/service-page/IndustriesSection";
import { PricingBlockSection } from "@/components/service-page/PricingBlockSection";
import { ServiceFaq } from "@/components/service-page/ServiceFaq";
import { Testimonials } from "@/components/sections/Testimonials";
import type { ServicePageData } from "@/content/service-pages/types";

/**
 * Renders a service page's block stack.
 *
 * Split out of the template so the paid landing page can show the *same*
 * sections rather than reimplementing thinner versions of them — a second copy
 * of this switch would drift from this one within a week.
 */
export function ServiceBlocks({ blocks }: { blocks: ServicePageData["blocks"] }) {
  let pricingIndex = 0;

  return (
    <>
      {blocks.map((block, i) => {
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
          case "industries":
            return <IndustriesSection key={i} block={block} />;
          case "configurator":
            return <ConfiguratorSection key={i} block={block} />;
          case "comparison":
            return <ComparisonSection key={i} block={block} />;
          case "projects":
            return <ServiceProjects key={i} block={block} />;
          case "guarantee":
            return <GuaranteeSection key={i} block={block} />;
          case "quote":
            return <QuoteBand key={i} block={block} />;
          case "casestudyrow":
            return <CaseStudyRow key={i} block={block} />;
          case "partner":
            return <PartnerCard key={i} block={block} />;
          case "devcard":
            return <DevCard key={i} block={block} />;
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
    </>
  );
}

export function ServicePageTemplate({ data }: { data: ServicePageData }) {
  return (
    <>
      <Header />
      <ServiceHero hero={data.hero} />
      <ServiceBlocks blocks={data.blocks} />
      <ServiceFaq faq={data.faq} />
      <ContactFooter />
    </>
  );
}
