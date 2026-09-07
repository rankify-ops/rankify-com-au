import type { Metadata } from "next";
import { DarkFunnelPage, type FunnelConfig } from "@/components/landing/DarkFunnel";

/**
 * Funnel A — the website offer.
 *
 * Audience: owners with no site, an outdated one, or one that isn't bringing
 * work in. Free asset: a homepage in 48 hours. Paid outcome: the full build.
 *
 * Separate from Funnel B in every way except the shell — its own URL, its own
 * pixel audience, its own ad set.
 */
export const metadata: Metadata = {
  title: "Free Homepage in 48 Hours | Rankify",
  description:
    "We'll build your new homepage free and have it in your hands in 48 hours. See it before you spend a cent on the full site.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/free-homepage" },
};

const CFG: FunnelConfig = {
  pixelName: "Free homepage offer",
  ctaHref: "/free-homepage/book",
  ctaLabel: "Get Started Now",
  ctaMicro: "Homepage delivered in 48 hours",
  eyebrow: "10 builds a month",

  headline: "We'll build your new homepage free, and you'll have it in 48 hours.",
  subhead:
    "If your website isn't bringing work in — or you haven't got one — this is the fastest way to see what a proper one looks like for your business. Built first, before you pay anything.",

  videoHeading: "This is what we'll build for you",
  videoCaption: "No tech knowledge needed — we handle the lot.*",

  steps: [
    {
      n: "1",
      h: "Claim your free build",
      b: "Hit the button and tell us a bit about your business. Two minutes, and it tells us straight away whether we can help.",
    },
    {
      n: "2",
      h: "A quick fifteen minute call",
      b: "So I understand the business, your services, and the customer you're after. No pitch — I need it to build the thing properly.",
    },
    {
      n: "3",
      h: "I build it, you have it in 48 hours",
      b: "A real homepage, your brand, built to convert. Then you decide whether you want the rest of the site.",
    },
  ],

  reviewsHeading: "Read our reviews",
  reviewsSub: "Every one of these is a business we built for.",
  reviews: [
    {
      quote:
        "Rankify had my website live in 7 days, which I didn't think was possible. I had about 10 enquiries in the first fortnight. One of those turned into a job that covered the website with plenty of money left over.",
      name: "Nick",
      role: "Owner, Prime Group Building",
      avatar: "/assets/images/nick-prime-group.webp",
    },
    {
      quote:
        "The Rankify team was incredibly fast and delivered a top-quality website for us. We're really impressed and would highly recommend them to anyone looking for web development or marketing.",
      name: "Gabriella Smith",
      role: "Hawker Studios",
      avatar: "/assets/images/gabriella-hawker-studios.webp",
    },
    {
      quote:
        "Rankify's website laid the foundation for us to scale our business from 100k into the multi millions.",
      name: "Jacob Gregory",
      role: "Founder, Tintek Roofing & Cladding",
    },
  ],

  closeHeading: "Ten builds a month. Let's see if one's yours.",
  closeSub:
    "Tell us about your business and we'll say straight away whether this is a fit. If it is, you'll have your homepage in 48 hours and you haven't spent a cent to find out.",
};

export default function FreeHomepageOfferPage() {
  return <DarkFunnelPage cfg={CFG} />;
}
