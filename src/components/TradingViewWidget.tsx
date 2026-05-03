"use client";

import { useEffect, useRef } from "react";

interface TradingViewWidgetProps {
  symbol?: string;
  theme?: "dark" | "light";
  height?: number;
  studies?: string[];
}

/**
 * Embeds a TradingView Advanced Chart widget.
 * symbol format: "EXCHANGE:PAIR" e.g. "COINBASE:BTCUSD"
 * studies format: published script IDs prefixed with "PUB;" e.g. ["PUB;5xZSUQ3b"]
 */
export function TradingViewWidget({
  symbol = "COINBASE:BTCUSD",
  theme = "dark",
  height = 500,
  studies = [],
}: TradingViewWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const studiesKey = studies.join(",");

  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;

    const config: Record<string, unknown> = {
      autosize: true,
      symbol,
      interval: "D",
      timezone: "Etc/UTC",
      theme,
      style: "1",
      locale: "en",
      hide_side_toolbar: false,
      allow_symbol_change: false,
      save_image: false,
      calendar: false,
      hide_volume: false,
      support_host: "https://www.tradingview.com",
    };

    if (studies.length > 0) {
      config.studies = studies;
    }

    script.innerHTML = JSON.stringify(config);
    containerRef.current.appendChild(script);

    const node = containerRef.current;
    return () => {
      if (node) node.innerHTML = "";
    };
    // studiesKey is the serialised studies array — safe dep for comparison
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [symbol, theme, studiesKey]);

  return (
    <div
      className="tradingview-widget-container"
      style={{ height, width: "100%" }}
    >
      <div
        ref={containerRef}
        className="tradingview-widget-container__widget"
        style={{ height: "100%", width: "100%" }}
      />
    </div>
  );
}

/** Lightweight ticker tape for the top of the page */
export function TradingViewTicker() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        { proName: "COINBASE:BTCUSD",   title: "BTC" },
        { proName: "COINBASE:ETHUSD",   title: "ETH" },
        { proName: "BINANCE:BNBUSDT",   title: "BNB" },
        { proName: "COINBASE:SOLUSD",   title: "SOL" },
        { proName: "BINANCE:XRPUSDT",   title: "XRP" },
        { proName: "COINBASE:DOGEUSD",  title: "DOGE" },
        { proName: "COINBASE:ADAUSD",   title: "ADA" },
        { proName: "COINBASE:AVAXUSD",  title: "AVAX" },
        { proName: "COINBASE:XLMUSD",   title: "XLM" },
        { proName: "BINANCE:TRXUSDT",   title: "TRX" },
      ],
      showSymbolLogo: true,
      isTransparent: true,
      displayMode: "compact",
      colorTheme: "dark",
      locale: "en",
    });

    containerRef.current.appendChild(script);

    const node = containerRef.current;
    return () => {
      if (node) node.innerHTML = "";
    };
  }, []);

  return (
    <div className="tradingview-widget-container w-full overflow-hidden">
      <div ref={containerRef} className="tradingview-widget-container__widget" />
    </div>
  );
}
