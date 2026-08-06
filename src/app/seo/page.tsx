import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate";
import { seo } from "@/content/service-pages/seo";

export default function SeoPage() {
  return <ServicePageTemplate data={seo} />;
}
