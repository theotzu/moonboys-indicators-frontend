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

function PersonCard({ p }: { p: Person }) {
  const href = p.href ?? (p.handle ? `https://x.com/${p.handle}` : undefined);
  const subtitle = p.handle
    ? `@${p.handle}`
    : p.href
    ? p.href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")
    : null;
  const Wrap = href ? "a" : "div";
  return (
    <Wrap
      {...(href
        ? { href, target: "_blank" as const, rel: "noopener noreferrer" }
        : {})}
      className="group flex flex-col items-center text-center gap-3 p-4 rounded-xl border border-purple-500/20 bg-[#15101f]/60 hover:border-purple-400/50 hover:bg-purple-500/5 transition-colors"
    >
      <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-purple-500/30 to-teal-500/30 border border-purple-500/30 flex items-center justify-center">
        {p.photo ? (
          <Image src={p.photo} alt={p.name} fill className="object-cover" sizes="80px" />
        ) : (
          <span className="text-2xl font-bold bg-gradient-to-br from-purple-200 to-teal-200 bg-clip-text text-transparent">
            {initials(p.name)}
          </span>
        )}
      </div>
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

export function HostsSection() {
  return (
    <section id="hosts" className="px-6 py-16 max-w-6xl mx-auto w-full border-t border-purple-500/10">
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
          <PersonCard key={h.name} p={h} />
        ))}
      </div>
    </section>
  );
}

export function GuestsSection() {
  return (
    <section id="guests" className="px-6 py-16 max-w-4xl mx-auto w-full border-t border-purple-500/10">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          Notable <span className="text-teal-300">Guests</span>
        </h2>
        <p className="text-gray-400 text-sm max-w-xl mx-auto">
          Friends and traders who&apos;ve come on the show.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
        {GUESTS.map((g) => (
          <PersonCard key={g.name} p={g} />
        ))}
      </div>
    </section>
  );
}
