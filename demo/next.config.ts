import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
