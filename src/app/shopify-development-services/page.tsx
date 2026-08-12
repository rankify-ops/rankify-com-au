import type { Metadata } from "next";
import { JsonLd, faqSchema, serviceSchema } from "@/lib/schema";
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate";
import { shopifyDevelopmentServices } from "@/content/service-pages/shopify-development-services";

export const metadata: Metadata = {
  title: "Shopify Development | Custom Stores from $5,999 | Rankify",
  description:
    "Custom Shopify stores built to convert, from $5,999. Shopify Partner, direct developer access, migrations handled, SEO built in from day one.",
  alternates: { canonical: "/shopify-development-services" },
  openGraph: {
    title: "Shopify Development | Custom Stores from $5,999 | Rankify",
    description:
      "Custom Shopify stores built to convert, from $5,999. Shopify Partner, direct developer access, SEO built in from day one.",
    url: "https://www.rankify.com.au/shopify-development-services",
    type: "website",
  },
};

export default function ShopifyDevelopmentServicesPage() {
  return (
    <>
      <JsonLd data={serviceSchema({ name: "Shopify Development", description: "Custom Shopify stores built to convert, from $5,999.", path: "/shopify-development-services", price: 5999, unit: "From $5,999 per store" })} />
      <JsonLd data={faqSchema(shopifyDevelopmentServices.faq.items)} />
      <ServicePageTemplate data={shopifyDevelopmentServices} />
    </>
  );
}
