export interface SocialLink {
  label: string;
  href: string;
  icon: string;   // Font Awesome class string, e.g. "fab fa-youtube"
}

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "YouTube",    href: "https://www.youtube.com/@MoonBoysPodcast",      icon: "fab fa-youtube" },
  { label: "Twitch",     href: "https://www.twitch.tv/moonboyspodcast",         icon: "fab fa-twitch" },
  { label: "Discord",    href: "https://discord.com/invite/8qf3PTuzYw",         icon: "fab fa-discord" },
  { label: "X",          href: "https://x.com/moonboyspodcast",                 icon: "fab fa-x-twitter" },
  { label: "Instagram",  href: "https://www.instagram.com/moonboyspodcast",     icon: "fab fa-instagram" },
  { label: "TikTok",     href: "https://www.tiktok.com/@moonboyspodcast",       icon: "fab fa-tiktok" },
  { label: "Telegram",   href: "https://t.me/moonboyspod",                      icon: "fab fa-telegram" },
  { label: "Patreon",    href: "https://www.patreon.com/cw/moonboyspodcast",    icon: "fab fa-patreon" },
  { label: "Newsletter", href: "https://substack.com/@moonmag",                 icon: "fas fa-envelope" },
  { label: "Linktree",   href: "https://linktr.ee/moonboyspodcast",             icon: "fas fa-link" },
];

export const PODCAST_PLATFORMS = SOCIAL_LINKS.filter((s) =>
  ["YouTube", "Twitch"].includes(s.label),
);
