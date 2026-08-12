/**
 * Shopify — new store builds. This is a paid-traffic landing page: one intent,
 * one process, one price. Retainer and hourly work lives on /shopify-developer.
 */
import type { ServicePageData } from "./types";
import {
  SHOPIFY_CLIENT_LOGOS,
  SHOPIFY_CLOSING_NOTE,
  SHOPIFY_COMMON_FAQ,
  SHOPIFY_WHY_US,
} from "./shopify-shared";

export const shopifyDevelopmentServices: ServicePageData = {
  hero: {
    variant: "showcase",
    heading: "High-performance Shopify stores that actually convert traffic to drive real profit and growth to your business.",
    // No subheading — the headline already says it converts.
    intro:
      "Plenty of Shopify stores look great and still don't sell. We build custom themes for your brand where every page — collection, product, cart, checkout — is designed to turn browsers into buyers. A world-class store that shows up in your sales, revenue and profit.",
    partnerLogo: {
      src: "/assets/images/shopify-partners.webp",
      alt: "Shopify Partners",
    },
    badges: [
      "Registered Shopify Partner",
      "100% money-back guarantee",
      "Fixed quote before any work starts",
      "Expert custom developer",
      "Deal direct, no managers",
    ],
    ctaPrimary: { label: "View Pricing", href: "#website-pricing" },
    ctaSecondary: { label: "Schedule free strategy Call", href: "/schedule-strategy-call" },
    heroScreenshotWall: "shopify",
  },
  blocks: [
    SHOPIFY_CLIENT_LOGOS,
    {
      type: "comparison",
      anchorId: "vs-agency",
      tableTitle: "Seriously.. look at the difference!",
      agencyLabel: "Typical Agency",
      usLabel: "Rankify",
      rows: [
        { icon: "person", label: "Who you talk to", agency: "Account managers, juniors, whoever", us: "Just the developer" },
        { icon: "clock", label: "Timeline", agency: "2–4 months", us: "4–8 weeks" },
        { icon: "dollar", label: "Build cost", agency: "$20k–$40k+", us: "From $5,999" },
        { icon: "trending", label: "The theme", agency: "A premium theme reskinned", us: "Custom Liquid, built around your products" },
        { icon: "repeat", label: "Apps", agency: "Bolted on — $50–200/mo forever", us: "Built into the theme wherever we can" },
        { icon: "shield", label: "Migration", agency: "Quoted as a separate project", us: "Products, customers, orders and redirects included" },
        { icon: "revisions", label: "Revisions", agency: "Billed hourly", us: "Unlimited, submitted in 2 rounds" },
        { icon: "card", label: "Ongoing cost to us / year", agency: "$2,000 – $7,000+ retainer", us: "$0 unless you want us", highlight: true },
      ],
      // Says the quiet part: you pay Shopify either way. Claiming "$0 ongoing"
      // outright — as the web dev page can — would be a lie on a platform the
      // merchant subscribes to.
      footnote:
        "You'll always pay Shopify for the platform itself. Everything else — agency retainers, app subscriptions, per-change invoices — is optional with us.",
      eyebrow: "One developer. Whole-agency output.",
      heading: "A Shopify developer who knows conversion, design and AI is a whole agency in one person.",
      body: [
        "Developers who build with AI are unbeatable on speed — what took a team months now takes one person weeks, with **cleaner, more optimised Liquid**. Add real conversion knowledge and genuine taste, and you get everything a high-end Shopify agency delivers, from the one person who actually does the work.",
        "Here's the part agencies won't tell you: the work got faster for everyone. **They just keep the savings. I pass them straight on to you.** Same high-end store, a fraction of the price — because I'm not paying for overhead, and I'm not here to rip you off.",
        "I'm a **Shopify Partner** and I'm genuinely passionate about building **stores that look as good as they sell**.",
      ],
    },
    // Same slot as the web dev page's industry grid — straight after the
    // agency comparison, before the three reasons.
    {
      type: "industries",
      anchorId: "who-we-help",
      kicker: "Who we help",
      eyebrow: "Rankify®",
      heading: "Built for the brands",
      headingDim: "that get scaled profitably.",
      items: [
        { icon: "fashion", label: "Fashion & Apparel" },
        { icon: "jewellery", label: "Jewellery & Watches" },
        { icon: "beauty", label: "Beauty & Cosmetics" },
        { icon: "homewares", label: "Homewares & Furniture" },
        { icon: "food", label: "Food & Beverage" },
        { icon: "supplements", label: "Health & Supplements" },
        { icon: "pets", label: "Pet Supplies" },
        { icon: "sporting", label: "Sporting Goods" },
        { icon: "electronics", label: "Electronics & Gadgets" },
        { icon: "baby", label: "Baby & Kids" },
        { icon: "gifts", label: "Gifts & Flowers" },
        { icon: "multistore", label: "General & Multi-store" },
      ],
    },
    {
      type: "cardgrid",
      theme: "paper",
      kicker: "Who this is for",
      eyebrow: "Rankify®",
      anchorId: "who-we-work-with",
      heading: "Who we work with.",
      cta: { label: "View Pricing", href: "#website-pricing" },
      columns: 3,
      items: [
        { idx: "01", anchorId: "launching-a-new-store", title: "Launching a new store", desc: "You need a custom Shopify store built properly from day one. Design, development, products, payments, shipping, and SEO — all handled." },
        { idx: "02", anchorId: "migrating-to-shopify", title: "Migrating to Shopify", desc: "You're on WooCommerce, Squarespace, Magento, or an outdated platform and need a clean migration to Shopify without losing your search rankings or customer data." },
        { idx: "03", anchorId: "scaling-shopify-plus", title: "Scaling & Shopify Plus", desc: "You've outgrown standard Shopify and need custom checkout, B2B functionality, or advanced integrations. We work with Shopify Plus for stores that need enterprise-level features." },
      ],
    },
    // Local copy of the shared grid so the heading lands only here — the
    // shopify-developer page still runs it headerless.
    {
      ...SHOPIFY_WHY_US,
      anchorId: "why-us",
      kicker: "Why Rankify",
      eyebrow: "Rankify®",
      heading: "Agency-level work.",
      headingDim: "Without the agency.",
    },
    // `bare` drops the homepage section's own heading, 5/5 counter and stats
    // grid, which duplicate claims made higher up this page.
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
      kicker: "Our Design Process",
      eyebrow: "Rankify®",
      anchorId: "build-process",
      heading: "A simple process. Building your new store:",
      cta: { label: "View Pricing", href: "#website-pricing" },
      columns: 3,
      items: [
        { idx: "01", title: "Discovery Call & Scoping", image: "/assets/images/Z6tHt1zj6Xzi4mqYcUDecqw9s.png", desc: "We start with a call to understand your business, products, customers, and goals. No generic questionnaires. You get a detailed scope document and fixed quote before any work begins." },
        { idx: "02", title: "Design Mockup", image: "/assets/images/DPStQ1OLWHQEotlRG324OWMdXgA.png", desc: "We mock up your homepage, key page templates (collection, product, about, contact), and mobile layouts. You review and approve before development starts. Nothing gets built until you're happy with the design." },
        { idx: "03", title: "Shopify Development", image: "/assets/images/OcCBB2O75VsaHiIw8nfSpLAtJjo.webp", desc: "We build your store using clean, custom Liquid code on top of your approved design. Products, collections, payment gateways, shipping rules, tax settings, app integrations — everything configured and tested." },
        { idx: "04", title: "Testing, Revisions & SEO", image: "/assets/images/BRmVb3sj222Zc8G43z2kcUcKHy8.webp", desc: "Full SEO setup — metadata, schema markup, redirects (for migrations), site speed optimisation. Cross-browser and cross-device testing. We catch the problems before your customers do." },
        { idx: "05", title: "Launch", image: "/assets/images/jeJzliriilgkAa6aYwiNxC60o.webp", desc: "We handle DNS, domain configuration, and go-live. You get a training walkthrough so you can manage day-to-day product and content updates yourself." },
        { idx: "06", title: "Ongoing support (optional)", image: "/assets/images/htpsqYBKyKw4QhDxfxQWLbtZXE.webp", desc: "Your store is live but the work doesn't have to stop. Move onto a monthly retainer for bug fixes, design updates, new features, and performance monitoring. Your developer already knows your store — no re-onboarding, no handovers.", cta: { label: "See retainer options", href: "/shopify-developer" } },
      ],
    },
    {
      type: "pricing",
      anchorId: "website-pricing",
      eyebrow: "Simple pricing",
      heading: "Websites Starting From",
      tag: "Per project",
      lookingForMore: true,
      tiers: [
        {
          price: "$5,999",
          period: "/project",
          note: "Delivery time 4–8 weeks",
          features: ["Homepage + up to 4 inner pages", "Design and Development", "Mobile-Optimised Design"],
          ctaLabel: "Get in touch",
          ctaHref: "/contact",
        },
      ],
    },
    {
      type: "cardgrid",
      theme: "paper",
      kicker: "Services Section",
      eyebrow: "Rankify®",
      anchorId: "services",
      heading: "What's included in a new store build",
      subheading:
        "Everything needed to get a custom Shopify store designed, built, migrated where necessary, and ready to rank from day one.",
      cta: { label: "View Pricing", href: "#website-pricing" },
      columns: 4,
      items: [
        { idx: "01", anchorId: "custom-store-build", title: "Custom Shopify Store Design & Build", desc: "We design and build fully custom Shopify stores. Not a template with your logo dropped in — a store designed around your brand, products, and how your customers actually shop. Responsive, fast, and built for conversions." },
        { idx: "02", anchorId: "theme-development", title: "Custom Shopify Theme Development", desc: "Need something a pre-built theme can't do? We build custom themes with advanced layouts, product filtering, dynamic sections, and custom functionality that off-the-shelf themes can't deliver." },
        { idx: "03", anchorId: "shopify-migration", title: "Shopify Migration", desc: "Moving from WooCommerce, WordPress, Squarespace, BigCommerce, or Magento? We handle the full migration — products, customers, order history, URL redirects, and SEO preservation. Zero lost rankings." },
        { idx: "04", anchorId: "shopify-seo", title: "Shopify SEO Setup & Optimisation", desc: "Every store we build includes SEO foundations as standard — title tags, meta descriptions, heading structure, image optimisation, schema markup, URL structure, and site speed. Not bolted on after the fact. Built in from the first commit." },
      ],
    },
    {
      type: "cardgrid",
      theme: "paper",
      kicker: "Why choose rankify?",
      eyebrow: "Rankify®",
      anchorId: "why-rankify",
      heading: "Why invest in an expert Shopify developer with Rankify.",
      cta: { label: "View Pricing", href: "#website-pricing" },
      columns: 3,
      items: [
        {
          idx: "01",
          title: "DIY or AI Website Builders",
          desc: [
            "Generic templates that look like every other store.",
            "No custom functionality — stuck with what the theme gives you.",
            "SEO issues you won't know about until you're not ranking.",
            "Broken mobile layouts, slow page speeds, no schema markup.",
            "Hours spent troubleshooting instead of running your business.",
            "No one to call when something breaks.",
          ],
        },
        {
          idx: "02",
          title: "With other freelancers or agencies",
          desc: [
            "Agencies charge $15k–$50k+ for the same scope of work.",
            "Freelancers disappear mid-project or go unresponsive.",
            "Passed between project managers — never speak to the developer.",
            "Slow timelines, weeks of waiting for simple changes.",
            "Cookie-cutter builds disguised as “custom” development.",
            "No ongoing support after launch — you're on your own.",
          ],
        },
        {
          idx: "03",
          title: "With Rankify",
          desc: [
            "Custom Shopify development, no shortcuts.",
            "Direct access to your developer, every time.",
            "AI-accelerated workflow — agency quality in a fraction of the time.",
            "SEO, schema, and speed optimisation built into every build.",
            "Fixed quotes with no surprise invoices.",
            "Ongoing retainer support so your store keeps improving after launch.",
          ],
        },
      ],
    },
  ],
  faq: {
    heading: "FAQ.",
    subheading: "Got questions? We've got answers. Here's everything you need to know about working with us.",
    closingNote: SHOPIFY_CLOSING_NOTE,
    items: [
      { q: "How long does it take to build a custom Shopify store?", a: "Most custom Shopify stores take 4–8 weeks from kickoff to launch. That includes design, development, product setup, SEO configuration, and testing. Smaller catalogues land at the shorter end; large catalogues and platform migrations sit at the longer end. You'll get a clear timeline before any work starts." },
      { q: "Do you build custom Shopify themes or use pre-made templates?", a: "Both. We own a library of base themes and assets, and we also work with premium third-party themes when they provide a strong foundation. From there we customise with custom Liquid code, bespoke sections, and layouts built around your brand and products. Sometimes we build from scratch, sometimes a theme gives us 70% of what's needed and we build the rest on top." },
      { q: "Can you migrate my store to Shopify from WooCommerce or another platform?", a: "Yes. We handle full migrations from WooCommerce, WordPress, Squarespace, BigCommerce, and Magento. That includes products, customer data, order history, URL redirects, and SEO preservation. The goal is to move you to Shopify without losing rankings, customers, or data." },
      { q: "Do you work with Shopify Plus?", a: "Yes. We build on Shopify Plus for businesses that need advanced features — custom checkout, B2B wholesale portals, multi-currency, and advanced API integrations. We'll advise whether standard Shopify or Shopify Plus is the right fit based on your requirements and sales volume." },
      { q: "What Shopify plan do I need?", a: "For most small to medium eCommerce businesses, the standard Shopify plan works well. If you're just starting out, Basic Shopify is fine. For larger catalogues, higher volume, or advanced reporting, Advanced Shopify or Shopify Plus may be needed. We'll recommend the right plan during the discovery call." },
      { q: "Do you offer Shopify SEO services?", a: "Every store we build includes SEO foundations — title tags, meta descriptions, heading structure, image optimisation, site speed, schema markup, and clean URL structure. For ongoing SEO beyond the initial build — content strategy, link building, keyword targeting — we offer that separately through our SEO packages." },
      { q: "What happens after launch?", a: "Your store is live but the work doesn't have to stop. You can move onto a monthly retainer for bug fixes, design updates, new features, and performance monitoring. Your developer already knows your store — no re-onboarding, no handovers." },
      ...SHOPIFY_COMMON_FAQ,
    ],
  },
};
