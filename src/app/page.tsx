import { TradingViewTicker } from "@/components/TradingViewWidget";
import { IndicatorChart } from "@/components/IndicatorChart";
import { SOCIAL_LINKS } from "@/lib/socials";

export default function HomePage() {
  return (
    <>
      {/* Ticker tape */}
      <div className="border-b border-yellow-500/20">
        <TradingViewTicker />
      </div>

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center min-h-[50vh] text-center px-6 py-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-yellow-500/10 blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 mb-6 text-xs font-semibold tracking-widest uppercase text-yellow-400 border border-yellow-500/40 rounded-full bg-yellow-500/10">
            Moon Boys Podcast
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-none tracking-tight mb-6">
            We&apos;re All Going{" "}
            <span className="text-yellow-400">To The Moon 🌙</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
            Trend regimes, mining cost floors, liquidation heatmaps, and
            capital flow — all open-source and free on TradingView.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#indicators"
              className="px-8 py-3 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-300 transition-colors"
            >
              View Indicators
            </a>
            <a
              href="https://discord.com/invite/8qf3PTuzYw"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border border-yellow-500/50 text-yellow-400 font-bold rounded-lg hover:bg-yellow-500/10 transition-colors"
            >
              Join the Discord
            </a>
          </div>
        </div>
      </section>

      {/* Indicators Section */}
      <section id="indicators" className="px-6 py-16 max-w-6xl mx-auto w-full">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Our <span className="text-yellow-400">Indicators</span>
          </h2>
          <p className="text-gray-400 text-sm">
            Open-source Pine Script™ tools published on TradingView — free for everyone.
          </p>
        </div>

        <IndicatorChart />
      </section>

      {/* Community Section */}
      <section className="px-6 py-24 border-t border-yellow-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Join the <span className="text-yellow-400">Community</span>
          </h2>
          <p className="text-gray-400 mb-12 max-w-lg mx-auto">
            We&apos;re live on YouTube, posting charts on X, and talking in Discord every
            day. Come hang with the Moon Boys.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 px-4 py-5 rounded-xl border border-yellow-500/20 bg-gray-900/50 hover:border-yellow-400/50 hover:bg-yellow-500/5 transition-all group"
              >
                <span className="text-2xl" aria-hidden="true">{s.icon}</span>
                <span className="text-sm font-medium text-gray-300 group-hover:text-yellow-400 transition-colors">
                  {s.label}
                </span>
              </a>
            ))}
          </div>

          <a
            href="https://substack.com/@moonmag"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-yellow-400/10 border border-yellow-500/30 text-yellow-400 font-semibold hover:bg-yellow-400/20 transition-colors"
          >
            📬 Sign up for the Moon Boys Newsletter
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-yellow-500/20 px-6 py-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="text-xl">🌙</span>
            <span className="text-yellow-400 font-bold">Moon Boys Podcast</span>
          </div>

          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-yellow-400 transition-colors text-sm"
              >
                {s.label}
              </a>
            ))}
          </div>

          <p className="text-gray-500 text-xs text-center">
            © {new Date().getFullYear()} Moon Boys. Not financial advice.
          </p>
        </div>
      </footer>
    </>
  );
}


