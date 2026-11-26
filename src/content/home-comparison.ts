import type { ComparisonBlock } from "./service-pages/types";
import { WEBSITE_FROM, SHOPIFY_FROM, HOSTING_PER_YEAR } from "@/content/pricing.generated";

/**
 * The agency comparison, on the homepage.
 *
 * It's the single strongest thing on the service pages — it answers "why not
 * just use an agency" before the visitor has to ask — so it belongs on the
 * front page too. Kept service-agnostic here: the web dev and Shopify pages
 * run their own versions with numbers specific to that build.
 */
export const HOME_COMPARISON: ComparisonBlock = {
  type: "comparison",
  anchorId: "vs-agency",
  tableTitle: "Look at the difference.",
  agencyLabel: "Typical Agency",
  usLabel: "Rankify",
  rows: [
    { icon: "person", label: "Who you talk to", agency: "Account managers, juniors, whoever", us: "Just the developer" },
    { icon: "clock", label: "Timeline", agency: "2 to 4 months", us: "Days and weeks, not quarters" },
    { icon: "dollar", label: "What it costs", agency: "$20k to $40k+ to start", us: `Websites from ${WEBSITE_FROM}, stores from ${SHOPIFY_FROM}` },
    { icon: "repeat", label: "Retainer", agency: "Mandatory, up to $500/mo", us: "Optional, only if you want ongoing work" },
    { icon: "trending", label: "Built to convert", agency: "Looks nice, maybe", us: "Engineered to sell, and looks better" },
    { icon: "revisions", label: "Revisions", agency: "Billed hourly", us: "Unlimited, submitted in 2 rounds" },
    { icon: "shield", label: "Everything in one place", agency: "Separate SEO and ads agencies", us: "Build, SEO and ads under one roof" },
    { icon: "card", label: "Ongoing cost / year", agency: "$2,000 to $7,000+", us: `${HOSTING_PER_YEAR} hosting, nothing else`, highlight: true },
  ],
  footnote: `Agency retainers add up every single year. With us it's ${HOSTING_PER_YEAR} a year for hosting and security. Staying on for anything more is a choice you make monthly.`,
  eyebrow: "Whole-agency output.",
  heading: "Developers who know AI, conversion and design do the work of a whole agency.",
  body: [
    "Developers who build with AI are unbeatable on speed. What took a team months now takes a developer days, with **cleaner, more optimised code**. Add conversion knowledge and taste, and you get everything a high-end agency delivers, from the developer who does the work.",
    "Here's the part agencies won't tell you: the work got faster for everyone. **They keep the savings. We pass them on to you.** Same high-end result at a fraction of the price, because we're not paying for overhead and we're not here to rip you off.",
    "We build **high-performance sites that look as good as they convert**.",
  ],
};
