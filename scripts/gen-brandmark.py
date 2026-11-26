"""Emit BrandMark.tsx straight from the downloaded brand SVGs.

Typing a logo's path data by hand is how a mark ends up subtly wrong, so
nothing here is retyped: every `d` is read out of the file that was
downloaded from the brand's own published asset.
"""
import io, os, re

HERE = os.path.dirname(os.path.abspath(__file__))
DL = os.path.join(HERE, "brand-src")
OUT = os.path.join(HERE, "..", "src", "components", "ui", "BrandMark.tsx")


def read(n):
    return io.open(os.path.join(DL, n), encoding="utf-8", errors="replace").read()


# ---- Meta: three paths, two gradients, viewBox from width/height ----
meta = read("meta.svg")
meta_grads = re.findall(r"<linearGradient[\s\S]*?</linearGradient>", meta)
# \sd=" , not d=" : an unanchored d=" also matches inside id="Logo0",
# which silently yields a five-character path and a mark that paints nothing.
meta_paths = re.findall(r'<path[^>]*?\sd="([^"]+)"[^>]*?/>', meta)
assert all(len(d) > 100 for d in meta_paths), [len(d) for d in meta_paths]
meta_styles = re.findall(r'<path[^>]*?style="fill:([^";]+)"', meta)
assert len(meta_paths) == 3 and len(meta_styles) == 3, (len(meta_paths), len(meta_styles))


def grad_to_jsx(g, idmap):
    g = re.sub(r'id="([^"]+)"', lambda m: 'id="%s"' % idmap[m.group(1)], g)
    g = g.replace("gradientUnits", "gradientUnits")
    # style="stop-color:#xxx" -> stopColor="#xxx"
    g = re.sub(r'style="stop-color:([^"]+)"', r'stopColor="\1"', g)
    g = g.replace("<stop ", "<stop ").replace("/>", " />")
    g = g.replace("<linearGradient", "<linearGradient").replace("</linearGradient>", "</linearGradient>")
    return g


idmap = {"Grad_Logo1": "rk-meta-a", "Grad_Logo2": "rk-meta-b"}
meta_grads_jsx = "\n        ".join(grad_to_jsx(g, idmap) for g in meta_grads)
meta_fills = [s if not s.startswith("url(#") else "url(#%s)" % idmap[s[5:-1]] for s in meta_styles]
meta_paths_jsx = "\n      ".join(
    '<path fill="%s" d="%s" />' % (f, d) for f, d in zip(meta_fills, meta_paths)
)

# ---- Google Ads: two paths + one ellipse ----
ga = read("googleads.svg")
ga_paths = re.findall(r'<path d="([^"]+)" fill="([^"]+)"', ga)
ga_ell = re.search(r'<ellipse fill="([^"]+)" cx="([^"]+)" cy="([^"]+)" rx="([^"]+)" ry="([^"]+)"', ga)
assert len(ga_paths) == 2 and ga_ell, (len(ga_paths), bool(ga_ell))
ga_jsx = "\n      ".join('<path fill="%s" d="%s" />' % (f, d) for d, f in ga_paths)
ga_jsx += '\n      <ellipse fill="%s" cx="%s" cy="%s" rx="%s" ry="%s" />' % ga_ell.groups()

# ---- Shopify: the bag only, wordmark dropped ----
sh = read("shopify-word.svg")
sh_paths = [p for p in re.findall(r"<path[^>]*/>", sh) if re.search(r'fill="(#95BF47|#5E8E3E|#FFF)"', p)]
assert len(sh_paths) == 3, len(sh_paths)
sh_jsx = "\n      ".join(p.replace("/>", " />").replace("  ", " ") for p in sh_paths)

tsx = '''/**
 * Real brand marks, in the brands' own colours.
 *
 * The cards used to carry hand-drawn line icons -- a megaphone for Ad
 * Sidekick, a generic bag for Shopify, a reticle for Google Ads. The repo's
 * existing partner SVGs could not stand in: they are Simple Icons, single
 * monochrome paths flattened to #ffffff for the dark hero, so Meta's
 * gradient, Shopify's white S and Google Ads' three colours do not survive
 * in them, and the Google file is the Google "G" rather than Google Ads at
 * all.
 *
 * So these are the published marks. No path here was typed out by hand --
 * BrandMark.tsx is generated from the downloaded files, because a logo
 * redrawn from memory is a trademark reproduced wrongly.
 *
 * Shopify ships only a lockup, so the bag is the lockup with the wordmark
 * path dropped and the viewBox tightened to the glyph's own bounding box,
 * measured in the browser rather than guessed.
 *
 * Each sits in a neutral tile, not the green-tinted one the line icons use:
 * a green wash under Meta blue and Shopify green muddies both.
 */

/**
 * 29px, not the 26px the others use.
 *
 * Meta's mark is wide and short (287x191), so a square box letterboxes it:
 * at a shared size it paints about a quarter less ink than Shopify or
 * Google Ads, which reads as a smaller logo rather
 * than a wider one. Sized by painted area, measured, not guessed.
 */
export function MetaMark({ className = "h-[29px] w-[29px]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 287.56 191" className={className} role="img" aria-label="Meta">
      <defs>
        %(meta_grads)s
      </defs>
      %(meta_paths)s
    </svg>
  );
}

export function ShopifyMark({ className = "h-[26px] w-[26px]" }: { className?: string }) {
  return (
    <svg viewBox="-0.1 308.7 150.2 170.7" className={className} role="img" aria-label="Shopify">
      %(shopify)s
    </svg>
  );
}

export function GoogleAdsMark({ className = "h-[26px] w-[26px]" }: { className?: string }) {
  return (
    <svg viewBox="0 -13 256 256" className={className} role="img" aria-label="Google Ads">
      %(googleads)s
    </svg>
  );
}
''' % {
    "meta_grads": meta_grads_jsx,
    "meta_paths": meta_paths_jsx,
    "shopify": sh_jsx,
    "googleads": ga_jsx,
}

io.open(OUT, "w", encoding="utf-8", newline="\n").write(tsx)
print("wrote", OUT, len(tsx), "bytes")
