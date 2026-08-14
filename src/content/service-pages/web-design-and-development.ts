/**
 * Web development — new websites.
 *
 * Structure was carried over wholesale from the Shopify builds page at Tom's
 * request so the two layouts match, then the copy was rewritten for websites.
 * Nothing on this page should read as Shopify — an online store is a separate
 * build on a separate page.
 */
import type { ServicePageData } from "./types";
import { SHOPIFY_WHY_US } from "./shopify-shared";
import { WEB_CLIENT_LOGOS } from "./client-logos";

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
      // Leads with the promise; the two-round mechanic is spelled out in the
      // process section rather than hedged here.
      "Unlimited revisions",
      "30-day money-back guarantee",
    ],
    ctaPrimary: { label: "Get Started", href: "#website-configurator" },
    ctaSecondary: { label: "Schedule free strategy Call", href: "/schedule-strategy-call" },
    heroScreenshotWall: "web",
  },
  blocks: [
    WEB_CLIENT_LOGOS,
    // Straight under the logos, before the proof: the visitor meets the person
    // who'll actually build it before they meet the evidence.
    {
      type: "devcard",
      anchorId: "your-developer",
      heading: "Hey — I'm your developer.",
      body:
        "You'll work with me directly, as your only point of contact. No outsourcing, no juniors, no account managers — just me. I build websites that actually drive revenue and profit, and I'm genuinely good at it. Have a look through the page, and when you're ready we'll launch a high-performance website for your business at a fraction of what an agency would charge you — live faster, and performing better.",
      photo: "/assets/images/fZdV1icYbXIkqfVAekWtJEAifo.png",
      name: "Thomas Flood",
      role: "Director of Digital Strategy",
    },
    // Real clients. Five have logos in /assets/logos-web; Geelong Heat Pumps
    // has none yet and renders its name in the same box. Only Hawker Studios
    // has a case study page — the rest point at /projects until theirs exist.
    {
      type: "casestudyrow",
      anchorId: "case-studies",
      kicker: "Proof",
      heading: "Built, launched,",
      headingDim: "and still bringing in work.",
      subheading: "Real builds for real businesses. Click one to see what it did.",
      items: [
        {
          name: "Prime Group",
          logo: "/assets/logos-web/prime-group.webp",
          industry: "Building & Construction",
          // The chip is the headline number. "Live in 7 days" was a delivery
          // stat; this one is the outcome he actually cares about.
          timeline: "Paid for itself in 2 weeks",
          liveUrl: "https://primegroupbuild.com.au/",
          summary:
            "Prime Group didn't want a design project. He wanted the phone ringing. Seven days after we started, the site was live — and inside a fortnight a single booked job had paid for the website, the month's ad spend, and still left him in profit.",
          results: [
            "One booked job paid for the entire build — and the month's ads on top",
            "10 leads in the first two weeks, from a site that was live in 7 days",
            "Profitable before most agencies deliver a first draft",
            "Everything after that job was margin, not recovery",
          ],
          // Nick's wording, trimmed at Tom's request.
          quote:
            "Rankify had my website live in 7 days, which I didn't think was possible. I had about 10 enquiries in the first fortnight. One of those turned into a job that covered the website with plenty of money left over.",
          quoteName: "Nick",
          quoteRole: "Owner, Prime Group",
          quoteAvatar: "/assets/images/nick-prime-group.webp",
        },
        // Results still to come — these cards stay flat and unclickable rather
        // than opening an empty popup.
        {
          name: "Hawker Studios",
          logo: "/assets/logos-web/hawker-studio.webp",
          industry: "Photo & Content Studio",
          // Hard number leads the chip; "built in 4 weeks" is delivery, this is
          // the outcome they actually got.
          timeline: "Bookings up 22%",
          liveUrl: "https://www.hawker-studios.com/",
          summary:
            "A Gold Coast natural light studio with two Currumbin Waters locations. They needed creators to see the spaces, check availability and lock in a session in minutes — instead of a chain of back-and-forth emails.",
          results: [
            "Bookings up 22% once the new booking system went live",
            "Booking handled on the site, not over email",
            "Both studio locations bookable in minutes",
            "Built and launched in 4 weeks, SEO in from the first page",
          ],
          // Gabriella's approved wording, verbatim. Do not trim or reword.
          quote:
            "The Rankify team was incredibly fast and delivered a top-quality website for us. We're really impressed and would highly recommend them to anyone looking for web development or marketing.",
          quoteName: "Gabriella Smith",
          quoteRole: "Hawker Studios",
          quoteAvatar: "/assets/images/gabriella-hawker-studios.webp",
        },
        {
          name: "Tintek Roofing & Cladding",
          logo: "/assets/logos-web/tintek.webp",
          industry: "Roofing & Cladding",
          timeline: "$100k to multi-million",
          liveUrl: "https://tintek.com.au/",
          results: [
            "Scaled from $100k turnover into the multi-millions",
            "A site built to carry that growth, not be rebuilt through it",
          ],
          quote:
            "Rankify's website laid the foundation for us to scale our business from 100k into the multi millions.",
          quoteName: "Jacob Gregory",
          quoteRole: "Founder, Tintek",
        },
        {
          name: "Adalytical",
          logo: "/assets/logos-web/adalytical.webp",
          industry: "Google Ads Partner",
          industryIcon: "google-ads",
          timeline: "Fastest growing Google Ads business in Australia",
          // Their site isn't finished yet, so this points at the call rather
          // than showing unfinished work.
          liveUrl: "/schedule-strategy-call",
          liveLabel: "Book a call",
          // A referral partner rather than a client — the proof here is that an
          // ads agency sends us the builds their own campaigns depend on.
          summary:
            "Adalytical rely on Rankify for the builds behind their campaigns — entire websites, landing pages, and every conversion element on them. Their ads get the click; the page has to book the job or get the sale.",
          quote:
            "We partner with Rankify when our clients are in need of a new website, Shopify store or landing pages — high-performance builds we know will convert.",
          quoteName: "Jackson Wallace",
          quoteRole: "Founder, Adalytical · Ex-Google growth team",
          quoteAvatar: "/assets/images/jackson-adalytical.webp",
        },
      ],
    },
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
        { icon: "revisions", label: "Revisions", agency: "Billed hourly", us: "Unlimited, submitted in 2 rounds" },
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
      type: "quote",
      // Nick's wording, trimmed at Tom's request.
      quote:
        "Rankify had my website live in 7 days, which I didn't think was possible. I had about 10 enquiries in the first fortnight. One of those turned into a job that covered the website with plenty of money left over.",
      name: "Nick",
      role: "Owner, Prime Group",
      avatar: "/assets/images/nick-prime-group.webp",
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
    // Three reasons, then reviews, then how the build runs, then the
    // configurator — the visitor gets the pitch, proof, process and price in
    // that order before the detail sections.
    // The shared three-reason grid, headed. Every service page heads it the
    // same way so the cards never appear without context.
    {
      ...SHOPIFY_WHY_US,
      anchorId: "why-us",
      kicker: "Why Rankify",
      eyebrow: "Rankify®",
      heading: "Agency-level work.",
      headingDim: "Without the agency.",
      // Same three reasons as the Shopify pages, written for websites. `icon`
      // keeps the artwork that was keyed to the old title.
      items: [
        {
          idx: "01",
          title: "Expert Web Developer",
          icon: "Expert Shopify Developer",
          desc: "Years of hands-on experience building custom websites, custom features, and the integrations behind them — without the agency overhead.",
        },
        {
          idx: "02",
          title: "AI-Accelerated Development",
          desc: "We use AI-powered tools to build and ship faster. What takes agencies weeks, we deliver in days.",
        },
        {
          idx: "03",
          title: "Outstanding value for money",
          desc: "Senior-level web development at a fraction of the agency cost. No bloated teams, no inflated invoices.",
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
      type: "quote",
      // Gabriella's approved wording, verbatim. Do not trim or reword.
      quote:
        "The Rankify team was incredibly fast and delivered a top-quality website for us. We're really impressed and would highly recommend them to anyone looking for web development or marketing.",
      name: "Gabriella Smith",
      role: "Hawker Studios",
      avatar: "/assets/images/gabriella-hawker-studios.webp",
    },
    {
      type: "cardgrid",
      theme: "paper",
      kicker: "How it works",
      eyebrow: "Rankify®",
      anchorId: "build-process",
      // Written for the person hesitating because they can't picture the
      // process — every step answers "what do I actually have to do?".
      heading: "So how does it work?",
      headingDim: "How do we get everything on your website right?",
      columns: 3,
      items: [
        { idx: "01", title: "Get your price, or talk it through", image: "/assets/images/Z6tHt1zj6Xzi4mqYcUDecqw9s.png", desc: "Already know roughly what you need? Use the configurator above, pick your pages, see the exact price, and check out. Prefer to talk first? Book a call and we'll go through it together — what you need, what you don't, and what it'll cost. No pressure either way." },
        { idx: "02", title: "Fill in the onboarding form", image: "/assets/images/DPStQ1OLWHQEotlRG324OWMdXgA.png", desc: "The moment you order, we send you one form. Your logo, your business details, the services you offer, and anything else you think we should know. That's the only homework — and if you don't have a logo or copy, tell us and we'll sort it." },
        { idx: "03", title: "We design and build it", image: "/assets/images/OcCBB2O75VsaHiIw8nfSpLAtJjo.webp", desc: "You get a custom site — modern, fast, and on brand. Not a template. Every page is laid out around the way your customers actually decide, with the conversion elements that make them call or buy in the right places. Content, forms, tracking and SEO all handled." },
        { idx: "04", title: "Unlimited revisions", image: "/assets/images/BRmVb3sj222Zc8G43z2kcUcKHy8.webp", desc: "Change as much as you like. A colour, a headline, every page, the whole design if it isn't right — there's no cap on what you can ask for, and nothing gets called out of scope or billed per change. Changes come back to us in two rounds, so send everything you want in one hit and we'll work through the lot." },
        { idx: "05", title: "Launch", image: "/assets/images/jeJzliriilgkAa6aYwiNxC60o.webp", desc: "We handle the domain, the DNS and going live. Your site is custom coded, so there's no page builder for you to wrestle with — send us changes any time and we make them, twice a month, at no charge. Live in 7–14 days from sign-off, hosted and secured for $0." },
        { idx: "06", title: "Getting traffic to it", image: "/assets/images/htpsqYBKyKw4QhDxfxQWLbtZXE.webp", desc: "A website only earns once people find it. When you're ready, the same team handles the SEO and the ads that bring in the traffic — and we keep improving the site as you grow. Optional, and only when it makes sense for you.", cta: { label: "Talk about growing traffic", href: "/schedule-strategy-call" } },
      ],
    },
    {
      type: "configurator",
      anchorId: "website-configurator",
      eyebrow: "Website Configurator",
      // The section offers two routes now, so the heading can't describe only
      // the one where they do the work.
      heading: "Your website, priced before you commit.",
      blurb:
        "Hand us the whole thing and we'll scope the pages, or pick them yourself — either way you see the price up front and we build a site that converts.",
      basePrice: 2999,
      includedPages: 10,
      extraPagePrice: 200,
      // Only the four almost every site needs start ticked.
      corePages: ["Home", "About", "Services", "Contact"],
      // A few unticked chips stay visible so it's obvious the list is
      // something you choose from — with only ticked ones showing, nothing
      // signals you can add pages at all.
      optionalPages: ["FAQ", "Testimonials", "Gallery / Portfolio"],
      // Behind "More page suggestions".
      morePages: [
        "Pricing",
        "Blog",
        "Case Studies",
        "Team",
        "Booking",
        "Careers",
        "Location Pages",
      ],
      tip: "For each main service you offer we recommend a dedicated page — they rank on their own terms and convert far better than one combined services page.",
      ctaLabel: "Book a call",
      ctaHref: "/schedule-strategy-call",
    },
    // Straight after the configurator: the last thing read before the price
    // is an ads agency saying these pages convert.
    // v2 leads with the builds, credential second. The ads-led version that
    // sat under the logo marquee is kept in
    // _reference/adalytical-partner-block-v1.md.
    {
      type: "partner",
      anchorId: "partner",
      kicker: "Who trusts the work",
      heading: "The people who buy websites for a living",
      headingDim: "choose Rankify to build them.",
      logo: "/assets/logos-web/adalytical.webp",
      name: "Adalytical",
      chips: [
        { label: "Google Ads Partner", icon: "google-ads" },
        { label: "Australia's fastest growing Google Ads business", accent: true },
      ],
      body:
        "Adalytical's campaigns only work if the page converts, so when their clients need a new website, landing pages or the conversion elements around them, they bring us in. Their founders led growth teams at Google before starting Australia's fastest growing Google Ads business — they know exactly what a page has to do, and they don't build it themselves.",
      quote:
        "We partner with Rankify when our clients are in need of a new website, Shopify store or landing pages — high-performance builds we know will convert.",
      people: [
        { name: "Jackson Wallace", avatar: "/assets/images/jackson-adalytical.webp" },
        { name: "Jackson Sharp", avatar: "/assets/images/jackson-sharp-adalytical.webp" },
      ],
      peopleRole: "Founders, Adalytical · Ex-Google growth team",
    },
    // Sits on the price deliberately: the objection it answers is "what if I
    // pay and hate it", so it belongs where that thought happens.
    {
      type: "guarantee",
      anchorId: "guarantee",
      kicker: "Risk reversal",
      heading: "30-day money-back guarantee.",
      headingDim: "The risk is ours, not yours.",
      promise:
        "Take 30 days with the finished site. If you're not satisfied with what we built, ask for a refund and you'll get one — no argument and no exit interview.",
      points: [
        "Unlimited revisions, submitted in two rounds",
        "Fixed price agreed before a line is written",
        "No lock-in contract, cancel any time",
      ],
      link: { label: "terms of service", href: "/legal/terms-of-service" },
    },
    {
      type: "cardgrid",
      theme: "paper",
      kicker: "Services Section",
      eyebrow: "Rankify®",
      anchorId: "services",
      heading: "What's included in a new website build",
      subheading:
        "Everything needed to get a custom website designed, built, written, and ready to rank from day one.",
      columns: 4,
      // `icon` points at the old Shopify titles so the artwork survives the
      // rename — see src/content/service-icons.ts.
      items: [
        { idx: "01", anchorId: "custom-website-build", icon: "Custom Shopify Store Design & Build", title: "Custom Website Design & Build", desc: "We design and build fully custom websites. Not a template with your logo dropped in — a site built around your services, your customers, and the way they actually decide who to call. Responsive, fast, and built to convert." },
        { idx: "02", anchorId: "custom-functionality", icon: "Custom Shopify Theme Development", title: "Custom Features & Functionality", desc: "Booking forms, quote calculators, filtered galleries, member areas, live feeds from the tools you already use. If a page builder can't do it, we write it." },
        { idx: "03", anchorId: "rebuilds-and-migrations", icon: "Shopify Migration", title: "Rebuilds & Migrations", desc: "Stuck on WordPress, Wix, Squarespace, or a build that's slowing you down? We move everything across — pages, content, images, and URL redirects — so you launch fast without losing the rankings you already have." },
        { idx: "04", anchorId: "seo-included", icon: "Shopify SEO Setup & Optimisation", title: "SEO Built In From Day One", desc: "Every site we build includes SEO foundations as standard — title tags, meta descriptions, heading structure, image optimisation, schema markup, URL structure, and site speed. Not bolted on after the fact. Built in from the first commit." },
      ],
    },
    {
      type: "cardgrid",
      theme: "paper",
      kicker: "Why choose rankify?",
      eyebrow: "Rankify®",
      anchorId: "why-rankify",
      heading: "Why invest in an expert web developer with Rankify.",
      columns: 3,
      items: [
        {
          idx: "01",
          title: "DIY or AI Website Builders",
          desc: [
            "Generic templates that look like every other site in your industry.",
            "No custom functionality — stuck with whatever the builder gives you.",
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
            "Agencies charge $20k–$40k+ for the same scope of work.",
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
            "Custom development, no shortcuts.",
            "Direct access to your developer, every time.",
            "AI-accelerated workflow — agency quality in a fraction of the time.",
            "SEO, schema, and speed optimisation built into every build.",
            "Fixed quotes with no surprise invoices.",
            "Ongoing support so your site keeps improving after launch.",
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
        a: "A website is $2,999. That's the base price whether you need one page or ten — ten pages are included, and every page after that is $200. Build time is 7–14 days from the day the design is signed off. Pick your pages in the configurator above and you'll see the exact price before you commit. Larger projects with custom functionality are quoted separately, but you'll always have the number before any work starts.",
      },
      {
        q: "Why is web design important for my business?",
        a: "Your website is your digital storefront—often the first impression customers have of your brand. A professionally designed website builds trust, improves user experience, and helps convert visitors into paying customers. It's essential for showcasing your brand, driving traffic, and staying competitive in today's digital world.",
      },
      {
        q: "What is included in your web design services?",
        a: "Custom website design tailored to your brand, mobile-responsive layouts, SEO-ready development to boost search visibility, and integration of contact forms, bookings and analytics. Content is written for you. You get an editor you can manage day-to-day updates in, and post-launch support to keep the site updated and secure.",
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
        a: "Yes — but selling products online is its own build, with its own platform and its own pricing, so it's covered on our online store page rather than here. If you're setting up a full store, start there. If you just need a handful of products alongside a service website, mention it on the call and we'll scope it in.",
      },
      {
        q: "What platform do you use to build websites?",
        a: "We primarily use Framer, and WordPress where a client needs it. We also work with other platforms depending on your requirements — the platform is chosen to suit the project, not the other way around. Online stores are a separate build, covered on our online store page.",
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
