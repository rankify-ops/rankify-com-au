import type { Metadata } from "next";
import { ComingSoonPage } from "@/components/templates/ComingSoonPage";

export const metadata: Metadata = {
  title: "Google Ads Management | Rankify",
  description:
    "Google Ads management for e-commerce, lead generation and SaaS — built around tracking, landing pages and profitable spend.",
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
    />
  );
}
