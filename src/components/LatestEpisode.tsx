// Server component — fetches the most recent long-form Moon Boys episode by
// scraping the channel's /videos tab (which naturally excludes Shorts — those
// live on /shorts). Title resolved via YouTube oEmbed. Revalidates hourly.
//
// Why not RSS? youtube.com/feeds/videos.xml is currently 404'ing for this
// channel — known YouTube quirk, not in our control. Scraping /videos is the
// reliable workaround.

const CHANNEL_HANDLE = "MoonBoysPodcast";
const FALLBACK = {
  id: "bEh5uyno4v4",
  title: "Major Market CRASH incoming | Moon Boys Alert!",
};

interface Episode {
  id: string;
  title: string;
}

async function getLatestEpisode(): Promise<Episode> {
  try {
    const res = await fetch(
      `https://www.youtube.com/@${CHANNEL_HANDLE}/videos`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return FALLBACK;
    const html = await res.text();
    const idMatch = html.match(/"videoId":"([a-zA-Z0-9_-]{11})"/);
    if (!idMatch) return FALLBACK;
    const id = idMatch[1];

    const titleRes = await fetch(
      `https://www.youtube.com/oembed?url=https://youtu.be/${id}&format=json`,
      { next: { revalidate: 3600 } },
    );
    if (!titleRes.ok) return { id, title: FALLBACK.title };
    const titleData = (await titleRes.json()) as { title?: string };
    return { id, title: titleData.title ?? FALLBACK.title };
  } catch {
    return FALLBACK;
  }
}

export async function LatestEpisode() {
  const ep = await getLatestEpisode();

  return (
    <section
      id="podcast"
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
