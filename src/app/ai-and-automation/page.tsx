import type { Metadata } from "next";
import { ComingSoonPage } from "@/components/templates/ComingSoonPage";

export const metadata: Metadata = {
  title: "AI & Automation | Rankify",
  description:
    "Automations, custom business dashboards, internal tools and AI consulting — software built around how your business actually runs.",
};

export default function AiAndAutomationPage() {
  return (
    <ComingSoonPage
      kicker="AI & Automation"
      heading="Stop doing by hand what software should be doing."
      intro="Full page coming soon. In the meantime, book a call and we'll go through the manual work eating your week and what can realistically be automated."
      bullets={[
        "Workflow automation",
        "Custom business dashboards",
        "Internal tools & apps",
        "AI consulting",
        "Reporting & alerting",
        "Integrations between your existing tools",
      ]}
      // Placeholder wording — grounded in what Rankify has actually built
      // (Hiatus Sidekick, Lert, the Meta Ads tools, the CRM), but Tom still
      // needs to write the real copy.
      segments={[
        {
          id: "automations",
          title: "Automations",
          blurb: "The repetitive work that eats your week, handed to software instead of a person.",
          bullets: [
            "Workflow automation across the tools you already use",
            "Order, inventory and admin syncing",
            "Automated reporting and alerts",
          ],
        },
        {
          id: "dashboards",
          title: "Custom Business Dashboards",
          blurb: "One screen showing the numbers you actually run the business on, live.",
          bullets: [
            "Pulls from your store, ad accounts and back office",
            "Built around your metrics, not a template",
            "Replaces the spreadsheet you keep rebuilding",
          ],
        },
        {
          id: "internal-tools",
          title: "Internal Tools & Apps",
          blurb: "Software shaped around how your business works, rather than the other way around.",
          bullets: [
            "Custom web apps and internal tools",
            "Notification and alerting systems",
            "Calculators, planners and quoting tools",
          ],
        },
        {
          id: "consulting",
          title: "AI Consulting",
          blurb: "Working out where AI genuinely helps you — and, just as usefully, where it doesn't.",
          bullets: [
            "A look at where AI fits your current workflow",
            "Tooling recommendations without the hype",
            "Hands-on help implementing it",
          ],
        },
      ]}
    />
  );
}
