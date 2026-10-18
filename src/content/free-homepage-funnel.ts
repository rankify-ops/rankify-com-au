import type { FunnelConfig } from "@/components/landing/DarkFunnel";

/**
 * Funnel A, the website offer.
 *
 * Audience: owners with no site, an outdated one, or one that isn't bringing
 * work in. Free asset: a homepage in 48 hours. Paid outcome: the full build.
 *
 * It lives here rather than in a route because two URLs serve it: /free-homepage,
 * which the live ads point at, and /free-homepage-v2, which they pointed at
 * while it was being built. Two copies of a config this long drift apart the
 * first time either one is edited.
 */

const VSL =
  "https://b6oms8njhzb6et8o.public.blob.vercel-storage.com/vsl/free-homepage-vsl-dOolRH0hSieHhVaF7uRTWCbetJRDSL.mp4";

export const freeHomepageFunnel: FunnelConfig = {
  pixelName: "Free homepage offer",
  ctaHref: "/free-homepage/book",
  ctaLabel: "Get Started Now",
  ctaMicro: "Delivered in Under 48 Hours",
  eyebrow: "10 builds a month",

  headline: "We'll build your new homepage free,",
  headlineAccent: "and you'll have it in 48 hours.",

  videoHeading: "This is what we'll build for you",
  videoSrc: VSL,
  chapters: [
    { t: 0, label: "Who this is for" },
    { t: 29, label: "The free home page offer" },
    { t: 44, label: "Five client results" },
    { t: 102, label: "Same traffic, only the page changed" },
    { t: 133, label: "What most websites miss" },
    { t: 167, label: "Who I am" },
    { t: 178, label: "Platforms and agencies I've worked with" },
    { t: 204, label: "What most web developers don't know" },
    { t: 224, label: "What I'll do for you" },
    { t: 239, label: "How it works, the three steps" },
    { t: 266, label: "Your own AI web developer" },
    { t: 285, label: "Making a change by text, email or the app" },
    { t: 304, label: "No lock-in" },
    { t: 324, label: "What you're risking" },
    { t: 351, label: "Next step" },
  ],

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
      b: "Hit the button and tell us a bit about your business. Two minutes, and it tells us straight away whether we can help.",
    },
    {
      n: "2",
      h: "A quick fifteen minute call",
      b: "So I understand the business, your services, and the customer you're after. No pitch. I need it to build the thing properly.",
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
    "Tell us about your business and we'll say straight away whether this is a fit. If it is, you'll have your homepage in 48 hours and you haven't spent a cent to find out.",
};
