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
  { name: "Matt Smeed",     handle: "MattSmeed" },
  { name: "Coke",           handle: "withthecoke" },
  { name: "Rom Reactor",    handle: "vickzinbk" },
  { name: "Theo Tzu",       handle: "theotzu_" },
  { name: "Imagine Aksel",  handle: "imagineaksel" },
];

export const GUESTS: Person[] = [
  {
    name: "Pio Vincenzo",
    handle: "piovincenzo_",
    episodeId: "_nAUIIC_Rko",
    episodeTitle: "Options & Yield: Strategy₿, Tesla, and Bitcoin",
  },
  {
    name: "Pwnsauce",
    handle: "STAKINGSEUSS",
    // TODO: episodeId for the Pwnsauce appearance
  },
  {
    name: "DurkeyTurkey",
    handle: "durkeyturkey",
    // TODO: episodeId for the DurkeyTurkey appearance
  },
];
