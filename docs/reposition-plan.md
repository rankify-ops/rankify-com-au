# Repositioning rankify.com.au — the plan

**14 November 2026. A plan, not a build.** Nothing here is implemented. Tom
reads it, answers the questions at the end, and then it gets built.

Tom's instruction: *"I need to redesign the whole site but still keep its
styling and stuff, rewrite a lot of stuff but still keep the pages."*

So: the same visual language, the same 24 URLs (they rank and that is worth
money), new positioning and new copy, plus the couple of pages Ad Sidekick
needs.

> **Revised after Tom's corrections, 14 Nov.** Three things changed from the
> first draft and they change the shape of the whole plan:
> 1. **The editor is not a product to sell.** It is the app an existing
>    website client logs into to change their site. It gets a *client login*
>    link, and a mention inside the website offer. It does not get a product
>    page.
> 2. **Ad Sidekick is public**, not invite-only. Its own page, its plans and
>    prices, a public "Get started" as well as a login.
> 3. **`/ai-and-automation` stays its own service page.** The first draft
>    proposed turning it into the editor page. It isn't; it stays what it is.
>
> The result is simpler than the first draft: Rankify has **one product to
> sell** (Ad Sidekick) and **a services business** (websites, Shopify, SEO, AI
> & automation, branding) whose clients get a back end to log into.

---

## 0. What is actually wrong with the site today

The site says **"Performance Marketing & Web Development"** and reads as one
developer's agency site. Two things are missing:

**1. Ad Sidekick does not exist on it at all.** A product with public pricing
that Rankify intends to sell openly, and there is no page, no price and no way
to start.

**2. A paying website client has nowhere to log in.** The editor at
`app.rankify.com.au` is where they change their site, and nothing on
rankify.com.au points at it. This is the smallest fix on the list and arguably
the most embarrassing omission.

### The spine

> Rankify builds your website — and you get a back end where you just ask for
> changes. Separately, Ad Sidekick is the ads system, sold on its own.

Not "two products". **A services business whose clients get a proper back end,
plus one product sold to the world.**

---

## 1. Ground truth — checked today, not taken on trust

**Ad Sidekick is public** — own page, own prices, public call to action.

**Public sign-up is built and deployed, switched off until Tom turns it on.**
When it is on, `https://sidekick.rankify.com.au/signup` is pick a plan, pay,
the account is created automatically, then sign in with a texted code. Until
then that page says invite-only. **Meta has also not approved the app**, which
is what lets a new customer connect their own Facebook account. So:

- The Sidekick page gets a real, public **"Get started"** button.
- Its destination is **one constant in one file**, so flipping it on launch day
  is a one-line change and not a hunt through the page.
- Its eventual destination is known: `https://sidekick.rankify.com.au/signup`.
- Until Tom switches sign-up on, it points at a request-access / booking step,
  because that page currently says invite-only.
- Login is `https://sidekick.rankify.com.au/login`.
- Nothing on the page may promise connecting a Facebook account in minutes.

See Q1 — what that button should do on launch day is Tom's call.

**The editor's change pipeline is down and has been since 13 November.** I
checked the Actions history rather than trusting the audit: the last two
`Editor run` jobs both failed on 13 Nov, and the last green one was **23
October**. The mailbox at `web@rankify.com.au` has been returning 503s since
the evening of 12 Nov. Both are waiting on Tom (GitHub artifact allowance
filled by vault backups), not on code.

> **Consequence.** The website offer may say a client gets a back end where
> they ask for changes. It may **not** promise a turnaround — "live in about a
> minute" — while no change can complete. Write it, hold that one claim, ship
> it the day a green end-to-end run exists.

**No testimonials, client counts, results or logos for Ad Sidekick.** It has no
paying subscriber. Real client *website* work can be shown exactly as it is —
that is genuine and already on `/projects`.

**Do not name Ecommerce Equation.** Do not describe Sidekick as built on a
course. Internal.

**No Google Ads anywhere near Sidekick.** Parked for clients on 14 Nov
(`ecomsidekick-app/src/lib/planMenu.ts`, `NOT_YET`). Rankify's own
`/google-ads` service page is a separate offer — see Q5.

**"4,000+ ad accounts" and "$2,500 typical agency retainer" need
substantiation before they go on a page.** Tom's own marketing note flags it:
Australian Consumer Law treats an unsubstantiated performance claim as
misleading conduct regardless of intent, and a competitor will read this page
carefully. See Q4.

---

## 2. Site map — keep, rewrite, new

All 24 existing URLs stay. Nothing deleted, nothing redirected.

### Rewritten

| URL | Becomes |
|---|---|
| `/` | Leads with the website offer and Ad Sidekick. Outline in §3. |
| `/meta-ads` | **The Ad Sidekick page.** Same subject, same search intent, and the strongest URL we own for it. Done-for-you Meta management becomes a secondary offer on the page rather than the whole page. See Q2 if you would rather have `/ad-sidekick`. |
| `/web-design-and-development` | Still the build page and still the money page. One addition: **the back end you get with it** — the editor, explained as part of what you are buying, with the ongoing plan priced there. The page currently ends at launch; it should end at "and then it keeps moving". |
| `/contact` | Routes by what it is about: new website / existing client / Ad Sidekick. |

### Kept, chrome only

`/ai-and-automation` — **stays its own service page.** Automations, integrations
and AI work sold as a service. New header and footer, nothing else. *(Changed
from the first draft, which wrongly proposed turning it into the editor page.)*

`/shopify-development-services`, `/shopify-developer` — still real services. A
line connecting a finished store to Ad Sidekick is the only addition worth
making.

`/seo`, `/professional-logo-design` — unchanged except chrome.

`/projects`, `/projects/hawker-studio`, `/projects/myoko-embodied` — unchanged.
The only genuine proof on the site; should be used more, not less.

`/blog` and its seven posts — unchanged. SEO assets. Rewriting costs ranking
and buys nothing.

`/schedule-strategy-call` — unchanged. The booking destination for everything.

`/legal/*` — **must be updated**, see §6.

### New pages

| URL | Why |
|---|---|
| `/meta-ads/pricing` *(or a section on `/meta-ads`)* | Sidekick's three plans. See Q3 — one long page or two. |
| `/request-access` | Where "Get started" points **until self-serve is live**. Short form, not a checkout. Also the home for "talk to us about Sidekick" afterwards. |

That is it. The editor needs **no page** — it needs a login link and a section
inside the website offer.

**Untouched:** the paid landing pages (`/free-homepage`, `-v1`, `-v2`,
`/free-landing-page`, `/google-ads-offer`, `/homepage10-offer`). They are
`noindex`, outside the sitemap, carrying live ad traffic, and the qualifier
logic is explicitly out of scope.

---

## 3. The home page, section by section

Thirteen sections today. Same components, same styling; what changes is what
they say, plus one new block.

1. **Hero — rewritten.** Replaces "Performance Marketing & Web Development".
   The spine: we build your website, and you get a back end you run by asking.
   Primary CTA Book a call; secondary scrolls to the offers.

2. **Marquee — unchanged.** Real client logos.

3. **What Rankify does — NEW block.** Two cards, deliberately *unequal* in kind:
   - **Websites, built and then looked after** — a custom build, and a back end
     where you ask for changes. From $2,999 to build. →
     `/web-design-and-development`
   - **Ad Sidekick** — the ads system an agency would run, handed to the person
     who cares most. From $99/mo. → `/meta-ads`, with **Get started**.

4. **Comparison — rewritten.** Currently Rankify vs a traditional agency on
   building a website. Keep that frame; sharpen it to owning the system versus
   renting a retainer.

5. **Projects — unchanged.** Real work. The proof.

6. **Services showcase — reordered.** Build, Shopify, SEO, AI & automation,
   branding. All still on offer, below the two headline blocks.

7. **Why choose us — rewritten** around the spine.

8. **Services accordion — light rewrite.**

9. **Process — rewritten.** We build it → you run it by asking → we are there
   when you want us.

10. **Testimonials — unchanged.** Existing real website reviews only.

11. **Stats manifesto — audit required.** Every number must be one we can show.
    Anything unsubstantiated comes off.

12. **FAQ — rewritten.** Add: what is the back end, do I have to use it, is
    there a contract, what is Ad Sidekick, can I cancel.

13. **Footer — rewritten.** See §4.

---

## 4. Header and footer

### Header

Today: six service mega-menus (Web Development, Shopify, SEO, Google Ads, Meta
Ads, AI & Automation) and one CTA. It routes by *intent*, which is good and
should survive.

| Item | Contains |
|---|---|
| **Ad Sidekick** | The product. Straight to `/meta-ads`, or a small menu: how it works, pricing, get started. |
| **Build** | Websites, Shopify, Shopify developer |
| **Grow** | SEO, Meta Ads (done-for-you), Google Ads *(pending Q5)*, AI & automation, Branding |
| **Work** | Projects, Blog |
| **Client login** | **Log in to your website** → `app.rankify.com.au/login`<br>**Ad Sidekick** → `sidekick.rankify.com.au/login` |
| **Book a call** | Existing CTA, unchanged |

Six service menus collapse to three groups plus the product. Every current page
stays one click from the header.

**"Client login" is the wording**, not "Products" and not "Sign in to the
editor". A client does not think of it as a product with a name — they think
"log in to my website". Two links behind it because a Sidekick customer needs
somewhere to go too.

### Footer

Today: logo, contact details, two legal links. Should become a real sitemap —
Ad Sidekick / Build / Grow / Company / Client login. Cheap, helps crawling, and
gives the login links a second home, which is where people actually look.

---

## 5. Copy direction, page by page

### `/meta-ads` → Ad Sidekick *(the one page that sells)*

**The argument, which is arithmetic:** an agency retainer does not buy ads, it
buys *decisions* about ads — and those decisions are a system that can be
written down. Pay for the system, spend the rest on reaching customers.

Shown as a table rather than asserted (figures pending Q4):

| | |
|---|---|
| Typical agency retainer | $2,500/mo |
| Ad Sidekick | $299/mo |
| Left for actual ads | $2,201/mo |
| At $100/day | 22 days of ads |
| To know if an ad is a winner | 3 days |

**Second beat: no contract.** Turn it off whenever you like, no exit fee. This
lands exactly where the last agency hurt. *(The pause tier that would make this
promise safe is not built — do not mention it. See Q6.)*

**Who it is for, said out loud:** brands already doing well that want ads to be
easy. Not struggling stores hoping ads will save them. Saying so filters out
the churn-prone before they sign.

**Why the owner beats the agency:** they know the brand and the customer
better, and they actually care whether it works. The claim is not "cheaper" —
it is *better*, which is stronger and happens to be true.

Plans, from `rankify-editor/src/lib/sidekick-plans.ts` and
`ecomsidekick-app/src/lib/planMenu.ts`:

| | Basic $99 | Pro $299 | Max $699 |
|---|---|---|---|
| Brands | 1 (+$49 each) | 3 (+$39) | 10 (+$29) |
| AI creatives/mo | 30 | 150 | 600 |
| Upload, Review, Library, Testing, Winners, History, Scale checks, budget planner, all Performance | ✓ | ✓ | ✓ |
| Create, Reviews, Stock, Sale planner, own naming & targets | — | ✓ | ✓ |
| Autopilot, connect Claude | — | — | ✓ |

Worth selling explicitly: **Basic is not a crippled tier.** The whole core
product is on every plan. Pro adds creative production, Max adds automation.
That is an unusually honest pricing table and should be presented as one.

**CTA: "Get started"**, public, with "Already a customer? Sign in" beside it.
The button's `href` is one exported constant so launch day is a one-line
change.

### `/web-design-and-development` — where the editor lives

Keep the page and the configurator. Two changes:

1. **A new section: the back end you get.** You ask for a change in plain
   words — by the portal, by email, by text. It gets made, you see it before it
   goes live, you approve it, and it can be undone. **Lead with the safety
   promise**: every version kept and able to be put back. Safety is what stops
   people touching their own website.
2. **The ongoing plan, priced here** rather than on a product page, from
   `rankify-editor/src/lib/plans.ts`:

| | Care $199 | Growth $299 | Custom $499 | Partner $699 |
|---|---|---|---|---|
| Changes a month | 20 | 50 | 50 | 150 |
| Sold as | 2 hours of dev **+** the assistant | changes | the build itself | changes |

Care is deliberately sold as *two hours of web development a month plus the
assistant*, **not** as "20 changes" — the source file says so in as many words,
and the page must match. Getting this wrong quotes a client a number we did not
sell them.

**Hold the turnaround claim** until the runner is green. See §1.

### `/ai-and-automation` — unchanged in scope

Stays the AI and automation **service** page. Not the editor. Chrome only.

### `/request-access`

One short form: name, email, mobile, and the qualifying question Sidekick needs
(Shopify store, monthly ad spend). Writes to the CRM the same way the existing
qualifier does. This is the interim destination for Get started.

### `/contact`

A "what is this about" selector — new website / existing client / Ad Sidekick —
so enquiries route instead of landing in one inbox.

---

## 6. Claims register

**May say:** Ad Sidekick exists, what it does, its real prices; the website
build offer and its real price; that clients get a back end and can ask for
changes; every version kept and restorable; no contract on Sidekick; real
website client work and its real results.

**May not say, today:** any testimonial, review, subscriber count or result for
Ad Sidekick; "4,000+ ad accounts" (until substantiated); "$2,500 typical
retainer" (until substantiated and marked *typical*); any Google Ads capability
in Sidekick; connecting a Facebook account quickly or self-service; a free
trial; a turnaround time for website changes (until the runner is green); the
pause tier; Ecommerce Equation in any form.

---

## 7. Work to do in the same pass

From the 13 Nov fleet audit, all cheap while we are in here:

1. **A share image.** The site has none. Every link to it in a text or on
   Facebook shows a blank box — including the ads running right now.
2. **Compress the home page.** 6.3 MB, 5.5 s paint, Lighthouse 78. Mostly
   photographs.
3. **Analytics.** Meta Pixel only, so there is no way to tell whether any of
   this repositioning worked.
4. **Privacy policy.** Must now cover Ad Sidekick: what it holds from Meta, and
   the deletion boundary already promised in the Meta App Review answers — a
   deletion request honoured within 30 days, disconnecting deletes the token
   immediately. The policy has to match what was told to Meta.
5. **Check the Actions run after every push.** The 9 Nov deploy failed silently
   and was not noticed until the 13th.

---

## 8. Sequence

1. Tom answers the questions below.
2. **Header, footer, client login.** Smallest change, biggest current miss.
3. Home page: hero, the new what-we-do block, comparison, process, FAQ.
4. `/meta-ads` → Ad Sidekick, with the Get started constant.
5. `/web-design-and-development`: the back-end section and the plan table.
   Turnaround claim held until a green run.
6. `/request-access`.
7. Chrome on the remaining service pages.
8. Share image, image compression, analytics, privacy policy.

Steps 2 and 3 are worth shipping on their own, before the rest is written.

---

## Questions for Tom

**Q1. When do we point "Get started" at the real sign-up?**
Mostly answered: sign-up is built and deployed at
`https://sidekick.rankify.com.au/signup`, switched off until you turn it on,
and the page says invite-only until then. So the button ships pointing at
`/request-access`, and flipping it to `/signup` is the one-line change on the
day you switch it on. **What remains yours:** whether to launch the page
before or after that switch, given Meta has still not approved the app — a
customer who signs up and pays today cannot connect their own Facebook.

**Q2. Sidekick page — `/meta-ads`, or a new `/ad-sidekick`?**
Recommendation: reuse `/meta-ads`. It already ranks, and the search intent is
an exact match. The trade-off is that the URL says "meta ads" while the product
has a name.

**Q3. One long Sidekick page, or a page plus `/meta-ads/pricing`?**
Recommendation: one page with a pricing section, until there is enough content
to justify splitting. Fewer pages, one place to keep the prices right.

**Q4. Can we substantiate "4,000+ ecommerce ad accounts" and "$2,500 typical
agency retainer"?** Both are load-bearing on the Sidekick page and both are ACL
exposure if not. If no, the page gets built without them and is weaker.

**Q5. Does Rankify still sell Google Ads as a service?**
Google is parked *inside Sidekick*. That says nothing about the `/google-ads`
service page, which is a different offer. Keep, rewrite, or quietly demote?

**Q6. Is the pause tier ($19–29/mo) close enough to mention?**
It would make the no-contract promise much braver. Not built; needs a fourth
plan id in two repos plus a decision on what a paused workspace can do. My
assumption: leave it off the page entirely for now.

**Q7. Website plan prices — public, or quoted?**
Care/Growth/Custom/Partner at $199–$699 are for existing clients. Putting them
on `/web-design-and-development` is honest and filters tyre-kickers; it also
shows every prospect an ongoing cost before they have decided they want a
website. Public, or "ongoing care from $199/mo" with the detail on the call?

**Q8. Confirm the editor copy is written and held.**
The page can describe the back end now, but should not promise a turnaround
until a green end-to-end run exists. Confirm you want it written and held
rather than written and shipped.
