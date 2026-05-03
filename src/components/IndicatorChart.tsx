"use client";

import { useState } from "react";
import Image from "next/image";
import { TradingViewWidget } from "./TradingViewWidget";

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
    btcOnly: false,
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
    btcOnly: false,
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
    btcOnly: true,
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
    btcOnly: true,
    description:
      "Heat-mapped futures liquidation zones from Binance & Bybit OI. Green = long liq zones, purple = short liq zones. ⚡ marks the highest-significance levels to watch.",
    scriptUrl: "https://www.tradingview.com/script/L5TplYwb-Moon-Boys-BTC-Liquidation-Heatmap/",
    author: "VickzinBK",
    tags: ["Liquidations", "Futures OI", "BTC Only"],
    image: "/indicators/liquidation-heatmap.png",
  },
];

const SYMBOLS = [
  { label: "BTC", value: "COINBASE:BTCUSD" },
  { label: "ETH", value: "COINBASE:ETHUSD" },
  { label: "SOL", value: "COINBASE:SOLUSD" },
  { label: "BNB", value: "BINANCE:BNBUSDT" },
];

export function IndicatorChart() {
  const [symbol, setSymbol] = useState("COINBASE:BTCUSD");

  const isBtc =
    symbol.startsWith("COINBASE:BTC") ||
    symbol.startsWith("BINANCE:BTC") ||
    symbol.startsWith("BITSTAMP:BTC");

  return (
    <div className="space-y-6">
      {/* Asset switcher */}
      <div className="flex items-center gap-3">
        <span className="text-gray-500 text-sm font-medium shrink-0">Asset:</span>
        <div className="flex gap-1.5 flex-wrap">
          {SYMBOLS.map((s) => (
            <button
              key={s.value}
              onClick={() => setSymbol(s.value)}
              aria-pressed={symbol === s.value}
              className={`min-h-11 min-w-11 px-4 py-2.5 rounded-md text-sm font-semibold transition-colors ${
                symbol === s.value
                  ? "bg-yellow-400 text-black"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Live chart */}
      <div className="rounded-xl border border-yellow-500/20 overflow-hidden">
        <TradingViewWidget symbol={symbol} height={520} />
      </div>

      {/* Note about adding indicators */}
      <div className="flex items-start gap-3 px-4 py-3 rounded-lg bg-yellow-500/5 border border-yellow-500/20 text-sm text-gray-400">
        <span className="text-yellow-400 text-base mt-0.5 shrink-0">ℹ</span>
        <span>
          Our indicators are Pine Script™ tools published on TradingView. To use them, click
          &ldquo;Add to chart&rdquo; on any card below — they&apos;ll open directly in TradingView
          where you can apply them to any chart you like.
        </span>
      </div>

      {/* Indicator cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {INDICATORS.map((ind) => {
          const hidden = ind.btcOnly && !isBtc;
          return (
            <div
              key={ind.id}
              className={`rounded-xl border overflow-hidden flex flex-col transition-opacity ${
                hidden
                  ? "border-gray-800 bg-gray-900/30 opacity-40"
                  : "border-yellow-500/20 bg-gray-900/50"
              }`}
            >
              {/* Screenshot preview */}
              <div className="relative w-full aspect-video bg-gray-900 border-b border-yellow-500/10">
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
                            ? "border-orange-500/40 text-orange-400/80 bg-orange-500/10"
                            : tag === "Any Asset"
                            ? "border-green-500/40 text-green-400/80 bg-green-500/10"
                            : "border-yellow-500/20 text-yellow-400/60 bg-yellow-500/5"
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
                className={`mt-auto flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-sm font-semibold transition-colors ${
                  hidden
                    ? "bg-gray-800 text-gray-600 cursor-not-allowed pointer-events-none"
                    : "bg-yellow-400/10 border border-yellow-500/40 text-yellow-400 hover:bg-yellow-400/20"
                }`}
              >
                Add to chart on TradingView →
              </a>

              {hidden && (
                <p className="text-xs text-orange-300 text-center mt-2 font-medium">
                  ↑ Switch to BTC above to enable
                </p>
              )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

