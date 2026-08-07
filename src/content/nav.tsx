import type { ReactNode } from "react";

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
const Home = () => <I d="M4 11 12 5l8 6v9H4v-9ZM9.5 20v-6h5v6" />;
const Search = () => (
  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] flex-none" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
    <circle cx="11" cy="11" r="6.5" />
    <path d="m20 20-4.4-4.4" />
  </svg>
);
const Megaphone = () => <I d="M4 10v4h3l6 4V6L7 10H4ZM17.5 9.2a4.2 4.2 0 0 1 0 5.6" />;
const Doc = () => <I d="M5 3.5h14v17H5v-17ZM8.5 8h7M8.5 12h7M8.5 16h4" />;
const Mail = () => <I d="M3.5 5.5h17v13h-17v-13ZM3.5 7l8.5 5.5L20.5 7" />;
const Grid = () => (
  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] flex-none" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
    <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
    <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
    <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
    <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
  </svg>
);

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
export type NavItem = { label: string; href: string; mega?: MegaMenu };

const BOOK = { ctaLabel: "Book a strategy call", ctaHref: "/schedule-strategy-call" };

const WEB = "/web-design-and-development";
const SHOP = "/shopify-development-services";
const DEV = "/shopify-developer";

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Web Development",
    href: WEB,
    mega: {
      choices: [
        {
          label: "I want a new website",
          sub: "Designed and built from scratch on Framer — fast, SEO-ready, no page builder bloat.",
          href: `${WEB}#framer-web-development`,
          icon: <Code />,
        },
        {
          label: "I want an online store",
          sub: "Selling products online? That's a Shopify build. Fixed quote, from $5,999.",
          href: SHOP,
          icon: <Cart />,
        },
        {
          label: "I want work on my existing site",
          sub: "Hourly development on your current Shopify, Framer or WordPress site.",
          href: `${WEB}#what-we-build`,
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
    href: SHOP,
    // Intent chooser rather than a link list: new builds and ongoing work are
    // two different pages with two different prices, and guessing wrong costs
    // the visitor a click.
    mega: {
      choices: [
        {
          label: "I want a new website",
          sub: "Custom Shopify store designed and built from scratch. Fixed quote, from $5,999.",
          href: SHOP,
          icon: <Cart />,
        },
        {
          label: "I want an ongoing developer",
          sub: "A dedicated developer on monthly retainer. From $499/month, no lock in.",
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
          sub: "Serious SEO for serious growth, scale, and visibility. $499 per page, 3 month minimum.",
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
    href: "/meta-ads",
    mega: {
      choices: [
        {
          label: "I want Meta Ads for e-commerce",
          sub: "Catalogue and prospecting campaigns, with creative treated as the main lever.",
          href: "/meta-ads#ecommerce",
          icon: <Cart />,
        },
        {
          label: "I want Meta Ads for lead gen",
          sub: "Instant-form and click-to-site campaigns, with pixel and CAPI set up properly.",
          href: "/meta-ads#lead-gen",
          icon: <Phone />,
        },
        {
          label: "I want Meta Ads for SaaS",
          sub: "Trial and demo campaigns. Talk to us about scope before committing budget.",
          href: "/meta-ads#saas",
          icon: <Spark />,
        },
        {
          label: "I want to book a strategy call",
          sub: "We'll review your account, creative and tracking setup.",
          href: "/schedule-strategy-call",
          icon: <Target />,
        },
      ],
      promo: { kicker: "Free audit", heading: "See exactly where your Meta Ads budget is being wasted.", ...BOOK },
    },
  },
];

export const SIMPLE_LINKS = [
  { label: "Contact", href: "/contact" },
  { label: "Blog", href: "/blog" },
];

/**
 * The mobile drawer is a flat icon list rather than the desktop intent chooser
 * — there's no hover on touch, and nesting four choices under each of five
 * items would run to twenty-five rows. The two Shopify pages are listed
 * separately so the build/retainer split still shows without nesting.
 */
export type MobileLink = { label: string; href: string; icon: ReactNode };

export const MOBILE_LINKS: MobileLink[] = [
  { label: "Home", href: "/", icon: <Home /> },
  { label: "Web Development", href: WEB, icon: <Code /> },
  { label: "Shopify Stores", href: SHOP, icon: <Cart /> },
  { label: "Shopify Developer", href: DEV, icon: <Shield /> },
  { label: "SEO", href: "/seo", icon: <Search /> },
  { label: "Google Ads", href: "/google-ads", icon: <Target /> },
  { label: "Meta Ads", href: "/meta-ads", icon: <Megaphone /> },
  { label: "Projects", href: "/projects", icon: <Grid /> },
  { label: "Blog", href: "/blog", icon: <Doc /> },
  { label: "Contact", href: "/contact", icon: <Mail /> },
];
