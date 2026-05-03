"use client";

import { useEffect, useRef } from "react";

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
