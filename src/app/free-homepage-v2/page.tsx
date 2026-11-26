import type { Metadata } from "next";
import { RedirectPage } from "@/components/ui/RedirectPage";

/**
 * This address was shared while the free homepage funnel was being built, so
 * it forwards to the real one and does not 404 for whoever still has the link.
 */
export const metadata: Metadata = {
  title: "Free Homepage in 48 Hours | Rankify",
  robots: { index: false, follow: true },
  alternates: { canonical: "/free-homepage" },
};

export default function FreeHomepageV2Page() {
  return <RedirectPage to="/free-homepage" label="Go to the free homepage offer" />;
}
