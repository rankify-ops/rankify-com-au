export type CardItem = {
  idx?: string;
  title: string;
  desc: string | string[];
  image?: string;
  cta?: { label: string; href: string };
  /** Jump target for mega-menu links — see src/content/nav.tsx. */
  anchorId?: string;
};

export type CardGridBlock = {
  type: "cardgrid";
  anchorId?: string;
  theme?: "paper" | "dark";
  kicker?: string;
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  cta?: { label: string; href: string };
  items: CardItem[];
  columns?: 2 | 3 | 4;
  bottomImage?: string;
};

export type MarqueeBlock = {
  type: "marquee";
  label?: string;
  logos: { src: string; alt: string }[];
};

export type PortfolioItem = { name: string; sub: string; image: string; logo?: string; href?: string };

export type PortfolioBlock = {
  type: "portfolio";
  anchorId?: string;
  eyebrow?: string;
  heading: string;
  subheading?: string;
  items: PortfolioItem[];
};

export type PricingTier = {
  name?: string;
  badge?: string;
  spots?: string;
  price: string;
  period: string;
  note?: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  highlighted?: boolean;
};

export type PricingBlock = {
  type: "pricing";
  anchorId?: string;
  eyebrow: string;
  heading: string;
  subheading?: string;
  tag?: string;
  addon?: { label: string; sub: string; price: string };
  tiers: PricingTier[];
  lookingForMore?: boolean;
  lookingForMoreCta?: { label: string; href: string };
};

/** `bare` drops the heading, rating and stats — just the review carousel. */
export type TestimonialsBlock = { type: "testimonials"; bare?: boolean };

export type ComparisonIcon =
  | "person"
  | "clock"
  | "dollar"
  | "repeat"
  | "trending"
  | "revisions"
  | "shield"
  | "card";

export type ComparisonRow = {
  icon: ComparisonIcon;
  label: string;
  agency: string;
  us: string;
  /** Renders as the dark summary row at the bottom of the table. */
  highlight?: boolean;
};

/** Us-versus-them table with a supporting argument beside it. */
export type ComparisonBlock = {
  type: "comparison";
  anchorId?: string;
  tableTitle: string;
  agencyLabel: string;
  usLabel: string;
  rows: ComparisonRow[];
  footnote?: string;
  eyebrow: string;
  heading: string;
  /** Paragraphs; **wrapped** runs render bold. */
  body: string[];
};

/**
 * "Website Configurator" — visitor picks their pages, price updates live.
 * Replaces a static pricing card on the web dev page.
 */
export type ConfiguratorBlock = {
  type: "configurator";
  anchorId?: string;
  eyebrow: string;
  heading: string;
  blurb: string;
  /** Base price, covering `includedPages` pages. */
  basePrice: number;
  includedPages: number;
  extraPagePrice: number;
  /** Ticked when the form loads. */
  corePages: string[];
  /** Offered but unticked. */
  optionalPages: string[];
  tip: string;
  ctaLabel: string;
  ctaHref: string;
};

export type IndustryIcon =
  | "trades"
  | "plumbing"
  | "electrical"
  | "hvac"
  | "cleaning"
  | "landscaping"
  | "accounting"
  | "legal"
  | "dental"
  | "medical"
  | "realestate"
  | "finance";

/** "Who we help" — a grid of industry chips. */
export type IndustriesBlock = {
  type: "industries";
  anchorId?: string;
  kicker: string;
  eyebrow: string;
  heading: string;
  /** Trails the heading in grey, as on the other section headers. */
  headingDim: string;
  items: { label: string; icon: IndustryIcon }[];
};

export type Block =
  | CardGridBlock
  | MarqueeBlock
  | PortfolioBlock
  | PricingBlock
  | TestimonialsBlock
  | ComparisonBlock
  | ConfiguratorBlock
  | IndustriesBlock;

export type FaqItem = { q: string; a: string };

export type HeroData = {
  variant: "content" | "showcase";
  kicker?: string;
  heading: string;
  subheading?: string;
  intro: string;
  note?: string;
  badges?: string[];
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
  trustLabel?: string;
  asSeenOn?: { src: string; alt: string }[];
  heroImage?: string;
  heroImages?: string[];
  /** Scrolling wall of store screenshots instead of a single hero image. */
  heroScreenshotWall?: boolean;
  /** Accreditation logo shown beside the trust row. */
  partnerLogo?: { src: string; alt: string };
};

export type ServicePageData = {
  hero: HeroData;
  blocks: Block[];
  faq: {
    heading: string;
    subheading: string;
    items: FaqItem[];
    closingNote?: string;
  };
};
