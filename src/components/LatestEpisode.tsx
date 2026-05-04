// Server component — fetches the Moon Boys YouTube RSS feed and embeds the
// most recent non-Shorts episode. Revalidates hourly so the page stays fresh
// without a redeploy. Falls back to a hardcoded video if the fetch fails.

const CHANNEL_ID = "UCUC6FnxuxRncfBNmYwJx5Eg";
const FALLBACK = {
  id: "d_AJeG_iI8Y",
  title: "Latest Moon Boys episode",
};

interface Episode {
  id: string;
  title: string;
}

function decodeEntities(s: string) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n, 10)));
}

async function getLatestEpisode(): Promise<Episode> {
  try {
    const res = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return FALLBACK;
    const xml = await res.text();
    const entries = xml.matchAll(/<entry>([\s\S]+?)<\/entry>/g);
    for (const match of entries) {
      const block = match[1];
      const titleMatch = block.match(/<title>([^<]+)<\/title>/);
      const idMatch = block.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
      if (!titleMatch || !idMatch) continue;
      const title = decodeEntities(titleMatch[1]);
      if (/#shorts/i.test(title)) continue;
      return { id: idMatch[1], title };
    }
    return FALLBACK;
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
