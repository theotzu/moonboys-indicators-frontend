/**
 * The indicators, as data.
 *
 * Lifted out of IndicatorChart when the home page stopped carrying the full
 * section (2026-09-05). Two places now need to know what the indicators ARE —
 * the cards on /free-stuff and the teaser on the home page — and a list that
 * lives inside one component cannot be read by the other without importing a
 * component to get at its constants.
 */
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
export const INDICATORS = [
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
    // "BTC Only" came off 2026-09-05 — Theo: "i dont think production cost
    // indicator is 'btc only' anymore." The description still says what it
    // measures, which is Bitcoin's cost of production; the tag was claiming the
    // SCRIPT only runs on BTC, and that is the part that stopped being true.
    tags: ["On-Chain", "Mining"],
    image: "/indicators/btc-production-cost.png",
  },
  {
    id: "liquidation-heatmap",
    label: "BTC Liquidation Heatmap",
    description:
      "Heat-mapped futures liquidation zones from Binance & Bybit OI. Green = long liq zones, purple = short liq zones. ⚡ marks the highest-significance levels to watch.",
    scriptUrl: "https://www.tradingview.com/script/L5TplYwb-Moon-Boys-BTC-Liquidation-Heatmap/",
    author: "VickzinBK",
    // "BTC Only" came off here too, 2026-09-05 — Theo: "i dont think that is
    // just for btc only anymore either." Same distinction as the production
    // cost card above: the LABEL still says BTC because that is what the script
    // is called and what it is tuned for; the tag was a claim about where it
    // will run, and that is the part that stopped being true.
    tags: ["Liquidations", "Futures OI"],
    image: "/indicators/liquidation-heatmap.png",
  },
];

export type Indicator = (typeof INDICATORS)[number];
