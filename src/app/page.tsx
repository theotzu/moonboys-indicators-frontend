import { TradingViewTicker } from "@/components/TradingViewWidget";
import { IndicatorChart } from "@/components/IndicatorChart";
import { HostsSection, GuestsSection } from "@/components/CastSection";
import { NFTSection } from "@/components/NFTSection";
import { SOCIAL_LINKS, PODCAST_PLATFORMS } from "@/lib/socials";

export default function HomePage() {
  return (
    <>
      {/* Ticker tape */}
      <div className="border-b border-purple-500/20">
        <TradingViewTicker />
      </div>

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center min-h-[50vh] text-center px-6 py-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-500/15 blur-[120px]" />
          <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-teal-500/10 blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-none tracking-tight mb-6">
            Moon Boys{" "}
            <span className="bg-gradient-to-r from-purple-300 to-teal-300 bg-clip-text text-transparent">Podcast</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-xl mx-auto mb-4 leading-relaxed">
            Crypto trading talk and market analysis — live on Twitch and X.
          </p>
          <p className="text-gray-500 text-base max-w-xl mx-auto mb-10 leading-relaxed">
            Plus open-source indicators we built and ship for free on TradingView.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.youtube.com/@MoonBoysPodcast"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-purple-500 text-white font-bold rounded-lg hover:bg-purple-400 transition-colors"
            >
              Watch the Podcast
            </a>
            <a
              href="#indicators"
              className="px-8 py-3 border border-teal-400/60 text-teal-300 font-bold rounded-lg hover:bg-teal-500/10 transition-colors"
            >
              See Our Indicators
            </a>
          </div>
        </div>
      </section>

      {/* Podcast Section */}
      <section id="podcast" className="px-6 py-16 max-w-4xl mx-auto w-full text-center border-t border-purple-500/10">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          The <span className="text-purple-300">Podcast</span>
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto mb-8 leading-relaxed">
          Markets, charts, and unfiltered crypto takes. We go live on Twitch and X —
          and post the recordings on YouTube.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {PODCAST_PLATFORMS.map((p) => (
            <a
              key={p.label}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-purple-500/40 bg-purple-500/5 text-purple-300 font-semibold hover:bg-purple-500/15 transition-colors"
            >
              <i className={p.icon} aria-hidden="true"></i>
              <span>Watch on {p.label}</span>
            </a>
          ))}
        </div>
      </section>

      {/* Indicators Section */}
      <section id="indicators" className="px-6 py-16 max-w-6xl mx-auto w-full border-t border-purple-500/10">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Our <span className="text-teal-300">Indicators</span>
          </h2>
          <p className="text-gray-400 text-sm max-w-xl mx-auto">
            Open-source Pine Script™ tools published on TradingView — free for everyone.
          </p>
        </div>

        <IndicatorChart />
      </section>

      <HostsSection />

      <GuestsSection />

      <NFTSection />

      {/* Footer */}
      <footer className="border-t border-purple-500/20 px-6 py-10 mt-12">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-6">
          <div className="flex flex-wrap justify-center gap-2">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex items-center justify-center w-10 h-10 rounded-full text-gray-400 hover:text-purple-300 hover:bg-purple-500/10 transition-colors text-base"
              >
                <i className={s.icon} aria-hidden="true"></i>
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
