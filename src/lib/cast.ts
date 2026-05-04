// People on the show — hosts (recurring) and notable past guests.
// Edit handles, roles, and photo paths as more details come in.

export interface Person {
  name: string;
  handle?: string;          // X handle without the @
  href?: string;            // override link (defaults to https://x.com/<handle>)
  role?: string;            // short role tag, e.g. "Host", "Producer"
  photo?: string;           // /public path, e.g. /cast/theotzu.jpg
  episode?: string;         // for guests: episode title or link context
}

export const HOSTS: Person[] = [
  { name: "Matt Smeed",     handle: "MattSmeed" },
  { name: "Coke",           handle: "withthecoke" },
  { name: "Rom Reactor",    handle: "vickzinbk" },
  { name: "Theo Tzu",       handle: "theotzu_" },
  { name: "Imagine Aksel",  handle: "imagineaksel" },
];

export const GUESTS: Person[] = [
  { name: "Pwnsauce",       handle: "STAKINGSEUSS" },
  { name: "Pio Vincenzo",   handle: "piovincenzo_" },
];
