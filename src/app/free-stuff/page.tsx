import type { Metadata } from "next";
import Link from "next/link";
import { IndicatorChart } from "@/components/IndicatorChart";
import { StreamerTools } from "@/components/StreamerTools";

/**
 * /free-stuff — everything the show gives away, on its own page.
 *
 * Theo, 2026-09-05: "maybe lets have a breakout page called 'Free Stuff' that
 * we can go into. instead of having all the indicators on the front page."
 *
 * The home page keeps a short teaser naming all of it and linking here; the
 * cards, the screenshots and the descriptions live here. That was the deciding
 * factor when the options were put to him — moving it wholesale would leave the
 * home page with no indicator content on it at all, and the home page is
 * titled "Free Crypto Trading Indicators".
 */
export const metadata: Metadata = {
  title: "Free Stuff | Moon Boys Podcast",
  description:
    "Free open-source TradingView indicators and streaming widgets from the Moon Boys Podcast — trend regimes, mining cost floors, liquidation heatmaps, capital flow, and a stream countdown overlay for OBS. No signup, no paywall.",
  alternates: { canonical: "/free-stuff" },
  openGraph: {
    title: "Free Stuff | Moon Boys Podcast",
    description:
      "Free TradingView indicators and streaming widgets from the Moon Boys Podcast.",
    url: "/free-stuff",
  },
  twitter: {
    title: "Free Stuff | Moon Boys Podcast",
    description:
      "Free TradingView indicators and streaming widgets from the Moon Boys Podcast.",
  },
};

export default function FreeStuffPage() {
  return (
    <main className="flex flex-col min-h-screen pt-20">
      <section className="px-6 pt-12 pb-6 max-w-6xl mx-auto w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">
            Free <span className="text-cyan-300">Stuff</span>
          </h1>
          <p className="text-gray-400 text-sm max-w-xl mx-auto">
            Everything we build, given away — no signup, no paywall.
          </p>
        </div>

        {/*
          Indicators first and under their own heading. They are what the site
          is known for, and /#indicators used to point at them — the anchor is
          kept here so an old link lands on the right group rather than the top
          of a page it has never seen.
        */}
        <div id="indicators" className="scroll-mt-24">
          <h2 className="text-2xl font-bold mb-1">Indicators</h2>
          <p className="text-gray-500 text-xs mb-5">
            Open-source Pine Script™ tools published on TradingView.
          </p>
          <IndicatorChart />
        </div>

        <div id="streamer-widgets" className="mt-16 scroll-mt-24">
          <h2 className="text-2xl font-bold mb-5">Streamer widgets</h2>
          <StreamerTools />
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
          >
            ← Back to the podcast
          </Link>
        </div>
      </section>
    </main>
  );
}
