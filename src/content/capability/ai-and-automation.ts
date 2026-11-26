import type { CapabilityPageData } from "@/components/capability/CapabilityPage";

/**
 * /ai-and-automation.
 *
 * Replaces a 312-word "Full page coming soon" stub. Every example is something
 * running today: the automations inside Rankify's HQ and our ecommerce
 * brand's hub (a market sale taking stock out of the online store, the daily
 * bank reconcile, invoices into the books, website enquiries into HQ, the
 * nightly check), the two products we built (the website editor at
 * app.rankify.com.au and Ad Sidekick), the assistant on this site's home page,
 * and the agent rules HQ enforces (a sign-in per agent, approvals, a log with
 * undo).
 *
 * No price: there is no product for this in the HQ price record.
 *
 * Segment ids are menu destinations. See src/content/nav.tsx.
 */
export const aiAndAutomation: CapabilityPageData = {
  kicker: "AI & Automation",
  h1Lead: "Software that does",
  h1Accent: "the work for you.",
  intro:
    "Automations, internal tools and AI agents built around how your business runs. We build them for clients, and we run our own companies on them.",
  heroNote: "The assistant on our home page, our website editor and Ad Sidekick are all things we built.",
  heroMock: {
    title: "Automations",
    tiles: [
      { k: "Runs", v: "214", d: "Today", tone: "flat" },
      { k: "Passed", v: "213", d: "No action needed", tone: "up" },
      { k: "Needs you", v: "1", d: "Waiting for a yes", tone: "down" },
      { k: "Active", v: "12", d: "Automations", tone: "flat" },
    ],
    rows: [
      { l: "Market sale: stock updated online", r: "2 min ago", tone: "ok" },
      { l: "Bank feed matched to 14 bills", r: "6:00 am", tone: "ok" },
      { l: "Invoice 1042 raised and sent", r: "Yesterday", tone: "ok" },
      { l: "Pay supplier $4,200?", r: "Approve", tone: "warn" },
    ],
    rowsLabel: "Latest",
  },

  argument: {
    kicker: "Why build it",
    heading: ["Your week is full of jobs", "a machine should be doing."],
    sub: "Copying numbers between two systems. Chasing the same update. Rebuilding the same report. Each one is small. Together they are most of a working week, done by the most expensive people you have.",
    cards: [
      { k: "Automations", v: "Systems that talk to each other" },
      { k: "Internal tools", v: "Software shaped to your process" },
      { k: "AI agents", v: "Routine work, done inside set limits" },
      { k: "Advice", v: "Where AI pays, and where it does not" },
    ],
    after: "If a job follows rules, it can run by itself. If it needs judgement, an agent can do the routine part and ask you for the rest.",
  },

  segmentsIntro: {
    kicker: "What we build",
    heading: "Four ways to take work off your desk.",
    sub: "Most projects start as one of these and grow into the next. Every example below is running today.",
  },

  segments: [
    {
      id: "automations",
      kicker: "Automations",
      heading: "Hand the repetitive work to software.",
      body: "When one thing happens, the next thing happens with it. No copying, no forgetting, no end-of-month catch-up. These are automations running in businesses we own or work with.",
      points: [
        "A sale at a market stall takes the stock out of the online store",
        "Bank transactions matched to bills every day, with anything unmatched flagged",
        "Invoices raised and payments recorded in the books without retyping",
        "A website enquiry lands in the CRM and alerts the right person",
        "A nightly check that reports what broke before a customer does",
      ],
      mock: {
        title: "Automation runs",
        tiles: [
          { k: "This week", v: "1,486", d: "Runs", tone: "flat" },
          { k: "Failed", v: "0", d: "Last 7 days", tone: "up" },
        ],
        bars: [61, 58, 72, 69, 75, 44, 38],
        barsLabel: "Runs by day",
        rows: [
          { l: "Square sale to Shopify stock", r: "Live", tone: "ok" },
          { l: "Bank feed to bills", r: "Daily", tone: "ok" },
          { l: "Stripe payment to books", r: "Live", tone: "ok" },
          { l: "Nightly check", r: "Passed", tone: "ok" },
        ],
        rowsLabel: "Active",
      },
    },
    {
      id: "internal-tools",
      kicker: "Internal tools and apps",
      heading: "Tools built for how you work.",
      body: "Off-the-shelf software makes you work its way. A tool built for you has the screens your team needs and nothing else. We have built two into products of their own.",
      points: [
        "Quoting tools, calculators and booking systems",
        "Client portals and member areas",
        "Back ends your team can run without a developer",
        "Our website editor: clients change their own site by asking for it",
        "Ad Sidekick: a full product for running Meta ads, built in-house",
      ],
      mock: {
        title: "Quoting tool",
        tiles: [
          { k: "Quotes", v: "42", d: "This week", tone: "up" },
          { k: "Accepted", v: "17", d: "40% of sent", tone: "up" },
        ],
        rows: [
          { l: "Kitchen fit-out, Burleigh", r: "$18,400", tone: "ok" },
          { l: "Bathroom, Palm Beach", r: "$9,750", tone: "muted" },
          { l: "Deck and stairs, Tugun", r: "$6,200", tone: "muted" },
          { l: "Follow up: 3 quotes over 7 days", r: "Due", tone: "warn" },
        ],
        rowsLabel: "Sent this week",
      },
    },
    {
      id: "ai-agents",
      kicker: "AI agents and assistants",
      heading: "AI that works inside limits you set.",
      body: "An agent is only useful if you can trust what it will and will not do. Ours get their own sign-in, a fixed list of what they may touch, and a log of everything they did.",
      points: [
        "An assistant on your site that answers visitors and sends them to the right page",
        "An assistant that answers questions from your own business data",
        "Agents that take the routine tasks, each with its own permissions",
        "Anything that moves money or stock waits for a person to approve it",
        "Every action logged, with an undo",
      ],
      mock: {
        title: "Agents",
        tiles: [
          { k: "Tasks", v: "31", d: "Done today", tone: "up" },
          { k: "Asked you", v: "2", d: "Both answered", tone: "flat" },
        ],
        rows: [
          { l: "Drafted reply to client ticket", r: "Done", tone: "ok" },
          { l: "Booked site visit, Thursday 2pm", r: "Done", tone: "ok" },
          { l: "Renew domain for $24?", r: "Approved", tone: "ok" },
          { l: "Refund order 5521?", r: "Asked", tone: "warn" },
        ],
        rowsLabel: "Agent log",
      },
    },
    {
      id: "consulting",
      kicker: "AI consulting",
      heading: "Find out where AI is worth it.",
      body: "Not every problem needs AI. Some that look like they do are better solved with a plain automation, and some should be left alone. We look at how your business runs and tell you which is which.",
      points: [
        "A review of the manual work in your week",
        "A short list of what to automate, in order of payoff",
        "What to build first, and what it replaces",
        "A plain answer when the right call is to do nothing",
      ],
      mock: {
        title: "Where to start",
        tiles: [
          { k: "Reviewed", v: "14", d: "Weekly jobs", tone: "flat" },
          { k: "Worth it", v: "5", d: "To automate", tone: "up" },
        ],
        rows: [
          { l: "Invoice chasing", r: "Build first", tone: "ok" },
          { l: "Stock counts across two systems", r: "Build next", tone: "ok" },
          { l: "Weekly sales report", r: "Dashboard", tone: "ok" },
          { l: "Supplier negotiation", r: "Leave it", tone: "muted" },
        ],
        rowsLabel: "Recommendation",
      },
    },
  ],

  extras: {
    kicker: "Built to be trusted",
    heading: "Automation you can leave running.",
    sub: "The hard part is not making software act. It is being sure about what it will do when you are not watching.",
    items: [
      {
        h: "Limits on every agent",
        b: "Each agent has its own sign-in and a fixed list of what it may read and change. Nothing shares one master key.",
      },
      {
        h: "A person approves the big ones",
        b: "Anything that moves money or stock stops and asks. You answer from wherever you are, and then it happens.",
      },
      {
        h: "A log of everything",
        b: "Who or what changed a record, when, and why. If it was wrong, there is an undo.",
      },
      {
        h: "A cap on AI spend",
        b: "AI features are built with a daily spend limit, so a bad day costs a known amount and never a surprise bill.",
      },
      {
        h: "Checked every night",
        b: "A nightly run tests that each automation still works and tells you what did not, before it costs you.",
      },
      {
        h: "Your systems stay yours",
        b: "We connect to the tools you already use. Nothing is migrated, and nothing is locked inside ours.",
      },
    ],
  },

  connects: {
    kicker: "What it connects to",
    heading: "The tools already in your business.",
    sub: "These are wired into automations and tools we run today.",
    items: [
      "Shopify",
      "Square",
      "Stripe",
      "Xero",
      "Australian bank feeds",
      "Meta Ads",
      "SMS",
      "Calendar bookings",
      "Claude and other AI models",
    ],
    note: "Not on the list? If a system has an API or an export, we can connect it.",
  },

  process: {
    kicker: "How it gets built",
    heading: "One job at a time, working from week one.",
    sub: "We do not start with a platform. We start with the single job that wastes the most time, get it running, and move to the next.",
    steps: [
      {
        h: "Show us the job",
        b: "A call to walk through the work as it is done today: who does it, in which systems, and how often.",
      },
      {
        h: "We map it",
        b: "You get a plain description of what will be automated, what stays with a person, and what it will cost.",
      },
      {
        h: "First version, running",
        b: "The first automation or tool goes live on real work. You use it and tell us what is off.",
      },
      {
        h: "It runs, we look after it",
        b: "Hosted, checked nightly, and kept working as the systems around it change.",
      },
    ],
  },

  pricing: {
    kicker: "Pricing",
    heading: "Quoted for the job. Fixed before we start.",
    sub: "An automation between two systems and a full internal tool are different amounts of work. We scope yours on a call and give you one price.",
    points: [
      "A fixed price, agreed before any work starts",
      "Scoped to one job first, so you see it work before committing to more",
      "One call to scope it, with no obligation",
    ],
  },

  faq: {
    heading: "Questions before you automate.",
    subheading: "If yours is not here, ask it on the call.",
    items: [
      {
        q: "What kind of work can be automated?",
        a: "Anything that follows rules and happens more than once: moving data between systems, matching payments, raising invoices, updating stock, sending the same message, building the same report. If you can explain the steps, it can usually run by itself.",
      },
      {
        q: "Is it safe to let AI act in my business?",
        a: "It is when the limits are built in. Each agent has its own sign-in and a fixed list of what it may do. Anything that moves money or stock waits for a person to approve it, and every action is logged with an undo.",
      },
      {
        q: "Do I need to replace the software I use now?",
        a: "No. We connect to the tools you already have. The automation sits between them and does the copying, checking and chasing a person does today.",
      },
      {
        q: "Can you build a full app, not only an automation?",
        a: "Yes. We have built two products of our own: a website editor that lets clients change their site by asking for it, and Ad Sidekick, which runs Meta ad accounts. Quoting tools, booking systems and client portals are normal work for us.",
      },
      {
        q: "What does AI cost to run?",
        a: "Less than most people expect, and never open-ended. We build AI features with a daily spend cap, so the most one can cost on its worst day is a number you agreed to.",
      },
      {
        q: "What if AI is not the right answer?",
        a: "Then we will say so. Some jobs are better as a plain automation with no AI in it, and some are not worth automating at all. You get that answer on the first call.",
      },
      {
        q: "What does it cost?",
        a: "It is quoted per job as one fixed price, after a call to scope it.",
      },
    ],
  },

  close: {
    heading: "Pick the job you would most like to never do again.",
    sub: "Tell us what it is. We will show you what it looks like when software does it.",
  },
};
