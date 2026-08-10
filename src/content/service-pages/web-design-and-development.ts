/**
 * Web development — new websites.
 *
 * Structure and copy were carried over wholesale from the Shopify builds page
 * at Tom's request so the layout matches; the wording is still Shopify's and
 * needs replacing section by section. Only the FAQ and the pricing timeline
 * are this page's own.
 */
import type { ServicePageData } from "./types";
import {
  SHOPIFY_CLIENT_LOGOS,
  SHOPIFY_WHY_US,
} from "./shopify-shared";

const CLOSING_NOTE =
  "We believe that a website should be more than just a digital presence—it should be a tool that works for your business. That's why we prioritise performance, user experience in everything we create. We build websites that are fast, efficient, and easy to manage, so you can focus on what matters—running your business.";

export const webDesignAndDevelopment: ServicePageData = {
  hero: {
    variant: "showcase",
    heading: "High-performance websites that actually convert traffic to drive real profit and growth to your business.",
    // No subheading: the headline already carries the promise, same as the
    // reference. No Shopify Partner badge either — this page isn't Shopify.
    intro:
      "From all trades — plumbers, builders, solar — to tech and accounting firms. I've built the lot. I'm a perfectionist, not a single pixel out of line, and I build so your traffic actually calls you or buys your product. Check out my work and results.",
    badges: [
      "Custom-built, conversion-focused",
      "Direct developer access, no middlemen",
      "Unlimited revisions until it's right",
      "No contracts, you own your site",
    ],
    ctaPrimary: { label: "Get Started", href: "#website-configurator" },
    ctaSecondary: { label: "Schedule free strategy Call", href: "/schedule-strategy-call" },
    heroScreenshotWall: "web",
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
        { icon: "clock", label: "Timeline", agency: "2–4 months", us: "7–14 days" },
        { icon: "dollar", label: "Build Cost", agency: "$20k–$40k+", us: "A fraction of that" },
        { icon: "repeat", label: "Retainer", agency: "Mandatory, up to $500/mo", us: "Optional, only if you want ongoing work" },
        { icon: "trending", label: "Built to convert", agency: "Looks nice, maybe", us: "Engineered to sell, and looks better" },
        { icon: "revisions", label: "Revisions", agency: "Billed hourly", us: "Unlimited changes included" },
        { icon: "shield", label: "Hosting & security", agency: "Up to $600/yr, ongoing", us: "We host & secure it, $0" },
        { icon: "card", label: "Ongoing cost / year", agency: "$2,000 – $7,000+", us: "$0", highlight: true },
      ],
      footnote: "Retainers and hosting add up every single year. With me, your running cost is zero.",
      eyebrow: "One developer. Whole-agency output.",
      heading: "A developer who knows AI, conversion, and design is a whole agency in one person.",
      body: [
        "Developers who build with AI are unbeatable on speed — what took a team months now takes one person days, with **cleaner, more optimised code**. Add real conversion knowledge and genuine taste, and you get everything a high-end agency delivers, from the one person who actually does the work.",
        "Here's the part agencies won't tell you: the work got faster for everyone. **They just keep the savings. I pass them straight on to you.** Same high-end result, a fraction of the price — because I'm not paying for overhead, and I'm not here to rip you off.",
        "I'm genuinely passionate about building **high-performance sites that look as good as they convert**.",
      ],
    },
    {
      type: "industries",
      anchorId: "who-we-help",
      kicker: "Who we help",
      eyebrow: "Rankify®",
      heading: "Built for the businesses",
      headingDim: "that live on leads.",
      items: [
        { icon: "trades", label: "Trades & Construction" },
        { icon: "plumbing", label: "Plumbing" },
        { icon: "electrical", label: "Electricians" },
        { icon: "hvac", label: "HVAC & Air-con" },
        { icon: "cleaning", label: "Cleaning Services" },
        { icon: "landscaping", label: "Landscaping" },
        { icon: "accounting", label: "Accountants" },
        { icon: "legal", label: "Lawyers & Legal" },
        { icon: "dental", label: "Dentists" },
        { icon: "medical", label: "Medical & Allied Health" },
        { icon: "realestate", label: "Real Estate" },
        { icon: "finance", label: "Finance & Insurance" },
      ],
    },
    // Reviews, then how the build runs, then the configurator — the visitor
    // gets proof, process and price in that order before the detail sections.
    { type: "testimonials", bare: true },
    {
      type: "cardgrid",
      theme: "paper",
      kicker: "Our Design Process",
      eyebrow: "Rankify®",
      anchorId: "build-process",
      heading: "A simple process. Building your new store:",
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
      type: "configurator",
      anchorId: "website-configurator",
      eyebrow: "Website Configurator",
      heading: "You tell us what pages you want.",
      blurb:
        "We build the website, handle the content, and deliver a high-performance site for your business. Pick your pages and see the price as you go.",
      basePrice: 2999,
      includedPages: 10,
      extraPagePrice: 200,
      corePages: ["Home", "About", "Services", "Contact", "FAQ", "Testimonials", "Location Pages"],
      optionalPages: [
        "Pricing",
        "Gallery / Portfolio",
        "Blog",
        "Case Studies",
        "Team",
        "Booking",
        "Careers",
      ],
      tip: "For each main service you offer we recommend a dedicated page — they rank on their own terms and convert far better than one combined services page.",
      ctaLabel: "Book a call",
      ctaHref: "/schedule-strategy-call",
    },
    {
      type: "cardgrid",
      theme: "paper",
      kicker: "Who this is for",
      eyebrow: "Rankify®",
      anchorId: "who-we-work-with",
      heading: "Who we work with.",
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
      columns: 4,
      items: [
        { idx: "01", anchorId: "custom-store-build", title: "Custom Shopify Store Design & Build", desc: "We design and build fully custom Shopify stores. Not a template with your logo dropped in — a store designed around your brand, products, and how your customers actually shop. Responsive, fast, and built for conversions." },
        { idx: "02", anchorId: "theme-development", title: "Custom Shopify Theme Development", desc: "Need something a pre-built theme can't do? We build custom themes with advanced layouts, product filtering, dynamic sections, and custom functionality that off-the-shelf themes can't deliver." },
        { idx: "03", anchorId: "shopify-migration", title: "Shopify Migration", desc: "Moving from WooCommerce, WordPress, Squarespace, BigCommerce, or Magento? We handle the full migration — products, customers, order history, URL redirects, and SEO preservation. Zero lost rankings." },
        { idx: "04", anchorId: "shopify-seo", title: "Shopify SEO Setup & Optimisation", desc: "Every store we build includes SEO foundations as standard — title tags, meta descriptions, heading structure, image optimisation, schema markup, URL structure, and site speed. Not bolted on after the fact. Built in from the first commit." },
      ],
    },
    SHOPIFY_WHY_US,
    {
      type: "cardgrid",
      theme: "paper",
      kicker: "Why choose rankify?",
      eyebrow: "Rankify®",
      anchorId: "why-rankify",
      heading: "Why invest in an expert Shopify developer with Rankify.",
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
    closingNote: CLOSING_NOTE,
    items: [
      {
        q: "How much does web design cost, and how long does it take?",
        a: "Web design costs vary depending on the complexity of the project, the features required, and the level of customisation. A basic business website typically costs between $3,000 and $10,000 and takes 2–6 weeks to complete. More complex projects, such as eCommerce or custom functionality, may require a higher budget and a longer timeline. Contact us for a tailored quote based on your specific needs.",
      },
      {
        q: "Why is web design important for my business?",
        a: "Your website is your digital storefront—often the first impression customers have of your brand. A professionally designed website builds trust, improves user experience, and helps convert visitors into paying customers. It's essential for showcasing your brand, driving traffic, and staying competitive in today's digital world.",
      },
      {
        q: "What is included in your web design services?",
        a: "Our web design services include custom website design tailored to your brand, mobile-responsive layouts, SEO-ready development to boost search visibility, and integration of contact forms, eCommerce solutions, and analytics tools. We use user-friendly content management systems (CMS) like WordPress, and we also offer post-launch support to ensure your site stays updated and secure.",
      },
      {
        q: "How do you ensure my website is mobile-friendly?",
        a: "We use responsive design techniques to create websites that adapt seamlessly to any device—desktops, tablets, and smartphones. This ensures your site looks great and functions smoothly, providing an excellent user experience across all platforms.",
      },
      {
        q: "Do you provide SEO as part of the web design process?",
        a: "Yes! Our web design process incorporates SEO best practices from the start. This includes optimising page structure, metadata, image compression, and fast loading speeds to improve your website's visibility on search engines like Google.",
      },
      {
        q: "Can you help with content creation for my website?",
        a: "Absolutely. Our team can assist with creating or optimising website content, including text, images, and videos. We focus on crafting engaging and SEO-friendly content that aligns with your brand and speaks directly to your target audience.",
      },
      {
        q: "Do you offer eCommerce website design?",
        a: "Yes, we specialise in designing eCommerce websites that are visually appealing and optimised for sales. Whether you need a simple product showcase or a full-featured online store, we can integrate platforms like Shopify, Framer or WooCommerce / WordPress to meet your business needs.",
      },
      {
        q: "What platform do you use to build websites?",
        a: "We primarily use Framer & Shopify for e-commerce. Non-eCommerce websites will use Framer or WordPress. We also work with other platforms depending on your requirements.",
      },
      {
        q: "What kind of businesses do you work with?",
        a: "We work with businesses across a wide range of industries, including retail and eCommerce, professional services (lawyers, accountants, etc.), healthcare and allied health, hospitality and tourism, real estate and construction, and nonprofits and educational institutions. Whether you're a startup or an established business, we can design a website tailored to your needs.",
      },
      {
        q: "What support do you provide after the website launch?",
        a: "We offer ongoing support to ensure your website remains secure and up-to-date. Our post-launch services include regular updates and maintenance, technical support and troubleshooting, security monitoring, and content updates as needed. We're here to help you keep your website running smoothly as your business grows.",
      },
      {
        q: "Can you redesign my existing website?",
        a: "Yes, we can refresh and modernise your existing website to align with your current branding and business goals. Our redesign services focus on improving user experience, enhancing visuals, and incorporating new features to maximise conversions.",
      },
      {
        q: "Do you work with clients outside the Gold Coast?",
        a: "Absolutely! While we're based on the Gold Coast, we provide web design services to clients across Australia, including Sydney, Melbourne, Brisbane, Perth, and Adelaide. We also serve international clients, collaborating remotely to deliver exceptional results.",
      },
    ],
  },
};
