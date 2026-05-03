import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // OpenSea CDN — used for the Zero G Syndicate NFT key art on the homepage
      { protocol: "https", hostname: "i2c.seadn.io" },
    ],
  },
};

export default nextConfig;
