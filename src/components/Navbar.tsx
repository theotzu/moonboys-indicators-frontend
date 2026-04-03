"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-black/80 backdrop-blur-sm border-b border-yellow-500/20">
      <Link href="/" className="flex items-center gap-2">
        <span className="text-2xl">🌙</span>
        <span className="text-yellow-400 font-bold text-lg tracking-wide">
          Moon Boys
        </span>
      </Link>

      <div className="flex items-center gap-6">
        <Link
          href="/#indicators"
          className="text-gray-300 hover:text-yellow-400 transition-colors text-sm font-medium"
        >
          Indicators
        </Link>
        <Link
          href="/subscribe"
          className="text-gray-300 hover:text-yellow-400 transition-colors text-sm font-medium"
        >
          Subscribe
        </Link>
        <ConnectButton
          accountStatus="avatar"
          chainStatus="icon"
          showBalance={false}
        />
      </div>
    </nav>
  );
}
