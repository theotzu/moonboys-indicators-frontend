"use client";

import Link from "next/link";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 py-4 bg-[#0a0612]/85 backdrop-blur-sm border-b border-purple-500/20">
      <Link href="/" className="flex items-center gap-2 shrink-0">
        <span className="text-2xl" aria-hidden="true">🌙</span>
        <span className="text-purple-300 font-bold text-lg tracking-wide whitespace-nowrap">
          Moon Boys
        </span>
      </Link>

      <Link
        href="/#indicators"
        className="text-gray-300 hover:text-purple-300 transition-colors text-sm font-medium"
      >
        Indicators
      </Link>
    </nav>
  );
}

