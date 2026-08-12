import type { Metadata } from "next";
import { ComingSoonPage } from "@/components/templates/ComingSoonPage";

export const metadata: Metadata = {
  title: "Google Ads Management | Rankify",
  description:
    "Google Ads management for e-commerce, lead generation and SaaS — built around tracking, landing pages and profitable spend.",
  alternates: { canonical: "/google-ads" },
};

export default function GoogleAdsPage() {
  return (
    <ComingSoonPage
      kicker="Google Ads"
      heading="Google Ads that pay for themselves."
      intro="Full page coming soon. In the meantime, book a call and we'll audit your account and show you exactly where budget is leaking."
      bullets={[
        "E-commerce & Merchant Center",
        "Lead generation campaigns",
        "SaaS demo & trial funnels",
        "Call & form tracking",
        "Landing page builds",
        "Transparent reporting",
      ]}
      // Regrouped from the bullets above so the nav's intent chooser has real
      // anchors. No new capability claims — full copy still to come from Tom.
      segments={[
        {
          id: "ecommerce",
          title: "E-commerce",
          blurb: "Shopping and search campaigns for stores, with the feed and landing pages handled in the same place.",
          bullets: ["Merchant Center setup & feed management", "Landing page builds", "Transparent reporting"],
        },
        {
          id: "lead-gen",
          title: "Lead Generation",
          blurb: "Search campaigns for service businesses, with tracking that shows which clicks actually became enquiries.",
          bullets: ["Lead generation campaigns", "Call & form tracking", "Landing page builds"],
        },
        {
          id: "saas",
          title: "SaaS",
          blurb: "Campaigns pointed at demo requests and free trials rather than raw traffic.",
          bullets: ["Demo & trial funnels", "Landing page builds", "Transparent reporting"],
        },
      ]}
    />
  );
}
