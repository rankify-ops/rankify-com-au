import type { Metadata } from "next";
import { DarkFunnelPage } from "@/components/landing/DarkFunnel";
import { freeHomepageFunnel } from "@/content/free-homepage-funnel";

/**
 * The same page as /free-homepage, kept alive because it was shared while
 * the funnel was being built. Canonical points at the real URL.
 */
export const metadata: Metadata = {
  title: "Free Homepage in 48 Hours | Rankify",
  description:
    "We'll build your new homepage free and have it in your hands in 48 hours. See it before you spend a cent on the full site.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/free-homepage" },
};

export default function FreeHomepageV2Page() {
  return <DarkFunnelPage cfg={freeHomepageFunnel} />;
}
