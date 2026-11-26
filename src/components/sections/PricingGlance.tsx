import { Reveal } from "@/components/ui/Reveal";
import { Band, Heading } from "@/components/sidekick/SidekickChrome";
import { PlanFootnote, PlanPanel, PlanRow } from "@/components/ui/PlanTable";
import {
  BRANDING_FROM,
  HOSTING_PER_YEAR,
  PRICING,
  SEO_MINIMUM_MONTHS,
  SEO_PER_PAGE,
  SHOPIFY_FROM,
  SHOPIFY_HOURLY,
  SHOPIFY_RETAINER_FROM,
  SIDEKICK_FROM,
  WEBSITE_FROM,
} from "@/content/pricing.generated";
import { DONE_FOR_YOU_FROM } from "@/content/sidekick";

/**
 * Every service and what it costs, in one table.
 *
 * On the home page and on /pricing. The home page used to carry no price at
 * all, so a visitor had to open six pages to learn whether Rankify was in
 * their range.
 *
 * Nothing here is typed: each figure is read from the HQ price record through
 * pricing.generated, the same record the checkout charges from, so this table
 * cannot disagree with a service page or with what a customer is billed. The
 * one exception is done-for-you Meta ads, which has no product in the record
 * yet and is read from the single constant in src/content/sidekick.ts.
 *
 * Services that are scoped before they are priced say "Quoted" and never
 * show a figure.
 */
type Row = {
  name: string;
  badge?: string;
  note: string;
  prefix?: string;
  price: string;
  period?: string;
  cta: { label: string; href: string };
  featured?: boolean;
};

const RETAINER_MONTHS = PRICING.products.shopify_retainer.minimum_term_months;

const ROWS: Row[] = [
  {
    name: "Websites",
    note: `Custom built and live in 7 to 15 days. Hosting and security is ${HOSTING_PER_YEAR} a year.`,
    prefix: "from",
    price: WEBSITE_FROM,
    cta: { label: "Build your price", href: "/web-design-and-development#website-configurator" },
  },
  {
    name: "Shopify stores",
    note: "A custom store, designed and built, with your migration handled.",
    prefix: "from",
    price: SHOPIFY_FROM,
    cta: { label: "See what is included", href: "/shopify-development-services#website-pricing" },
  },
  {
    name: "Shopify developer",
    note: `A developer on retainer, ${RETAINER_MONTHS} month minimum. One-off jobs are ${SHOPIFY_HOURLY} an hour.`,
    prefix: "from",
    price: SHOPIFY_RETAINER_FROM,
    period: "/mo",
    cta: { label: "See retainers", href: "/shopify-developer#hourly-pricing" },
  },
  {
    name: "SEO",
    note: `Google, Maps and AI chatbot results. You pick the pages. ${SEO_MINIMUM_MONTHS} month minimum.`,
    price: SEO_PER_PAGE,
    period: "per page /mo",
    cta: { label: "Pick your pages", href: "/seo#seo-pricing" },
  },
  {
    name: "Ad Sidekick",
    badge: "Our product",
    note: "Run Meta ads without ever signing in to Meta. No contract, no exit fee.",
    prefix: "from",
    price: SIDEKICK_FROM,
    period: "/mo",
    cta: { label: "See the plans", href: "/meta-ads#pricing" },
    featured: true,
  },
  {
    name: "Meta ads, done for you",
    note: "We build the campaigns and the ads and manage the account.",
    prefix: "from",
    price: DONE_FOR_YOU_FROM,
    period: "/mo",
    cta: { label: "How it works", href: "/meta-ads#done-for-you" },
  },
  {
    name: "Logo and branding",
    note: "Logo, brand kit and guidelines, designed with our branding partner.",
    prefix: "from",
    price: BRANDING_FROM,
    cta: { label: "See packages", href: "/professional-logo-design" },
  },
  {
    name: "Google Ads",
    note: "Campaigns, landing page and tracking, built together.",
    price: "Quoted",
    cta: { label: "What is included", href: "/google-ads" },
  },
  {
    name: "Dashboards and hubs",
    note: "Sales, ad spend, stock and profit on one screen, built around your business.",
    price: "Quoted",
    cta: { label: "See what we build", href: "/dashboards" },
  },
  {
    name: "Apps and automation",
    note: "Automations, internal tools and AI agents.",
    price: "Quoted",
    cta: { label: "See what we build", href: "/ai-and-automation" },
  },
];

export function PricingGlance({ id = "pricing" }: { id?: string }) {
  return (
    <Band id={id}>
      <Heading
        kicker="Pricing"
        sub="Fixed prices where the work is standard. Where it has to be scoped first, you get one fixed quote before anything starts."
      >
        Every price, up front.
      </Heading>

      <Reveal className="mt-10">
        <PlanPanel>
          {ROWS.map((r) => (
            <PlanRow
              key={r.name}
              name={r.name}
              badge={r.badge}
              note={r.note}
              prefix={r.prefix}
              price={r.price}
              period={r.period}
              cta={r.cta}
              featured={r.featured}
            />
          ))}
          <PlanFootnote>
            Prices are in Australian dollars. Quoted work is scoped on a call and priced before it
            starts.
          </PlanFootnote>
        </PlanPanel>
      </Reveal>
    </Band>
  );
}
