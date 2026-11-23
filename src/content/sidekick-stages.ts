/**
 * One ad, from the file on your desktop to a verdict.
 *
 * These six stages used to live inside `/meta-ads/how-it-works`. They now run
 * inside the Ad Sidekick overview page as its "How it works" section, and the
 * sub-page renders the same array, so the loop is described in one place and
 * the two cannot drift apart.
 *
 * Mostly screenshots on purpose: describing an interface convinces nobody, and
 * this is a product people have to picture themselves using before they pay
 * for it. Where a capture does not exist yet, `Shot` says so rather than
 * inventing a dashboard.
 */
export type SidekickStage = {
  n: string;
  h: string;
  b: string;
  detail?: string;
  alt: string;
  caption?: string;
};

export const SIDEKICK_STAGES: SidekickStage[] = [
  {
    n: "01",
    h: "You upload the file",
    b: "Drag in the video or image. That is the whole job at this step — no campaign to name, no ad set to configure, no decisions yet.",
    alt: "The Upload screen",
    caption: "Drop the creative in. Everything after this is handled.",
  },
  {
    n: "02",
    h: "It names it and writes the copy",
    b: "The ad is named to a convention so your account stays readable six months from now, and its primary text is drafted for you.",
    detail: "On Pro and above the convention is your own, rather than the sensible default.",
    alt: "The Review screen with a named ad and drafted copy",
    caption: "You approve it. Nothing is published without that.",
  },
  {
    n: "03",
    h: "The campaign gets built",
    b: "Audiences, campaign and ad sets are set up for you, and it tells you how many ads your budget actually supports.",
    detail:
      "This is the step people get wrong alone. One ad running by itself cannot be compared to anything, so it teaches you nothing — and Meta shifts spend toward whichever ad performs, which it can only do if there are several.",
    alt: "Guided setup: audiences and campaigns",
  },
  {
    n: "04",
    h: "Three days of testing",
    b: "The ads run against each other. Three days is roughly what it takes for the numbers to mean something.",
    detail: "Until then the honest answer is that nobody knows yet, and the app says so rather than inventing a trend.",
    alt: "The Testing screen with ads in flight",
  },
  {
    n: "05",
    h: "A verdict, not a dashboard",
    b: "Scale this one. Turn that one off. Leave the third alone. Told to you in those words, with the reason.",
    alt: "The Scale check with its recommendations",
    caption: "The difference between a report and an instruction.",
  },
  {
    n: "06",
    h: "The winner is kept",
    b: "A winning ad goes into the library and is analysed, so the next ad can be built from what already worked with a new angle.",
    detail: "This is the compounding bit. The account gets better at making ads the longer you run it.",
    alt: "The Winners library",
  },
];
