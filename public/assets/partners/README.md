# Partner marks for the hero

The floating icons around the ask box read from this folder.
`src/components/sections/FloatingPartners.tsx` lists them.

Needed, as transparent SVG (PNG is fine if that is what the brand ships):

| file | brand |
|---|---|
| `shopify.svg` | Shopify |
| `claude.svg` | Claude |
| `firecrawl.svg` | Firecrawl |
| `grok.svg` | Grok |
| `semrush.svg` | Semrush |

Each brand publishes these in its press or brand kit. Take the **icon**, not
the wordmark: the hero renders them at 46px, where a wordmark is unreadable.

Until a file is here its mark renders as a dashed monogram, so the motion can
be judged without inventing somebody's logo. Once the file exists, set `src`
on that entry in FloatingPartners.tsx.
