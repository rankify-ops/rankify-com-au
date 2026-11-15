import Anthropic from "@anthropic-ai/sdk";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { cors } from "./_lib.js";
import { crmConfigured, logAsk, updateAsk } from "./_crm.js";
import { allow, limitsConfigured } from "./_limits.js";
import { humanVerified, turnstileConfigured } from "./_turnstile.js";

/**
 * The ask box on the home page.
 *
 * A visitor says what they need and gets a straight answer about whether
 * Rankify does it, then the one or two places to go next: the page that
 * explains it, and a call with Tom. The site is a static export with no
 * server of its own, so this Vercel function is where the model call lives
 * and where the key stays.
 *
 * Two things make it safe to put in front of strangers.
 *
 * The model never writes a URL. It picks destinations by id from the fixed
 * list below and the server turns ids into links, so a confident link to a
 * page that does not exist is not a failure mode that can happen.
 *
 * It is narrow on purpose. It answers about Rankify and routes people. It is
 * not a general assistant, because a chat box on a business site that will
 * write your homework is a reputational problem and a bill.
 *
 * Every conversation is logged to the CRM, including the ones we could not
 * route. Those are the queue of pages worth building.
 */

/**
 * Haiku, not Opus, for two separate reasons.
 *
 * Cost: this is short sales Q&A with a fixed answer shape, and Haiku 5.5 is
 * roughly forty times cheaper than Opus 5.5 per token ($0.10/$0.50 against
 * $4/$20 per million). On an endpoint the public can call, that multiplier
 * is the difference between a bad day and a bad month.
 *
 * Correctness: Opus 5.5 rejects forced tool choice outright, so the
 * `tool_choice` below would have returned a 400 on every single call and
 * every visitor would have got the "something went wrong" fallback. Haiku
 * 5.5 still accepts it, so the answer shape stays guaranteed.
 */
const MODEL = "claude-haiku-5-5";

/**
 * How much of a conversation we are willing to pay to read.
 *
 * The endpoint is public and the origin allow-list only binds browsers, so
 * assume every request is hostile and price it accordingly: these two
 * numbers are the ceiling on input tokens per call.
 */
const MAX_TURNS = 6;
const MAX_CHARS = 1000;

/**
 * The ceiling on what a day here can cost.
 *
 * `globalPerDay` is the number that matters: it is a hard stop on model
 * calls across everybody, so the worst possible day is that many calls, not
 * however many a botnet felt like making. At Haiku's rates and these caps
 * the ceiling is roughly two US dollars a day, which is a number you can
 * ignore rather than watch.
 *
 * The per-address caps are what keep one visitor from eating the global one.
 * Ten in ten minutes is far more conversation than a real person has with a
 * box like this, and forty in a day is generous for someone who came back.
 */
const LIMITS = {
  bucket: "ask",
  burst: 10,
  perDay: 40,
  globalPerDay: Number(process.env.ASK_DAILY_CAP ?? 1500),
} as const;

/** What a visitor gets whenever we decide not to call the model. */
function deflect(res: VercelResponse, reply: string, logId?: string) {
  return res.status(200).json({
    reply,
    actions: actionsFor(FALLBACK.destinations),
    logId,
    configured: true,
  });
}

/** Set in the Vercel project's environment variables, never committed. */
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY ?? "" });

export const askConfigured = Boolean(process.env.ANTHROPIC_API_KEY);

/**
 * Everywhere the box is allowed to send somebody.
 *
 * Each one is a page that exists. The model only ever names the key, so it
 * cannot invent a destination, misremember a path, or send someone to a 404.
 * Adding a page here is what makes it reachable from the box.
 */
const DESTINATIONS = {
  website: { label: "How we build websites", href: "/web-design-and-development" },
  shopify: { label: "Shopify development", href: "/shopify-development-services" },
  seo: { label: "How our SEO works", href: "/seo" },
  google_ads: { label: "Google Ads", href: "/google-ads" },
  meta_ads: { label: "Ad Sidekick for Meta ads", href: "/meta-ads" },
  sidekick_how: { label: "How Ad Sidekick works", href: "/meta-ads/how-it-works" },
  sidekick_pricing: { label: "Ad Sidekick pricing", href: "/meta-ads/pricing" },
  sidekick_access: { label: "Request access to Ad Sidekick", href: "/request-access" },
  ai_automation: { label: "Apps, tools and AI automation", href: "/ai-and-automation" },
  branding: { label: "Logo and brand design", href: "/professional-logo-design" },
  work: { label: "See our work", href: "/projects" },
  contact: { label: "Send us a message", href: "/contact" },
  call: { label: "Book a 15 minute call with Thomas", href: "/schedule-strategy-call" },
} as const;

type DestinationKey = keyof typeof DESTINATIONS;
const DESTINATION_KEYS = Object.keys(DESTINATIONS) as DestinationKey[];

const TOPICS = [
  "website",
  "shopify",
  "seo",
  "google_ads",
  "meta_ads",
  "apps_and_automation",
  "branding",
  "pricing",
  "proof",
  "support",
  "other",
  "off_topic",
] as const;

const SYSTEM = `You are the assistant on rankify.com.au, an Australian digital agency run by Thomas Flood.

Answer in Tom's voice: plain, direct, Australian, no hype and no marketing waffle. Short. Two or three sentences usually does it. Never use em dashes.

Every answer does the same two things: say whether we do the thing and what it actually involves, then hand them off. Something like "Yes, we build Shopify stores and we build them around conversion rather than looks. Book fifteen minutes with Tom, or read how we do it." You are not trying to close them in the chat. You are getting them to the right page or onto a call.

WHAT RANKIFY DOES
- Custom websites. Built around how the customer's customers actually buy, not from a template. From $2,999. Anything custom in a site is normal work for us: calculators, booking systems, quoting tools, portals, member areas.
- Shopify ecommerce builds, and Shopify development on existing stores.
- Custom apps, internal tools, backends, dashboards and workflows. This is a real part of the business, not a sideline.
- AI and automation: automations, integrations, and AI built into how a business runs.
- SEO.
- Google Ads.
- Meta Ads, both done for you and through our own product.
- Branding and logo design, though it is not the main focus.

THE TWO PRODUCTS
- Every Rankify website comes with a back end at app.rankify.com.au. The client asks for a change in plain words, sees it before it goes live, approves it, and can undo it. Ongoing plans run from $199 a month.
- Ad Sidekick (sidekick.rankify.com.au) is our own product for Shopify brands running Meta ads. Upload your ads, it names them, builds the campaigns, tells you which are working, when to raise spend and what to turn off, and keeps your winners. $99, $299 or $699 a month. No contract. Every plan includes the whole core product; Pro adds creative production, Max adds automation. Sign-up is invitation only right now, so people request access.

THE POSITIONING
The goal is profit. Not clicks, not views. The client works directly with Tom, not an account manager.

SAY YES
Default to yes. If it is marketing, a website, an app, a dashboard, an integration, AI, automation, or anything to do with Shopify, we build it, and you should say so plainly rather than hedging. A custom calculator on a website, a booking system, a quoting tool, a client portal, a dashboard pulling in live numbers from whatever they already use, an automation that moves data between two systems, an internal tool their team uses every day: all normal work. "Yes, we do that" is the right opening, then one line on what it actually involves, then the next step.

Do not say we have not done something before, do not say it depends unless it genuinely does, and do not talk somebody out of a project because it sounds big. If it is complicated, the call is where that gets worked out, so send them there.

The no is for things that are plainly not us: printing, bookkeeping, tax, legal documents, running somebody's social accounts by hand, cold calling, door knocking, physical products. Say no plainly to those, say what we would do instead, and set covered to false. Everything in the paragraph above is a yes.

ASKING BACK
When one short question would change the answer, ask it instead of guessing, and put it in follow_up. Someone who says "I want to run Meta ads" is worth asking whether they are already running them and roughly what they spend, because that decides whether Ad Sidekick suits them. Someone who says "I need a website" is worth asking what the site has to do. Ask one question at a time and never more than two in a conversation. If they have already told you enough, do not ask, route them.

RULES, AND THESE MATTER
- Never invent a testimonial, a client count, a result, or a case study. If you are asked for proof, send them to our work.
- Never quote a price that is not listed above. If you are unsure, say the call will settle it.
- Do not promise timelines beyond: websites take about 7 to 15 days.
- Do not say Ad Sidekick can connect someone's Facebook account yet. It is not approved by Meta for that. If asked, say setup is handled with them.
- Do not discuss Google Ads as part of Ad Sidekick. It is not in the product.
- If someone asks about something Rankify genuinely does not do, per the no list above, say so plainly, say what we would do instead, and set covered to false. Do not use covered false for work we do but have no page for, like a custom dashboard: that is still yes, send them to apps and automation.
- You are not a general purpose assistant. If someone asks you something unrelated to their business or to Rankify, say that is not what you are for and ask what they are actually after. Set topic to off_topic.

ALWAYS reply by calling the answer tool. Pick the page that matches what they asked. Always include call. Set page_gap to true whenever the site has no page that really explains what they asked about, because that is how Tom finds out what to build.`;

const ANSWER_TOOL = {
  name: "answer",
  description: "Answer the visitor and name where to send them.",
  input_schema: {
    type: "object" as const,
    properties: {
      reply: {
        type: "string",
        description:
          "The answer, in Tom's voice. Two or three sentences. Do not write URLs or link text, the buttons are added for you.",
      },
      follow_up: {
        type: "string",
        description:
          "One short qualifying question to ask them, or leave this out when you already know enough to route them.",
      },
      destinations: {
        type: "array",
        description:
          "Where to send them, best first. Always include call. One page plus call is usually right.",
        items: { type: "string", enum: DESTINATION_KEYS },
        maxItems: 3,
      },
      topic: { type: "string", enum: TOPICS },
      covered: {
        type: "boolean",
        description:
          "True when this is work Rankify does. Default to true for anything in marketing, websites, apps, dashboards, integrations, AI, automation or Shopify. False only for the no list.",
      },
      page_gap: {
        type: "boolean",
        description:
          "True when we do the thing but no page on the site really explains it, so the best you could do was send them somewhere adjacent. This is how Tom finds out what to build, so be honest about it.",
      },
    },
    required: ["reply", "destinations", "topic", "covered", "page_gap"],
  },
};

type Turn = { role: "user" | "assistant"; content: string };

type Answer = {
  reply: string;
  follow_up?: string;
  destinations: DestinationKey[];
  topic: string;
  /** Work we do. Nearly always true; false is the short no list. */
  covered: boolean;
  /** We do it, but no page explains it. The queue of pages worth building. */
  page_gap: boolean;
};

/** Where to send someone when the model never got a say. */
const FALLBACK: Pick<Answer, "destinations"> = { destinations: ["call"] };

function actionsFor(keys: DestinationKey[]) {
  const seen = new Set<DestinationKey>();
  const picked = keys.filter((k) => DESTINATIONS[k] && !seen.has(k) && seen.add(k));
  // A call is the one next step that always applies, so it is appended rather
  // than left to the model to remember.
  if (!picked.includes("call")) picked.push("call");
  return picked.slice(0, 3).map((key) => ({ key, ...DESTINATIONS[key] }));
}

function transcriptOf(history: Turn[], reply: string, followUp?: string) {
  const lines = history.map((m) => `${m.role === "user" ? "Them" : "Us"}: ${m.content}`);
  lines.push(`Us: ${[reply, followUp].filter(Boolean).join(" ")}`);
  return lines.join("\n");
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (cors(req, res)) return;
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });

  if (!askConfigured) {
    // A missing key is our problem, not the visitor's, but they still need to
    // be told the box is not going to answer.
    return res.status(200).json({
      reply:
        "The assistant is not switched on yet. Book a fifteen minute call with Tom and he will answer it himself.",
      actions: actionsFor(FALLBACK.destinations),
      configured: false,
    });
  }

  // The guards are not optional and this is on purpose. An API key without a
  // counter in front of it is the failure mode this whole file is built to
  // avoid, and the easiest way to end up there is adding the key to Vercel
  // and forgetting the rest. So a half-configured deployment answers like an
  // unconfigured one instead of quietly spending money.
  if (!limitsConfigured || !turnstileConfigured) {
    console.error("ask refused: limits or turnstile not configured", {
      limitsConfigured,
      turnstileConfigured,
    });
    return deflect(
      res,
      "The assistant is not switched on yet. Book a fifteen minute call with Tom and he will answer it himself.",
    );
  }

  let history: Turn[] = [];
  let logId: string | undefined;

  try {
    const b = (typeof req.body === "string" ? JSON.parse(req.body) : req.body ?? {}) as {
      messages?: Turn[];
      /** The CRM card for this conversation, returned by the first answer. */
      logId?: string;
      /** A fresh Turnstile solve. One per message: the tokens are single use. */
      turnstile?: string;
    };

    logId = typeof b.logId === "string" ? b.logId.slice(0, 40) : undefined;

    // Only the last few turns, and only text. An unbounded history from a
    // public box is somebody else's bill: every character here is input
    // tokens we pay for, on a request anybody on the internet can send.
    // Six turns of a thousand characters is far more than a real visitor
    // types and roughly a third of what the old caps allowed through.
    history = (Array.isArray(b.messages) ? b.messages : [])
      .filter((m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
      .slice(-MAX_TURNS)
      .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));

    if (!history.length || history[history.length - 1].role !== "user") {
      return res.status(400).json({ error: "The last message must be from the visitor." });
    }

    // Padding the question itself is the cheapest way to run the bill up, so
    // it is refused rather than quietly truncated: a real question is never
    // this long, and silently answering a padded one still costs us the call.
    if (history[history.length - 1].content.length >= MAX_CHARS) {
      return res.status(400).json({ error: "That question is too long. Shorten it, or book a call." });
    }

    // Counting comes before verifying, so a flood of junk tokens is cut off
    // by the limiter rather than costing us a Cloudflare round trip each.
    const allowance = await allow(req, LIMITS);
    if (!allowance.ok) {
      console.warn("ask limited", allowance.reason);
      return deflect(
        res,
        allowance.reason === "global_day"
          ? "The assistant has answered all it can for today. Book a fifteen minute call with Tom and he will answer it himself."
          : "That is a lot of questions in a short time. Book a fifteen minute call with Tom and he will go through it properly.",
        logId,
      );
    }

    if (!(await humanVerified(req, b.turnstile))) {
      return deflect(
        res,
        "We could not check that this came from a browser. Reload the page and try again, or book a fifteen minute call with Tom.",
        logId,
      );
    }

    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 1024,
      // Low effort: this is short sales Q&A, not reasoning work, and the
      // visitor is waiting with a cursor blinking at them.
      output_config: { effort: "low" },
      // No server-side fallback here: Haiku 5.5 does not offer one. A safety
      // refusal is handled below instead, by checking stop_reason.
      system: SYSTEM,
      tools: [ANSWER_TOOL],
      tool_choice: { type: "tool", name: "answer" },
      messages: history,
    } as Parameters<typeof client.messages.create>[0]);

    // A refusal comes back as a normal 200 with no answer in it, so it has to
    // be checked rather than waited for as an exception.
    if ((response as { stop_reason?: string }).stop_reason === "refusal") {
      console.warn("ask refused by the model");
      return deflect(
        res,
        "I am not able to answer that one. Book a fifteen minute call with Tom and he will take it from there.",
        logId,
      );
    }

    const blocks = (response as { content: Array<{ type: string; name?: string; input?: unknown }> })
      .content;
    const call = blocks.find((blk) => blk.type === "tool_use" && blk.name === "answer");
    const out = (call?.input ?? {}) as Partial<Answer>;

    const reply = (out.reply ?? "").trim();
    if (!reply) throw new Error("the model returned no reply");

    const followUp = (out.follow_up ?? "").trim() || undefined;
    const actions = actionsFor(Array.isArray(out.destinations) ? out.destinations : []);
    const topic = typeof out.topic === "string" ? out.topic : "other";
    const covered = out.covered !== false;
    const pageGap = out.page_gap === true;

    // Logged after the answer is built and before it is sent, but never at the
    // cost of the answer: a CRM outage must not cost the visitor their reply.
    const id = await record(logId, {
      transcript: transcriptOf(history, reply, followUp),
      topic,
      covered,
      pageGap,
      sentTo: actions.map((a) => a.key),
    });

    return res.status(200).json({
      reply,
      followUp,
      actions,
      covered,
      logId: id ?? logId,
      configured: true,
    });
  } catch (err) {
    console.error("ask failed", err);
    return res.status(200).json({
      reply:
        "Something went wrong on our end. Book a fifteen minute call with Tom and he will answer it himself.",
      actions: actionsFor(FALLBACK.destinations),
      logId,
      configured: true,
    });
  }
}

/** Never throws. The visitor's answer does not depend on our bookkeeping. */
async function record(
  id: string | undefined,
  c: { transcript: string; topic: string; covered: boolean; pageGap: boolean; sentTo: string[] },
): Promise<string | null> {
  if (!crmConfigured) return null;
  try {
    if (id) {
      await updateAsk(id, c);
      return id;
    }
    return await logAsk(c);
  } catch (err) {
    console.error("ask logging failed", err);
    return null;
  }
}
