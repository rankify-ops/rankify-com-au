import type { Metadata } from "next";
import { JsonLd, faqSchema, serviceSchema } from "@/lib/schema";
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate";
import { webDesignAndDevelopment } from "@/content/service-pages/web-design-and-development";

export const metadata: Metadata = {
  title: "Web Design & Development | Websites from $2,999 | Rankify",
  description:
    "Custom-built websites that convert, from $2,999 with 10 pages included. Built in 7–14 days, direct developer access, unlimited revisions, no ongoing costs.",
  alternates: { canonical: "/web-design-and-development" },
  openGraph: {
    title: "Web Design & Development | Websites from $2,999 | Rankify",
    description:
      "Custom-built websites that convert, from $2,999 with 10 pages included. Built in 7–14 days, direct developer access, no ongoing costs.",
    url: "https://www.rankify.com.au/web-design-and-development",
    type: "website",
  },
};

export default function WebDesignAndDevelopmentPage() {
  return (
    <>
      <JsonLd data={serviceSchema({ name: "Web Design & Development", description: "Custom-built websites that convert, from $2,999 with 10 pages included.", path: "/web-design-and-development", price: 2999, unit: "From $2,999, 10 pages included" })} />
      <JsonLd data={faqSchema(webDesignAndDevelopment.faq.items)} />
      <ServicePageTemplate data={webDesignAndDevelopment} />
    </>
  );
}
