import type { Metadata } from "next";
import { DarkFunnelPage } from "@/components/landing/DarkFunnel";
import { freeHomepageFunnel } from "@/content/free-homepage-funnel";

/**
 * The live ads destination. The URL is fixed in Meta's ad sets, so the
 * page behind it changes and the URL never does.
 *
 * The light page that used to be here is parked at /free-homepage-v1.
 */
export const metadata: Metadata = {
  title: "Free Homepage in 48 Hours | Rankify",
  description:
    "We'll build your new homepage free and have it in your hands in 48 hours. See it before you spend a cent on the full site.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/free-homepage" },
};

export default function FreeHomepagePage() {
  return <DarkFunnelPage cfg={freeHomepageFunnel} />;
}
