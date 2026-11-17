import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export to ./out. `npm run build:live` copies it to ../site/demo, where the
  // live site's Worker serves it at mrbestcars.ca/demo (review only, noindex).
  output: "export",
  // "/demo" when published inside the live site; empty for local development.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
  images: { unoptimized: true },
  // Static demo: every route is prerendered. Nothing here talks to a server or database.
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
