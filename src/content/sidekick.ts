/**
 * Ad Sidekick, as the website sells it.
 *
 * The plan rows are a copy of `SIDEKICK_FEATURES` in
 * `rankify-editor/src/lib/sidekick-plans.ts`, which is what Stripe bills from
 * and what `ecomsidekick-app/src/lib/planMenu.ts` enforces in the app's own
 * sidebar. Two copies of a price list drift, so when one of those changes this
 * file changes with it — the values below were taken from that file on
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

export type SidekickPlan = {
  id: "basic" | "pro" | "max";
  name: string;
  priceAud: number;
  brands: string;
  extraBrandAud: number;
  creatives: string;
  pitch: string;
  /** The one we point most people at. */
  featured?: boolean;
};

export const SIDEKICK_PLANS: SidekickPlan[] = [
  {
    id: "basic",
    name: "Basic",
    priceAud: 99,
    brands: "1 brand",
    extraBrandAud: 49,
    creatives: "30 AI creatives a month",
    pitch: "One brand, every number in one place.",
  },
  {
    id: "pro",
    name: "Pro",
    priceAud: 299,
    brands: "3 brands",
    extraBrandAud: 39,
    creatives: "150 AI creatives a month",
    pitch: "Three brands, and the creative made for you.",
    featured: true,
  },
  {
    id: "max",
    name: "Max",
    priceAud: 699,
    brands: "10 brands",
    extraBrandAud: 29,
    creatives: "600 AI creatives a month",
    pitch: "Ten brands, running themselves. For agencies.",
  },
];

export type PlanRow = {
  label: string;
  note?: string;
  basic: string | boolean;
  pro: string | boolean;
  max: string | boolean;
};

/** Mirrors SIDEKICK_FEATURES, in the app's own menu order. */
export const PLAN_ROWS: PlanRow[] = [
  { label: "Brands included", note: "Each brand past this is charged per month", basic: "1", pro: "3", max: "10" },
  { label: "Each extra brand", basic: "$49/mo", pro: "$39/mo", max: "$29/mo" },
  {
    label: "Everyone in your team",
    note: "People are never charged for — add the whole agency",
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
  { label: "AI creatives a month", note: "Across every brand in the workspace", basic: "30", pro: "150", max: "600" },
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
    note: "Makes ads on a schedule and sends them to Review — nothing goes live without you",
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
    b: "Audiences, campaigns and ad sets set up for you, with the number of ads your budget actually supports — one ad on its own cannot be compared to anything.",
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
      a: "No. It sets the campaigns up and tells you what to do next. It also teaches as you go — short notes appear at the moment the thing being explained is on screen, rather than in a manual nobody opens.",
    },
    {
      q: "Is there a contract?",
      a: "No contract and no exit fee. Turn it off whenever you like.",
    },
    {
      q: "Who is it for?",
      a: "Ecommerce brands on Shopify that are already doing well and want ads to be easier. It is not a rescue for a store that isn't selling — if the product isn't landing yet, ads won't fix that and we'd rather say so.",
    },
    {
      q: "Does it spend my money on its own?",
      a: "No. Nothing goes live without you. Even Autopilot, on the top plan, only makes ads and sends them to you to review.",
    },
    {
      q: "What does it cost against an agency?",
      a: "An agency retainer buys the decisions about ads, not the ads themselves. Those decisions are a system, and this is that system. Whatever you are paying a retainer now, the difference is budget you can put into actually reaching customers.",
    },
  ],
};
