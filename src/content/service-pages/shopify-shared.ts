/**
 * Shared pieces for the two Shopify pages.
 *
 * The single /shopify-development-services page used to carry two complete
 * funnels stacked on top of each other — a new-build funnel and a retainer
 * funnel, each with its own process section and its own pricing table. It's now
 * split so paid traffic lands on one intent with one price. These are the bits
 * both pages legitimately share.
 */
import type { CardGridBlock, FaqItem, MarqueeBlock } from "./types";

export const SHOPIFY_CLOSING_NOTE =
  "We believe that a website should be more than just a digital presence—it should be a tool that works for your business. That's why we prioritise performance, user experience in everything we create. We build websites that are fast, efficient, and easy to manage, so you can focus on what matters—running your business.";

export const SHOPIFY_CLIENT_LOGOS: MarqueeBlock = {
  type: "marquee",
  logos: [
    { src: "/assets/images/HMUE3r6JAKaPWYA6DDbyyXpFgc.png", alt: "Hiatus", w: 1054, h: 465 },
    { src: "/assets/images/Etb1ssGsCa82U7P2SGIWZKY5s4c.png", alt: "Natasha Schweitzer", w: 1054, h: 465 },
    { src: "/assets/images/Fnzg0J4UppeMwrI6fyjIrvxgtmc.png", alt: "Myoko", w: 1054, h: 465 },
    { src: "/assets/images/Q6HHTRxcZl4eS1atKChkiC6AH0.png", alt: "Wolff Studios", w: 1054, h: 465 },
  ],
};

export const SHOPIFY_WHY_US: CardGridBlock = {
  type: "cardgrid",
  theme: "paper",
  columns: 3,
  items: [
    { idx: "01", title: "Expert Shopify Developer", desc: "Years of hands-on experience building custom stores, themes, and integrations — without the agency overhead." },
    { idx: "02", title: "AI-Accelerated Development", desc: "We use AI-powered tools to build and ship faster. What takes agencies weeks, we deliver in days." },
    { idx: "03", title: "Outstanding value for money", desc: "Senior-level Shopify development at a fraction of the agency cost. No bloated teams, no inflated invoices." },
  ],
};

/** FAQ entries that apply no matter which page someone landed on. */
export const SHOPIFY_COMMON_FAQ: FaqItem[] = [
  { q: "Where are you based?", a: "We're based on the Gold Coast, Queensland. We work with Shopify clients across Australia — Sydney, Melbourne, Brisbane, Perth, Adelaide, and regional areas. All work is handled remotely with clear communication throughout." },
  { q: "How is your pricing structured?", a: "We offer hourly development ($175/hr, 2 hour minimum), monthly retainers (from $249/month), and custom store builds (from $5,999). Every project is scoped and quoted before work begins. Payment is upfront — no invoicing after the fact." },
  { q: "What makes you different from larger Shopify agencies?", a: "You work directly with the person building your store. No account managers, no layers, no offshore teams. We handle design, development, and SEO in one team — nothing gets lost between departments. Our retainer clients get a dedicated developer who knows their store, not a rotating roster." },
];
