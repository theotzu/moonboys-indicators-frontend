import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
  },
  // TEMPORARY — forward the whole site to the Moon Boys Linktree.
  // permanent: false (307) on purpose: browsers do not hard-cache it, so this
  // is reversible by deleting this redirects() block. Do NOT make it 308.
  // Both entries are needed: "/:path*" is not relied on to match the bare root.
  async redirects() {
    return [
      {
        source: "/",
        destination: "https://linktr.ee/moonboyspodcast",
        permanent: false,
      },
      {
        source: "/:path*",
        destination: "https://linktr.ee/moonboyspodcast",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
