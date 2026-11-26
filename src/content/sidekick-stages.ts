import type { Mock } from "@/components/capability/MockScreen";

/**
 * One ad, from the file on your desktop to a verdict.
 *
 * These six stages used to live inside `/meta-ads/how-it-works`. They now run
 * inside the Ad Sidekick overview page as its "How it works" section, and the
 * sub-page renders the same array, so the loop is described in one place and
 * the two cannot drift apart.
 *
 * Each stage carries a drawn screen. They replaced eight "Screenshot to come"
 * frames that had been live for a month. A drawn screen is tagged "Sample
 * data" in its own frame, so it shows what the step looks like without
 * claiming a result. Swap one for a real capture by giving `Shot` a `src`.
 */
export type SidekickStage = {
  n: string;
  h: string;
  b: string;
  detail?: string;
  alt: string;
  caption?: string;
  mock: Mock;
};

/** The screen in the page hero. */
export const SIDEKICK_HERO_MOCK: Mock = {
  title: "Ad Sidekick",
  tiles: [
    { k: "Spend", v: "$412", d: "Yesterday", tone: "flat" },
    { k: "Revenue", v: "$1,930", d: "4.7x return", tone: "up" },
    { k: "Ads live", v: "14", d: "3 in testing", tone: "flat" },
    { k: "Profit", v: "$640", d: "After ad spend", tone: "up" },
  ],
  bars: [44, 51, 39, 62, 58, 66, 49, 71, 68, 74, 63, 80, 77, 86],
  barsLabel: "Daily P&L, last 14 days",
  rows: [
    { l: "Founder story, video", r: "Scale", tone: "ok" },
    { l: "Summer drop, carousel", r: "Hold", tone: "muted" },
    { l: "20% off, static", r: "Turn off", tone: "warn" },
  ],
  rowsLabel: "What to do next",
};

/** The screen beside "It teaches". */
export const SIDEKICK_NOTE_MOCK: Mock = {
  title: "Testing",
  tiles: [
    { k: "Day", v: "2 of 3", d: "Too early to call", tone: "flat" },
    { k: "In test", v: "4 ads", d: "Same budget each", tone: "flat" },
  ],
  rows: [
    { l: "Why three days? Fewer and the numbers are noise.", r: "Note", tone: "ok" },
    { l: "Why four ads? One alone has nothing to beat.", r: "Note", tone: "ok" },
    { l: "Do not touch the budget mid-test.", r: "Note", tone: "warn" },
  ],
  rowsLabel: "Learning notes",
};

export const SIDEKICK_STAGES: SidekickStage[] = [
  {
    n: "01",
    h: "You upload the file",
    b: "Drag in the video or image. That is the whole job at this step. No campaign to name, no ad set to configure, no decisions yet.",
    alt: "The Upload screen",
    caption: "Drop the creative in. Everything after this is handled.",
    mock: {
      title: "Upload",
      tiles: [
        { k: "Uploaded", v: "3", d: "Today", tone: "flat" },
        { k: "To review", v: "3", d: "Named and written", tone: "up" },
      ],
      rows: [
        { l: "founder-story-take-2.mp4", r: "Uploaded", tone: "ok" },
        { l: "ring-stack-closeup.jpg", r: "Uploaded", tone: "ok" },
        { l: "unboxing-customer-04.mp4", r: "Uploading", tone: "muted" },
      ],
      rowsLabel: "Files",
    },
  },
  {
    n: "02",
    h: "It names it and writes the copy",
    b: "The ad is named to a convention so your account stays readable six months from now, and its primary text is drafted for you.",
    detail: "On Pro and above the convention is your own, in place of the default.",
    alt: "The Review screen with a named ad and drafted copy",
    caption: "You approve it. Nothing is published without that.",
    mock: {
      title: "Review",
      tiles: [
        { k: "Named", v: "3", d: "To your convention", tone: "flat" },
        { k: "Waiting", v: "2", d: "For your approval", tone: "down" },
      ],
      rows: [
        { l: "2026-12_VID_FounderStory_v2", r: "Approved", tone: "ok" },
        { l: "2026-12_IMG_RingStack_v1", r: "Approve", tone: "warn" },
        { l: "2026-12_VID_Unboxing_v4", r: "Approve", tone: "warn" },
      ],
      rowsLabel: "Ads, with copy drafted",
    },
  },
  {
    n: "03",
    h: "The campaign gets built",
    b: "Audiences, campaign and ad sets are set up for you, and it tells you how many ads your budget supports.",
    detail:
      "This is the step people get wrong alone. One ad running by itself cannot be compared to anything, so it teaches you nothing. Meta also shifts spend toward whichever ad performs, which it can only do when there are several.",
    alt: "Guided setup: audiences and campaigns",
    mock: {
      title: "Guided setup",
      tiles: [
        { k: "Budget", v: "$60", d: "Per day", tone: "flat" },
        { k: "Supports", v: "4 ads", d: "At this budget", tone: "up" },
      ],
      rows: [
        { l: "Campaign: Testing", r: "Built", tone: "ok" },
        { l: "Audience: Australia, broad", r: "Built", tone: "ok" },
        { l: "Audience: past buyers", r: "Built", tone: "ok" },
        { l: "Ad set: 4 ads, even split", r: "Ready", tone: "ok" },
      ],
      rowsLabel: "Set up for you",
    },
  },
  {
    n: "04",
    h: "Three days of testing",
    b: "The ads run against each other. Three days is roughly what it takes for the numbers to mean something.",
    detail: "Until then nobody knows yet, and the app says so. It does not invent a trend.",
    alt: "The Testing screen with ads in flight",
    mock: {
      title: "Testing",
      tiles: [
        { k: "Day", v: "2 of 3", d: "Too early to call", tone: "flat" },
        { k: "Spend", v: "$118", d: "So far", tone: "flat" },
      ],
      bars: [30, 46, 58],
      barsLabel: "Spend by day",
      rows: [
        { l: "FounderStory_v2", r: "Running", tone: "muted" },
        { l: "RingStack_v1", r: "Running", tone: "muted" },
        { l: "Unboxing_v4", r: "Running", tone: "muted" },
      ],
      rowsLabel: "In test",
    },
  },
  {
    n: "05",
    h: "A verdict, not a dashboard",
    b: "Scale this one. Turn that one off. Leave the third alone. Told to you in those words, with the reason.",
    alt: "The Scale check with its recommendations",
    caption: "The difference between a report and an instruction.",
    mock: {
      title: "Scale check",
      tiles: [
        { k: "Scale", v: "1", d: "Raise the budget", tone: "up" },
        { k: "Turn off", v: "1", d: "Stops the waste", tone: "down" },
      ],
      rows: [
        { l: "FounderStory_v2, 5.1x return", r: "Scale", tone: "ok" },
        { l: "RingStack_v1, 2.4x return", r: "Leave", tone: "muted" },
        { l: "Unboxing_v4, 0.8x return", r: "Turn off", tone: "warn" },
      ],
      rowsLabel: "Verdicts",
    },
  },
  {
    n: "06",
    h: "The winner is kept",
    b: "A winning ad goes into the library and is analysed, so the next ad can be built from what already worked with a new angle.",
    detail: "This is the part that compounds. The account gets better at making ads the longer you run it.",
    alt: "The Winners library",
    mock: {
      title: "Winners",
      tiles: [
        { k: "Winners", v: "9", d: "Kept and analysed", tone: "up" },
        { k: "Next up", v: "2", d: "New angles to try", tone: "flat" },
      ],
      rows: [
        { l: "FounderStory_v2", r: "5.1x", tone: "ok" },
        { l: "WinterDrop_Carousel_v1", r: "4.4x", tone: "ok" },
        { l: "GiftGuide_VID_v3", r: "3.9x", tone: "ok" },
      ],
      rowsLabel: "Library",
    },
  },
];
