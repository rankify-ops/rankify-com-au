import type { Metadata } from "next";
import { JsonLd, faqSchema, serviceSchema } from "@/lib/schema";
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate";
import { webDesignAndDevelopment } from "@/content/service-pages/web-design-and-development";
import { WEBSITE_FROM, HOSTING_PER_YEAR } from "@/content/pricing.generated";

export const metadata: Metadata = {
  title: `Web Design & Development | Websites from ${WEBSITE_FROM} | Rankify`,
  description:
    `Custom-built websites that convert, from ${WEBSITE_FROM} with 10 pages included. Built in 7–15 days, direct developer access, unlimited revisions, ${HOSTING_PER_YEAR}/yr hosting.`,
  alternates: { canonical: "/web-design-and-development" },
  openGraph: {
    title: `Web Design & Development | Websites from ${WEBSITE_FROM} | Rankify`,
    description:
      `Custom-built websites that convert, from ${WEBSITE_FROM} with 10 pages included. Built in 7–15 days, direct developer access, ${HOSTING_PER_YEAR}/yr hosting.`,
    url: "https://www.rankify.com.au/web-design-and-development",
    type: "website",
  },
};

export default function WebDesignAndDevelopmentPage() {
  return (
    <>
      <JsonLd data={serviceSchema({ name: "Web Design & Development", description: `Custom-built websites that convert, from ${WEBSITE_FROM} with 10 pages included.`, path: "/web-design-and-development", price: 2999, unit: `From ${WEBSITE_FROM}, 10 pages included` })} />
      <JsonLd data={faqSchema(webDesignAndDevelopment.faq.items)} />
      <ServicePageTemplate data={webDesignAndDevelopment} />
    </>
  );
}
