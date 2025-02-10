import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-8ced0c1759834069ad2a2a48ed89fe24.r2.dev",
        port: "",
        pathname: "/**", // Allows all paths under the hostname
      },
    ],
  },
};

export default nextConfig;
