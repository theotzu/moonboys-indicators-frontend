// Server component — renders the most recent Moon Boys episode, livestreams
// included. All the resolution logic (and the reasoning behind it) lives in
// src/lib/latestEpisode.ts.

import { getLatestEpisode } from "@/lib/latestEpisode";

export async function LatestEpisode() {
  const ep = await getLatestEpisode();

  return (
    <section
      id="podcast"
      data-episode-id={ep.id}
      data-episode-source={ep.source}
      className="px-6 py-16 max-w-5xl mx-auto w-full text-center border-t border-blue-500/10"
    >
      <div className="mb-6">
        <p className="text-cyan-300 text-xs font-bold uppercase tracking-widest mb-2">
          Latest Episode
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-white max-w-3xl mx-auto leading-tight">
          {ep.title}
        </h2>
      </div>

      {ep.stale && (
        <p
          role="status"
          className="mb-6 mx-auto max-w-xl rounded-lg border border-amber-400/40 bg-amber-400/10 px-4 py-3 text-sm text-amber-200"
        >
          We couldn&apos;t reach YouTube just now, so this is the last episode we
          have on file.{" "}
          <a
            href="https://www.youtube.com/@MoonBoysPodcast/streams"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 font-semibold hover:text-amber-100"
          >
            See the newest on YouTube
          </a>
          .
        </p>
      )}

      <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-blue-500/30 bg-[#0f1729] shadow-lg shadow-blue-500/10">
        <iframe
          src={`https://www.youtube.com/embed/${ep.id}?rel=0`}
          title={ep.title}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>

      <div className="mt-6">
        <a
          href="https://www.youtube.com/@MoonBoysPodcast/streams"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-blue-300 hover:text-blue-200 text-sm font-semibold"
        >
          Watch all episodes on YouTube →
        </a>
      </div>
    </section>
  );
}
