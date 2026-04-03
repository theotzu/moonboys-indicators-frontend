import { TradingViewWidget, TradingViewTicker } from "@/components/TradingViewWidget";
import Link from "next/link";

// Featured indicators — update symbols and descriptions as needed
const INDICATORS = [
  {
    id: "btc",
    label: "BTC/USDT",
    symbol: "BINANCE:BTCUSDT",
    description: "Bitcoin dominance and trend structure",
  },
  {
    id: "eth",
    label: "ETH/USDT",
    symbol: "BINANCE:ETHUSDT",
    description: "Ethereum momentum & key levels",
  },
  {
    id: "sol",
    label: "SOL/USDT",
    symbol: "BINANCE:SOLUSDT",
    description: "Solana breakout zones",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Ticker tape */}
      <div className="border-b border-yellow-500/20">
        <TradingViewTicker />
      </div>

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center min-h-[60vh] text-center px-6 py-24 overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-yellow-500/10 blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 mb-6 text-xs font-semibold tracking-widest uppercase text-yellow-400 border border-yellow-500/40 rounded-full bg-yellow-500/10">
            Moon Boys Podcast
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-none tracking-tight mb-6">
            We&apos;re All Going{" "}
            <span className="text-yellow-400">To The Moon 🌙</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
            Free and premium crypto indicators built by degens, for degens.
            Live charts, on-chain signals, and market structure breakdowns — all
            in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#indicators"
              className="px-8 py-3 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-300 transition-colors"
            >
              View Indicators
            </a>
            <Link
              href="/subscribe"
              className="px-8 py-3 border border-yellow-500/50 text-yellow-400 font-bold rounded-lg hover:bg-yellow-500/10 transition-colors"
            >
              Get Premium Access
            </Link>
          </div>
        </div>
      </section>

      {/* Indicators Section */}
      <section id="indicators" className="px-6 py-20 max-w-7xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Live <span className="text-yellow-400">Indicators</span>
          </h2>
          <p className="text-gray-400">
            Real-time charts powered by TradingView — updated every candle.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {INDICATORS.map((indicator) => (
            <div
              key={indicator.id}
              className="rounded-xl border border-yellow-500/20 bg-gray-900/50 overflow-hidden"
            >
              <div className="px-4 py-3 border-b border-yellow-500/20 flex items-center gap-3">
                <span className="text-yellow-400 font-bold">{indicator.label}</span>
                <span className="text-gray-500 text-sm">{indicator.description}</span>
              </div>
              <TradingViewWidget symbol={indicator.symbol} height={450} />
            </div>
          ))}
        </div>
      </section>

      {/* CTA — Premium */}
      <section className="px-6 py-24 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready for <span className="text-yellow-400">Premium Signals?</span>
          </h2>
          <p className="text-gray-400 mb-8">
            Connect your wallet and subscribe on-chain to unlock our full suite
            of paid indicators. Base network — low fees, fast transactions.
          </p>
          <Link
            href="/subscribe"
            className="inline-block px-10 py-4 bg-yellow-400 text-black font-bold text-lg rounded-lg hover:bg-yellow-300 transition-colors"
          >
            Subscribe Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-yellow-500/20 px-6 py-8 text-center text-gray-500 text-sm">
        <p>
          © {new Date().getFullYear()} Moon Boys Podcast. Not financial advice.
        </p>
      </footer>
    </>
  );
}
