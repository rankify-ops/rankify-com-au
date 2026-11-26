import type { ReactNode } from "react";
import { WEBSITE_FROM, SHOPIFY_FROM, SEO_PER_PAGE, SHOPIFY_RETAINER_FROM, SIDEKICK_FROM } from "@/content/pricing.generated";
import { DONE_FOR_YOU_FROM } from "@/content/sidekick";

/* --- tiny stroke icons used on the menu choice cards --- */
const I = ({ d }: { d: string }) => (
  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] flex-none" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const Target = () => (
  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] flex-none" fill="none" stroke="currentColor" strokeWidth="1.6">
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="3.4" />
  </svg>
);
const Phone = () => <I d="M6.5 3.8h3l1.4 3.5-2 1.4a11.5 11.5 0 0 0 5.4 5.4l1.4-2 3.5 1.4v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 6a2 2 0 0 1 2-2.2Z" />;
const Code = () => <I d="m9 8-4.5 4L9 16M15 8l4.5 4L15 16" />;
const Cart = () => <I d="M4 5h2l2 10h9l2-7H7M9.5 19.5h.01M16.5 19.5h.01" />;
const Spark = () => <I d="M12 3.5 13.8 9l5.7 1.8-5.7 1.8L12 18.5l-1.8-5.9L4.5 10.8 10.2 9 12 3.5Z" />;
const Chart = () => <I d="M4.5 19.5V13M9.5 19.5V6.5M14.5 19.5v-8M19.5 19.5V9" />;
const Pin = () => <I d="M12 21s6.5-6 6.5-10.5a6.5 6.5 0 1 0-13 0C5.5 15 12 21 12 21ZM12 12.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />;
const Bolt = () => <I d="M13.5 3 5.5 13.5H11l-.5 7.5 8-10.5H13l.5-7.5Z" />;
const Shield = () => <I d="M12 3.5 19 6v5.5c0 4.4-3 7.4-7 9-4-1.6-7-4.6-7-9V6l7-2.5ZM9.3 12.2l1.9 1.9 3.6-3.6" />;
const Search = () => (
  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] flex-none" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
    <circle cx="11" cy="11" r="6.5" />
    <path d="m20 20-4.4-4.4" />
  </svg>
);
const Megaphone = () => <I d="M4 10v4h3l6 4V6L7 10H4ZM17.5 9.2a4.2 4.2 0 0 1 0 5.6" />;
const Doc = () => <I d="M5 3.5h14v17H5v-17ZM8.5 8h7M8.5 12h7M8.5 16h4" />;
const Mail = () => <I d="M3.5 5.5h17v13h-17v-13ZM3.5 7l8.5 5.5L20.5 7" />;
const Robot = () => <I d="M7.5 9.5h9a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-9a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2ZM12 6.5v3M12 4.2h.01M9.5 13.5h.01M14.5 13.5h.01M3.2 12.5v3M20.8 12.5v3" />;
const Gauge = () => <I d="M4.2 17.5a8.5 8.5 0 1 1 15.6 0M12 14l4-5.2M12 15.2a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4Z" />;
const Box = () => <I d="M12 3.5 20 7.5v9l-8 4-8-4v-9l8-4ZM4 7.5l8 4 8-4M12 11.5v9" />;
const Wrench = () => <I d="M15.6 4.4a5 5 0 0 0-6.4 6.4L4 16v4h4l5.2-5.2a5 5 0 0 0 6.4-6.4l-3 3-2.6-.7-.7-2.6 2.3-3.7Z" />;

/**
 * Every menu routes by intent rather than listing links: the visitor says what
 * they want and lands on the section that answers it. Each href must resolve to
 * a real section — anchor ids live beside the copy in
 * src/content/service-pages/*.ts and in the ads pages' `segments`.
 */
export type MegaChoice = { label: string; sub: string; href: string; icon: ReactNode };

export type MegaMenu = {
  choices: MegaChoice[];
  promo: { kicker: string; heading: string; ctaLabel: string; ctaHref: string };
};
/** `icon` is used by the mobile drawer, which mirrors this same list. */
export type NavItem = { label: string; href: string; icon: ReactNode; mega?: MegaMenu };

const BOOK = { ctaLabel: "Book a strategy call", ctaHref: "/schedule-strategy-call" };

const WEB = "/web-design-and-development";
const SHOP = "/shopify-development-services";
const DEV = "/shopify-developer";
const AI = "/ai-and-automation";
const DASH = "/dashboards";

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Web Development",
    icon: <Code />,
    href: WEB,
    mega: {
      choices: [
        {
          // Top of the page, not the configurator — the menu sends people to
          // the pitch; Get Started is what jumps them to the price.
          label: "I want a new website",
          sub: `Custom built, designed around how your customers buy. Websites from ${WEBSITE_FROM}.`,
          href: WEB,
          icon: <Code />,
        },
        {
          label: "I want an online store",
          sub: `Selling products online? That's a Shopify build. Stores from ${SHOPIFY_FROM}.`,
          href: SHOP,
          icon: <Cart />,
        },
        {
          label: "I want work on my existing site",
          sub: "Fixes, new pages and new features on the site you already have. Billed by the hour.",
          // #what-we-build doesn't exist on the rebuilt page — the top of it is
          // at least a real destination until there's a section to aim at.
          href: WEB,
          icon: <Bolt />,
        },
        {
          label: "I want to book a strategy call",
          sub: "Not sure which platform fits? Talk it through with the developer, not a salesperson.",
          href: "/schedule-strategy-call",
          icon: <Phone />,
        },
      ],
      promo: { kicker: "Free audit", heading: "See exactly what's slowing your website down.", ...BOOK },
    },
  },
  {
    label: "Shopify",
    icon: <Cart />,
    href: SHOP,
    // Intent chooser rather than a link list: new builds and ongoing work are
    // two different pages with two different prices, and guessing wrong costs
    // the visitor a click.
    mega: {
      choices: [
        {
          label: "I want a new store",
          sub: `Custom Shopify store designed and built from scratch. Stores from ${SHOPIFY_FROM}.`,
          href: SHOP,
          icon: <Cart />,
        },
        {
          label: "I want an ongoing developer",
          sub: `A dedicated developer on monthly retainer. From ${SHOPIFY_RETAINER_FROM}/month, 3 month minimum.`,
          href: `${DEV}#hourly-pricing`,
          icon: <Shield />,
        },
        {
          label: "I want to update my site",
          sub: "One-off fixes, design tweaks and new features on your live store. Hourly, no commitment.",
          href: `${DEV}#customisation-requests`,
          icon: <Bolt />,
        },
        {
          label: "I want to book a strategy call",
          sub: "Not sure which you need? Talk it through with the developer, not a salesperson.",
          href: "/schedule-strategy-call",
          icon: <Phone />,
        },
      ],
      promo: { kicker: "Free audit", heading: "See exactly where your store is losing sales.", ...BOOK },
    },
  },
  {
    label: "SEO",
    icon: <Search />,
    href: "/seo",
    // Segments are the three the SEO page actually sells to — using
    // e-commerce / lead gen / SaaS here would have pointed at nothing.
    mega: {
      choices: [
        {
          label: "I want SEO for a local business",
          sub: "Get found by the people in your area who need you most. Local SEO, citations and Google Business.",
          href: "/seo#local-businesses",
          icon: <Pin />,
        },
        {
          label: "I want SEO for corporate or B2B",
          sub: `Serious SEO for serious growth, scale, and visibility. ${SEO_PER_PAGE} per page, 3 month minimum.`,
          href: "/seo#corporate-b2b",
          icon: <Chart />,
        },
        {
          label: "I want SEO for an online store",
          sub: "Turn search traffic into consistent sales and brand loyalty.",
          href: "/seo#ecommerce-brands",
          icon: <Cart />,
        },
        {
          label: "I want to book a strategy call",
          sub: "Not sure where you're losing rankings? We'll audit it and show you.",
          href: "/schedule-strategy-call",
          icon: <Phone />,
        },
      ],
      promo: { kicker: "Free audit", heading: "See exactly which keywords you're missing out on.", ...BOOK },
    },
  },
  {
    label: "Google Ads",
    icon: <Target />,
    href: "/google-ads",
    mega: {
      choices: [
        {
          label: "I want Google Ads for e-commerce",
          sub: "Shopping and search campaigns, with Merchant Center and the feed handled too.",
          href: "/google-ads#ecommerce",
          icon: <Cart />,
        },
        {
          label: "I want Google Ads for lead gen",
          sub: "Search campaigns for service businesses, with call and form tracking wired up.",
          href: "/google-ads#lead-gen",
          icon: <Phone />,
        },
        {
          label: "I want Google Ads for SaaS",
          sub: "Campaigns pointed at demo requests and free trials rather than raw traffic.",
          href: "/google-ads#saas",
          icon: <Spark />,
        },
        {
          label: "I want to book a strategy call",
          sub: "We'll audit your account and show you where the budget is leaking.",
          href: "/schedule-strategy-call",
          icon: <Target />,
        },
      ],
      promo: { kicker: "Free audit", heading: "See exactly where your Google Ads account is leaking budget.", ...BOOK },
    },
  },
  {
    label: "Meta Ads",
    icon: <Megaphone />,
    href: "/meta-ads",
    mega: {
      choices: [
        // These four used to be e-commerce, lead gen and SaaS, pointing at
        // sections the page never had. They now route by the real choice a
        // visitor has here: run it yourself, or have it run.
        {
          label: "I want to run them myself",
          sub: `Ad Sidekick builds the campaigns and tells you what to scale and what to turn off. From ${SIDEKICK_FROM} a month.`,
          href: "/meta-ads#overview",
          icon: <Megaphone />,
        },
        {
          label: "I want Rankify to run them",
          sub: `We build your campaigns and ads and manage the account. From ${DONE_FOR_YOU_FROM} a month.`,
          href: "/meta-ads#done-for-you",
          icon: <Shield />,
        },
        {
          label: "I want to see pricing",
          sub: "Three Ad Sidekick plans, side by side. No contract and no exit fee.",
          href: "/meta-ads#pricing",
          icon: <Chart />,
        },
        {
          label: "I want to book a strategy call",
          sub: "We'll review your account, creative and tracking setup.",
          href: "/schedule-strategy-call",
          icon: <Phone />,
        },
      ],
      promo: { kicker: "Free audit", heading: "See exactly where your Meta Ads budget is being wasted.", ...BOOK },
    },
  },
  {
    // Its own item rather than one choice inside AI & Automation: it is the
    // thing we have built the most of and the page with the most to show.
    label: "Dashboards",
    icon: <Gauge />,
    href: DASH,
    mega: {
      choices: [
        {
          label: "I want a sales and profit dashboard",
          sub: "Every channel you sell on, the costs against it, and what is left. Read live, never typed in.",
          href: `${DASH}#sales-and-profit`,
          icon: <Chart />,
        },
        {
          label: "I want my ad accounts on one screen",
          sub: "Spend and revenue on the same line, with which ads to scale and which to turn off.",
          href: `${DASH}#ad-accounts`,
          icon: <Target />,
        },
        {
          label: "I want stock and operations tracked",
          sub: "Landed cost, incoming shipments and suppliers, with stock written back to your store.",
          href: `${DASH}#stock-and-operations`,
          icon: <Box />,
        },
        {
          label: "I want a hub built around my business",
          sub: "Clients, invoices, alerts, approvals, AI agents. A hub can do anything your business does.",
          href: `${DASH}#built-around-your-business`,
          icon: <Wrench />,
        },
      ],
      promo: { kicker: "Free scoping call", heading: "Tell us the numbers you check every week. See them on one screen.", ...BOOK },
    },
  },
  {
    label: "AI & Automation",
    icon: <Robot />,
    href: AI,
    mega: {
      choices: [
        {
          label: "I want to automate a manual process",
          sub: "The repetitive work eating your week, handed to software instead of a person.",
          href: `${AI}#automations`,
          icon: <Bolt />,
        },
        {
          label: "I want an internal tool or app built",
          sub: "Quoting tools, booking systems, client portals and back ends shaped around how you work.",
          href: `${AI}#internal-tools`,
          icon: <Wrench />,
        },
        {
          // Dashboards used to be the choice here. It has its own menu now.
          label: "I want AI agents in my business",
          sub: "Assistants and agents that take the routine work, inside limits you set.",
          href: `${AI}#ai-agents`,
          icon: <Robot />,
        },
        {
          label: "I want AI consulting",
          sub: "Where AI pays in your business, where it does not, and what to build first.",
          href: `${AI}#consulting`,
          icon: <Phone />,
        },
      ],
      promo: { kicker: "Free audit", heading: "See exactly which parts of your week a machine should be doing.", ...BOOK },
    },
  },
];

export const SIMPLE_LINKS = [
  { label: "Contact", href: "/contact", icon: <Mail /> },
  { label: "Blog", href: "/blog", icon: <Doc /> },
];

