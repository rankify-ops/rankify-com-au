import type { Metadata } from "next";
import { JsonLd, faqSchema } from "@/lib/schema";
import { CapabilityPage } from "@/components/capability/CapabilityPage";
import { dashboards } from "@/content/capability/dashboards";

export const metadata: Metadata = {
  title: "Custom Business Dashboards | Sales, Ad Spend, Stock and Profit | Rankify",
  description:
    "Custom dashboards that read live from Shopify, Xero, your bank and your ad accounts. Sales, ad spend, stock, cash and profit on one screen, built around your business.",
  alternates: { canonical: "/dashboards" },
};

export default function DashboardsPage() {
  return (
    <>
      <JsonLd data={faqSchema(dashboards.faq.items)} />
      <CapabilityPage data={dashboards} />
    </>
  );
}
