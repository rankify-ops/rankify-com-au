import type { Metadata } from "next";
import { JsonLd, faqSchema, serviceSchema } from "@/lib/schema";
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate";
import { seo } from "@/content/service-pages/seo";

export const metadata: Metadata = {
  title: "SEO Services | $499 Per Page, No Lock-In | Rankify",
  description:
    "SEO priced per page, not as an open-ended retainer. Technical fixes made by the developer who built the site, real reporting on rankings, traffic and leads.",
  alternates: { canonical: "/seo" },
  openGraph: {
    title: "SEO Services | $499 Per Page, No Lock-In | Rankify",
    description:
      "SEO priced per page, not as an open-ended retainer. Real reporting on rankings, traffic and leads — no lock-in contracts.",
    url: "https://www.rankify.com.au/seo",
    type: "website",
  },
};

export default function SeoPage() {
  return (
    <>
      <JsonLd data={serviceSchema({ name: "SEO Services", description: "SEO priced per page rather than as an open-ended retainer.", path: "/seo", price: 499, unit: "$499 per page per month, 3 month minimum" })} />
      <JsonLd data={faqSchema(seo.faq.items)} />
      <ServicePageTemplate data={seo} />
    </>
  );
}
