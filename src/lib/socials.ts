export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "YouTube",    href: "https://www.youtube.com/@MoonBoysPodcast",      icon: "▶" },
  { label: "Twitch",     href: "https://www.twitch.tv/moonboyspodcast",         icon: "🎮" },
  { label: "Discord",    href: "https://discord.com/invite/8qf3PTuzYw",         icon: "◈" },
  { label: "X",          href: "https://x.com/moonboyspodcast",                 icon: "𝕏" },
  { label: "Instagram",  href: "https://www.instagram.com/moonboyspodcast",     icon: "📸" },
  { label: "TikTok",     href: "https://www.tiktok.com/@moonboyspodcast",       icon: "♪" },
  { label: "Telegram",   href: "https://t.me/moonboyspod",                      icon: "✈" },
  { label: "Patreon",    href: "https://www.patreon.com/cw/moonboyspodcast",    icon: "🎁" },
  { label: "Newsletter", href: "https://substack.com/@moonmag",                 icon: "📬" },
];

export const PODCAST_PLATFORMS = SOCIAL_LINKS.filter((s) =>
  ["YouTube", "Twitch"].includes(s.label),
);
