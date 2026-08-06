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
    />
  );
}
