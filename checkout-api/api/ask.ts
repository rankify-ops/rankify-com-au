import Anthropic from "@anthropic-ai/sdk";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { cors } from "./_lib.js";

/**
 * The ask box on the home page.
 *
 * A visitor types what they need and gets a straight answer about whether
 * Rankify does it, roughly what it costs, and where to go next. The site is a
 * static export with no server of its own, so this Vercel function is where
 * the model call lives and where the key stays.
 *
 * It is deliberately narrow: it answers about Rankify and routes people. It is
 * not a general assistant, and the system prompt says so, because a chat box
 * on a business site that will write your homework is a reputational problem
 * and a bill.
 */

const MODEL = "claude-opus-5-5";

/** Set in the Vercel project's environment variables, never committed. */
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY ?? "" });

export const askConfigured = Boolean(process.env.ANTHROPIC_API_KEY);

/**
 * What Rankify actually does, which is the whole point: an assistant that
 * invents a service we do not sell costs a real client meeting.
 *
 * Prices here must match the site. Where they would drift, the answer sends
 * people to the page rather than quoting.
 */
const SYSTEM = `You are the assistant on rankify.com.au, an Australian digital agency run by Thomas Flood.

Answer in Tom's voice: plain, direct, Australian, no hype and no marketing waffle. Short. Two or three sentences usually does it, and a question back is often better than a paragraph. Never use em dashes.

WHAT RANKIFY DOES
- Custom websites. Built around how the customer's customers actually buy, not from a template. From $2,999.
- Shopify ecommerce builds, and Shopify development on existing stores.
- Custom apps, internal tools, backends and workflows. This is a real part of the business, not a sideline.
- AI and automation: automations, integrations, and AI built into how a business runs.
- SEO.
- Google Ads.
- Meta Ads, both done for you and through our own product.
- Branding and logo design, though it is not the main focus.

THE TWO PRODUCTS
- Every Rankify website comes with a back end at app.rankify.com.au. The client asks for a change in plain words, sees it before it goes live, approves it, and can undo it. Ongoing plans run from $199 a month.
- Ad Sidekick (sidekick.rankify.com.au) is our own product for Shopify brands running Meta ads. Upload your ads, it names them, builds the campaigns, tells you which are working, when to raise spend and what to turn off, and keeps your winners. $99, $299 or $699 a month. No contract. Every plan includes the whole core product; Pro adds creative production, Max adds automation.

THE POSITIONING
The goal is profit. Not clicks, not views. The client works directly with Tom, not an account manager.

RULES, AND THESE MATTER
- Never invent a testimonial, a client count, a result, or a case study. If you are asked for proof, point at /projects, which is real work.
- Never quote a price that is not listed above. If you are unsure, say the call will settle it.
- Do not promise timelines beyond: websites take about 7 to 15 days.
- Do not say Ad Sidekick can connect someone's Facebook account yet. It is not approved by Meta for that. If asked, say setup is handled with them.
- Do not discuss Google Ads as part of Ad Sidekick. It is not in the product.
- If someone asks about something Rankify does not do, say so plainly and say what we would do instead.
- You are not a general purpose assistant. If someone asks you something unrelated to their business or to Rankify, say that is not what you are for and ask what they are actually after.

WHERE TO SEND PEOPLE
- A new website: /web-design-and-development
- Ad Sidekick: /meta-ads
- Anything uncertain, or they want to talk: /schedule-strategy-call, a fifteen minute call with Tom.
Always end with a next step, and keep it to one.`;

type Turn = { role: "user" | "assistant"; content: string };

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (cors(req, res)) return;
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });

  if (!askConfigured) {
    // A missing key is our problem, not the visitor's, but they still need to
    // be told the box is not going to answer.
    return res.status(200).json({
      reply:
        "The assistant is not switched on yet. Book a fifteen minute call with Tom and he will answer it himself.",
      configured: false,
    });
  }

  try {
    const b = (typeof req.body === "string" ? JSON.parse(req.body) : req.body ?? {}) as {
      messages?: Turn[];
    };

    // Only the last few turns, and only text. An unbounded history from a
    // public box is somebody else's bill.
    const history = (Array.isArray(b.messages) ? b.messages : [])
      .filter((m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
      .slice(-8)
      .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }));

    if (!history.length || history[history.length - 1].role !== "user") {
      return res.status(400).json({ error: "The last message must be from the visitor." });
    }

    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 1024,
      // Low effort: this is short sales Q&A, not reasoning work, and the
      // visitor is waiting with a cursor blinking at them.
      output_config: { effort: "low" },
      // Server-side fallback, so a safety refusal returns an answer rather
      // than an empty box.
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      system: SYSTEM,
      messages: history,
    } as Parameters<typeof client.messages.create>[0]);

    const reply = (response as { content: Array<{ type: string; text?: string }> }).content
      .filter((blk) => blk.type === "text")
      .map((blk) => blk.text ?? "")
      .join("")
      .trim();

    return res.status(200).json({
      reply:
        reply ||
        "I did not catch that. Book a fifteen minute call with Tom and he will answer it properly.",
      configured: true,
    });
  } catch (err) {
    console.error("ask failed", err);
    return res.status(200).json({
      reply:
        "Something went wrong on our end. Book a fifteen minute call with Tom and he will answer it himself.",
      configured: true,
    });
  }
}
