"use client";

import Image from "next/image";

/**
 * INDICATOR IMAGES
 * Drop screenshots into /public/indicators/ with these exact filenames:
 *   moon-boys-line.png
 *   dollarized-volume.png
 *   btc-production-cost.png
 *   liquidation-heatmap.png
 *
 * Recommended: screenshot the chart preview from each TradingView script page.
 * Ideal size: 800×450px (16:9). PNG or JPG both work.
 */
const INDICATORS = [
  {
    id: "moon-boys-line",
    label: "Moon Boys Line",
    description:
      "44 / 125 / 200-day SMAs with a colour-coded band. Gold = bullish, blue = risk-off, gray = neutral. Works on any asset — great for reading macro trend regime at a glance.",
    scriptUrl: "https://www.tradingview.com/script/5xZSUQ3b-MoonBoys-Line/",
    author: "theotzu",
    tags: ["Trend", "SMA", "Any Asset"],
    image: "/indicators/moon-boys-line.png",
  },
  {
    id: "dollarized-volume",
    label: "Dollarized Volume",
    description:
      "Volume × Price per candle — shows real capital flow regardless of the asset's price level. Compare participation fairly across time periods and spot institutional moves.",
    scriptUrl: "https://www.tradingview.com/script/GKRGy2vD-Moon-Boys-Dollarized-Volume/",
    author: "VickzinBK",
    tags: ["Volume", "Capital Flow", "Any Asset"],
    image: "/indicators/dollarized-volume.png",
  },
  {
    id: "btc-production-cost",
    label: "BTC Production Cost",
    description:
      "Bitcoin's real cost of production using CBECI electricity data across mining eras. Plots macro support zones where miners go underwater — historically reliable cycle lows.",
    scriptUrl: "https://www.tradingview.com/script/kDOElEFI-Moon-Boys-BTC-Production-Cost-Daily/",
    author: "VickzinBK",
    tags: ["On-Chain", "Mining", "BTC Only"],
    image: "/indicators/btc-production-cost.png",
  },
  {
    id: "liquidation-heatmap",
    label: "BTC Liquidation Heatmap",
    description:
      "Heat-mapped futures liquidation zones from Binance & Bybit OI. Green = long liq zones, purple = short liq zones. ⚡ marks the highest-significance levels to watch.",
    scriptUrl: "https://www.tradingview.com/script/L5TplYwb-Moon-Boys-BTC-Liquidation-Heatmap/",
    author: "VickzinBK",
    tags: ["Liquidations", "Futures OI", "BTC Only"],
    image: "/indicators/liquidation-heatmap.png",
  },
];

export function IndicatorChart() {
  return (
    <div className="space-y-6">
      {/* Note about adding indicators */}
      <div className="flex items-start gap-3 px-4 py-3 rounded-lg bg-cyan-500/5 border border-cyan-500/20 text-sm text-gray-400">
        <span className="text-cyan-300 text-base mt-0.5 shrink-0">ℹ</span>
        <span>
          Our indicators are Pine Script™ tools published on TradingView. Click
          &ldquo;Add to chart&rdquo; on any card below — they&apos;ll open directly in TradingView
          where you can apply them to any chart you like.
        </span>
      </div>

      {/* Indicator cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {INDICATORS.map((ind) => (
          <div
            key={ind.id}
            className="rounded-xl border border-blue-500/25 bg-[#0f1729]/60 overflow-hidden flex flex-col"
          >
            {/* Screenshot preview */}
            <div className="relative w-full aspect-video bg-[#0f1729] border-b border-blue-500/15">
              <Image
                src={ind.image}
                alt={`${ind.label} indicator preview`}
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover z-10"
                onError={(e) => {
                  // Hide broken image — placeholder shows instead
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
              {/* Placeholder — behind the image (z-0), only visible on error */}
              <div className="absolute inset-0 z-0 flex flex-col items-center justify-center gap-2 text-gray-700">
                <span className="text-3xl">📊</span>
                <span className="text-xs">Screenshot coming soon</span>
              </div>
            </div>

            <div className="p-5 flex flex-col gap-3 flex-1">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-white text-sm">{ind.label}</p>
                  <p className="text-gray-500 text-xs mt-0.5">by @{ind.author}</p>
                </div>
                <div className="flex flex-wrap gap-1 justify-end">
                  {ind.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-1.5 py-0.5 text-xs rounded-full border whitespace-nowrap ${
                        tag === "BTC Only"
                          ? "border-orange-500/40 text-orange-300 bg-orange-500/10"
                          : tag === "Any Asset"
                          ? "border-cyan-500/40 text-cyan-300 bg-cyan-500/10"
                          : "border-blue-500/30 text-blue-300/80 bg-blue-500/5"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-gray-400 text-xs leading-relaxed flex-1">
                {ind.description}
              </p>

              <a
                href={ind.scriptUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-sm font-semibold bg-blue-500/10 border border-blue-500/40 text-blue-300 hover:bg-blue-500/20 hover:text-blue-200 transition-colors"
              >
                Add to chart on TradingView →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
