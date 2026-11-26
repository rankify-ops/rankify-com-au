/**
 * Ad Sidekick, as the website sells it.
 *
 * Every number here comes from the CRM price record at build time. Nothing in
 * this file is a price; it holds the copy that sits next to one.
 *
 * WARNING: the record is not yet what Stripe bills from.
 * `rankify-editor/src/lib/sidekick-plans.ts` is still the list Stripe charges
 * against, and `ecomsidekick-app/src/lib/planMenu.ts` is what the app enforces
 * in its own sidebar. Changing the price in the CRM changes what this website
 * advertises and nothing else, so those two still have to be moved over before
 * a price change is real — the values below were taken from that file on
 * 14 Nov 2026 and match it exactly.
 *
 * Things this file may not say, and why:
 *   - No testimonial, review, subscriber count or result. Ad Sidekick has no
 *     paying subscriber yet, and inventing social proof is both dishonest and,
 *     under Australian Consumer Law, misleading conduct.
 *   - No "4,000+ ad accounts" and no "$2,500 typical agency retainer" until
 *     Tom can substantiate both. The arithmetic below is therefore written
 *     with the retainer as an example the reader supplies, not as our claim.
 *   - No Google Ads. It is built but parked for clients (`NOT_YET` in
 *     planMenu.ts), and offering one page of it promises the rest.
 *   - Nothing about connecting a Facebook account quickly or by self-service:
 *     Meta has not approved the app yet.
 */

import { PRICING } from "@/content/pricing.generated";

/**
 * Done-for-you Meta ads, the starting monthly fee.
 *
 * Tom gave this figure on 26 Nov 2026. It is the one price on the site that
 * is not read from the HQ price record, because the record has no product for
 * it yet. When it gets one, read it from pricing.generated and delete this.
 */
export const DONE_FOR_YOU_FROM = "$1,000";

/** What "done for you" covers. Tom's own description of the service. */
export const DONE_FOR_YOU_POINTS = [
  "Campaigns, audiences and ad sets built and managed for you",
  "Ads named, written and launched from the creative you send",
  "Told when the account needs more ads, before results drop",
  "A straight call on what is winning, what to scale and what to turn off",
  "Pixel and Conversions API set up properly",
  "A daily P&L you can open any time",
];

export type SidekickPlan = {
  id: "basic" | "pro" | "max";
  name: string;
  priceAud: number;
  brands: string;
  extraBrandAud: number;
  /** "30 AI creatives a month", or "" on a plan that includes none. */
  creatives: string;
  /** The line under the price. Built here so a plan with no creatives does
   *  not print a separator with nothing after it. */
  summary: string;
  pitch: string;
  /** The one we point most people at. */
  featured?: boolean;
};

/**
 * Copy that belongs to the plan rather than to its price. Keyed by plan id so
 * a plan the CRM adds shows up with no copy rather than disappearing.
 */
const PLAN_PITCH: Record<string, string> = {
  basic: "One brand, every number in one place.",
  pro: "Three brands, and the creative made for you.",
  max: "Ten brands, running themselves. For agencies.",
};

/** The plan we point most people at. */
const FEATURED_PLAN = "pro";

/**
 * Nothing, rather than "0 AI creatives a month".
 *
 * A plan can include none — Basic does from price record version 6 — and a
 * count of zero is an absence, not a quantity. Printing it as one advertises
 * a feature set to nothing.
 */
function creativesLine(n: number): string {
  return n > 0 ? `${n} AI creatives a month` : "";
}

/**
 * Built from the CRM price record, not written out here.
 *
 * The numbers used to be a hand-kept copy of the list Stripe bills from, and a
 * hand-kept copy is a copy that drifts. Now the only way to change a price is
 * to change it in the one place, which is the point.
 */
export const SIDEKICK_PLANS: SidekickPlan[] = PRICING.products.ad_sidekick.tiers.map((t) => ({
  id: t.id as SidekickPlan["id"],
  name: t.name,
  priceAud: t.per_month_cents / 100,
  brands: `${t.brands_included} ${t.brands_included === 1 ? "brand" : "brands"}`,
  extraBrandAud: t.extra_brand_per_month_cents / 100,
  creatives: creativesLine(t.ai_creatives_per_month),
  summary: [
    `${t.brands_included} ${t.brands_included === 1 ? "brand" : "brands"}`,
    creativesLine(t.ai_creatives_per_month),
  ]
    .filter(Boolean)
    .join(" · "),
  pitch: PLAN_PITCH[t.id] ?? "",
  featured: t.id === FEATURED_PLAN,
}));

/** A count for the table, or `false` where the plan includes none. */
function creativeCell(n: number): string | false {
  return n > 0 ? String(n) : false;
}

/** By id, for the rows below. */
const PLAN = Object.fromEntries(PRICING.products.ad_sidekick.tiers.map((t) => [t.id, t]));

export type PlanRow = {
  label: string;
  note?: string;
  basic: string | boolean;
  pro: string | boolean;
  max: string | boolean;
};

/** Mirrors SIDEKICK_FEATURES, in the app's own menu order. */
export const PLAN_ROWS: PlanRow[] = [
  {
    label: "Brands included",
    note: "Each brand past this is charged per month",
    basic: String(PLAN.basic.brands_included),
    pro: String(PLAN.pro.brands_included),
    max: String(PLAN.max.brands_included),
  },
  {
    label: "Each extra brand",
    basic: `${PLAN.basic.extra_brand_per_month_display}/mo`,
    pro: `${PLAN.pro.extra_brand_per_month_display}/mo`,
    max: `${PLAN.max.extra_brand_per_month_display}/mo`,
  },
  {
    label: "Everyone in your team",
    note: "People are never charged for, so add the whole agency",
    basic: true,
    pro: true,
    max: true,
  },
  {
    label: "Upload, Review, Library, Testing, Winners and History",
    note: "Every ad from upload to a verdict, with its name and copy written for you",
    basic: true,
    pro: true,
    max: true,
  },
  { label: "Guided setup: audiences and campaigns built for you", basic: true, pro: true, max: true },
  { label: "Performance: key metrics, daily P&L, ads and campaigns", basic: true, pro: true, max: true },
  {
    label: "Scale check, Scale into Profit, Scale Challenge and the budget planner",
    basic: true,
    pro: true,
    max: true,
  },
  { label: "Meta, Shopify and Google Drive connected", basic: true, pro: true, max: true },
  {
    label: "AI creatives a month",
    note: "Across every brand in the workspace",
    // From the record, not typed here: these were a hand-kept copy of three
    // numbers that the record already holds, and a hand-kept copy drifts.
    // A plan with none gets `false`, which the table draws as not included
    // rather than as the number nought.
    basic: creativeCell(PLAN.basic.ai_creatives_per_month),
    pro: creativeCell(PLAN.pro.ai_creatives_per_month),
    max: creativeCell(PLAN.max.ai_creatives_per_month),
  },
  {
    label: "Create: personas, scripts and video templates",
    note: "Ads written and made from research on your own customers",
    basic: false,
    pro: true,
    max: true,
  },
  {
    label: "Review insights",
    note: "What your customer reviews say, turned into angles for new ads",
    basic: false,
    pro: true,
    max: true,
  },
  { label: "Sale planner and stock planning", basic: false, pro: true, max: true },
  { label: "Your own naming convention and performance targets", basic: false, pro: true, max: true },
  {
    label: "Autopilot",
    note: "Makes ads on a schedule and sends them to Review, and nothing goes live without you",
    basic: false,
    pro: false,
    max: true,
  },
  {
    label: "Claude and agent access",
    note: "So an assistant can read your numbers and draft work",
    basic: false,
    pro: false,
    max: true,
  },
];

/** What it does, in the order somebody actually meets it. */
export const SIDEKICK_STEPS = [
  {
    n: "1",
    h: "Upload your ads",
    b: "Drop in the videos and images. Each one is named to your convention and its copy written, so your account stops being a pile of ad-3-final-v2.",
    shot: "upload",
  },
  {
    n: "2",
    h: "It builds the campaign",
    b: "Audiences, campaigns and ad sets set up for you, with the number of ads your budget supports. One ad on its own cannot be compared to anything.",
    shot: "setup",
  },
  {
    n: "3",
    h: "Three days to a verdict",
    b: "It watches the numbers and tells you which ads are working, which to turn off, and which to leave alone. Three days of a few ads running against each other is what it takes to know.",
    shot: "testing",
  },
  {
    n: "4",
    h: "Scale the winners, keep the lesson",
    b: "When something wins you are told to raise spend, and the ad is kept and analysed so the next one is built from what already worked.",
    shot: "winners",
  },
];

/** The five Learning Notes, from `ecomsidekick-app/src/lib/learningNotes.ts`. */
export const LEARNING_NOTES = [
  "Why we ask for several ads, not one",
  "Why every copy shares one post",
  "It's in your library, paused",
  "Why three days",
  "This one's kept",
];

export const SIDEKICK_FAQ = {
  heading: "The things people ask first.",
  subheading: "No contract, nothing goes live without you, and we will tell you if it isn't a fit.",
  items: [
    {
      q: "Do I need to know Meta Ads?",
      a: "No. It sets the campaigns up and tells you what to do next. It also teaches as you go: short notes appear at the moment the thing being explained is on screen, rather than in a manual nobody opens.",
    },
    {
      q: "Is there a contract?",
      a: "No contract and no exit fee. Turn it off whenever you like.",
    },
    {
      q: "Who is it for?",
      a: "Ecommerce brands on Shopify that are already doing well and want ads to be easier. It is not a rescue for a store that isn't selling. If the product isn't landing yet, ads won't fix that and we'd rather say so.",
    },
    {
      q: "Does it spend my money on its own?",
      a: "No. Nothing goes live without you. Even Autopilot, on the top plan, only makes ads and sends them to you to review.",
    },
    {
      q: "What does it cost against an agency?",
      a: "An agency retainer buys the decisions about ads, not the ads themselves. Those decisions are a system, and this is that system. Whatever you are paying a retainer now, the difference is budget you can put into reaching customers.",
    },
  ],
};
