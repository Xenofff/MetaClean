import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  images: {
    unoptimized: true,
  },

  basePath: "/MetaClean",
  assetPrefix: "/MetaClean/",
};

export default nextConfig;