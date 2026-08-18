/**
 * Makes every exported route answer on its trailing-slash URL too.
 *
 * `output: "export"` writes each route as `<route>.html`. GitHub Pages serves
 * that at `/route` but has nothing to serve at `/route/`, so every page on the
 * site returned a 404 the moment someone typed or pasted the slash — including
 * the paid landing page, where a 404 costs a click you paid for.
 *
 * Copying `<route>.html` to `<route>/index.html` makes both forms serve the
 * same document. Deliberately additive rather than flipping `trailingSlash` in
 * next.config: that would move every canonical URL on a live, indexed site.
 * Each page already declares its own `rel=canonical`, so the duplicate is
 * resolved for search without a redirect.
 */
import { readdir, mkdir, copyFile, stat } from "node:fs/promises";
import { join, dirname, resolve, basename } from "node:path";

const OUT = resolve(process.cwd(), "out");

/** Every .html file under out/, ignoring Next's own asset directory. */
async function pages(dir) {
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name === "_next") continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) found.push(...(await pages(full)));
    else if (entry.name.endsWith(".html")) found.push(full);
  }
  return found;
}

const exists = (p) =>
  stat(p).then(
    () => true,
    () => false,
  );

try {
  await stat(OUT);
} catch {
  console.error("trailing-slash: no out/ directory — run next build first");
  process.exit(1);
}

let copied = 0;
for (const file of await pages(OUT)) {
  const name = file.slice(0, -5); // drop ".html"

  // index.html is already the slash form; 404.html is served by Pages itself.
  const base = basename(name);
  if (base === "index" || base === "404") continue;

  const target = join(name, "index.html");
  if (await exists(target)) continue;

  await mkdir(dirname(target), { recursive: true });
  await copyFile(file, target);
  copied += 1;
}

console.log(`trailing-slash: ${copied} route(s) now answer on /path/ as well as /path`);
