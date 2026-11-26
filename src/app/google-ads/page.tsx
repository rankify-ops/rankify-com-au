import type { Metadata } from "next";
import { JsonLd, faqSchema } from "@/lib/schema";
import { CapabilityPage } from "@/components/capability/CapabilityPage";
import { googleAds } from "@/content/capability/google-ads";

export const metadata: Metadata = {
  title: "Google Ads Management | Search and Shopping, Built to Convert | Rankify",
  description:
    "Google Ads for e-commerce, lead generation and SaaS. Campaigns run by an ex-Google growth team, landing pages we build for the job, and tracking that shows which clicks became customers.",
  alternates: { canonical: "/google-ads" },
};

export default function GoogleAdsPage() {
  return (
    <>
      <JsonLd data={faqSchema(googleAds.faq.items)} />
      <CapabilityPage data={googleAds} />
    </>
  );
}
