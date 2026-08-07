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
    heading: "Shopify Development Services",
    subheading: "Built to sell and convert — not just to look good.",
    intro:
      "Plenty of Shopify stores look great and still don't sell. We build custom themes for your brand where every page — collection, product, cart, checkout — is designed to turn browsers into buyers. A world-class store that shows up in your sales, revenue and profit.",
    badges: [
      "Registered Shopify Partner",
      "100% money-back guarantee",
      "Fixed quote before any work starts",
      "Expert custom developer",
      "Deal direct, no managers",
    ],
    ctaPrimary: { label: "View Pricing", href: "#website-pricing" },
    ctaSecondary: { label: "Schedule free strategy Call", href: "/schedule-strategy-call" },
    heroScreenshotWall: true,
  },
  blocks: [
    SHOPIFY_CLIENT_LOGOS,
    { type: "testimonials" },
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
      tiers: [
        {
          badge: "No Cost SEO",
          price: "$5,999",
          period: "/project",
          note: "Delivery time 4-8 weeks*",
          features: ["Homepage + Inner Pages", "Design and Development", "Mobile-Optimised Design", "Collections Pages", "Product Pages"],
          ctaLabel: "Book a call",
          ctaHref: "/schedule-strategy-call",
        },
      ],
      lookingForMore: true,
    },
    SHOPIFY_WHY_US,
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
      { q: "How long does it take to build a custom Shopify store?", a: "Most custom Shopify stores take 3–5 weeks from kickoff to launch. That includes design, development, product setup, SEO configuration, and testing. More complex builds with large catalogues or platform migrations can take 6–8 weeks. You'll get a clear timeline before any work starts." },
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
