import type { CapabilityPageData } from "@/components/capability/CapabilityPage";

/**
 * /dashboards.
 *
 * Every capability on this page is something a dashboard we built and run
 * does today: Rankify's own HQ (clients, invoices, recurring revenue, margin
 * per client, alerts, approvals, the audit trail) and the hub for our
 * ecommerce brand (sales across Shopify, Square and Etsy, stock and landed
 * cost, incoming shipments, suppliers, Xero and bank feeds). Nothing here is
 * a roadmap item. If a line cannot be pointed at in one of those two, it does
 * not belong on this page.
 *
 * The figures inside the drawn screens belong to nobody and each screen says
 * "Sample data". There is no price: none exists in the HQ price record yet.
 *
 * Segment ids are menu destinations. See src/content/nav.tsx.
 */
export const dashboards: CapabilityPageData = {
  kicker: "Dashboards",
  h1Lead: "Every number you run on,",
  h1Accent: "on one screen.",
  intro:
    "Sales, ad spend, stock, cash and profit, read live from the systems you already use. Built around your business, by people who run their own companies on the same thing.",
  heroNote: "We built these for ourselves first. Rankify and our own ecommerce brand both run on one.",
  heroMock: {
    title: "Overview",
    tiles: [
      { k: "Revenue", v: "$48,210", d: "This month, up 12%", tone: "up" },
      { k: "Ad spend", v: "$9,340", d: "5.2x return", tone: "up" },
      { k: "Profit", v: "$21,940", d: "Gross, 45.5% margin", tone: "flat" },
      { k: "Cash", v: "$36,480", d: "At bank, 2 hours ago", tone: "flat" },
    ],
    bars: [38, 44, 41, 52, 49, 58, 55, 63, 60, 71, 68, 82],
    barsLabel: "Revenue, last 12 months",
    rows: [
      { l: "Online store", r: "$31,400", tone: "ok" },
      { l: "Markets", r: "$9,870", tone: "ok" },
      { l: "Marketplace", r: "$6,940", tone: "ok" },
      { l: "Supplier bill due Friday", r: "$4,200", tone: "warn" },
    ],
    rowsLabel: "Today",
  },

  argument: {
    kicker: "Why build one",
    heading: ["Your numbers already exist.", "Each one is behind a different login."],
    sub: "Your store knows sales. The ad account knows spend. The accounting system knows costs. The bank knows cash. None of them knows profit, so the person joining them up in a spreadsheet is you.",
    cards: [
      { k: "Sales", v: "Shopify, Square, Etsy, Stripe" },
      { k: "Spend", v: "Ad accounts and supplier bills" },
      { k: "Money", v: "Xero and your bank feeds" },
      { k: "Stock", v: "Products, shipments, suppliers" },
    ],
    after: "A dashboard built for you reads all of it, joins it once, and keeps it joined.",
  },

  segmentsIntro: {
    kicker: "What we build",
    heading: "Four places to start. No limit on where it goes.",
    sub: "A hub is custom software, so it can track, alert on and do whatever your business needs. These four are the ones we get asked for most, and each is running today in a business we own or work with.",
  },

  segments: [
    {
      id: "sales-and-profit",
      kicker: "Sales and profit",
      heading: "Know whether yesterday made money.",
      body: "Revenue from every channel you sell on, the costs that sit against it, and what is left. Every figure is read from the system that holds it. Nothing is typed in, so nothing drifts.",
      points: [
        "Online, in-person and marketplace sales in one total",
        "Orders by channel, top products, and any date range you pick",
        "Profit and loss by period, straight from your accounting system",
        "Bank balances and transactions, refreshed through the day",
        "Recurring costs picked up from the bank, so none are missed",
      ],
      mock: {
        title: "Sales and profit",
        tiles: [
          { k: "Revenue", v: "$412,600", d: "This year, up 18%", tone: "up" },
          { k: "Orders", v: "5,318", d: "612 this month", tone: "flat" },
          { k: "Profit", v: "$96,300", d: "Net, 23.3% of revenue", tone: "up" },
          { k: "Costs", v: "$26,270", d: "This month, 3 bills due", tone: "flat" },
        ],
        bars: [52, 47, 58, 61, 55, 67, 72],
        barsLabel: "Revenue by day, last 7 days",
        rows: [
          { l: "Shopify", r: "65%", tone: "ok" },
          { l: "Square, markets", r: "21%", tone: "ok" },
          { l: "Etsy", r: "14%", tone: "ok" },
        ],
        rowsLabel: "By channel",
      },
    },
    {
      id: "ad-accounts",
      kicker: "Ad spend",
      heading: "Spend and revenue on the same line.",
      body: "What went out on ads yesterday and what came back, side by side. No more exporting from Ads Manager into a spreadsheet to find out whether a campaign paid for itself.",
      points: [
        "Daily spend against revenue, so you know before you spend today",
        "Which ads are winning, which to hold and which to turn off",
        "Campaigns on one calendar with launches and promotions",
        "Reports your team can open without an ad account login",
      ],
      mock: {
        title: "Ad spend",
        tiles: [
          { k: "Spend", v: "$412", d: "Yesterday, on budget", tone: "flat" },
          { k: "Revenue", v: "$1,930", d: "Yesterday, 4.7x return", tone: "up" },
          { k: "Ads live", v: "14", d: "3 in testing", tone: "flat" },
          { k: "Per sale", v: "$18.70", d: "Cost, down $2.10", tone: "up" },
        ],
        bars: [44, 51, 39, 62, 58, 66, 49, 71, 68, 74, 63, 80, 77, 86],
        barsLabel: "Return on spend, last 14 days",
        rows: [
          { l: "Founder story, video", r: "Scale", tone: "ok" },
          { l: "Summer drop, carousel", r: "Hold", tone: "muted" },
          { l: "20% off, static", r: "Turn off", tone: "warn" },
        ],
        rowsLabel: "What to do next",
      },
    },
    {
      id: "stock-and-operations",
      kicker: "Stock and operations",
      heading: "Stock that matches the shelf.",
      body: "Every product and variant, what it cost to land, what is on the way and when it arrives. Receive a shipment on the dashboard and the stock is written back to your store.",
      points: [
        "Every product and variant, with landed cost at the live exchange rate",
        "Incoming shipments by arrival date, received in with one click and an undo",
        "A sale at a market stall takes stock out of the online store",
        "Suppliers with spend and lead times worked out from past orders",
        "Supplier orders built as a spreadsheet, ready to send",
        "Raw material prices, such as silver, tracked against stock value",
      ],
      mock: {
        title: "Stock",
        tiles: [
          { k: "On hand", v: "3,482", d: "Units, 214 variants", tone: "flat" },
          { k: "Stock value", v: "$64,900", d: "At landed cost", tone: "flat" },
          { k: "On the way", v: "2", d: "Shipments, next 3 Dec", tone: "up" },
          { k: "Running low", v: "7", d: "Products to reorder", tone: "down" },
        ],
        rows: [
          { l: "Shipment 114, due 3 Dec", r: "480 units", tone: "ok" },
          { l: "Shipment 115, due 19 Dec", r: "1,200 units", tone: "ok" },
          { l: "Rope chain, 50cm", r: "4 left", tone: "warn" },
          { l: "Signet ring, size 9", r: "2 left", tone: "warn" },
        ],
        rowsLabel: "Needs attention",
      },
    },
    {
      id: "built-around-your-business",
      kicker: "Built around your business",
      heading: "The screen your business is missing.",
      body: "A hub can do anything your business does. Rankify runs on one: clients, invoices, recurring revenue, what each client costs to serve, and an alert the moment something in a client's system breaks. Yours will track different things. That is the point of building it.",
      points: [
        "Clients, projects, invoices and files as linked records",
        "Recurring revenue, and margin per client",
        "What each part of the business costs, read from the supplier bills",
        "Alerts from the systems you depend on, with a health check per client",
        "Tasks, a shared calendar, and work handed to AI agents",
      ],
      mock: {
        title: "Company overview",
        tiles: [
          { k: "Recurring", v: "$18,400", d: "Revenue per month", tone: "up" },
          { k: "Clients", v: "37", d: "Active, 2 onboarding", tone: "flat" },
          { k: "Margin", v: "62%", d: "After tools and hosting", tone: "flat" },
          { k: "Alerts", v: "2", d: "1 needs a decision", tone: "down" },
        ],
        rows: [
          { l: "Invoice sent, awaiting payment", r: "$2,750", tone: "muted" },
          { l: "Client site, uptime check failed", r: "Now", tone: "warn" },
          { l: "Domain renews in 9 days", r: "Approve", tone: "warn" },
          { l: "Nightly check", r: "Passed", tone: "ok" },
        ],
        rowsLabel: "Today",
      },
    },
  ],

  extras: {
    kicker: "More than a screen",
    heading: "It does the work, not only the reporting.",
    sub: "A report shows you a chart. This is software, so it can watch, ask and act.",
    items: [
      {
        h: "Alerts before it is a problem",
        b: "A daily check reads the numbers and tells you what changed: a bill with no matching payment, a bank feed that stopped, a job that did not run.",
      },
      {
        h: "Approvals, wherever you are",
        b: "Anything that moves money or stock waits for a yes. You get the question, you answer it, and it happens.",
      },
      {
        h: "An assistant that knows your numbers",
        b: "Ask a question in plain words and get the answer from your own data, not from a general chatbot guessing.",
      },
      {
        h: "Every change on the record",
        b: "Who changed what, when and why, with an undo. The same rule for people and for AI agents.",
      },
      {
        h: "AI agents with limits",
        b: "Agents handle the routine work inside the lanes you set. Each has its own sign-in, its own permissions and its own log.",
      },
      {
        h: "A sign-in for each person",
        b: "Owners, staff and agents each see what they should. Nothing runs on one shared password.",
      },
    ],
  },

  connects: {
    kicker: "What it reads from",
    heading: "The systems you already pay for.",
    sub: "You keep every tool you use now. The dashboard reads from them. These are the ones already wired into dashboards we run.",
    items: [
      "Shopify",
      "Square",
      "Etsy",
      "Stripe",
      "Xero",
      "Australian bank feeds",
      "Meta Ads",
      "Looker Studio",
      "SMS",
      "Calendar bookings",
      "Hosting and domain bills",
    ],
    note: "Not on the list? If a system has an API or an export, we can read it.",
  },

  process: {
    kicker: "How it gets built",
    heading: "Real numbers on the first screen.",
    sub: "You do not wait months for a reveal. You see your own data early and we build out from there.",
    steps: [
      {
        h: "Tell us what you run on",
        b: "One call to find the handful of figures you check every week, and where each one lives today.",
      },
      {
        h: "We connect the sources",
        b: "Read-only to start. Your systems stay the source of truth and nothing in them changes.",
      },
      {
        h: "First screen, your data",
        b: "The first screen goes live with real figures. You use it, tell us what is missing, and we add it.",
      },
      {
        h: "It runs, we look after it",
        b: "Hosted, secured, and kept working as the systems it reads from change.",
      },
    ],
  },

  pricing: {
    kicker: "Pricing",
    heading: "Quoted for your build. Fixed before we start.",
    sub: "A dashboard for one store reading two systems is a different job from one that runs a whole company. We scope it on a call and give you one price.",
    points: [
      "A fixed price, agreed before any work starts",
      "Scoped to the numbers you use, so you do not pay for screens nobody opens",
      "One call to scope it, with no obligation",
    ],
  },

  faq: {
    heading: "Questions before you build one.",
    subheading: "If yours is not here, ask it on the call.",
    items: [
      {
        q: "What can a dashboard read from?",
        a: "The ones we run read from Shopify, Square, Etsy, Stripe, Xero, Australian bank feeds, Meta Ads and Looker Studio, among others. If a system has an API or an export, we can usually read it.",
      },
      {
        q: "Do I have to change the tools I use now?",
        a: "No. The dashboard reads from the systems you already have. Shopify stays Shopify and Xero stays Xero. Nothing is migrated and nobody has to learn a new accounting system.",
      },
      {
        q: "How fresh are the numbers?",
        a: "It depends on the source. Sales and orders are read live. Bank feeds refresh several times a day. We tell you the refresh for every figure before it is built.",
      },
      {
        q: "Can it do things, or only show them?",
        a: "Both. The dashboards we run receive stock into Shopify, raise invoices and send alerts. Anything that moves money or stock waits for your approval first.",
      },
      {
        q: "Is my data safe?",
        a: "Each person signs in as themselves and sees only what they should. Connections are read-only unless you ask for more, and every change is logged with who made it.",
      },
      {
        q: "We need something that is not on this page. Can you build it?",
        a: "Almost certainly. The four dashboards here are the common starting points, not the limit. A hub is custom software: if your business has a number to track, a job to hand off or a system to keep an eye on, it can be built in.",
      },
      {
        q: "How is this different from a Looker Studio report or a spreadsheet?",
        a: "A report shows you a chart. This is software built around how your business works. It joins systems that do not talk to each other, alerts you when something changes, and can act. If a report is all you need, we will tell you that on the call.",
      },
      {
        q: "What does it cost?",
        a: "It is quoted per build as one fixed price, after a call to scope it. The price depends on how many systems it reads from and how much it needs to do.",
      },
    ],
  },

  close: {
    heading: "Stop joining it up by hand.",
    sub: "Tell us the numbers you check every week. We will show you what one screen for all of them looks like.",
  },
};
