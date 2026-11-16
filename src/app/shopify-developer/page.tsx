import type { Metadata } from "next";
import { JsonLd, faqSchema, serviceSchema } from "@/lib/schema";
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate";
import { shopifyDeveloper } from "@/content/service-pages/shopify-developer";
import { SHOPIFY_RETAINER_FROM, SHOPIFY_HOURLY } from "@/content/pricing.generated";

export const metadata: Metadata = {
  title: `Hire a Shopify Developer | Retainers from ${SHOPIFY_RETAINER_FROM}/mo | Rankify`,
  description:
    "Ongoing Shopify development on retainer or by the hour. A dedicated developer who already knows your store — bug fixes, design changes, new features. No lock-in.",
  alternates: { canonical: "/shopify-developer" },
  openGraph: {
    title: `Hire a Shopify Developer | Retainers from ${SHOPIFY_RETAINER_FROM}/mo | Rankify`,
    description:
      "Ongoing Shopify development on retainer or by the hour. A dedicated developer who already knows your store. No lock-in.",
    url: "https://www.rankify.com.au/shopify-developer",
    type: "website",
  },
};

export default function ShopifyDeveloperPage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "Shopify Development Retainer",
          description:
            "Ongoing Shopify development on retainer or by the hour, with a dedicated developer who knows your store.",
          path: "/shopify-developer",
          price: 499,
          unit: `From ${SHOPIFY_RETAINER_FROM} per month, or ${SHOPIFY_HOURLY} per hour casual`,
        })}
      />
      <JsonLd data={faqSchema(shopifyDeveloper.faq.items)} />
      <ServicePageTemplate data={shopifyDeveloper} />
    </>
  );
}
