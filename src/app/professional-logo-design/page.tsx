import type { Metadata } from "next";
import { JsonLd, faqSchema, serviceSchema } from "@/lib/schema";
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate";
import { professionalLogoDesign } from "@/content/service-pages/professional-logo-design";

export const metadata: Metadata = {
  title: "Professional Logo Design | Custom Branding from $499 | Rankify",
  description:
    "Expertly designed, custom logo and brand identity from $499. Top 1% global design talent, fast turnarounds, and full ownership of every file you're sent.",
  alternates: { canonical: "/professional-logo-design" },
  openGraph: {
    title: "Professional Logo Design | Custom Branding from $499 | Rankify",
    description:
      "Expertly designed, custom logo and brand identity from $499. Fast turnarounds and full ownership of every file.",
    url: "https://www.rankify.com.au/professional-logo-design",
    type: "website",
  },
};

export default function ProfessionalLogoDesignPage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "Professional Logo Design",
          description:
            "Custom logo and brand identity design, delivered with full ownership of the source files.",
          path: "/professional-logo-design",
          price: 499,
          unit: "From $499 per logo package",
        })}
      />
      <JsonLd data={faqSchema(professionalLogoDesign.faq.items)} />
      <ServicePageTemplate data={professionalLogoDesign} />
    </>
  );
}
