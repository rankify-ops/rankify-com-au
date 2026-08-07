import type { ReactNode } from "react";

/* --- tiny stroke icons used in the mega menu columns --- */
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
const Tag = () => <I d="M12.6 3.5H19a1.5 1.5 0 0 1 1.5 1.5v6.4a2 2 0 0 1-.6 1.4l-6.6 6.6a2 2 0 0 1-2.8 0l-5.8-5.8a2 2 0 0 1 0-2.8l6.6-6.6a2 2 0 0 1 1.3-.7ZM16.4 7.6h.01" />;
const Page = () => <I d="M6 3.5h8l4 4v13H6v-17ZM9.5 12h5M9.5 15.5h5" />;
const Phone = () => <I d="M6.5 3.8h3l1.4 3.5-2 1.4a11.5 11.5 0 0 0 5.4 5.4l1.4-2 3.5 1.4v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 6a2 2 0 0 1 2-2.2Z" />;
const Code = () => <I d="m9 8-4.5 4L9 16M15 8l4.5 4L15 16" />;
const Cart = () => <I d="M4 5h2l2 10h9l2-7H7M9.5 19.5h.01M16.5 19.5h.01" />;
const Palette = () => <I d="M12 3.5a8.5 8.5 0 1 0 0 17c1.4 0 1.9-1 1.4-1.9-.6-1.1.2-2.3 1.5-2.3h1.3a4.3 4.3 0 0 0 4.3-4.3c0-4.7-3.8-8.5-8.5-8.5ZM7.5 12h.01M10 8.2h.01M14.5 7.8h.01" />;
const Type = () => <I d="M5 6.5V5h14v1.5M12 5v14M9 19h6" />;
const Spark = () => <I d="M12 3.5 13.8 9l5.7 1.8-5.7 1.8L12 18.5l-1.8-5.9L4.5 10.8 10.2 9 12 3.5Z" />;
const Chart = () => <I d="M4.5 19.5V13M9.5 19.5V6.5M14.5 19.5v-8M19.5 19.5V9" />;
const Search = () => (
  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] flex-none" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
    <circle cx="11" cy="11" r="6.5" />
    <path d="m20 20-4.4-4.4" />
  </svg>
);
const Link2 = () => <I d="M10 13.5a4 4 0 0 0 5.7 0l2.6-2.6a4 4 0 1 0-5.7-5.7l-1.3 1.3M14 10.5a4 4 0 0 0-5.7 0l-2.6 2.6a4 4 0 1 0 5.7 5.7l1.3-1.3" />;
const Pin = () => <I d="M12 21s6.5-6 6.5-10.5a6.5 6.5 0 1 0-13 0C5.5 15 12 21 12 21ZM12 12.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />;
const Bolt = () => <I d="M13.5 3 5.5 13.5H11l-.5 7.5 8-10.5H13l.5-7.5Z" />;
const Shield = () => <I d="M12 3.5 19 6v5.5c0 4.4-3 7.4-7 9-4-1.6-7-4.6-7-9V6l7-2.5ZM9.3 12.2l1.9 1.9 3.6-3.6" />;
const Plug = () => <I d="M9 3.5v5M15 3.5v5M6.5 8.5h11v3a5.5 5.5 0 0 1-11 0v-3ZM12 17v3.5" />;

export type MegaItem = { label: string; href: string; icon: ReactNode };
export type MegaColumn = { title: string; items: MegaItem[] };

/**
 * An intent chooser instead of a link list — used where the visitor's goal
 * splits cleanly and sending them to the wrong page wastes a click.
 */
export type MegaChoice = { label: string; sub: string; href: string; icon: ReactNode };

export type MegaMenu = {
  columns?: MegaColumn[];
  choices?: MegaChoice[];
  promo: { kicker: string; heading: string; ctaLabel: string; ctaHref: string };
};
export type NavItem = { label: string; href: string; mega?: MegaMenu };

const BOOK = { ctaLabel: "Book a strategy call", ctaHref: "/schedule-strategy-call" };

const WEB = "/web-design-and-development";
const SHOP = "/shopify-development-services";
const DEV = "/shopify-developer";

/**
 * Every mega-menu item points at a section or card that actually exists on the
 * target page — the anchor ids live alongside the copy in
 * src/content/service-pages/*.ts. Pages without real content yet (Google Ads,
 * Meta Ads) are plain links rather than menus of invented services.
 */
export const NAV_ITEMS: NavItem[] = [
  {
    label: "Web Development",
    href: WEB,
    mega: {
      columns: [
        {
          title: "What we build",
          items: [
            { label: "Shopify Web Development", href: `${WEB}#shopify-web-development`, icon: <Cart /> },
            { label: "Framer Web Development", href: `${WEB}#framer-web-development`, icon: <Code /> },
            { label: "WordPress Web Development", href: `${WEB}#wordpress-web-development`, icon: <Plug /> },
            { label: "Our Website Clients", href: `${WEB}#our-work`, icon: <Spark /> },
          ],
        },
        {
          title: "Our process",
          items: [
            { label: "Your Goals", href: `${WEB}#your-goals`, icon: <Target /> },
            { label: "Design", href: `${WEB}#design`, icon: <Palette /> },
            { label: "SEO Ready", href: `${WEB}#seo-ready`, icon: <Search /> },
            { label: "Support", href: `${WEB}#support`, icon: <Shield /> },
          ],
        },
        {
          title: "Before you book",
          items: [
            { label: "Pricing", href: `${WEB}#pricing`, icon: <Tag /> },
            { label: "FAQ", href: `${WEB}#faq`, icon: <Page /> },
            { label: "Shopify Stores", href: SHOP, icon: <Cart /> },
            { label: "SEO", href: "/seo", icon: <Chart /> },
          ],
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
    mega: {
      columns: [
        {
          title: "How we do it",
          items: [
            { label: "Research & Strategy", href: "/seo#research-strategy", icon: <Target /> },
            { label: "Technical SEO", href: "/seo#technical-seo", icon: <Code /> },
            { label: "On-Page SEO", href: "/seo#on-page-seo", icon: <Page /> },
            { label: "Content & Authority", href: "/seo#content-authority", icon: <Type /> },
          ],
        },
        {
          title: "Authority & tracking",
          items: [
            { label: "Off-Page SEO", href: "/seo#off-page-seo", icon: <Link2 /> },
            { label: "Tracking & Reporting", href: "/seo#tracking-reporting", icon: <Chart /> },
            { label: "Pricing", href: "/seo#seo-pricing", icon: <Tag /> },
            { label: "FAQ", href: "/seo#faq", icon: <Page /> },
          ],
        },
        {
          title: "Who we work with",
          items: [
            { label: "Local Businesses", href: "/seo#local-businesses", icon: <Pin /> },
            { label: "Corporate & B2B", href: "/seo#corporate-b2b", icon: <Chart /> },
            { label: "eCommerce Brands", href: "/seo#ecommerce-brands", icon: <Cart /> },
            { label: "Blog & Articles", href: "/blog", icon: <Page /> },
          ],
        },
      ],
      promo: { kicker: "Free audit", heading: "See exactly which keywords you're missing out on.", ...BOOK },
    },
  },
  // No mega menus until these pages have real content to jump to.
  { label: "Google Ads", href: "/google-ads" },
  { label: "Meta Ads", href: "/meta-ads" },
];

export const SIMPLE_LINKS = [
  { label: "Contact", href: "/contact" },
  { label: "Blog", href: "/blog" },
];
