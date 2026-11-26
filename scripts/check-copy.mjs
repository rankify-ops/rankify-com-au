// Fails the build if an em dash reaches copy a visitor reads.
//
// On 26 Nov 2026 the site carried 326 of them across 48 files, which is the
// clearest tell of machine-written copy there is. They were removed by hand,
// sentence by sentence. This is what stops them coming back one at a time.
//
// Comments are stripped before counting, so notes in the code can use any
// punctuation they like. The check is about pages, not source style.
//
// ALLOWED lists the few files that may still contain one, with the exact
// number and the reason. A count, not a blanket pass: a new dash in an
// allowed file still fails.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const SRC = join(ROOT, "src");

const ALLOWED = {
  // Written in Rankify HQ's price record and generated from it on every build.
  // Fix the wording there, not here.
  "src/content/pricing.generated.ts": Infinity,
  // Client and partner reviews, quoted exactly as written. Never edited.
  "src/components/sections/ReviewRail.tsx": 2,
  "src/app/free-landing-page/page.tsx": 2,
  "src/content/free-homepage-funnel.ts": 2,
  "src/content/service-pages/web-design-and-development.ts": 2,
  "src/content/service-pages/professional-logo-design.ts": 1,
  "src/app/google-ads-offer/page.tsx": 1,
  // The subject line of the enquiry email sent to Rankify. A visitor never
  // sees it, and an inbox rule may match on it, so it is left as it was.
  "src/components/sections/ContactHero.tsx": 1,
  "src/components/sections/ContactFooter.tsx": 1,
};

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (/\.(ts|tsx|md|mdx)$/.test(name)) out.push(p);
  }
  return out;
}

function visibleText(source) {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " ")) // block and JSX comments
    .replace(/^\s*\/\/.*$/gm, "") // whole-line comments
    .replace(/\s\/\/\s.*$/gm, ""); // trailing comments
}

const failures = [];
for (const file of walk(SRC)) {
  const rel = relative(ROOT, file).split(sep).join("/");
  const lines = visibleText(readFileSync(file, "utf8")).split("\n");
  const hits = [];
  lines.forEach((line, i) => {
    const n = (line.match(/—|&mdash;/g) ?? []).length;
    for (let k = 0; k < n; k++) hits.push(i + 1);
  });
  const allowed = ALLOWED[rel] ?? 0;
  if (hits.length > allowed) failures.push({ rel, hits, allowed });
}

if (failures.length) {
  console.error("\ncopy check: em dashes in visitor-facing copy\n");
  for (const f of failures) {
    const where = [...new Set(f.hits)].slice(0, 12).join(", ");
    const limit = f.allowed ? ` (allowed ${f.allowed})` : "";
    console.error(`  ${f.rel}: ${f.hits.length}${limit}, line ${where}`);
  }
  console.error(
    "\nRewrite the sentence so it does not need one: two sentences, a comma or a colon.\n" +
      "A client review quoted verbatim is the only exception, and it goes in ALLOWED in scripts/check-copy.mjs.\n",
  );
  process.exit(1);
}
console.log("copy check: no em dashes in visitor-facing copy");
