import type { Metadata } from "next";
import { JsonLd, faqSchema } from "@/lib/schema";
import { CapabilityPage } from "@/components/capability/CapabilityPage";
import { aiAndAutomation } from "@/content/capability/ai-and-automation";

export const metadata: Metadata = {
  title: "AI and Automation | Custom Apps, Internal Tools and AI Agents | Rankify",
  description:
    "Automations, internal tools and AI agents built around how your business runs. Systems that talk to each other, agents that work inside limits you set, and a person approving anything that matters.",
  alternates: { canonical: "/ai-and-automation" },
};

export default function AiAndAutomationPage() {
  return (
    <>
      <JsonLd data={faqSchema(aiAndAutomation.faq.items)} />
      <CapabilityPage data={aiAndAutomation} />
    </>
  );
}
