# Repositioning rankify.com.au — the plan

**14 November 2026. A plan, not a build.** Nothing here is implemented. Tom
reads it, answers the questions at the end, and then it gets built.

Tom's instruction: *"I need to redesign the whole site but still keep its
styling and stuff, rewrite a lot of stuff but still keep the pages."*

So: the same visual language, the same 24 URLs (they rank and that is worth
money), new positioning and new copy, plus the few pages the two products
genuinely need.

---

## 0. What changed, and why the site is now wrong

The site says **"Performance Marketing & Web Development"**. That was true when
Rankify was one person building websites. It now sells two subscription
products, and neither appears anywhere on it:

| | RANKIFY Editor | Ad Sidekick |
|---|---|---|
| Lives at | `app.rankify.com.au` | `sidekick.rankify.com.au` |
| Sign in | `/login` | `/login` |
| For | Anyone whose website Rankify built or looks after | Ecommerce brands on Shopify running Meta ads |
| Sold as | $199 / $299 / $499 / $699 a month | $99 / $299 / $699 a month |

A visitor today cannot find either product, cannot sign in to one they are
already paying for, and would conclude Rankify is a web agency. The build work
is still real and still sells — it stops being the whole story.

### The one line the site should carry

> Rankify builds the website, and then keeps it moving — and runs the ads
> system behind it.

Two products, one spine: **we build the thing, and we hand you the system that
keeps it working**, rather than a retainer that keeps you dependent.

---

## 1. Ground truth — checked before writing this

These are the constraints the copy has to live inside. Each was verified today
rather than taken from the brief.

**Both products are invite-only.** No public sign-up, no self-serve checkout
for either. Every call to action is **"Request access"** or **"Book a call"**.
Never "Start free trial", never "Sign up".

**Meta has not approved the Sidekick app.** Nothing may promise connecting a
Facebook account quickly, or at all, as a self-service step.

**The editor's change pipeline is down and has been since 13 November.** I
checked the Actions history rather than trusting the audit: the last two
`Editor run` jobs both failed on 13 Nov, and the last green one was **23
October**. The mailbox at `web@rankify.com.au` has been returning 503s since
the evening of 12 Nov. Cause is the GitHub artifact allowance, filled by vault
backups; it is waiting on Tom, not on code.

> **Consequence for the copy, and it is not small.** The editor page cannot say
> "ask by email or text and it's live in a minute" in the present tense while
> neither the runner nor the mailbox works. Write the page, hold the claim, and
> publish it the day a green end-to-end run proves it. This is the one thing in
> this plan that can make the site lie.

**No testimonials, client counts, results or logos for either product.**
Neither has a paying subscriber. Real client *website* work can be shown
exactly as it is today — that is genuine and already on `/projects`.

**Do not name Ecommerce Equation**, and do not describe Sidekick as built on a
course. Internal.

**Do not mention Google Ads anywhere near Sidekick.** It was parked for clients
on 14 Nov (`ecomsidekick-app/src/lib/planMenu.ts`, `NOT_YET`). Rankify's own
`/google-ads` service page is a separate question — see Q4.

**The "4,000+ ad accounts" claim needs substantiation before it goes near a
page.** Tom's own marketing note flags this: Australian Consumer Law treats an
unsubstantiated performance claim as misleading conduct regardless of intent,
and this is exactly the product where a competitor reads the page closely. Same
for the "$2,500 typical agency retainer" figure — it must be real and described
as *typical*, not universal.

---

## 2. Site map — keep, rewrite, new

All 24 existing URLs stay. Nothing is deleted, nothing is redirected.

### Rewritten (new positioning, same URL)

| URL | Becomes |
|---|---|
| `/` | Two products plus the build work. Full outline in §3. |
| `/ai-and-automation` | **The RANKIFY Editor page.** The URL already means "AI that does work for you", which is exactly what the editor is. Keeps whatever the page ranks for and finally has a real product behind it. |
| `/meta-ads` | **The Ad Sidekick page.** Same subject, same search intent, and it is the strongest URL we own for it. Done-for-you Meta management becomes a secondary offer on the page rather than the whole page. |
| `/web-design-and-development` | Still the build page and still the money page. One change: the build is now the *start* of something, and the editor is what happens on day 31. Ends by handing to the editor instead of to a retainer. |
| `/contact` | Routes by product: new website / existing client / Ad Sidekick access. |

### Kept, light touch only

`/shopify-development-services`, `/shopify-developer` — still real services,
still selling. New footer, new header, a line connecting a finished store to
Sidekick. No rewrite.

`/seo` — unchanged except chrome.

`/professional-logo-design` — unchanged except chrome. Stays demoted.

`/projects`, `/projects/hawker-studio`, `/projects/myoko-embodied` — unchanged.
This is the only genuine proof on the site and it should be used more, not less.

`/blog` and its seven posts — unchanged. They are SEO assets; rewriting them
costs ranking and buys nothing.

`/schedule-strategy-call` — unchanged. Becomes the destination for "book a
call" from both product pages.

`/legal/privacy-policy`, `/legal/terms-of-service` — **must be updated**, see §7.

### New pages

| URL | Why it has to exist |
|---|---|
| `/pricing` | Both products' plans in one place. Today the prices live only in Stripe and in two TypeScript files. |
| `/request-access` | The single destination for both products' invite-only CTAs. A short form, not a checkout. |

That is two new pages. Everything else the products need fits in pages that
already exist, which is the point of keeping the URLs.

**Deliberately not built:** a separate `/ad-sidekick` and `/editor`. Two pages
about one product compete with each other and split the ranking. See Q1 and Q2
if Tom wants it the other way.

**Untouched:** the paid landing pages (`/free-homepage`, `/free-homepage-v1`,
`/free-homepage-v2`, `/free-landing-page`, `/google-ads-offer`,
`/homepage10-offer`). They are `noindex`, they are not in the sitemap, live ad
traffic is pointed at them, and the qualifier logic is explicitly out of scope.

---

## 3. The home page, section by section

Thirteen sections today. The order below keeps the existing components and
their styling; what changes is what they say and two new blocks.

1. **Hero — rewritten.** Replaces "Performance Marketing & Web Development".
   Leads with the spine: Rankify builds it, then keeps it moving. One primary
   CTA (Book a call), one secondary (See the two products, scrolls down).

2. **Marquee — unchanged.** Client logos. Real.

3. **The two products — NEW.** The most important block on the page and it does
   not exist yet. Two cards, equal weight:
   - **RANKIFY Editor** — your website, changed by asking. From $199/mo. →
     `/ai-and-automation`, plus a "Client sign in" link to `app.rankify.com.au`.
   - **Ad Sidekick** — the system an agency uses, run by you. From $99/mo.
     Invite only. → `/meta-ads`, plus "Sign in" to `sidekick.rankify.com.au`.

4. **Comparison — rewritten.** Currently Rankify vs a traditional agency on
   building a website. Becomes the sharper and more honest version: what you
   get from a retainer versus what you get from owning the system.

5. **Projects — unchanged.** Real work, real results. The proof.

6. **Services showcase — reordered.** Build, Shopify, SEO, branding. Demoted
   below the products but still clearly on offer.

7. **Why choose us — rewritten** around the new spine.

8. **Services accordion — light rewrite.**

9. **Process — rewritten.** Today it is the build process. Becomes: we build
   it → you run it yourself → we are there when you want us.

10. **Testimonials — unchanged.** Existing real website reviews. No product
    testimonials exist and none may be invented.

11. **Stats manifesto — audit required.** Every number on it has to be one we
    can show. Anything we cannot substantiate comes off.

12. **FAQ — rewritten.** Add: what are the two products, is there a contract,
    can I leave, what happens to my site if I stop.

13. **Footer — rewritten.** See §4.

---

## 4. Header and footer

### Header

Today: six service mega-menus (Web Development, Shopify, SEO, Google Ads, Meta
Ads, AI & Automation) and one CTA. It routes by *intent*, which is good and
should survive.

Proposed top level:

| Item | Contains |
|---|---|
| **Products** *(new)* | RANKIFY Editor, Ad Sidekick, Pricing |
| **Build** | Websites, Shopify, Shopify developer |
| **Grow** | SEO, Meta Ads, Google Ads *(pending Q4)*, Branding |
| **Work** | Projects, Blog |
| **Sign in** *(new)* | RANKIFY Editor → `app.rankify.com.au/login`<br>Ad Sidekick → `sidekick.rankify.com.au/login` |
| **Book a call** | Existing CTA, unchanged |

Six service menus collapses to three groups plus Products. Every current page
is still one click from the header.

**Sign in is the piece the site is missing entirely.** A paying client has
nowhere to go today. It is a small dropdown with two links, and it should also
appear in the footer, because that is the second place people look.

### Footer

Today the footer carries the logo, contact details and two legal links. It
should become a real sitemap: Products / Build / Grow / Company / Sign in.
Cheap to do, helps crawling, and gives the login links a permanent home.

---

## 5. Copy direction, page by page

### `/ai-and-automation` → RANKIFY Editor

**What it is:** ask for a change to your website in plain words. It is made,
you see it before it goes live, you approve it, and it can be undone.

**Lead with the thing nobody else offers:** every version kept, and able to be
put back. That is a *safety* promise, and safety is what stops people touching
their own website.

Plans, from `rankify-editor/src/lib/plans.ts`:

| | Care $199 | Growth $299 | Custom $499 | Partner $699 |
|---|---|---|---|---|
| Changes a month | 20 | 50 | 50 | 150 |
| Sold as | 2 hours of dev + the assistant | changes | the build itself | changes |

Care is deliberately sold as *two hours of web development a month plus the
assistant*, not as "20 changes" — the file says so explicitly and the page must
match. Getting this wrong means quoting a client a number we did not sell them.

**Tense discipline:** written in the present tense, published only once a green
end-to-end run exists. Until then the page describes the product; it does not
promise a turnaround time.

### `/meta-ads` → Ad Sidekick

**The argument, which is arithmetic:** an agency retainer does not buy ads, it
buys *decisions* about ads — and those decisions are a system that can be
written down. Pay for the system, spend the rest on reaching customers.

Shown as a table, not asserted (figures pending Q3 and the substantiation
note):

| | |
|---|---|
| Typical agency retainer | $2,500/mo |
| Ad Sidekick | $299/mo |
| Left for actual ads | $2,201/mo |
| At $100/day | 22 days of ads |
| To know if an ad is a winner | 3 days |

**Second beat: no contract.** Turn it off whenever you like, no exit fee. This
lands precisely where the last agency hurt. (The pause tier that makes this
survivable is not built — do not mention it. See Q6.)

**Who it is for, said out loud:** brands already doing well that want ads to be
easy. Not struggling stores hoping ads will save them. Saying so filters the
churn-prone before they sign.

**Why the owner beats the agency** — they know the brand better, and they
actually care whether it works. Not "cheaper". *Better*, which is a stronger
claim and happens to be true.

Plans, from `sidekick-plans.ts` and `planMenu.ts`:

| | Basic $99 | Pro $299 | Max $699 |
|---|---|---|---|
| Brands | 1 (+$49) | 3 (+$39) | 10 (+$29) |
| AI creatives/mo | 30 | 150 | 600 |
| Everything core | ✓ | ✓ | ✓ |
| Create, Reviews, Stock, Sale planner, own naming & targets | — | ✓ | ✓ |
| Autopilot, connect Claude | — | — | ✓ |

Worth saying plainly: **Basic is not a crippled tier.** Upload, Review,
Library, Testing, Winners, History, the Scale checks, the budget planner and
all of Performance are on every plan. Pro adds creative production; Max adds
automation. That is an unusually honest pricing table and it should be sold as
one.

**CTA: Request access.** Invite only, said in plain words rather than hidden.

### `/web-design-and-development`

Keep the page and the configurator. Change the ending: today it finishes at
launch. It should finish at "and then it keeps moving" → the editor. The
build is the front door to a subscription, and the page should say so.

### `/pricing` *(new)*

Both products, side by side, with the invite-only status stated. Prices from
the two TypeScript files — the page must be generated from or checked against
them, because a price that disagrees with Stripe is the fastest way to lose
someone's trust.

### `/request-access` *(new)*

One short form: name, email, mobile, which product, and the one qualifying
question each product needs (website URL for the editor; Shopify store and
monthly ad spend for Sidekick). Goes to the CRM the same way the existing
qualifier does.

### `/contact`

Add a "what is this about" selector: new website / existing client / Ad
Sidekick. Routes the enquiry instead of dumping everything in one inbox.

---

## 6. Claims register

A single list of what may and may not be said, so a future session writing copy
does not have to re-derive it.

**May say:** both products exist and what they do; the real plan prices; real
website client work and its real results; no contract on Sidekick; invite only;
every version kept and restorable.

**May not say, today:** any testimonial, review, subscriber count or result for
either product; "4,000+ ad accounts" (until substantiated); "$2,500 typical
retainer" (until substantiated and marked typical); any Google Ads capability
in Sidekick; connecting a Facebook account; a free trial or self-serve sign-up;
a turnaround time for editor changes (until the runner is green); the pause
tier; Ecommerce Equation, in any form.

---

## 7. Work to do in the same pass

Not copy, but cheap while we are in here, and all from the 13 Nov fleet audit:

1. **A share image.** The site has none. Every link to it in a text message or
   on Facebook shows a blank box — including the ads currently running.
2. **Compress the home page.** 6.3 MB and a 5.5 s paint, Lighthouse 78. Mostly
   photographs.
3. **Analytics.** Meta Pixel only. There is no way to tell whether any of this
   repositioning worked.
4. **Privacy policy.** It must now cover both products: what the editor stores
   about a client's website, and what Sidekick holds from Meta. Tom's own
   marketing note records the boundary that needs writing down — a *paused*
   account keeps its data, a *cancelled* one must actually delete it within 30
   days, and disconnecting deletes the token immediately. That promise is
   already in the Meta App Review answers, so the privacy policy has to match it.
5. **Check the Actions run after every push.** The 9 Nov deploy failed silently
   and was not noticed until the 13th.

---

## 8. Sequence

1. Tom answers the questions below.
2. Header, footer and the two login links. *Smallest change, biggest miss —
   a paying client currently cannot sign in.*
3. Home page: hero, the new two-product block, comparison, process, FAQ.
4. `/ai-and-automation` → editor. Held from publish until a green run.
5. `/meta-ads` → Sidekick.
6. `/pricing` and `/request-access`.
7. The light touches on the remaining service pages.
8. Share image, image compression, analytics, privacy policy.

Steps 2 and 3 are worth shipping on their own before the rest is written.

---

## Questions for Tom

**Q1. Editor page — `/ai-and-automation`, or a new `/editor`?**
Recommendation: reuse `/ai-and-automation`. It already ranks, and the URL
honestly describes the product. A new URL starts at zero. Say if you would
rather have the cleaner address.

**Q2. Sidekick page — `/meta-ads`, or a new `/ad-sidekick`?**
Recommendation: reuse `/meta-ads`, same reasoning, and the search intent is an
exact match. The trade-off is that the URL says "meta ads" and the product has
a name.

**Q3. The price in the pitch does not match the price in the code.**
Your marketing note says ~$250/month. Stripe bills $99 / $299 / $699. Pro at
$299 is closest and the arithmetic still works ($2,500 − $299 = $2,201, 22 days
at $100/day). Basic at $99 makes the arithmetic *better* — but 30 creatives and
one brand may be under what the pitch describes. **Which number goes on the
page?** I have not resolved this; your note says not to.

**Q4. Does Rankify still sell Google Ads as a service?**
Google is parked inside Sidekick. That says nothing about the `/google-ads`
service page, which is a different offer. Keep it, rewrite it, or quietly
demote it?

**Q5. Can we substantiate "4,000+ ecommerce ad accounts" and "$2,500 typical
agency retainer"?** If yes, where from — both are strong and both are load
bearing. If no, the Sidekick page gets built without them and is weaker for it.

**Q6. Is the pause tier ($19–29/mo) close enough to mention?**
It makes the no-contract promise much braver. It is not built, and it needs a
fourth plan id in two repos plus a decision about what a paused workspace can
do. My assumption is: leave it off the page entirely for now.

**Q7. Anything to say about the editor being down?**
Nothing on the public site, obviously. But the editor page should not be
published claiming same-minute changes until a green end-to-end run exists.
Confirm you want it written and held, rather than written and shipped.

**Q8. Does the build work keep top billing, or do the products?**
The plan above gives the products the prime slot and keeps the build work
immediately beneath. Websites are what pays today; subscriptions are what you
want. Tell me if that ordering is wrong.
