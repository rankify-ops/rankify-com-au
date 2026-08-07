import type { Metadata } from "next";
import { ComingSoonPage } from "@/components/templates/ComingSoonPage";

export const metadata: Metadata = {
  title: "Meta Ads Management | Rankify",
  description:
    "Meta Ads management for e-commerce and lead generation — creative testing, pixel and CAPI tracking, and campaigns built to scale profitably.",
};

export default function MetaAdsPage() {
  return (
    <ComingSoonPage
      kicker="Meta Ads"
      heading="Meta Ads built to scale profitably."
      intro="Full page coming soon. In the meantime, book a call and we'll review your account, creative and tracking setup."
      bullets={[
        "E-commerce & catalogue ads",
        "Lead form campaigns",
        "Creative testing & production",
        "Pixel & CAPI setup",
        "Retargeting audiences",
        "Transparent reporting",
      ]}
      // Anchors for the nav's intent chooser. Blurbs are placeholder wording —
      // Tom is writing the real Meta Ads copy, including how availability is
      // described.
      segments={[
        {
          id: "ecommerce",
          title: "E-commerce",
          blurb: "Catalogue and prospecting campaigns for stores, with creative treated as the main lever.",
          bullets: ["Catalogue & Shops setup", "Creative testing & production", "Retargeting audiences"],
        },
        {
          id: "lead-gen",
          title: "Lead Generation",
          blurb: "Instant-form and click-to-site campaigns, with tracking wired up so the leads are attributable.",
          bullets: ["Lead form campaigns", "Pixel & CAPI setup", "Retargeting audiences"],
        },
        {
          id: "saas",
          title: "SaaS",
          blurb: "Trial and demo campaigns. Talk to us about scope before committing budget here.",
          bullets: ["Creative testing & production", "Pixel & CAPI setup", "Transparent reporting"],
        },
      ]}
    />
  );
}
