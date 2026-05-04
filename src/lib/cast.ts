// People on the show — hosts (recurring) and notable past guests.
// Edit handles, roles, photo paths, and episodeId as more details come in.

export interface Person {
  name: string;
  handle?: string;          // X handle without the @
  href?: string;            // override link (defaults to https://x.com/<handle>)
  role?: string;            // short role tag, e.g. "Host", "Producer"
  photo?: string;           // /public path, e.g. /cast/theotzu.jpg
  episodeId?: string;       // YouTube video ID for the guest's appearance
  episodeTitle?: string;    // short title shown above the embed (optional)
}

export const HOSTS: Person[] = [
  { name: "Matt Smeed",     handle: "MattSmeed",    photo: "/cast/matt-smeed.jpg" },
  { name: "Coke",           handle: "withthecoke",  photo: "/cast/coke.jpg" },
  { name: "Rom Reactor",    handle: "vickzinbk",    photo: "/cast/rom-reactor.jpg" },
  { name: "Theo Tzu",       handle: "theotzu_",     photo: "/cast/theo-tzu.jpg" },
  { name: "Imagine Aksel",  handle: "imagineaksel", photo: "/cast/imagine-aksel.jpg" },
];

export const GUESTS: Person[] = [
  {
    name: "Pio Vincenzo",
    handle: "piovincenzo_",
    photo: "/cast/pio-vincenzo.jpg",
    episodeId: "_nAUIIC_Rko",
    episodeTitle: "Options & Yield: Strategy₿, Tesla, and Bitcoin",
  },
  {
    name: "Pwnsauce",
    handle: "STAKINGSEUSS",
    photo: "/cast/pwnsauce.jpg",
    episodeId: "LdKJyUc98mg",
    episodeTitle: "Is This the Amazon of Crypto? Bitcoin ETF Flows, ThorChain Deep Dive & Altcoin Survival",
  },
  {
    name: "DurkeyTurkey",
    handle: "DurkeyTurkey_",
    photo: "/cast/durkeyturkey.jpg",
    episodeId: "OAgMA4svtBo",
    episodeTitle: "Meme Coins, ThorChain, PulseChain & Chaos",
  },
];
