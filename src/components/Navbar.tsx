"use client";

import Link from "next/link";

const NAV_LINKS = [
  { label: "Episodes",   href: "/#guests" },
  { label: "Indicators", href: "/#indicators" },
  { label: "Hosts",      href: "/#hosts" },
  { label: "NFT",        href: "/#nft" },
];

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 py-4 bg-[#0a0e1a]/85 backdrop-blur-sm border-b border-blue-500/20">
      <Link href="/" className="flex items-center shrink-0">
        <span className="text-blue-300 font-bold text-base sm:text-lg tracking-wide whitespace-nowrap">
          Moonboys Podcast
        </span>
      </Link>

      <div className="hidden sm:flex items-center gap-4 md:gap-6">
        {NAV_LINKS.map((l) => (
          <Link
            key={l.label}
            href={l.href}
            className="text-gray-300 hover:text-blue-300 transition-colors text-sm font-medium"
          >
            {l.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
