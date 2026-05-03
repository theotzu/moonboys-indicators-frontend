export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "YouTube",   href: "https://www.youtube.com/@MoonBoysPodcast",      icon: "▶" },
  { label: "Instagram", href: "https://www.instagram.com/moonboyspodcast",     icon: "📸" },
  { label: "X",         href: "https://x.com/moonboyspodcast",                 icon: "𝕏" },
  { label: "TikTok",    href: "https://www.tiktok.com/@moonboyspodcast",       icon: "♪" },
  { label: "Discord",   href: "https://discord.com/invite/8qf3PTuzYw",         icon: "◈" },
  { label: "Telegram",  href: "https://t.me/moonboyspod",                      icon: "✈" },
  { label: "Twitch",    href: "https://www.twitch.tv/moonboyspodcast",         icon: "🎮" },
  { label: "Patreon",   href: "https://www.patreon.com/cw/moonboyspodcast",    icon: "🎁" },
];

export const NAV_SOCIALS = SOCIAL_LINKS.filter((s) =>
  ["YouTube", "X"].includes(s.label),
);
