# Accessibility audit — rankify.com.au

**Standard:** WCAG 2.2 Level AA
**Method:** axe-core 4.12.1 driven by headless Chrome over the built static
site — all 35 routes, at 375×812 (phone) and 1440×900 (desktop), 70 page
checks in total. Scroll-reveal animations were forced visible first, otherwise
axe only sees the top of each page and reports a clean bill of health for
content a real user can see.

**Result:** 1,792 failing elements → **0**.

---

## Why this matters in Australia

No Australian statute names WCAG for private companies. The exposure comes
from the **Disability Discrimination Act 1992**, which makes it unlawful to
discriminate in the provision of goods and services. The Australian Human
Rights Commission and the courts treat **WCAG 2.2 Level AA** as the benchmark
for whether a website meets that obligation, and inaccessible sites have led
to complaints and litigation. Government agencies are separately bound to
WCAG 2.2 AA by the Digital Experience Policy.

Practically: AA is the line to be on the right side of, and it is also what
any government or enterprise client will ask you to attest to.

---

## What was failing

### 1. Text contrast — 1,789 elements, every page

Not 1,789 separate mistakes. Three root causes:

| Token | Was | Measured | Now | Measures |
|---|---|---|---|---|
| `--grey` (secondary copy sitewide) | `#999999` | **2.61:1** on `--paper`, 2.85:1 on white | `#6e6e6e` | 4.68:1 / 5.10:1 |
| Brand green as *text* on light | `#07a889` | **2.76:1** on `--paper` | `--green-text` `#057a63` | 4.85:1 / 5.29:1 |
| White text on a green button | on `#07a889` | **3.01:1** | on `#057a63` | 5.29:1 |

AA requires **4.5:1** for normal text and 3:1 for text 18.66px+ bold or 24px+.
Bold 15px still counts as normal text, which is why the sticky CTA failed.

Two secondary causes:

- **Opacity modifiers** (`text-grey/60`, `text-grey/70`,
  `placeholder:text-grey/70`) pulled otherwise-compliant colours back under
  the threshold. Form placeholders, a form's "(optional)" hint and a
  struck-through previous ranking are all information, not decoration, so they
  have to clear the bar on their own.
- **`#b5b5b5`** on the `(2016-25©)` year mark — 1.88:1, the worst single
  reading on the site.

**Deliberately not changed:** green as a *fill* on dark sections, and green
text on near-black. Those pass comfortably, and changing them would have
altered the brand look for no compliance gain.

### 2. Keyboard access — booking calendar, 3 pages

`scrollable-region-focusable` (WCAG 2.1.1). The calendar sits in a capped
scroll container, and the calendar itself is a cross-origin iframe — so there
was nothing focusable inside the scroll area, and a keyboard-only user could
not scroll down to the later appointment times. Fixed with `tabindex="0"`, a
group label and a visible focus ring.

---

## What axe cannot tell you

An automated pass catches roughly a third to a half of WCAG issues. It
verified: contrast, image alt text, form labels, heading order, landmark
structure, link names, ARIA validity, document language, duplicate ids,
keyboard-reachable scroll regions. All clean.

It cannot judge:

1. **Whether alt text is *accurate*** — only that it exists.
2. **Focus order and visible focus** through a full journey — particularly the
   qualifying modal, which should trap focus while open and return it to the
   button that opened it on close.
3. **The video player** — our custom controls need keyboard operation
   (play/pause, seek) and the chapter dots are hover-only on desktop, which is
   fine for a progressive enhancement but means keyboard users rely on the
   scrubber.
4. **Captions on the VSL** (WCAG 1.2.2, Level A). The video has no captions.
   **This is the one remaining known gap.**
5. **Reflow and zoom to 200%**, motion sensitivity, and session timeouts.

---

## Recommended next

1. **Captions on the VSL** — Level A, lower than the AA bar we now meet, and
   the clearest remaining exposure. A WebVTT track on the `<video>` is enough.
2. **Focus management in the qualifying modal** — trap focus while open,
   restore it on close.
3. **Keyboard controls on the video player** — space to play/pause, arrows to
   seek, when the player has focus.
4. Re-run this audit in CI so a future change cannot silently undo it.

---

## Reproducing

The audit script is not committed; it ran from a scratch directory against
`out/` served on a local port, using `axe-core` (already a dependency) and the
Chrome build in `~/.cache/puppeteer`. Re-running it after any colour change is
the only way to know the site still passes — the failures it found were
invisible to the eye in every case except the lightest greys.
