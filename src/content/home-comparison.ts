import type { ComparisonBlock } from "./service-pages/types";

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
  tableTitle: "Seriously.. look at the difference!",
  agencyLabel: "Typical Agency",
  usLabel: "Rankify",
  rows: [
    { icon: "person", label: "Who you talk to", agency: "Account managers, juniors, whoever", us: "Just the developer" },
    { icon: "clock", label: "Timeline", agency: "2–4 months", us: "Days and weeks, not quarters" },
    { icon: "dollar", label: "What it costs", agency: "$20k–$40k+ to start", us: "Websites from $2,999, stores from $5,999" },
    { icon: "repeat", label: "Retainer", agency: "Mandatory, up to $500/mo", us: "Optional, only if you want ongoing work" },
    { icon: "trending", label: "Built to convert", agency: "Looks nice, maybe", us: "Engineered to sell, and looks better" },
    { icon: "revisions", label: "Revisions", agency: "Billed hourly", us: "Unlimited, submitted in 2 rounds" },
    { icon: "shield", label: "Everything in one place", agency: "Separate SEO and ads agencies", us: "Build, SEO and ads under one roof" },
    { icon: "card", label: "Ongoing cost / year", agency: "$2,000 – $7,000+", us: "$0 unless you want us", highlight: true },
  ],
  footnote: "Retainers and hosting add up every single year. With us, staying on is a choice you make monthly.",
  eyebrow: "One developer. Whole-agency output.",
  heading: "A developer who knows AI, conversion, and design is a whole agency in one person.",
  body: [
    "Developers who build with AI are unbeatable on speed — what took a team months now takes one person days, with **cleaner, more optimised code**. Add real conversion knowledge and genuine taste, and you get everything a high-end agency delivers, from the one person who actually does the work.",
    "Here's the part agencies won't tell you: the work got faster for everyone. **They just keep the savings. I pass them straight on to you.** Same high-end result, a fraction of the price — because I'm not paying for overhead, and I'm not here to rip you off.",
    "I'm genuinely passionate about building **high-performance sites that look as good as they convert**.",
  ],
};
