import type { CapabilityPageData } from "@/components/capability/CapabilityPage";

/**
 * /google-ads.
 *
 * Replaces a 243-word "Full page coming soon" stub. Every claim here was
 * already published on this site: the three segments and their bullets on the
 * old stub and in the menu, and how the work is split (Adalytical runs the
 * campaigns, Rankify builds the page and the tracking) on /google-ads-offer.
 * Nothing new is promised.
 *
 * No price: there is no Google Ads product in the HQ price record.
 *
 * Segment ids are menu destinations. See src/content/nav.tsx.
 */
export const googleAds: CapabilityPageData = {
  kicker: "Google Ads",
  h1Lead: "Google Ads,",
  h1Accent: "pointed at profit.",
  intro:
    "Search and Shopping campaigns run by an ex-Google growth team, sent to a landing page we build for the job, with tracking that shows which clicks became customers.",
  heroNote:
    "Campaigns are run with our Google Ads partner, Adalytical, whose founders led growth teams at Google. We build the page and the tracking.",
  heroMock: {
    title: "Google Ads",
    tiles: [
      { k: "Spend", v: "$3,120", d: "This month", tone: "flat" },
      { k: "Enquiries", v: "64", d: "Calls and forms", tone: "up" },
      { k: "Per enquiry", v: "$48.75", d: "Down from $71", tone: "up" },
      { k: "Booked", v: "23", d: "Jobs from ads", tone: "up" },
    ],
    bars: [34, 41, 38, 47, 52, 49, 58, 63, 61, 70, 74, 81],
    barsLabel: "Enquiries by week",
    rows: [
      { l: "emergency plumber near me", r: "14", tone: "ok" },
      { l: "hot water repair gold coast", r: "11", tone: "ok" },
      { l: "blocked drain same day", r: "9", tone: "ok" },
      { l: "free plumbing advice", r: "Excluded", tone: "warn" },
    ],
    rowsLabel: "Search terms, enquiries",
  },

  argument: {
    kicker: "Why ours work",
    heading: ["An ad only buys the click.", "The page has to win the customer."],
    sub: "Most agencies manage the campaign and send the traffic to whatever page you already have. We build the page the campaign sends people to, and we track what happens after the click.",
    cards: [
      { k: "Campaigns", v: "Structure, keywords, negatives, bidding" },
      { k: "Ads", v: "Written to match what people search" },
      { k: "Landing page", v: "Built for one job: the enquiry or the sale" },
      { k: "Tracking", v: "Calls, forms and sales, end to end" },
    ],
    after:
      "All four are built together, by people who talk to each other. That is the difference between budget that buys customers and budget that buys clicks.",
  },

  segmentsIntro: {
    kicker: "Who it is for",
    heading: "Three kinds of account. Three different jobs.",
    sub: "A store, a service business and a software company do not want the same thing from Google. The campaign, the page and what counts as a result change with each.",
  },

  segments: [
    {
      id: "ecommerce",
      kicker: "E-commerce",
      heading: "Shopping and Search for stores.",
      body: "Your products in front of people searching for them by name, with the feed that puts them there set up and kept clean. Reported in revenue against spend.",
      points: [
        "Google Merchant Center set up, with the product feed managed",
        "Shopping and Search campaigns, built around your margins",
        "Landing and collection pages built to sell",
        "Revenue tracked against spend, by campaign and by product",
      ],
      mock: {
        title: "Shopping",
        tiles: [
          { k: "Spend", v: "$4,870", d: "This month", tone: "flat" },
          { k: "Revenue", v: "$26,300", d: "5.4x return", tone: "up" },
          { k: "Orders", v: "318", d: "From ads", tone: "up" },
          { k: "Feed", v: "412", d: "Products approved", tone: "flat" },
        ],
        rows: [
          { l: "Rope chain, 50cm", r: "7.2x", tone: "ok" },
          { l: "Signet ring", r: "5.8x", tone: "ok" },
          { l: "Gift box set", r: "3.1x", tone: "muted" },
          { l: "3 products disapproved", r: "Fix", tone: "warn" },
        ],
        rowsLabel: "Return by product",
      },
    },
    {
      id: "lead-gen",
      kicker: "Lead generation",
      heading: "Search campaigns for service businesses.",
      body: "For businesses that live on enquiries. The campaign is set up so your budget goes on people ready to call, and every call and form is traced back to the click that caused it.",
      points: [
        "Structure, keywords, match types, negatives, bidding and locations",
        "Ads written to match what people search when they are ready to spend",
        "A landing page built for one job: the call or the booking",
        "Calls and form submissions tracked end to end",
      ],
      mock: {
        title: "Lead generation",
        tiles: [
          { k: "Calls", v: "38", d: "This month", tone: "up" },
          { k: "Forms", v: "26", d: "This month", tone: "up" },
          { k: "Per lead", v: "$48.75", d: "Down from $71", tone: "up" },
          { k: "Excluded", v: "112", d: "Search terms blocked", tone: "flat" },
        ],
        rows: [
          { l: "Call, 4m 12s, Southport", r: "Booked", tone: "ok" },
          { l: "Form, hot water quote", r: "Booked", tone: "ok" },
          { l: "Call, 0m 31s, Robina", r: "Missed", tone: "warn" },
          { l: "Form, blocked drain", r: "Quoted", tone: "muted" },
        ],
        rowsLabel: "Latest enquiries",
      },
    },
    {
      id: "saas",
      kicker: "SaaS",
      heading: "Campaigns that count demos and trials.",
      body: "Traffic is not the result. A demo request or a started trial is. Campaigns are built and judged on those, with a page made to turn the click into one.",
      points: [
        "Campaigns pointed at demo requests and free trials",
        "Landing pages built for the sign-up, not the home page",
        "Demo and trial conversions tracked back to the search term",
        "Reported in cost per demo and cost per trial",
      ],
      mock: {
        title: "SaaS",
        tiles: [
          { k: "Demos", v: "19", d: "This month", tone: "up" },
          { k: "Trials", v: "74", d: "This month", tone: "up" },
          { k: "Per demo", v: "$212", d: "Down $40", tone: "up" },
          { k: "Per trial", v: "$54", d: "Steady", tone: "flat" },
        ],
        bars: [22, 31, 28, 39, 44, 41, 53, 60],
        barsLabel: "Trials by week",
      },
    },
  ],

  extras: {
    kicker: "What is included",
    heading: "The whole job, not half of it.",
    sub: "Most accounts we look at are missing at least one of these. Usually the tracking.",
    items: [
      {
        h: "An audit first",
        b: "Before anything changes, we go through your account and show you where the budget is going and where it is leaking.",
      },
      {
        h: "Campaigns set up properly",
        b: "Structure, keywords, match types, negatives, bidding and locations. The parts that decide whether your budget buys customers.",
      },
      {
        h: "The ads, written for you",
        b: "Headlines and descriptions that match what people type when they are ready to spend money.",
      },
      {
        h: "A landing page built to convert",
        b: "Not your existing site with ads pointed at it. A page with one job, built by the same people who build our client websites.",
      },
      {
        h: "Tracking, installed and tested",
        b: "Calls and form submissions tracked end to end, so you can see which clicks became enquiries.",
      },
      {
        h: "Reporting you can read",
        b: "Enquiries, sales and what each one cost. Not impressions and not a visibility score.",
      },
    ],
  },

  process: {
    kicker: "How it works",
    heading: "You see it before it goes live.",
    sub: "Nothing is switched on until you have looked at the campaigns and the page and said yes.",
    steps: [
      {
        h: "Tell us about the business",
        b: "What you do, where you work and what a good customer is worth to you. That decides whether Google Ads is the right spend at all.",
      },
      {
        h: "We audit and plan",
        b: "If you are already running ads, we go through the account. Either way you get a plan for the campaigns and the page.",
      },
      {
        h: "We build it",
        b: "The landing page, the campaigns, the ad copy and the tracking, built together so they match.",
      },
      {
        h: "Live, then reported",
        b: "You approve it, it goes live, and you get the numbers that matter: enquiries, sales and cost for each.",
      },
    ],
  },

  pricing: {
    kicker: "Pricing",
    heading: "Priced to your account. Agreed before we start.",
    sub: "A local service account and a store with four hundred products are different amounts of work. We look at yours and give you the fee before anything is built.",
    points: [
      "The fee is agreed before any work starts",
      "You see the campaigns and the page before they go live",
      "One call to go through your account, with no obligation",
    ],
  },

  faq: {
    heading: "Questions before you spend.",
    subheading: "If yours is not here, ask it on the call.",
    items: [
      {
        q: "Who runs the campaigns?",
        a: "Our Google Ads partner, Adalytical. Its founders led growth teams at Google. Rankify builds the landing pages and the tracking, so the campaign and the page are built together and not handed between strangers.",
      },
      {
        q: "Do I need a new landing page?",
        a: "Usually, yes. A page built for one job converts better than a home page with ads pointed at it. If the page you have is already doing the job, we will tell you.",
      },
      {
        q: "How will I know it is working?",
        a: "Calls and form submissions are tracked end to end, so you see which clicks became enquiries. For stores, revenue is tracked against spend by campaign and by product.",
      },
      {
        q: "How much should I spend on ads?",
        a: "It depends on what a customer is worth to you and how competitive your area is. That is the first thing we work out together, before any budget is committed.",
      },
      {
        q: "Do you manage Shopping campaigns?",
        a: "Yes. Google Merchant Center setup and the product feed are handled as part of it, along with the Shopping and Search campaigns.",
      },
      {
        q: "I already run Google Ads. Can you take over the account?",
        a: "Yes. We start with an audit of what is there, keep what is working, and show you what we would change and why before touching it.",
      },
      {
        q: "What does it cost?",
        a: "The fee is quoted for your account after a call, and agreed before any work starts.",
      },
    ],
  },

  close: {
    heading: "Find out where the budget is going.",
    sub: "Book a call and we will go through your account, or your plans for one, and show you what we would build.",
  },
};
