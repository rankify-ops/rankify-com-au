import type { Metadata } from "next";
import { JsonLd, faqSchema, serviceSchema } from "@/lib/schema";
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate";
import { seo } from "@/content/service-pages/seo";
import { SEO_PER_PAGE, SEO_PER_PAGE_AMOUNT, SEO_MINIMUM_MONTHS } from "@/content/pricing.generated";

export const metadata: Metadata = {
  title: `SEO for Google, Maps and AI Search | ${SEO_PER_PAGE} Per Page | Rankify`,
  description:
    "SEO priced per page, not as an open-ended retainer. Local and Google Maps, search engines and AI chatbot results, with reporting on rankings, traffic and leads.",
  alternates: { canonical: "/seo" },
  openGraph: {
    title: `SEO for Google, Maps and AI Search | ${SEO_PER_PAGE} Per Page | Rankify`,
    description:
      `SEO priced per page, not as an open-ended retainer. Local, Google and AI search, reported in leads. ${SEO_MINIMUM_MONTHS} month minimum.`,
    url: "https://www.rankify.com.au/seo",
    type: "website",
  },
};

export default function SeoPage() {
  return (
    <>
      <JsonLd data={serviceSchema({ name: "SEO Services", description: "SEO priced per page rather than as an open-ended retainer.", path: "/seo", price: SEO_PER_PAGE_AMOUNT, unit: `${SEO_PER_PAGE} per page per month, ${SEO_MINIMUM_MONTHS} month minimum` })} />
      <JsonLd data={faqSchema(seo.faq.items)} />
      <ServicePageTemplate data={seo} />
    </>
  );
}
