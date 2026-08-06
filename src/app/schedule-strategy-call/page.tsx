import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { ScheduleHero } from "@/components/sections/ScheduleHero";
import { SiteFooter } from "@/components/sections/ContactFooter";

export const metadata: Metadata = {
  title: "Schedule Strategy Call | Rankify",
  description:
    "Book a free discovery call with Rankify and we'll discuss the best way to move your website, SEO or branding forward.",
};

export default function ScheduleStrategyCallPage() {
  return (
    <>
      <Header />
      <ScheduleHero />
      <SiteFooter />
    </>
  );
}
