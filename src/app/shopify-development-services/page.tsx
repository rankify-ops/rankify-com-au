import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate";
import { shopifyDevelopmentServices } from "@/content/service-pages/shopify-development-services";

export default function ShopifyDevelopmentServicesPage() {
  return <ServicePageTemplate data={shopifyDevelopmentServices} />;
}
