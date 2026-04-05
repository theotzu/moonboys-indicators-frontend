"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

// Placeholder tiers — wire up to a smart contract in Phase 2
const TIERS = [
  {
    id: "monthly",
    name: "Monthly",
    price: "0.01 ETH",
    usdEstimate: "~$25",
    perks: [
      "All premium indicators",
      "TradingView script access",
      "Moon Boys Discord role",
      "Weekly market breakdowns",
    ],
    highlight: false,
  },
  {
    id: "yearly",
    name: "Yearly",
    price: "0.08 ETH",
    usdEstimate: "~$200",
    perks: [
      "Everything in Monthly",
      "2 months free",
      "Priority signal alerts",
      "1-on-1 chart review (1x/quarter)",
    ],
    highlight: true,
  },
];

export default function SubscribePage() {
  const { isConnected, address } = useAccount();

  return (
    <div className="min-h-screen px-6 py-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-widest uppercase text-yellow-400 border border-yellow-500/40 rounded-full bg-yellow-500/10">
            Premium Access
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Unlock the{" "}
            <span className="text-yellow-400">Full Moon Boys Suite</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Pay on-chain with ETH on Base. No middlemen, no credit cards — just
            connect your wallet and go.
          </p>
        </div>

        {/* Connect wallet prompt */}
        {!isConnected && (
          <div className="flex flex-col items-center gap-4 mb-14 p-8 rounded-xl border border-yellow-500/30 bg-yellow-500/5">
            <p className="text-gray-300 font-medium">
              Connect your wallet to subscribe
            </p>
            <ConnectButton />
          </div>
        )}

        {isConnected && (
          <p className="text-center text-gray-400 text-sm mb-10">
            Connected:{" "}
            <span className="font-mono text-yellow-400">
              {address?.slice(0, 6)}…{address?.slice(-4)}
            </span>
          </p>
        )}

        {/* Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`relative rounded-xl border p-8 flex flex-col gap-6 ${
                tier.highlight
                  ? "border-yellow-400 bg-yellow-400/5"
                  : "border-yellow-500/20 bg-gray-900/50"
              }`}
            >
              {tier.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-xs font-bold uppercase tracking-widest bg-yellow-400 text-black rounded-full">
                  Best Value
                </span>
              )}

              <div>
                <h2 className="text-xl font-bold text-white mb-1">{tier.name}</h2>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-yellow-400">
                    {tier.price}
                  </span>
                  <span className="text-gray-500 text-sm">{tier.usdEstimate}</span>
                </div>
              </div>

              <ul className="flex flex-col gap-2 flex-1">
                {tier.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-2 text-gray-300 text-sm">
                    <span className="text-yellow-400 mt-0.5">✓</span>
                    {perk}
                  </li>
                ))}
              </ul>

              <button
                disabled={!isConnected}
                className={`w-full py-3 rounded-lg font-bold transition-colors ${
                  isConnected
                    ? "bg-yellow-400 text-black hover:bg-yellow-300 cursor-pointer"
                    : "bg-gray-700 text-gray-500 cursor-not-allowed"
                }`}
                onClick={() => {
                  // TODO Phase 2: call smart contract subscription function
                  alert(`Smart contract call for ${tier.name} coming in Phase 2!`);
                }}
              >
                {isConnected ? `Subscribe ${tier.name}` : "Connect Wallet First"}
              </button>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-center text-gray-600 text-xs mt-12">
          Subscriptions are processed on Base (L2). Gas fees are minimal. Smart
          contract integration coming in Phase 2. Not financial advice.
        </p>
      </div>
    </div>
  );
}
