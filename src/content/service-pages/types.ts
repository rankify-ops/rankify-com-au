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

export type TestimonialsBlock = { type: "testimonials" };

export type Block = CardGridBlock | MarqueeBlock | PortfolioBlock | PricingBlock | TestimonialsBlock;

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
