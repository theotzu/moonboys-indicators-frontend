// Resolves the most recent Moon Boys episode for the site hero.
//
// WHY THIS IS NOT A FEED
// ----------------------
// YouTube's per-channel Atom feed (youtube.com/feeds/videos.xml) has 404'd /
// 500'd for our channels while the channel's own HTML pages answered 200 — it
// is not a dependable source. Separately, a channel's *uploads* listing
// (/videos) does NOT include past live streams: a show that goes live has
// episodes that simply never appear there. That combination is what made this
// section show a 10-day-old upload while a 3-day-old livestream sat unlisted.
//
// SOURCE OF TRUTH: the channel-curated "Moon Boys Podcast" playlist. It is
// editorially controlled, it contains livestreams and standard uploads alike,
// and it excludes anything the channel doesn't add.
//
// SHORTS ARE EXCLUDED AT EVERY TIER:
//   tier 1 (playlist) — items <= SHORT_MAX_SECONDS are dropped
//   tier 2 (/streams) — the streams tab structurally contains no Shorts
//   tier 3 (/videos)  — the uploads tab structurally contains no Shorts
//   tier 4 (floor)    — a pinned long-form video
//
// FAILURES ARE LOUD: every tier that fails logs, and if we fall through to the
// hardcoded floor the caller renders a visible warning instead of silently
// showing stale content forever.

export const PLAYLIST_ID = "PLGcPf3I2HipUDWN66CzUKqrWDRptDujFA"; // "Moon Boys Podcast"
export const CHANNEL_HANDLE = "MoonBoysPodcast";

/** Anything this short is a Short, not an episode. */
const SHORT_MAX_SECONDS = 190;

/** How many playlist entries to consider when picking the newest. */
const CANDIDATE_WINDOW = 30;

const REVALIDATE_SECONDS = 1800; // 30 min — a stream that ends appears quickly

/** Last-known-good long-form episode. A floor, never the primary source. */
const FLOOR: Episode = {
  id: "O14lP_RYPlQ",
  title: "DeFi Summer Is Here: New Moon Boys Indicators Reveal What's Next",
  source: "floor",
  stale: true,
};

export type EpisodeSource = "playlist" | "streams" | "videos" | "floor";

export interface Episode {
  id: string;
  title: string;
  source: EpisodeSource;
  /** True only when every live source failed and we're serving the floor. */
  stale: boolean;
}

interface Candidate {
  id: string;
  title: string;
  durationSeconds: number | null;
  ageSeconds: number | null;
}

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

async function getHtml(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      headers: { "user-agent": UA, "accept-language": "en-US,en;q=0.9" },
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) {
      console.error(`[latestEpisode] ${url} -> HTTP ${res.status}`);
      return null;
    }
    return await res.text();
  } catch (err) {
    console.error(`[latestEpisode] ${url} threw`, err);
    return null;
  }
}

/** Pull the ytInitialData blob out of a YouTube HTML page. */
function parseInitialData(html: string): unknown | null {
  // No /s flag — tsconfig targets ES2017, where dotAll isn't available.
  const m = html.match(/ytInitialData\s*=\s*(\{[\s\S]+?\})\s*;\s*<\/script>/);
  if (!m) return null;
  try {
    return JSON.parse(m[1]);
  } catch {
    return null;
  }
}

/** "1:17:24" / "12:03" -> seconds. */
function durationToSeconds(text: string | undefined): number | null {
  if (!text) return null;
  const parts = text.trim().split(":");
  if (parts.length < 2 || parts.length > 3) return null;
  if (!parts.every((p) => /^\d+$/.test(p))) return null;
  return parts.reduce((acc, p) => acc * 60 + Number(p), 0);
}

const AGE_UNITS: Record<string, number> = {
  second: 1,
  minute: 60,
  hour: 3600,
  day: 86400,
  week: 604800,
  month: 2629800,
  year: 31557600,
};

/** "Streamed 3 days ago" / "2 weeks ago" -> approximate age in seconds. */
function relativeAgeToSeconds(text: string | undefined): number | null {
  if (!text) return null;
  const m = text.match(
    /(\d+)\s+(second|minute|hour|day|week|month|year)s?\s+ago/i,
  );
  if (!m) return null;
  return Number(m[1]) * AGE_UNITS[m[2].toLowerCase()];
}

/**
 * Walk ytInitialData collecting `lockupViewModel` entries — the renderer
 * YouTube currently uses for playlist/podcast items.
 */
function collectCandidates(data: unknown): Candidate[] {
  const out: Candidate[] = [];
  const seen = new Set<string>();

  const visit = (node: unknown): void => {
    if (Array.isArray(node)) {
      for (const child of node) visit(child);
      return;
    }
    if (!node || typeof node !== "object") return;

    const obj = node as Record<string, unknown>;
    const lockup = obj.lockupViewModel as Record<string, unknown> | undefined;

    if (lockup && typeof lockup.contentId === "string") {
      const id = lockup.contentId;
      // Video ids are 11 chars; anything else here is a nested playlist.
      if (/^[a-zA-Z0-9_-]{11}$/.test(id) && !seen.has(id)) {
        seen.add(id);
        const blob = JSON.stringify(lockup);

        const titleMatch = blob.match(/"title":\{"content":"((?:[^"\\]|\\.)*)"/);
        const title = titleMatch
          ? JSON.parse(`"${titleMatch[1]}"`)
          : "Moon Boys Podcast";

        const durMatch = blob.match(/"text":"(\d{1,2}:\d{2}(?::\d{2})?)"/);
        const ageMatch = blob.match(
          /"content":"([^"]*\b\d+\s+(?:second|minute|hour|day|week|month|year)s?\s+ago)"/i,
        );

        out.push({
          id,
          title,
          durationSeconds: durationToSeconds(durMatch?.[1]),
          ageSeconds: relativeAgeToSeconds(ageMatch?.[1]),
        });
      }
    }

    for (const value of Object.values(obj)) visit(value);
  };

  visit(data);
  return out;
}

/** Tier 1 — the curated playlist. */
async function fromPlaylist(): Promise<Episode | null> {
  const html = await getHtml(
    `https://www.youtube.com/playlist?list=${PLAYLIST_ID}`,
  );
  if (!html) return null;

  const data = parseInitialData(html);
  if (!data) {
    console.error("[latestEpisode] playlist: no ytInitialData");
    return null;
  }

  const all = collectCandidates(data);
  if (all.length === 0) {
    console.error("[latestEpisode] playlist: parsed 0 items");
    return null;
  }

  // Shorts filter. Unknown duration is kept — the playlist is curated and a
  // missing badge shouldn't drop a real episode.
  const episodes = all
    .slice(0, CANDIDATE_WINDOW)
    .filter(
      (c) => c.durationSeconds === null || c.durationSeconds > SHORT_MAX_SECONDS,
    );
  if (episodes.length === 0) {
    console.error("[latestEpisode] playlist: every candidate looked like a Short");
    return null;
  }

  // Prefer the genuinely newest entry rather than trusting playlist order, so
  // a manual reorder can't pin the hero to an old episode.
  const dated = episodes.filter((c) => c.ageSeconds !== null);
  const pick = dated.length
    ? dated.reduce((a, b) => (b.ageSeconds! < a.ageSeconds! ? b : a))
    : episodes[0];

  return { id: pick.id, title: pick.title, source: "playlist", stale: false };
}

/** Tiers 2 & 3 — channel tabs. Neither tab ever contains Shorts. */
async function fromChannelTab(
  tab: "streams" | "videos",
): Promise<Episode | null> {
  const html = await getHtml(
    `https://www.youtube.com/@${CHANNEL_HANDLE}/${tab}`,
  );
  if (!html) return null;

  const idMatch = html.match(/"videoId":"([a-zA-Z0-9_-]{11})"/);
  if (!idMatch) {
    console.error(`[latestEpisode] ${tab}: no videoId in page`);
    return null;
  }
  const id = idMatch[1];
  const title = (await fetchOembedTitle(id)) ?? FLOOR.title;
  return { id, title, source: tab, stale: false };
}

async function fetchOembedTitle(id: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://www.youtube.com/oembed?url=https://youtu.be/${id}&format=json`,
      { next: { revalidate: REVALIDATE_SECONDS } },
    );
    if (!res.ok) return null;
    const data = (await res.json()) as { title?: string };
    return data.title ?? null;
  } catch {
    return null;
  }
}

export async function getLatestEpisode(): Promise<Episode> {
  const tiers = [fromPlaylist, () => fromChannelTab("streams"), () => fromChannelTab("videos")];

  for (const tier of tiers) {
    const result = await tier();
    if (result) return result;
  }

  console.error(
    "[latestEpisode] ALL SOURCES FAILED — serving hardcoded floor. " +
      "Check the playlist id and the channel handle.",
  );
  return FLOOR;
}
