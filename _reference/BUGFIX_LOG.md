# rankify.com.au rebuild — bugfix log

Purpose: stop repeating the same category of mistake across the remaining 19 pages.
Read this before building any new page. Add an entry every time a real bug is confirmed and fixed.

## Recurring failure patterns (check these FIRST on every new section/page)

1. **Never assumed a section's theme (dark green vs paper) — always confirmed from real evidence.**
   Got StatsManifesto, Contact form, and Footer theme wrong by guessing. Sections do not
   all alternate dark/paper in a neat pattern — check every single one.
2. **Never trusted "it renders in my headless tool" as proof of correctness.**
   Screenshot tools (Firecrawl single-shot, the interactive pane when backgrounded) don't
   run scroll-linked reveal animations — content shows as ghosted/invisible even when the
   real code is fine. Conversely, DOM/content presence is NOT proof the CSS/layout is right —
   the mobile Testimonials button-overflow bug had 0 broken images and all text present,
   but was visually destroyed.
3. **Always check actual mobile width (375–390px), not just 1920px.** Every fix this session
   was verified at 1920px only, until a real bug shipped that only showed at mobile width
   (flex row with no wrap: avatars + trust text + button overflowed into a crushed circle).
4. **Content sections have max-w-[1400px] mx-auto — including the footer/newsletter block.**
   Do not full-bleed anything except Hero and the nav.
5. **When unsure of real structure, pull the live site's raw HTML for that specific text
   string, not the whole page — grep for the exact copy, check background-color / text-color
   inline styles and the nearest ancestor's CSS class.** This is more reliable than
   eyeballing a screenshot, and works even when Firecrawl's screenshot ghosts the content.
6. **Verification method that actually works reliably:** `firecrawl scrape <url>
   --full-page-screenshot --max-age 0` (max-age 0 is required — Firecrawl caches by
   default, which served a stale screenshot at least once this session). Section
   *background colors* are safe to verify this way even when content is ghosted, since
   bg color isn't part of the reveal-animation opacity.

## Confirmed fixes (homepage)

- Nav missing "Contact" link — added.
- Hero/eyebrow icons were plain dots — real site uses a plus-in-circle icon (PlusIcon
  component), white circle on dark sections, black circle on paper sections.
- Services accordion was a static hover-reveal invention — real site is a real single-open
  accordion, confirmed via clicking it live on rankify.com.au.
- Services accordion expanded row is missing a small thumbnail image next to the description
  — added (used the same images originally captured for the abandoned hover-preview idea).
- Process/"How we launch" section was a plain 4-row text list — real site is a 4-card grid
  with a 6-dot progress indicator, index number, icon-in-box, heading, description.
- Pricing was two separate cards (white + green) — real site is ONE unified dark panel:
  addon description + real toggle switch (left), price + "+"-badge feature list (right),
  delivery/CTA row across the bottom.
- Contact form white card — real, not a stale cache (confirmed via desktop-breakpoint HTML:
  rgb(245,245,245) inputs, rgb(255,255,255) card, dark text).
- Stats row (5/5, 40+, 100%, 50k+) belongs at the bottom of the Testimonials section
  (same paper card as the review cards), NOT in a separate dark-green section. The
  "manifesto" text below it is also paper-themed, not dark green. Visitor stat is 50k+,
  not the invented 10k+.
- Body/gutter background is grey/paper (#f5f5f5), not near-black — was using an invented
  #121212 "body-dark" value never confirmed against the real site.
- Testimonials header row (avatars + trust text + "Leave a review" button) had no
  flex-wrap — overflowed into a crushed circular button on mobile. Fixed to
  flex-col/flex-row responsive + flex-wrap + flex-none on avatars/button.
- No star icons anywhere near ratings/reviews — added an SVG Stars component, used next to
  the big 5/5 number and on each testimonial card.
- Footer (below the contact form / "Let's talk" block) rebuilt to match real site: form
  card stays in the normal max-w-[1400px] constraint, small copyright line added below it,
  the newsletter/nav/social/wordmark block is paper/light with black text and black logo
  (not dark green), added the testimonial-style quote + Thomas Flood block, two-field
  newsletter form, external-link arrows on social links, and a separate black legal bar
  with "Created by [logo] Rankify" at the very bottom.
- Process/"How we launch" card icons were hand-drawn approximations of the shape concepts
  (chat bubble, puzzle, squares, magnifying glass) and did not match the real site closely
  enough. **The real icons are Lottie animations that Framer renders client-side into
  inline SVG — they do NOT exist as static files anywhere (confirmed 3x: raw HTML grep,
  DOM inspection, live network request inspection all show nothing until JS hydrates).**
  Fix: instead of hand-drawing shapes from a screenshot, pulled the real `<svg>` that
  Framer's Lottie renderer produces directly out of the live DOM (`document.querySelector`
  on the actual card element after JS hydration, not the raw curl'd HTML), rasterized it
  to a transparent PNG via an in-page `<canvas>` + `toDataURL`, and used that PNG as a real
  static asset. This is pixel-exact to the real icon since it's rendered from the actual
  source data, not a guess. Also revealed the "Measureable Results" icon is a tape-measure/
  ruler shape, not a magnifying glass as originally assumed from the screenshot alone.
  **Lesson: for any icon/graphic that's animation-driven (Lottie, After Effects exports,
  etc.), don't hand-redraw from a screenshot — capture the real rendered SVG from the live
  DOM after hydration and rasterize it. Raw `curl` HTML will NOT show it (client-rendered),
  and screenshots alone are not enough to get exact geometry right.**

## Known issue being fixed right now (footer)

Real site, confirmed from fresh screenshots (not yet re-verified after fix):
- The contact-form / "Let's talk" content sits inside the normal max-w-[1400px] constraint
  like every other section — reverting last commit's "make footer full-bleed" change, that
  was wrong, the ORIGINAL max-width was correct.
- Small "© 2025 Rankify® Studio" text appears bottom-left of the dark green section, below
  the white form card — currently missing entirely.
- The footer block below that (newsletter/nav/social/wordmark) is on a LIGHT/PAPER
  background with BLACK text and a BLACK logo — not dark green with white text/logo like
  currently built.
- Footer newsletter column has a testimonial-style quote — "Whether you're looking to
  build a stunning website, boost your brand, or drive measurable results, we're here to
  help." — plus a Thomas Flood avatar/name/title block. Currently missing entirely.
- Newsletter form has TWO fields — "Your first name *" and "Email *" — not just one email
  field.
- Social links ("Instagram", "LinkedIn") have an external-link arrow icon — currently plain
  text.
- There are unexplained small "+" icon rows near the newsletter section in the real
  screenshot — content/purpose not yet confirmed. Left alone for now rather than guessing
  wrong; flag to Tom if it's still missing after everything else is fixed.
- The very bottom legal bar (copyright/Privacy Policy/Terms) is its OWN black strip with
  white text, not blended into the paper footer section above it. Also has a "Created by
  [logo] Rankify" attribution — currently missing.
