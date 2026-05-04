"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// Zero G Syndicate — Abstract chain, contract 0xe953600d068c00c6fa22432f00b34d0ffc6759d7
// Art rotates randomly through /public/nft/zero-g/ZeroG_NNNN.png on each pageload.
// To add/remove items, drop files in that directory and update SUPPLY below.
const NFT = {
  name: "Zero G Syndicate",
  tagline:
    "A pixel-born brotherhood of outcasts, visionaries, and glitchy gods drifting through the vacuum of forgotten blockchains.",
  description:
    "Each character is a unique fragment of cosmic rebellion — forged in low-orbit, coded in resistance. A lo-fi, high-concept collection of pixelated avatars, blending sci-fi mysticism, underground tech, and street-level lore. No roadmap. No promises. Just drift.",
  marketplaceUrl: "https://opensea.io/collection/zero-g-syndicate",
  chain: "Abstract",
  soldOut: true,
};

const SUPPLY = 84;
const FALLBACK_ID = 1;

function pickArt(id: number) {
  return `/nft/zero-g/ZeroG_${String(id).padStart(4, "0")}.png`;
}

export function NFTSection() {
  // SSR uses #0001 as a stable default; once hydrated, swap to a random pick.
  const [tokenId, setTokenId] = useState(FALLBACK_ID);

  useEffect(() => {
    setTokenId(Math.floor(Math.random() * SUPPLY) + 1);
  }, []);

  return (
    <section
      id="nft"
      className="px-6 py-20 max-w-6xl mx-auto w-full border-t border-blue-500/10"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Art */}
        <div className="relative aspect-square rounded-2xl overflow-hidden border border-blue-500/30 bg-[#0f1729]">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/15 via-transparent to-cyan-500/15 z-10 pointer-events-none" />
          <Image
            src={pickArt(tokenId)}
            alt={`${NFT.name} #${tokenId}`}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover z-0 image-pixelated"
            priority={false}
          />
          <span className="absolute bottom-3 right-3 z-20 px-2 py-1 rounded-md bg-black/60 text-blue-200 text-xs font-mono backdrop-blur-sm">
            #{tokenId}
          </span>
        </div>

        {/* Copy */}
        <div className="flex flex-col gap-5">
          <div>
            <p className="text-cyan-300 text-xs font-bold uppercase tracking-widest mb-3">
              NFT Collection
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              <span className="bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
                {NFT.name}
              </span>
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">{NFT.tagline}</p>
          </div>

          <p className="text-gray-400 leading-relaxed">{NFT.description}</p>

          <div className="flex flex-wrap items-center gap-3 mt-2">
            <a
              href={NFT.marketplaceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg bg-blue-500 text-white font-bold hover:bg-blue-400 transition-colors"
            >
              View on OpenSea
            </a>
            {NFT.soldOut && (
              <span className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-cyan-400/50 text-cyan-300 bg-cyan-500/10">
                Sold Out
              </span>
            )}
            {NFT.chain && (
              <span className="text-xs text-gray-500 uppercase tracking-widest">
                On {NFT.chain}
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
