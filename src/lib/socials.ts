export interface SocialLink {
  label: string;
  href: string;
  icon: string;   // Font Awesome class string, e.g. "fab fa-youtube"
  /**
   * Optional 24x24 SVG path, for brands Font Awesome Free doesn't ship.
   * When present it renders instead of `icon`. Drawn with currentColor so it
   * inherits the same grey/hover-blue treatment as its Font Awesome neighbours.
   */
  svgPath?: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "YouTube",    href: "https://www.youtube.com/@MoonBoysPodcast",      icon: "fab fa-youtube" },
  { label: "Twitch",     href: "https://www.twitch.tv/moonboyspodcast",         icon: "fab fa-twitch" },
  // Kick has no Font Awesome Free brand icon (fa-kickstarter is Kickstarter, a
  // different company), so the real mark is inlined. Path: Simple Icons "kick".
  {
    label: "Kick",
    href: "https://kick.com/moonboyspodcast",
    icon: "fas fa-tower-broadcast", // fallback only; svgPath wins when set
    svgPath:
      "M1.333 0h8v5.333H12V2.667h2.667V0h8v8H20v2.667h-2.667v2.666H20V16h2.667v8h-8v-2.667H12v-2.666H9.333V24h-8Z",
  },
  { label: "Discord",    href: "https://discord.com/invite/8qf3PTuzYw",         icon: "fab fa-discord" },
  { label: "X",          href: "https://x.com/moonboyspodcast",                 icon: "fab fa-x-twitter" },
  { label: "Instagram",  href: "https://www.instagram.com/moonboyspodcast",     icon: "fab fa-instagram" },
  { label: "TikTok",     href: "https://www.tiktok.com/@moonboyspodcast",       icon: "fab fa-tiktok" },
  { label: "Telegram",   href: "https://t.me/moonboyspod",                      icon: "fab fa-telegram" },
  { label: "Patreon",    href: "https://www.patreon.com/cw/moonboyspodcast",    icon: "fab fa-patreon" },
  { label: "Newsletter", href: "https://substack.com/@moonmag",                 icon: "fas fa-envelope" },
  { label: "Linktree",   href: "https://linktr.ee/moonboyspodcast",             icon: "fas fa-link" },
];
