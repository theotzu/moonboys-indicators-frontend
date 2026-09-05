import { TradingViewTicker } from "@/components/TradingViewWidget";
import Link from "next/link";
import { INDICATORS } from "@/lib/indicators";
import { TOOLS } from "@/components/StreamerTools";
import { HostsSection, GuestsSection } from "@/components/CastSection";
import { NFTSection } from "@/components/NFTSection";
import { LatestEpisode } from "@/components/LatestEpisode";
import { SOCIAL_LINKS } from "@/lib/socials";

export default function HomePage() {
  return (
    <>
      {/* Ticker tape */}
      <div className="border-b border-blue-500/20">
        <TradingViewTicker />
      </div>

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center min-h-[50vh] text-center px-6 py-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-500/15 blur-[120px]" />
          <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-none tracking-tight mb-6">
            Moon Boys{" "}
            <span className="bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">Podcast</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-xl mx-auto mb-4 leading-relaxed">
            Crypto trading talk and market analysis — live on Twitch and X.
          </p>
          <p className="text-gray-500 text-base max-w-xl mx-auto mb-10 leading-relaxed">
            Plus open-source TradingView indicators and streaming tools we built — all free.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.youtube.com/@MoonBoysPodcast"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-400 transition-colors"
            >
              Watch the Podcast
            </a>
            <a
              href="#free-stuff"
              className="px-8 py-3 border border-cyan-400/60 text-cyan-300 font-bold rounded-lg hover:bg-cyan-500/10 transition-colors"
            >
              See the Free Stuff
            </a>
          </div>
        </div>
      </section>

      <LatestEpisode />

      {/*
        A TEASER, NOT THE SECTION. Theo, 2026-09-05: "maybe lets have a breakout
        page called 'Free Stuff' that we can go into. instead of having all the
        indicators on the front page."

        The cards moved to /free-stuff. What stays here is every name, linked —
        which is the point of keeping anything at all. This page is titled "Free
        Crypto Trading Indicators", and the four cards were the only thing on it
        backing that up; moving them wholesale would have left the claim with
        nothing under it. Names and a link cost one screen instead of four and
        keep the page about what it says it is.

        #indicators stays as an anchor here AND on /free-stuff, so an old link
        lands somewhere sensible either way.
      */}
      <section id="free-stuff" className="px-6 py-16 max-w-6xl mx-auto w-full border-t border-blue-500/10">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Free <span className="text-cyan-300">Stuff</span>
          </h2>
          <p className="text-gray-400 text-sm max-w-xl mx-auto">
            Everything we build, given away — no signup, no paywall.
          </p>
        </div>

        <div id="indicators" className="grid grid-cols-1 sm:grid-cols-2 gap-3 scroll-mt-24">
          {INDICATORS.map((ind) => (
            <Link
              key={ind.id}
              href={`/free-stuff#indicators`}
              className="flex items-center justify-between gap-3 rounded-lg border border-blue-500/20 bg-[#0f1729]/60 px-4 py-3 hover:border-blue-500/40 hover:bg-[#0f1729] transition-colors"
            >
              <span className="text-sm font-semibold text-white">{ind.label}</span>
              <span className="text-xs text-gray-500 shrink-0">{ind.tags[0]}</span>
            </Link>
          ))}
          {TOOLS.map((tool) => (
            <Link
              key={tool.id}
              href="/free-stuff#streamer-widgets"
              className="flex items-center justify-between gap-3 rounded-lg border border-cyan-500/25 bg-[#0f1729]/60 px-4 py-3 hover:border-cyan-500/50 hover:bg-[#0f1729] transition-colors"
            >
              <span className="text-sm font-semibold text-white">{tool.label}</span>
              <span className="text-xs text-cyan-300/80 shrink-0">Streamer widget</span>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/free-stuff"
            className="inline-block px-8 py-3 border border-cyan-400/60 text-cyan-300 font-bold rounded-lg hover:bg-cyan-500/10 transition-colors"
          >
            See all the free stuff →
          </Link>
        </div>
      </section>

      <HostsSection />

      <GuestsSection />

      <NFTSection />

      {/* Footer */}
      <footer className="border-t border-blue-500/20 px-6 py-10 mt-12">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-6">
          <div className="flex flex-wrap justify-center gap-2">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex items-center justify-center w-10 h-10 rounded-full text-gray-400 hover:text-blue-300 hover:bg-blue-500/10 transition-colors text-base"
              >
                {s.svgPath ? (
                  // Sized below 1em: a full-bleed 24x24 brand mark reads heavier
                  // than a Font Awesome glyph at the same box, so 14px matches
                  // the optical weight of its neighbours.
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width="14"
                    height="14"
                    aria-hidden="true"
                  >
                    <path d={s.svgPath} />
                  </svg>
                ) : (
                  <i className={s.icon} aria-hidden="true"></i>
                )}
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
