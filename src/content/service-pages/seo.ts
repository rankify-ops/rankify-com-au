import type { ServicePageData } from "./types";

const CLOSING_NOTE =
  "We believe that a website should be more than just a digital presence—it should be a tool that works for your business. That's why we prioritise performance, user experience in everything we create. We build websites that are fast, efficient, and easy to manage, so you can focus on what matters—running your business.";

export const seo: ServicePageData = {
  hero: {
    variant: "content",
    kicker: "About us",
    heading: "Search Engine Optimisation (SEO)",
    intro:
      "Strategic SEO that actually delivers. At Rankify, we don't just offer SEO—we engineer it for impact. From day one, we start implementing SEO strategies that push your business forward to rank higher, bring in traffic, and convert more leads.",
    note: "No overcomplicated processes, just effective solutions tailored to your needs.",
    ctaPrimary: { label: "View Pricing", href: "#pricing" },
    ctaSecondary: { label: "Schedule free strategy Call", href: "/schedule-strategy-call" },
  },
  blocks: [
    {
      type: "cardgrid",
      theme: "paper",
      items: [],
      bottomImage: "/assets/images/fnJ56Jb25VUcg7GUFCVy9YYXQgw.webp",
    },
    {
      type: "cardgrid",
      theme: "paper",
      kicker: "About us",
      eyebrow: "Rankify®",
      anchorId: "how-we-do-it",
      heading: "We take SEO seriously — and strategically. Here's how we do it.",
      subheading:
        "See how our team combines creativity, technology, and strategy to build powerful digital solutions.",
      cta: { label: "View Pricing", href: "#pricing" },
      columns: 3,
      bottomImage: "/assets/images/vd3jPqXLHArRT1YSC4NMwStsnA.png",
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
      type: "cardgrid",
      theme: "paper",
      kicker: "About us",
      eyebrow: "Rankify®",
      anchorId: "who-we-work-with",
      heading: "Who We Work With.",
      subheading:
        "Whether you're just starting out or scaling fast, we build SEO strategies that fit your business model — and your goals.",
      columns: 3,
      items: [
        { idx: "01", anchorId: "local-businesses", title: "Local Businesses", desc: "Get found by the people in your area who need you most." },
        { idx: "02", anchorId: "corporate-b2b", title: "Corporate & B2B", desc: "Serious SEO for serious growth, scale, and visibility." },
        { idx: "03", anchorId: "ecommerce-brands", title: "eCommerce Brands", desc: "Turn search traffic into consistent sales and brand loyalty." },
      ],
    },
    {
      type: "pricing",
      eyebrow: "SEO Pricing",
      anchorId: "seo-pricing",
      heading: "$499 per page — 3 months minimum engagement.",
      subheading: "Most agencies charge $350–$500/hr for Shopify development. We offer dedicated retainer support from $499/month.",
      lookingForMore: true,
      lookingForMoreCta: { label: "Book a call", href: "/schedule-strategy-call" },
      tiers: [
        {
          name: "Pay Per Page.",
          badge: "1 OPTION ONLY!",
          spots: "8 Spots Available",
          price: "$499",
          period: "/ Per Month",
          note: "$499 per page to optimise, minimum 3 month engagement.",
          features: [
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
          ctaLabel: "Order Now",
          ctaHref: "/contact",
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
      { q: "How much does SEO cost?", a: "Rankify SEO starts at $1,500/month. Pricing varies depending on your goals and how competitive your niche is." },
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
