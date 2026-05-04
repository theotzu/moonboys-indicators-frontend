import Image from "next/image";
import { HOSTS, GUESTS, Person } from "@/lib/cast";

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

function PersonAvatar({ p, size = "lg" }: { p: Person; size?: "sm" | "lg" }) {
  const dim = size === "lg" ? "w-20 h-20" : "w-14 h-14";
  const text = size === "lg" ? "text-2xl" : "text-base";
  const sizes = size === "lg" ? "80px" : "56px";
  return (
    <div
      className={`relative ${dim} rounded-full overflow-hidden bg-gradient-to-br from-purple-500/30 to-teal-500/30 border border-purple-500/30 flex items-center justify-center shrink-0`}
    >
      {p.photo ? (
        <Image src={p.photo} alt={p.name} fill className="object-cover" sizes={sizes} />
      ) : (
        <span
          className={`${text} font-bold bg-gradient-to-br from-purple-200 to-teal-200 bg-clip-text text-transparent`}
        >
          {initials(p.name)}
        </span>
      )}
    </div>
  );
}

function subtitleFor(p: Person) {
  if (p.handle) return `@${p.handle}`;
  if (p.href) return p.href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
  return null;
}

function profileHref(p: Person) {
  return p.href ?? (p.handle ? `https://x.com/${p.handle}` : undefined);
}

function HostCard({ p }: { p: Person }) {
  const href = profileHref(p);
  const subtitle = subtitleFor(p);
  const Wrap = href ? "a" : "div";
  return (
    <Wrap
      {...(href
        ? { href, target: "_blank" as const, rel: "noopener noreferrer" }
        : {})}
      className="group flex flex-col items-center text-center gap-3 p-4 rounded-xl border border-purple-500/20 bg-[#15101f]/60 hover:border-purple-400/50 hover:bg-purple-500/5 transition-colors"
    >
      <PersonAvatar p={p} size="lg" />
      <div>
        <p className="font-semibold text-white text-sm">{p.name}</p>
        {subtitle && (
          <p className="text-purple-300/80 text-xs mt-0.5 group-hover:text-purple-300">
            {subtitle}
          </p>
        )}
      </div>
    </Wrap>
  );
}

function GuestCard({ p }: { p: Person }) {
  const href = profileHref(p);
  const subtitle = subtitleFor(p);
  return (
    <article className="flex flex-col rounded-xl border border-purple-500/25 bg-[#15101f]/60 overflow-hidden">
      {p.episodeId ? (
        <div className="relative aspect-video w-full bg-[#15101f]">
          <iframe
            src={`https://www.youtube.com/embed/${p.episodeId}?rel=0`}
            title={`${p.name} on Moon Boys Podcast`}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          />
        </div>
      ) : (
        <div className="relative aspect-video w-full bg-[#15101f] flex flex-col items-center justify-center gap-2 text-purple-300/40">
          <span className="text-4xl">🎙</span>
          <span className="text-xs uppercase tracking-widest">Episode coming soon</span>
        </div>
      )}
      <div className="p-4 flex items-center gap-3">
        <PersonAvatar p={p} size="sm" />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-white text-sm truncate">{p.name}</p>
          {subtitle &&
            (href ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-300/80 text-xs hover:text-purple-300 truncate block"
              >
                {subtitle}
              </a>
            ) : (
              <p className="text-purple-300/80 text-xs truncate">{subtitle}</p>
            ))}
          {p.episodeTitle && (
            <p className="text-gray-500 text-xs mt-0.5 truncate">{p.episodeTitle}</p>
          )}
        </div>
      </div>
    </article>
  );
}

export function HostsSection() {
  return (
    <section
      id="hosts"
      className="px-6 py-16 max-w-6xl mx-auto w-full border-t border-purple-500/10"
    >
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          The <span className="text-purple-300">Hosts</span>
        </h2>
        <p className="text-gray-400 text-sm max-w-xl mx-auto">
          The voices behind Moon Boys.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {HOSTS.map((h) => (
          <HostCard key={h.name} p={h} />
        ))}
      </div>
    </section>
  );
}

export function GuestsSection() {
  return (
    <section
      id="guests"
      className="px-6 py-16 max-w-6xl mx-auto w-full border-t border-purple-500/10"
    >
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          Notable <span className="text-teal-300">Guests</span>
        </h2>
        <p className="text-gray-400 text-sm max-w-xl mx-auto">
          Friends and traders who&apos;ve come on the show — watch their episodes below.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {GUESTS.map((g) => (
          <GuestCard key={g.name} p={g} />
        ))}
      </div>
    </section>
  );
}
