import { createHash } from "node:crypto";
import { Redis } from "@upstash/redis";
import type { VercelRequest } from "@vercel/node";

/**
 * Spend and abuse limits for the endpoints anyone on the internet can call.
 *
 * The origin allow-list in `_lib.ts` only binds browsers. `curl` sends
 * whatever Origin header it likes, so every public endpoint here has to
 * assume the caller is hostile and the only real defence is counting.
 *
 * Counts live in Vercel KV (Upstash Redis) because a serverless function has
 * no memory between invocations: a counter in a module variable resets every
 * time Vercel starts a new instance, which under load is constantly, and
 * never spans regions. A shared store is the only thing that actually holds.
 *
 * It fails CLOSED. If the store cannot be reached we stop calling the model
 * and serve the book-a-call fallback instead. That is the deliberate choice:
 * a few minutes of "book a call with Tom" during a KV outage is a far better
 * failure than an uncounted, unbounded bill, which is the whole thing this
 * file exists to prevent.
 */

const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;

export const limitsConfigured = Boolean(url && token);

const redis = limitsConfigured ? new Redis({ url: url as string, token: token as string }) : null;

/**
 * The visitor's address, as Vercel reports it.
 *
 * `x-forwarded-for` is a chain and only the first entry is the client; the
 * rest are proxies and any of them can be forged by the caller, so nothing
 * past the first comma is trusted.
 */
export function callerIp(req: VercelRequest): string {
  const chain = String(req.headers["x-forwarded-for"] ?? "");
  const first = chain.split(",")[0]?.trim();
  return first || String(req.headers["x-real-ip"] ?? "") || "unknown";
}

/**
 * Addresses are hashed before they are stored.
 *
 * We need to tell callers apart, not know who they are, and a bucket of raw
 * IP addresses sitting in a cache is personal data we have no reason to hold.
 */
function tag(ip: string): string {
  return createHash("sha256").update(`rankify:${ip}`).digest("hex").slice(0, 20);
}

/** Increments a fixed window and returns the count, setting the TTL on first use. */
async function bump(key: string, seconds: number): Promise<number> {
  const n = await (redis as Redis).incr(key);
  // Only the request that created the key sets its lifetime, so a busy window
  // cannot keep pushing its own expiry out and become permanent.
  if (n === 1) await (redis as Redis).expire(key, seconds);
  return n;
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

export type Allowance =
  | { ok: true }
  | { ok: false; reason: "burst" | "ip_day" | "global_day" | "store" };

export type LimitSpec = {
  /** Short name, used as the key prefix so endpoints count separately. */
  bucket: string;
  /** Per address, per ten minutes. */
  burst: number;
  /** Per address, per day. */
  perDay: number;
  /**
   * Across everybody, per day. The hard ceiling on what one day can cost.
   * Omit on endpoints that do not call a paid API.
   */
  globalPerDay?: number;
};

/**
 * Counts this request against every window and says whether to serve it.
 *
 * Call it once per request, before doing the expensive thing. It counts the
 * attempt whether or not the attempt succeeds, which is correct here: a bot
 * sending malformed requests is still consuming the endpoint.
 */
export async function allow(req: VercelRequest, spec: LimitSpec): Promise<Allowance> {
  if (!redis) return { ok: false, reason: "store" };

  const who = tag(callerIp(req));
  const day = today();

  try {
    const [burst, perDay] = await Promise.all([
      bump(`rl:${spec.bucket}:b:${who}`, 600),
      bump(`rl:${spec.bucket}:d:${who}:${day}`, 86_400),
    ]);

    if (burst > spec.burst) return { ok: false, reason: "burst" };
    if (perDay > spec.perDay) return { ok: false, reason: "ip_day" };

    if (spec.globalPerDay) {
      const all = await bump(`rl:${spec.bucket}:all:${day}`, 86_400);
      if (all > spec.globalPerDay) return { ok: false, reason: "global_day" };
    }

    return { ok: true };
  } catch (err) {
    // A store we cannot read is a store we cannot be protected by.
    console.error("limit check failed", err);
    return { ok: false, reason: "store" };
  }
}
