"use client";

import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Episodes",   href: "/#guests" },
  // Follows the section, which widened from "Our Indicators" to "Free Tools"
  // when the stream countdown was added. It lands at the top of that section,
  // where Indicators is still the first thing in it.
  { label: "Free Stuff", href: "/free-stuff" },
  { label: "Hosts",      href: "/#hosts" },
  { label: "NFT",        href: "/#nft" },
];

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 py-4 bg-[#0a0e1a]/85 backdrop-blur-sm border-b border-blue-500/20">
      {/*
        THE MARK, NOT THE WORDS. Theo, 2026-09-05: "it says moonboys podcast in
        the top left corner. can we just put the logo up there."

        The name stays in the DOM as sr-only text rather than being deleted. A
        navbar whose only home link is an image gives a screen reader whatever
        the alt text says and gives search engines nothing at all for the site's
        own name — and this site is the podcast's name before it is anything
        else. The visible thing is the moon; the readable thing is still there.

        Sized a notch up from the wordmark it replaced (40/44px against the
        bar's 16px padding, so the header stays inside the pt-20 the pages
        reserve for it). The roundel carries MOON BOYS in it, and at 36px that
        lettering was texture rather than type.

        priority: it is in the fixed header at the top of every route, so it is
        always in the first viewport and there is nothing for lazy loading to
        defer past.
      */}
      <Link href="/" className="flex items-center shrink-0">
        <Image
          src="/moon-boys-mark.png"
          alt=""
          width={256}
          height={256}
          priority
          className="h-10 w-10 sm:h-11 sm:w-11 rounded-full"
        />
        <span className="sr-only">Moon Boys Podcast</span>
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
