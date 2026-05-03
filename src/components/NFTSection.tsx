import Image from "next/image";

// Zero G Syndicate NFT collection — Abstract chain, contract 0xe953600d068c00c6fa22432f00b34d0ffc6759d7
// Art is hotlinked from OpenSea's CDN; if it ever 404s, drop a copy at /public/nft/zero-g-syndicate.png
// and update `art` here.
const NFT = {
  name: "Zero G Syndicate",
  tagline: "The Moon Boys NFT collection.",
  description:
    "An on-chain crew badge for Moon Boys believers. Holders get access to the inner circle, future drops, and bragging rights for being early.",
  art: "https://i2c.seadn.io/abstract/0xe953600d068c00c6fa22432f00b34d0ffc6759d7/785ca8184e98007a395a7e7dbd560c/09785ca8184e98007a395a7e7dbd560c.png",
  marketplaceUrl: "https://opensea.io/collection/zero-g-syndicate",
  chain: "Abstract",
};

export function NFTSection() {
  return (
    <section
      id="nft"
      className="px-6 py-20 max-w-6xl mx-auto w-full border-t border-purple-500/10"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Art */}
        <div className="relative aspect-square rounded-2xl overflow-hidden border border-purple-500/30 bg-[#15101f]">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/15 via-transparent to-teal-500/15 z-10 pointer-events-none" />
          <Image
            src={NFT.art}
            alt={`${NFT.name} key art`}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover z-0"
          />
          {/* Placeholder shows if image fails to load */}
          <div className="absolute inset-0 -z-10 flex flex-col items-center justify-center gap-3 text-purple-300/40">
            <span className="text-6xl">🪐</span>
            <span className="text-sm uppercase tracking-widest">{NFT.name}</span>
          </div>
        </div>

        {/* Copy */}
        <div className="flex flex-col gap-5">
          <div>
            <p className="text-teal-300 text-xs font-bold uppercase tracking-widest mb-3">
              NFT Collection
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              <span className="bg-gradient-to-r from-purple-300 to-teal-300 bg-clip-text text-transparent">
                {NFT.name}
              </span>
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              {NFT.tagline}
            </p>
          </div>

          <p className="text-gray-400 leading-relaxed">{NFT.description}</p>

          <div className="flex flex-wrap items-center gap-3 mt-2">
            {NFT.marketplaceUrl ? (
              <a
                href={NFT.marketplaceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-lg bg-purple-500 text-white font-bold hover:bg-purple-400 transition-colors"
              >
                View Collection
              </a>
            ) : (
              <span className="px-6 py-3 rounded-lg border border-purple-500/30 text-purple-300/70 font-semibold">
                Marketplace link coming soon
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
