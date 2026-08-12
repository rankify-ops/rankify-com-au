/**
 * SEO — the retainer page.
 *
 * Same running order as the web dev and Shopify pages: logos, agency
 * comparison, who it's for, three reasons, reviews, process, price, why
 * invest. The two card grids that existed only to hold a decorative image are
 * gone — they said nothing and pushed the price four screens down.
 */
import type { ServicePageData } from "./types";
import { WEB_CLIENT_LOGOS } from "./client-logos";

const CLOSING_NOTE =
  "SEO compounds. The work we do in month one is still earning in month twelve, which is the opposite of ads — the moment you stop paying for those, the traffic stops. That's why we scope it properly, report on it honestly, and never lock you into a contract to keep you.";

export const seo: ServicePageData = {
  hero: {
    variant: "showcase",
    heading: "Get found by the people already searching for what you sell.",
    intro:
      "Ranking isn't a vanity metric — it's the cheapest lead source you'll ever own. We do the technical work, the on-page work and the content that gets you onto page one, then show you exactly what it's bringing in.",
    badges: [
      "$499 per page, no lock-in contracts",
      "Direct access to the person doing the work",
      "Real reporting — rankings, traffic and leads",
      "Every page optimised, not just the homepage",
    ],
    ctaPrimary: { label: "View Pricing", href: "#seo-pricing" },
    ctaSecondary: { label: "Schedule free strategy Call", href: "/schedule-strategy-call" },
    heroGraphic: "rank",
  },
  blocks: [
    WEB_CLIENT_LOGOS,
    {
      type: "comparison",
      anchorId: "vs-agency",
      tableTitle: "Seriously.. look at the difference!",
      agencyLabel: "Typical SEO Agency",
      usLabel: "Rankify",
      rows: [
        { icon: "person", label: "Who does the work", agency: "Offshore team you never meet", us: "The person you spoke to" },
        { icon: "card", label: "Contract", agency: "6–12 months, locked in", us: "3 month minimum, then month to month" },
        { icon: "dollar", label: "What you pay for", agency: "A retainer, scope unclear", us: "$499 per page, you know exactly what's covered" },
        { icon: "trending", label: "What gets optimised", agency: "A few pages, quietly", us: "Every page you're paying for, listed up front" },
        { icon: "shield", label: "Backlinks", agency: "Bought in bulk, risky", us: "Earned from real, relevant sites" },
        { icon: "revisions", label: "Reporting", agency: "Impressions and 'visibility scores'", us: "Rankings, traffic and leads" },
        { icon: "clock", label: "First results", agency: "\"SEO takes 12 months\"", us: "Movement in 4–8 weeks, compounding after" },
        { icon: "repeat", label: "If you leave", agency: "Rankings fall over — the work was rented", us: "The work stays on your site", highlight: true },
      ],
      footnote:
        "Nobody can promise you position one. What we can promise is that you'll see exactly what was done, what moved, and what it earned.",
      eyebrow: "Owned traffic, not rented.",
      heading: "Every dollar in ads stops working the day you stop paying. SEO doesn't.",
      body: [
        "Ads are a tap: turn them off and the leads stop that afternoon. SEO is an asset — **the page we optimise in month one is still bringing you enquiries in month twelve**, and the month after that, without another dollar of spend.",
        "The catch is that it's slow to start and easy to fake, which is why the industry has the reputation it has. So we price it per page instead of per month, tell you which pages we're working on, and **report on leads rather than impressions**.",
        "We also build the sites — which means the technical foundations, the page speed and the structure are **fixed properly rather than worked around**.",
      ],
    },
    {
      type: "cardgrid",
      theme: "paper",
      kicker: "Who this is for",
      eyebrow: "Rankify®",
      anchorId: "who-we-work-with",
      heading: "Who we work with.",
      subheading:
        "Whether you're just starting out or scaling fast, we build SEO strategies that fit your business model — and your goals.",
      columns: 3,
      items: [
        {
          idx: "01",
          anchorId: "local-businesses",
          title: "Local Businesses",
          desc: "You want the calls coming from your own suburbs. Local SEO, Google Business Profile and location pages that put you in the map pack where the ready-to-buy searches happen.",
        },
        {
          idx: "02",
          anchorId: "corporate-b2b",
          title: "Corporate & B2B",
          desc: "Longer sales cycles, higher value deals. We target the research-stage searches your buyers make months before they contact anyone, so you're the name they already know.",
        },
        {
          idx: "03",
          anchorId: "ecommerce-brands",
          title: "eCommerce Brands",
          desc: "Collection and product pages that rank on their own terms, so you're not paying for every single sale through ads. Turn search traffic into repeat customers.",
        },
      ],
    },
    {
      type: "cardgrid",
      theme: "paper",
      kicker: "Why Rankify",
      eyebrow: "Rankify®",
      anchorId: "why-us",
      heading: "Agency-level work.",
      headingDim: "Without the agency.",
      columns: 3,
      items: [
        {
          idx: "01",
          title: "Expert Web Developer",
          icon: "Expert Shopify Developer",
          desc: "Most SEO agencies can't touch your code — they send you a list and hope your developer actions it. We are the developer, so the technical fixes actually get made.",
        },
        {
          idx: "02",
          title: "AI-Accelerated Development",
          desc: "Research, content briefs and technical audits that used to take an agency weeks take us days — so more of your budget goes into work that moves rankings.",
        },
        {
          idx: "03",
          title: "Outstanding value for money",
          desc: "$499 per page, no retainer you can't leave and no bloated team to fund. You know what's being optimised and what it costs before it starts.",
        },
      ],
    },
    {
      type: "testimonials",
      bare: true,
      kicker: "Reviews",
      eyebrow: "Rankify®",
      heading: "Every review is five stars.",
      headingDim: "That's not an accident.",
    },
    {
      type: "cardgrid",
      theme: "paper",
      kicker: "How it works",
      eyebrow: "Rankify®",
      anchorId: "how-we-do-it",
      heading: "So how does it work?",
      headingDim: "How do we actually move you up the page?",
      columns: 3,
      items: [
        {
          idx: "01",
          anchorId: "research-strategy",
          title: "Research & Strategy",
          desc: "We start by understanding your site, your competitors, your market, and what your customers are actually searching for. This gives us the insights to build a roadmap based on real data — not assumptions.",
        },
        {
          idx: "02",
          anchorId: "technical-seo",
          title: "Technical SEO",
          desc: "We audit your site for speed, mobile responsiveness, crawlability, indexation, and structure. Then we optimise it to be fast, clean, and Google-friendly.",
        },
        {
          idx: "03",
          anchorId: "on-page-seo",
          title: "On-Page SEO",
          desc: "We optimise your metadata, headings, internal linking, and site architecture. Every page is built to perform and written to connect.",
        },
        {
          idx: "04",
          anchorId: "content-authority",
          title: "Content & Authority",
          desc: "We create and suggest content that positions you as the go-to expert. Blogs, service pages, FAQs — all crafted to attract links, build authority, and rank.",
        },
        {
          idx: "05",
          anchorId: "off-page-seo",
          title: "Off-Page SEO",
          desc: "We focus on building clean, high-quality backlinks from real sites. We also optimise your Google Business Profile and ensure local citations are accurate and consistent.",
        },
        {
          idx: "06",
          anchorId: "tracking-reporting",
          title: "Tracking & Reporting",
          desc: "You'll get regular reports showing rankings, traffic, leads, and keyword movements. No fluff — just the data that matters.",
        },
      ],
    },
    {
      type: "configurator",
      anchorId: "seo-pricing",
      eyebrow: "SEO Configurator",
      heading: "Pick the pages you want ranking.",
      blurb:
        "$499 per page, per month, with a three month minimum. Tick the pages that actually bring you work and the price updates as you go — no open-ended retainer, no guessing what's covered.",
      // Per-page model rather than the web dev page's base-plus-extras.
      pricePerPage: 499,
      minMonths: 3,
      checkout: false,
      corePages: ["Home", "Main service page", "Location page"],
      optionalPages: [
        "Second service page",
        "Third service page",
        "Second location page",
        "About",
        "Contact",
        "Pricing",
        "Blog category",
        "Product / collection page",
      ],
      includes: [
        "Keyword research",
        "On-page optimisation",
        "Meta title and description",
        "Heading structure (H1–H3)",
        "Internal linking",
        "Image alt text and compression",
        "Schema markup",
        "Content updates for SEO",
        "Search Console monitoring",
      ],
      tip: "Start with the pages that already make you money — your main service page and the suburb you most want work in. Those move first, and they fund the rest.",
      ctaLabel: "Book a call",
      ctaHref: "/schedule-strategy-call",
    },
    {
      type: "cardgrid",
      theme: "paper",
      kicker: "Why choose rankify?",
      eyebrow: "Rankify®",
      anchorId: "why-rankify",
      heading: "Why invest in SEO with Rankify.",
      columns: 3,
      items: [
        {
          idx: "01",
          title: "DIY or AI Website Builders",
          desc: [
            "Plugins that tick green without changing a ranking.",
            "No idea which keywords are worth chasing.",
            "Technical problems you can't see and can't fix.",
            "Content written for Google, not for buyers.",
            "Months of effort with nothing to show for it.",
            "No reporting, so you never know if it worked.",
          ],
        },
        {
          idx: "02",
          title: "With other freelancers or agencies",
          desc: [
            "Locked into 6–12 months before you've seen a result.",
            "A retainer with no clear list of what's included.",
            "Bulk backlinks that put your site at risk.",
            "Reports full of impressions and visibility scores.",
            "Recommendations your developer never actions.",
            "Rankings that collapse the month you leave.",
          ],
        },
        {
          idx: "03",
          title: "With Rankify",
          desc: [
            "$499 per page — you know exactly what's covered.",
            "Three month minimum, then month to month.",
            "We're the developer, so technical fixes get made.",
            "Backlinks earned from real, relevant sites.",
            "Reporting on rankings, traffic and leads.",
            "The work stays on your site if you leave.",
          ],
        },
      ],
    },
  ],
  faq: {
    heading: "FAQ.",
    subheading: "Got questions? We've got answers. Here's everything you need to know about working with us.",
    closingNote: CLOSING_NOTE,
    items: [
      { q: "What is SEO?", a: "Search Engine Optimisation (SEO) helps your site show up when people search for what you offer. Better rankings mean more traffic, leads, and sales — without paying for ads." },
      { q: "How does SEO work?", a: "We optimise your website behind the scenes, write smart content, and build links to help you rank higher on Google. It's about improving your site and building authority over time." },
      { q: "Is SEO right for my business?", a: "If your customers are searching online, yes. SEO is ideal for local services, B2B, and eCommerce — but it's a long game, not a quick fix." },
      { q: "How much does SEO cost?", a: "$499 per page, per month, with a three month minimum. You pick the pages worth ranking and the price is simply that many pages — so a three page campaign is $1,497 a month and you know exactly what's covered. No open-ended retainer, no lock-in past the first three months." },
      { q: "How fast will I see results?", a: "Most clients see traction in 3–6 months. SEO builds over time — real growth doesn't happen overnight." },
      { q: "Do I need to keep doing SEO once I rank?", a: "Yes. Rankings shift, algorithms update, and your competitors don't stop. Staying on top requires consistent work." },
      { q: "What's a backlink?", a: "A backlink is when another website links to yours. Good backlinks build trust with Google and help you rank." },
      { q: "What's black-hat SEO?", a: "Dodgy tactics like keyword stuffing or fake backlinks. They can get you penalised. We don't touch them." },
      { q: "What makes a good backlink?", a: "Relevant, real, and from a site with authority. Quality always beats quantity." },
      { q: "What is keyword research?", a: "Finding out what your customers actually search for — and building your content and strategy around that." },
      { q: "What's the difference between SEO and Google Ads?", a: "SEO = long-term organic growth. Ads = short-term traffic you pay for. Both can work together." },
      { q: "How do you measure SEO success?", a: "We track rankings, traffic, conversions, and leads. Not just vanity metrics — real business results." },
      { q: "What's Google Analytics used for?", a: "It shows us who's visiting your site, how they got there, and what they're doing. We use it to improve performance." },
      { q: "How often do algorithms change?", a: "All the time. Google tweaks things daily and rolls out major updates every few months — we stay on top of them." },
      { q: "What if my business is brand new?", a: "Start SEO early. It takes time to build authority, so the sooner you start, the sooner you rank." },
      { q: "How is local SEO different?", a: "Local SEO focuses on your area — think maps, suburbs, and nearby searches. It's all about getting found by people close to you." },
      { q: "Why is content important for SEO?", a: "Content is what Google reads. It needs to answer questions, build trust, and show you're the expert." },
      { q: "Can I get penalised for keyword stuffing?", a: "Yes. If Google thinks you're trying to game the system, your rankings will tank. Keep it natural." },
    ],
  },
};
