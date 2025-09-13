import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.chooseyourcart.com",
        pathname: "/storage/**",
      },
      {
        protocol: "https",
        hostname: "chooseyourcart.com",
        pathname: "/storage/**",
      },
    ],
  },
};

export default nextConfig;
