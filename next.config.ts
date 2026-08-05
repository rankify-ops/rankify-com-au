import type { NextConfig } from "next";

// Set only while previewing on the GitHub Pages project URL
// (rankify-ops.github.io/rankify-com-au). Once rankify.com.au DNS is cut
// over, this must be unset/empty since the site will be served from the
// domain root — remove NEXT_PUBLIC_BASE_PATH from the deploy workflow then.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
