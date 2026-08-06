import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { ContactHero } from "@/components/sections/ContactHero";
import { SiteFooter } from "@/components/sections/ContactFooter";

export const metadata: Metadata = {
  title: "Contact | Rankify",
  description:
    "Have a project in mind? Reach out to Rankify and we'll discuss the best way to move your website, SEO or branding forward.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <ContactHero />
      <SiteFooter />
    </>
  );
}
