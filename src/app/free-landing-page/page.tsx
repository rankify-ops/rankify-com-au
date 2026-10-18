import type { Metadata } from "next";
import { DarkFunnelPage, type FunnelConfig } from "@/components/landing/DarkFunnel";

/**
 * Funnel B, the landing page offer.
 *
 * Audience: businesses whose page isn't converting the traffic they get,
 * whether that's paid, organic or referral. Deliberately not ads-specific:
 * plenty of them aren't running ads yet, and that's the upsell after the build
 * lands. Free asset: a landing page in 48 hours. Paid outcome: the build plus
 * the ad setup with Adalytical.
 *
 * Deliberately separate from Funnel A in every way except the shell. Its own
 * URL, its own pixel audience, its own ad set.
 */
export const metadata: Metadata = {
  title: "Free Landing Page in 48 Hours | Rankify",
  description:
    "We'll build you a landing page in 48 hours, free, so you can see what the traffic you're already getting should actually be doing.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/free-landing-page" },
};

const CFG: FunnelConfig = {
  pixelName: "Free landing page offer",
  ctaHref: "/free-landing-page/book",
  ctaLabel: "Get Started Now",
  ctaMicro: "Landing page delivered in 48 hours",
  eyebrow: "10 builds a month",

  headline: "Your traffic isn't the problem.",
  headlineAccent: "The page you're sending it to is.",

  videoHeading: "This is what we'll build for you",

  proof: { count: "1000+", label: "Businesses served" },
  bullets: [
    "Built in 48 hours",
    "Your brand, not a template",
    "Yours to see before you pay",
    "No lock-in contract",
  ],

  steps: [
    {
      n: "1",
      h: "Claim your free build",
      b: "Hit the button and tell us about the business and where your traffic comes from. Two minutes, and it tells us straight away whether we can help.",
    },
    {
      n: "2",
      h: "A quick fifteen minute call",
      b: "So I understand the business, the offer, and who you're actually trying to reach. No pitch. I need this to build the thing properly.",
    },
    {
      n: "3",
      h: "I build it, you have it in 48 hours",
      b: "A real landing page, your brand, built to convert the traffic you're already getting. Then you decide where to point it."
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
    {
      quote:
        "Absolutely stoked with our website overhaul by Rankify. We just got it live and Tom was there for every question and every little fix that I desired, without hesitation. Great job, Highly recommend and will definitely use again!",
      name: "James Fabre",
      role: "Myoko Embodied",
    },
    {
      quote:
        "Highly recommend Rankify! They recently built our Shopify store, and the entire experience was amazing. The team delivered an awesome, fast, modern, and fully responsive site that looks great on both desktop and mobile. Working with them was incredibly smooth from start to finish. If you need a professional web design business to elevate your online shop, Rankify is the way to go!",
      name: "Grant Shannon",
      role: "The Enricher",
    },
    {
      quote:
        "Rankify did an awesome job on my website. The design looks professional, and the process was super smooth from start to finish. Great communication and attention to detail — highly recommend their services.",
      name: "Ben Cavallo",
      role: "",
    },
    {
      quote:
        "I recently had my website built by Rankify and I couldn’t be happier with the outcome. From start to finish, the process was seamless, professional, and efficient. Tom took the time to really understand my business and brand, and turned that vision into a clean and user-friendly site. Highly recommend Rankify for anyone needing a standout website that reflects their business perfectly.",
      name: "Maggie Belford",
      role: "Australia Care Agency",
    },
    {
      quote:
        "Great experience working with Thomas. He instantly understood what I was after, even with some custom Shopify tweaks, and executed everything with precision and speed. Professional, responsive, and super skilled — I couldn’t be happier with the result. I’ll keep working with him in future projects, highly recommend.",
      name: "Marlen Wolff",
      role: "Wolff Studios",
    },
    {
      quote:
        "Really happy with the website Rankify built for my electrical business. They made the whole process easy, quick, and professional. The site looks great and already helps bring in new leads. Highly recommend!",
      name: "MJB Electrical Contractors",
      role: "",
    },
    {
      quote: "Really happy with the service, easy to deal with and did a great job.",
      name: "Aidan Butler",
      role: "",
    },
  ],

  closeHeading: "Ten builds a month. Let's see if one's yours.",
  closeSub:
    "Tell us about your business and we'll say straight away whether this is a fit. If it is, you'll have the page in 48 hours and you haven't spent a cent to find out.",
};

export default function FreeLandingPageOfferPage() {
  return <DarkFunnelPage cfg={CFG} />;
}
