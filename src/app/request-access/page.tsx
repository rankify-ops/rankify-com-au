import type { Metadata } from "next";
import { RedirectPage } from "@/components/ui/RedirectPage";
import { SIDEKICK_SITE } from "@/components/sidekick/SidekickChrome";

/**
 * This page said Ad Sidekick was open by invitation only. Sign-up has been
 * open at adsidekick.io since 22 Nov 2026, so anyone who still has this
 * address is sent there.
 */
export const metadata: Metadata = {
  title: "Ad Sidekick | Rankify",
  robots: { index: false, follow: true },
  alternates: { canonical: "/meta-ads" },
};

export default function RequestAccessPage() {
  return <RedirectPage to={SIDEKICK_SITE} label="Go to adsidekick.io" />;
}
