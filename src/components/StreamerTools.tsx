import Image from "next/image";

/**
 * FREE TOOLS THAT ARE NOT INDICATORS.
 *
 * Theo, 2026-09-05, on the stream countdown: "i would like to give away
 * [it] as part of the indicators section. i know its not an indicator, well it
 * kinda is. but its like stuff for streamers. maybe that whole section could
 * be like 'Free stuff'."
 *
 * He is right that it does not belong under "Indicators" and right that it
 * belongs on the page. So the section around it widened to "Free Tools" and
 * this is the second group inside it. Anything else the show gives away —
 * overlays, spreadsheets, scripts — goes in this list rather than getting a
 * section of its own.
 *
 * Deliberately the same card shape as the indicators: same border, same 16:9
 * preview, same tag pills, same button at the bottom. Two groups that look
 * like two different websites would undo the point of putting them together.
 */
const TOOLS = [
  {
    id: "stream-countdown",
    label: "Stream Countdown",
    description:
      "A “stream starting soon” overlay for OBS. Counts down to your start time in each viewer’s own timezone, plays a YouTube stream full-bleed behind it, and flips to a live state on its own when the clock runs out. Every setting is in the URL, so one link is one show — no install, no build, no account.",
    href: "https://stream-countdown-alpha.vercel.app/",
    // The stream label and headline are the two things anyone will change
    // first, so the demo link arrives with them already filled in.
    demoHref:
      "https://stream-countdown-alpha.vercel.app/?show=Your%20Show&headline=Stream%20Starting%20Soon&t=20:00",
    author: "theotzu",
    tags: ["For Streamers", "OBS", "Free"],
    image: "/tools/stream-countdown.jpg",
  },
];

export function StreamerTools() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {TOOLS.map((tool) => (
        <div
          key={tool.id}
          className="rounded-xl border border-blue-500/25 bg-[#0f1729]/60 overflow-hidden flex flex-col"
        >
          <div className="relative w-full aspect-video bg-[#0f1729] border-b border-blue-500/15">
            <Image
              src={tool.image}
              alt={`${tool.label} preview — a countdown clock over a full-screen background`}
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover z-10"
            />
          </div>

          <div className="p-5 flex flex-col gap-3 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-semibold text-white text-sm">{tool.label}</p>
                <p className="text-gray-500 text-xs mt-0.5">by @{tool.author}</p>
              </div>
              <div className="flex flex-wrap gap-1 justify-end">
                {tool.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-1.5 py-0.5 text-xs rounded-full border whitespace-nowrap border-cyan-500/40 text-cyan-300 bg-cyan-500/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-gray-400 text-xs leading-relaxed flex-1">
              {tool.description}
            </p>

            {/*
              Two links, because the tool has two audiences: someone who wants
              to look at it, and someone who wants to run it. The primary
              button opens a configured example rather than the bare defaults.
            */}
            <div className="mt-auto flex flex-col sm:flex-row gap-2">
              <a
                href={tool.demoHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-sm font-semibold bg-blue-500/10 border border-blue-500/40 text-blue-300 hover:bg-blue-500/20 hover:text-blue-200 transition-colors"
              >
                Open the countdown →
              </a>
              <a
                href="https://github.com/theotzu/stream-countdown"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-sm font-semibold border border-blue-500/25 text-gray-400 hover:text-gray-200 hover:border-blue-500/40 transition-colors"
              >
                Source
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
