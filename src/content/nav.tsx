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
const Code = () => <I d="m9 8-4.5 4L9 16M15 8l4.5 4L15 16" />;
const Phone = () => <I d="M6.5 3.8h3l1.4 3.5-2 1.4a11.5 11.5 0 0 0 5.4 5.4l1.4-2 3.5 1.4v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 6a2 2 0 0 1 2-2.2Z" />;
const Funnel = () => <I d="M4 5h16l-6 7v6l-4 2v-8L4 5Z" />;
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
export type MegaMenu = {
  columns: MegaColumn[];
  promo: { kicker: string; heading: string; ctaLabel: string; ctaHref: string };
};
export type NavItem = { label: string; href: string; mega?: MegaMenu };

const BOOK = { ctaLabel: "Book a strategy call", ctaHref: "/schedule-strategy-call" };

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Branding",
    href: "/professional-logo-design",
    mega: {
      columns: [
        {
          title: "Identity",
          items: [
            { label: "Logo Design", href: "/professional-logo-design", icon: <Palette /> },
            { label: "Visual Identity", href: "/professional-logo-design", icon: <Spark /> },
            { label: "Brand Guidelines", href: "/professional-logo-design", icon: <Page /> },
            { label: "Brand Strategy", href: "/professional-logo-design", icon: <Target /> },
          ],
        },
        {
          title: "Messaging",
          items: [
            { label: "Tone of Voice", href: "/professional-logo-design", icon: <Type /> },
            { label: "Brand Messaging", href: "/professional-logo-design", icon: <Page /> },
            { label: "Naming", href: "/professional-logo-design", icon: <Tag /> },
            { label: "Pitch Collateral", href: "/professional-logo-design", icon: <Chart /> },
          ],
        },
        {
          title: "Applied",
          items: [
            { label: "Web Design", href: "/web-design-and-development", icon: <Code /> },
            { label: "Packaging", href: "/professional-logo-design", icon: <Cart /> },
            { label: "Social Templates", href: "/professional-logo-design", icon: <Spark /> },
            { label: "Rebrands", href: "/professional-logo-design", icon: <Bolt /> },
          ],
        },
      ],
      promo: { kicker: "Free audit", heading: "See exactly where your brand is losing trust.", ...BOOK },
    },
  },
  {
    label: "Web Development",
    href: "/web-design-and-development",
    mega: {
      columns: [
        {
          title: "Build",
          items: [
            { label: "Custom Websites", href: "/web-design-and-development", icon: <Code /> },
            { label: "Landing Pages", href: "/web-design-and-development", icon: <Page /> },
            { label: "Web Applications", href: "/web-design-and-development", icon: <Plug /> },
            { label: "Redesigns", href: "/web-design-and-development", icon: <Bolt /> },
          ],
        },
        {
          title: "Performance",
          items: [
            { label: "Speed Optimisation", href: "/web-design-and-development", icon: <Bolt /> },
            { label: "Mobile Optimisation", href: "/web-design-and-development", icon: <Phone /> },
            { label: "UX / UI Design", href: "/web-design-and-development", icon: <Palette /> },
            { label: "Conversion Focused", href: "/web-design-and-development", icon: <Target /> },
          ],
        },
        {
          title: "Ongoing",
          items: [
            { label: "SEO-Ready Builds", href: "/seo", icon: <Search /> },
            { label: "Maintenance", href: "/web-design-and-development", icon: <Shield /> },
            { label: "Hosting & Domains", href: "/web-design-and-development", icon: <Plug /> },
            { label: "Analytics Setup", href: "/web-design-and-development", icon: <Chart /> },
          ],
        },
      ],
      promo: { kicker: "Free audit", heading: "See exactly what's slowing your website down.", ...BOOK },
    },
  },
  {
    label: "Shopify",
    href: "/shopify-development-services",
    mega: {
      columns: [
        {
          title: "Build",
          items: [
            { label: "Custom Store Build", href: "/shopify-development-services", icon: <Cart /> },
            { label: "Theme Development", href: "/shopify-development-services", icon: <Code /> },
            { label: "Customisation Requests", href: "/shopify-development-services", icon: <Bolt /> },
            { label: "Shopify Plus", href: "/shopify-development-services", icon: <Spark /> },
          ],
        },
        {
          title: "Migrate & Grow",
          items: [
            { label: "Shopify Migration", href: "/shopify-development-services", icon: <Plug /> },
            { label: "Shopify SEO Setup", href: "/shopify-development-services", icon: <Search /> },
            { label: "App Integrations", href: "/shopify-development-services", icon: <Plug /> },
            { label: "Store Audits", href: "/shopify-development-services", icon: <Chart /> },
          ],
        },
        {
          title: "Support",
          items: [
            { label: "Monthly Retainers", href: "/shopify-development-services", icon: <Shield /> },
            { label: "Hourly Development", href: "/shopify-development-services", icon: <Bolt /> },
            { label: "Bug Fixes", href: "/shopify-development-services", icon: <Code /> },
            { label: "Product Uploads", href: "/shopify-development-services", icon: <Cart /> },
          ],
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
          title: "Technical",
          items: [
            { label: "Technical SEO", href: "/seo", icon: <Code /> },
            { label: "Site Speed", href: "/seo", icon: <Bolt /> },
            { label: "Schema & Markup", href: "/seo", icon: <Page /> },
            { label: "SEO Audits", href: "/seo", icon: <Search /> },
          ],
        },
        {
          title: "Content",
          items: [
            { label: "Keyword Strategy", href: "/seo", icon: <Target /> },
            { label: "On-Page SEO", href: "/seo", icon: <Page /> },
            { label: "Content Strategy", href: "/seo", icon: <Type /> },
            { label: "Blog & Articles", href: "/blog", icon: <Page /> },
          ],
        },
        {
          title: "Authority",
          items: [
            { label: "Link Building", href: "/seo", icon: <Link2 /> },
            { label: "Local SEO", href: "/seo", icon: <Pin /> },
            { label: "Google Business", href: "/seo", icon: <Pin /> },
            { label: "Reporting", href: "/seo", icon: <Chart /> },
          ],
        },
      ],
      promo: { kicker: "Free audit", heading: "See exactly which keywords you're missing out on.", ...BOOK },
    },
  },
  {
    label: "Google Ads",
    href: "/google-ads",
    mega: {
      columns: [
        {
          title: "E-commerce",
          items: [
            { label: "Google Ads", href: "/google-ads", icon: <Target /> },
            { label: "Merchant Center", href: "/google-ads", icon: <Tag /> },
            { label: "Landing Pages", href: "/google-ads", icon: <Page /> },
            { label: "Web Development", href: "/web-design-and-development", icon: <Code /> },
          ],
        },
        {
          title: "Lead Generation",
          items: [
            { label: "Google Ads", href: "/google-ads", icon: <Target /> },
            { label: "Call & Form Tracking", href: "/google-ads", icon: <Phone /> },
            { label: "Landing Pages", href: "/google-ads", icon: <Page /> },
            { label: "Web Development", href: "/web-design-and-development", icon: <Code /> },
          ],
        },
        {
          title: "SaaS",
          items: [
            { label: "Google Ads", href: "/google-ads", icon: <Target /> },
            { label: "Demo & Trial Funnels", href: "/google-ads", icon: <Funnel /> },
            { label: "Landing Pages", href: "/google-ads", icon: <Page /> },
            { label: "Web Development", href: "/web-design-and-development", icon: <Code /> },
          ],
        },
      ],
      promo: { kicker: "Free audit", heading: "See exactly where your Google Ads account is leaking budget.", ...BOOK },
    },
  },
  {
    label: "Meta Ads",
    href: "/meta-ads",
    mega: {
      columns: [
        {
          title: "E-commerce",
          items: [
            { label: "Meta Ads", href: "/meta-ads", icon: <Target /> },
            { label: "Catalogue & Shops", href: "/meta-ads", icon: <Cart /> },
            { label: "Creative Testing", href: "/meta-ads", icon: <Spark /> },
            { label: "Landing Pages", href: "/meta-ads", icon: <Page /> },
          ],
        },
        {
          title: "Lead Generation",
          items: [
            { label: "Meta Ads", href: "/meta-ads", icon: <Target /> },
            { label: "Lead Forms", href: "/meta-ads", icon: <Page /> },
            { label: "Call & Form Tracking", href: "/meta-ads", icon: <Phone /> },
            { label: "Landing Pages", href: "/meta-ads", icon: <Page /> },
          ],
        },
        {
          title: "Retargeting",
          items: [
            { label: "Pixel & CAPI Setup", href: "/meta-ads", icon: <Plug /> },
            { label: "Audience Building", href: "/meta-ads", icon: <Funnel /> },
            { label: "Creative Production", href: "/meta-ads", icon: <Palette /> },
            { label: "Reporting", href: "/meta-ads", icon: <Chart /> },
          ],
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
