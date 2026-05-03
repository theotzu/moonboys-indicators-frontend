"use client";

import Link from "next/link";
import { NAV_SOCIALS } from "@/lib/socials";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 py-4 bg-black/80 backdrop-blur-sm border-b border-yellow-500/20">
      <Link href="/" className="flex items-center gap-2">
        <span className="text-2xl" aria-hidden="true">🌙</span>
        <span className="text-yellow-400 font-bold text-lg tracking-wide">
          Moon Boys
        </span>
      </Link>

      <div className="flex items-center gap-3 sm:gap-5">
        <Link
          href="/#indicators"
          className="hidden sm:block text-gray-300 hover:text-yellow-400 transition-colors text-sm font-medium"
        >
          Indicators
        </Link>
        <div className="flex items-center gap-3">
          {NAV_SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="text-gray-500 hover:text-yellow-400 transition-colors text-sm font-bold"
            >
              <span aria-hidden="true">{s.icon}</span>
            </a>
          ))}
        </div>
        <a
          href="https://discord.com/invite/8qf3PTuzYw"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-lg bg-yellow-400 text-black text-xs font-bold hover:bg-yellow-300 transition-colors"
        >
          Join Discord
        </a>
      </div>
    </nav>
  );
}

