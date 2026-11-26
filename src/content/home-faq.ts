import type { ServicePageData } from "./service-pages/types";
import { SEO_PER_PAGE } from "@/content/pricing.generated";

/**
 * Homepage FAQ, in the shape ServiceFaq takes so the homepage renders the same
 * flush-stacked accordion as every service page instead of its own copy.
 *
 * Answers corrected against what the site now sells: the build is 7–15 days
 * (not "2-5 weeks"), and SEO is $499 per page with a three month minimum —
 * "a fixed monthly fee" covering "design, updates, and ongoing support" was
 * describing a retainer we don't offer.
 */
export const HOME_FAQ: ServicePageData["faq"] = {
  heading: "FAQ.",
  subheading:
    "Everything you need to know about working with us.",
  items: [
    {
      q: "How long does it take to build a website?",
      a: "Most sites are live in 7 to 15 days from the point we have your content. Larger builds with a lot of pages take longer, and you'll get a clear timeline before any work starts.",
    },
    {
      q: "Do you offer custom websites or use templates?",
      a: "We create fully custom, high-performing websites tailored to your brand. No generic templates.",
    },
    {
      q: "What's included in your SEO services?",
      a: "We optimise your site structure, content, and speed, ensuring better search rankings and visibility. The technical work is done by the developer who built the site, so nothing gets lost between teams.",
    },
    {
      q: "How does SEO pricing work?",
      a: `${SEO_PER_PAGE} per page, per month. You pick the pages worth ranking and the price is that many pages. There is no open-ended retainer: 3 month minimum, then month to month.`,
    },
    {
      q: "Can you redesign my existing website?",
      a: "Yes. We can refresh your current site while improving its design, functionality, and performance.",
    },
    {
      q: "How do I get started?",
      a: "Use the configurator to price and order a site in a few minutes, or book a call if you'd rather talk it through first.",
    },
  ],
};
