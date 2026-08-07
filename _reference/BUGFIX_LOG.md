# rankify.com.au rebuild — bugfix log

Purpose: stop repeating the same category of mistake across the site's pages.

## Scroll-triggered CSS transitions must not be flipped synchronously on mount

Icons rendered but never visibly animated. Cause: the reveal components set
`setInView(true)` synchronously inside `useEffect` when the element was already on
screen at mount. React then commits the "shown" state before the browser has painted
the "hidden" start state, so the CSS transition has no start value to interpolate from
and the element just pops in. Fixed with a shared `useInViewOnce()` hook
(`src/lib/useInViewOnce.ts`) that defers the flip by two `requestAnimationFrame`s —
one frame paints the start state, the next flips to the end state. Used by
`ServiceIcon`, `ProcessIcon` and `IconPop`.

**Testing trap that cost real time here:** both the built-in Browser pane AND a
background Chrome tab report `document.hidden === true`, and in that state
`requestAnimationFrame` never fires, IntersectionObserver never fires, and CSS
transitions never advance. So a perfectly working scroll animation looks completely
dead. Verified by checking `document.hidden` / whether a rAF callback ever runs.
**To actually test any scroll/transition behaviour, bring a real Chrome tab to the
foreground first (take a screenshot via the Chrome MCP — that focuses the tab), then
sample `getComputedStyle`.** Watching `stroke-dashoffset` go `1px → 0.917px` and then
freeze the moment the tab backgrounded was the proof the animation was fine all along.

## Service pages shipped without their dot-progress + index number treatment

Every numbered card grid on the real site (service pages, at least — confirmed on
`/shopify-development-services`) shows a row of small progress dots (one per item in
that specific grid, filled up to the card's own index) plus the "01".."0N" index number,
in the top row of EVERY card — not just process/step sections, ALSO plain feature-list
grids. The service-page build only added this to the homepage's bespoke `Process.tsx`
and never generalized it into the shared `CardGridSection.tsx` used by all 4 service
pages, so every single card on every service page was missing it. Fixed in
`CardGridSection.tsx` — now renders `CardProgressDots` (dot count = that block's own
`items.length`, not a fixed number) + the idx label as the first row of every card that
has an `idx`, and adds a circular numbered badge overlapping the bottom of the image for
image-style (process) cards specifically.
Also found: one service page (`shopify-development-services.ts`) had a "Testimonials"
section built as a dead `cardgrid` stub with `items: []` and a giant subheading crammed
with a quote — never actually rendered like a real testimonials section. Added a
`"testimonials"` block type to the service-page schema that renders the same shared
`<Testimonials />` component the homepage uses, instead of re-inventing it per page.
**Lesson: when a "shared" component is introduced late (after a pattern already exists
elsewhere, like the homepage's Process cards), audit it against the *specific* real
pages it will render, not just the generic shape of the data — a generic card grid can
compile and look plausible while silently missing a treatment that's actually universal
across the real site.**
Read this before building any new page. Add an entry every time a real bug is confirmed and fixed.

## SOLVED (was recurring 3x): `npm ci` failing in CI — root cause was cross-platform, fix is in the workflow now

Every time this project's `package-lock.json` got regenerated on this Windows machine
(happened 3 times), `npm ci` failed on the Linux GitHub Actions runner with
"Missing: @emnapi/runtime@x.x.x" / "@emnapi/core@x.x.x" errors. Deploy then silently
**fails at the build step** — GitHub Pages just keeps serving the last good build with
no obvious error on the surface (a page that 404s after a deploy "succeeded" locally is
the tell — check `gh run view <id> --log`).
Root cause: `lightningcss` (a Tailwind v4 dependency) ships per-platform optional native
binaries, each pulling different `@emnapi/*` WASM-shim versions. A lockfile written by
`npm install` on Windows locks in the Windows-resolved versions, which are NOT what
Linux needs — this can't be fixed by re-running `npm install`/`npm ci` locally no matter
how many times, because local verification happens on the same Windows platform that
caused the drift in the first place (confirmed: regenerated the lockfile, verified
`npm ci` passed *locally*, pushed, CI failed again with the same error).
**Actual fix: changed `.github/workflows/deploy.yml` to run `npm install` instead of
`npm ci`.** `npm install` re-resolves optional deps correctly per-platform at CI time
regardless of what lockfile state got committed from Windows — trades a bit of the
hermetic-install guarantee `ci` gives for actually working. Don't revert this back to
`npm ci` without solving the cross-platform lockfile problem first (e.g. generating the
lockfile inside a Linux container/WSL instead of native Windows).

## All 19 inner pages built (service pages, blog, projects, contact/schedule, legal)

Built via 4 parallel agents against real scraped content from the live site, then reviewed
and integration-tested together. One real cross-cutting finding from that review:

- **`ContactFooter` was one component rendering two sections (dark contact-form prompt +
  paper footer), always together.** Three independent agents each found, on their own,
  that the real site does NOT show the dark contact-form section on `/contact`,
  `/schedule-strategy-call`, or `/projects` — only the paper footer. Those pages already
  have their own form (or don't need one), so the dark prompt is redundant there. Split
  `ContactFooter.tsx` into `ContactPrompt` (dark section) + `SiteFooter` (paper section),
  kept `ContactFooter` as a wrapper composing both for pages that use the full thing
  (homepage, blog posts, project case studies, legal pages, service pages, 404). Pages
  that only need the footer import `SiteFooter` directly.
  **Lesson: when multiple independent builders flag the same "the shared component doesn't
  quite fit here" pattern, that's signal, not noise — go split the component instead of
  letting each page silently duplicate or misuse it.**

## Recurring failure patterns (check these FIRST on every new section/page)

1. **Never assumed a section's theme (dark green vs paper) — always confirmed from real evidence.**
   Got StatsManifesto, Contact form, and Footer theme wrong by guessing. Sections do not
   all alternate dark/paper in a neat pattern — check every single one.
2. **Section-to-section vertical gap: every homepage section used `mt-2` (8px) between them —
   invented, never measured. Real site is `mt-12 sm:mt-24 lg:mt-48` (~50px mobile / ~190px
   desktop) between every major section, confirmed by measuring `getBoundingClientRect()`
   deltas between consecutive full-width rounded sections on the live site at both 1920px
   and 375px. This was wrong on every single section of the homepage, not just one — this
   is why Tom's "no spacing" complaint applied broadly. Exception: the dark-green contact
   section and the paper footer directly beneath it touch with ~0px gap on the real site —
   don't blindly apply the big gap to every section boundary, verify each one.
   **New pages must use `mt-12 sm:mt-24 lg:mt-48` between top-level sections by default,
   not the old `mt-2`.**
3. **Third-party visual components that measure their own DOM size or read
   `prefers-color-scheme` (e.g. react-bits' `GlassSurface`, used on `/not-found`) will
   always throw a benign hydration-mismatch console warning even wrapped in
   `next/dynamic(..., { ssr: false })`, because static export still prerenders the
   fallback. This is cosmetic only — the component self-corrects after mount, no visible
   break, no functional impact. Don't burn time chasing it away; just confirm the page
   content/layout is correct via `get_page_text` + a manual look, not a clean console.
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
  First pass: pulled the real `<svg>` out of the live DOM post-hydration and rasterized it
  to a static PNG — pixel-accurate but flat, and Tom correctly called out that the real
  icons **animate** (a one-shot draw-on when the card enters view), so a flat image isn't
  the fix. Second pass: pulled the same live DOM `<svg>` but kept it as real `<path>`
  elements (stripped only the Lottie-internal `<mask>`/`<defs>`/`<filter>` wipe-reveal
  machinery, which isn't needed once you're driving the reveal yourself), tagged each
  path `pathLength="1"` + a `.icon-draw` class, and drive `stroke-dashoffset: 1 → 0` via
  CSS when the same per-card IntersectionObserver used by `Reveal.tsx` flips a
  `data-inview` attribute — see `ui/ProcessIcon.tsx`. One path in the "Custom Solutions"
  icon is a solid fill (not an outline), found by comparing the raster capture against the
  DOM's stroke-only paths — that one gets `.icon-pop` (fade + scale) instead of a stroke
  draw. Also revealed the "Measureable Results" icon is a tape-measure/ruler shape, not a
  magnifying glass as originally assumed from a screenshot alone.
  **Lesson: for any icon/graphic that's animation-driven (Lottie, After Effects exports,
  etc.), don't hand-redraw from a screenshot and don't stop at a static raster — capture
  the real rendered `<path>` geometry from the live DOM after hydration and re-drive the
  reveal yourself with plain CSS/JS. Raw `curl` HTML will NOT show any of this (it's
  client-rendered), and a flat screenshot loses the motion even when the shape is right.**

## Real Lottie animations, sitewide (supersedes the hand-drawn ProcessIcon work above)

- **The earlier "Lottie JSON is never served as a file" conclusion was wrong.** It *is*
  served — the entries just don't show up when you filter `performance.getEntriesByType`
  by `transferSize`, because a warm cache reports `0`. Listing every resource path with no
  size filter immediately shows `framerusercontent.com/assets/<id>.json`, one per icon.
  Cost of the wrong conclusion: two fallback pipelines (raster capture, then flattening
  the rendered `<path>` matrices by hand) that were never needed. **Lesson: before
  concluding an asset is unreachable, list resources unfiltered.**
- Extraction is now a two-liner per page: walk each icon `<svg>`'s React fiber for a prop
  matching `framerusercontent.com/assets/*.json`, which gives a `title -> asset id` map a
  few hundred bytes in size. Node then downloads the real source files directly. These are
  4–8x smaller than the fiber-dumped `animationData` objects (the dump is the parsed,
  expanded runtime form).
- `ProcessIcon.tsx` deleted. `LottieIcon` (real animation, looping, lazily fetched per
  icon on first view) now drives all 45 icons: home 4, seo 9, web-dev 4, logo 10,
  shopify 18.
- Icon lookup gate was `getServiceIcon(title)` — the *static* path table — so any page
  without a hand-flattened fallback silently fell back to the generic plus badge even
  though its Lottie existed. Replaced with `hasIcon()`, which checks the Lottie map too.
- **Card layout was a row out of step everywhere.** Live order is
  `dots/index -> heading -> [icon | copy] -> illustration`, with 30px padding and a 30px
  row gap, icon 58x50 sitting *beside* the copy. We had `index -> icon -> heading -> copy`
  with the icon stacked above, 24px padding, and the homepage additionally wrapped its
  icon in a bordered rounded box the live site does not have. Fixed in both
  `CardGridSection.tsx` and `sections/Process.tsx`.

### Testing trap (third time this has cost time — read this before debugging "it doesn't animate")

A background tab renders **no frames**, and that breaks far more than rAF:

| Thing | Works in a hidden tab? |
|---|---|
| `requestAnimationFrame` | no |
| `IntersectionObserver` callbacks | no (delivered at end of frame) |
| CSS transitions / animations | no |
| `scroll` **events** | no — not even for programmatic scrolls |
| `window.scrollTo` with `scroll-behavior: smooth` | no (never advances) |
| `el.scrollTop = n` | yes, position changes silently |

Both the Browser pane and a non-fronted Chrome tab report `document.hidden === true`, so
none of the reveal-on-scroll machinery can be exercised there. Two workarounds that do work:

1. **Tall viewport** — `resize_window` to e.g. 1440x9000 so everything passes the
   mount-time `getBoundingClientRect` check with no scrolling at all. Fails on pages built
   from `100vh` sections, whose height grows with the viewport.
2. **Scroll then reload** — set `scrollTop`, then `location.reload()`. Chrome restores the
   scroll position *before* hydration, so the mount-time check sees the target section.
   This is the reliable one; union the results of two passes to cover a long page.

`useInViewOnce` now reveals immediately when `document.hidden` is true: rAF never fires in
a background tab, so the deliberate two-frame delay (which exists so the CSS start state
gets painted) would otherwise strand the reveal forever. A `scroll`-event fallback was
tried and reverted — scroll events don't fire in hidden tabs either, so it fixed nothing
and cost a listener per element.
