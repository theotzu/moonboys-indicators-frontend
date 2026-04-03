"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";

interface TradingViewWidgetProps {
  symbol?: string;
  theme?: "dark" | "light";
  height?: number;
  widgetType?: "chart" | "ticker" | "mini-chart";
}

/**
 * Embeds a TradingView chart widget.
 * symbol format: "EXCHANGE:PAIR" e.g. "BINANCE:BTCUSDT"
 */
export function TradingViewWidget({
  symbol = "BINANCE:BTCUSDT",
  theme = "dark",
  height = 400,
  widgetType = "chart",
}: TradingViewWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous widget
    containerRef.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol,
      interval: "D",
      timezone: "Etc/UTC",
      theme,
      style: "1",
      locale: "en",
      hide_side_toolbar: false,
      allow_symbol_change: true,
      save_image: false,
      calendar: false,
      hide_volume: false,
      support_host: "https://www.tradingview.com",
    });

    containerRef.current.appendChild(script);
    scriptRef.current = script;

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [symbol, theme]);

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
        { proName: "BINANCE:BTCUSDT", title: "BTC/USDT" },
        { proName: "BINANCE:ETHUSDT", title: "ETH/USDT" },
        { proName: "BINANCE:SOLUSDT", title: "SOL/USDT" },
        { proName: "BINANCE:BNBUSDT", title: "BNB/USDT" },
        { proName: "COINBASE:BASEUSD", title: "BASE/USD" },
      ],
      showSymbolLogo: true,
      isTransparent: true,
      displayMode: "adaptive",
      colorTheme: "dark",
      locale: "en",
    });

    containerRef.current.appendChild(script);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <div className="tradingview-widget-container w-full overflow-hidden">
      <div ref={containerRef} className="tradingview-widget-container__widget" />
    </div>
  );
}
