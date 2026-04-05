# Moon Boys Indicators — Project Context

> **For any AI assistant picking up this project**: read this file first. It covers the project purpose, architecture, conventions, and current state so you can contribute immediately.

---

## 1. What Is This

**Moon Boys Indicators** is the web frontend for the Moon Boys Podcast — a crypto trading & analysis show. The site serves two purposes:

1. **Free landing page** — live TradingView chart embed + cards for all 4 published Pine Script indicators with direct links to add them in TradingView.
2. **Web3 subscription (Phase 2)** — users connect their wallet and pay on-chain (ETH on Base L2) to unlock premium indicator access. The `/subscribe` page is scaffolded but **not linked in the nav** until paid indicators exist.

The site is deployed to **Vercel** under a collaborator's account. Merging to `main` triggers an automatic deploy.

---

## 2. Git Workflow

```
main  ←  production (Vercel auto-deploys from here — owned by theotzu's account)
  └── indicator-landing-beta  ←  primary development branch (vick2592)
```

- All development happens on `indicator-landing-beta` (or feature branches off it)
- Open PRs from `indicator-landing-beta` → `main` for review before deploy
- **Do not push directly to `main`**

### Remotes
| Remote | URL |
|---|---|
| `origin` | `https://github.com/theotzu/moonboys-indicators-frontend` |

### Pushing your branch (vick2592)
Since `origin` points to theotzu's account, add your own fork as a second remote:
```bash
git remote add vick https://github.com/vick2592/moonboys-indicators-frontend.git
git push -u vick indicator-landing-beta
```
Then open a PR: `vick2592/moonboys-indicators-frontend:indicator-landing-beta` → `theotzu/moonboys-indicators-frontend:main`

---

## 3. Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 15** (App Router, TypeScript) | Best Vercel integration |
| Styling | **Tailwind CSS v4** | Utility-first, fast iteration |
| Wallet | **RainbowKit v2 + wagmi v2 + viem** | Scaffolded for Phase 2 (not active in UI) |
| Query | **@tanstack/react-query v5** | Required peer dep for wagmi v2 |
| Charts | **TradingView Widget embeds** | Free, real-time, no API key needed |
| Deployment | **Vercel** | Zero-config Next.js hosting |

---

## 4. Project Structure

```
src/
  app/
    globals.css               # Global styles (pure black bg, smooth scroll)
    layout.tsx                # Root layout — Navbar + Web3Providers wrapper
    page.tsx                  # Landing page
    subscribe/
      page.tsx                # Web3 subscription page (Phase 2 — NOT linked in nav)
  components/
    Navbar.tsx                # Top nav — Moon Boys logo, Indicators link, social icons, Discord CTA
    TradingViewWidget.tsx     # TradingView advanced chart embed + ticker tape
    IndicatorChart.tsx        # Main interactive section: asset switcher, chart, indicator cards
    Web3Providers.tsx         # WagmiProvider + QueryClientProvider + RainbowKitProvider
  lib/
    wagmi.ts                  # wagmi config — chains: [base, mainnet]

public/
  indicators/                 # ← Drop indicator screenshot PNGs here (see Section 8)
```

---

## 5. Environment Variables

Copy `.env.local.example` → `.env.local` and fill in:

```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_id_here
```

Get a free WalletConnect Project ID at: https://cloud.walletconnect.com

The `.env.local` file is gitignored. For Vercel, add env vars in the dashboard under Project → Settings → Environment Variables.

---

## 6. Brand / Design System

| Token | Value |
|---|---|
| Background | `#000000` (pure black) |
| Accent / Primary | `yellow-400` (`#facc15`) |
| Text primary | `white` |
| Text secondary | `gray-400` |
| Border | `yellow-500/20` |
| Glow effect | `yellow-500/10` blurred with `blur-[120px]` |
| BTC-only badge | orange tones |
| Any Asset badge | green tones |

---

## 7. The 4 Indicators

All are open-source Pine Script™ tools published on TradingView. **TradingView embeds cannot load user-published scripts** — this is a hard platform restriction. The site shows a live price chart and links users to each script page to add them to their own TradingView charts.

| Indicator | Author | BTC Only? | TradingView URL |
|---|---|---|---|
| Moon Boys Line | theotzu | No | https://www.tradingview.com/script/KDICpAIL-Moon-Boys-Line/ |
| Dollarized Volume | VickzinBK | No | https://www.tradingview.com/script/GKRGy2vD-Moon-Boys-Dollarized-Volume/ |
| BTC Production Cost Daily | VickzinBK | Yes | https://www.tradingview.com/script/kDOElEFI-Moon-Boys-BTC-Production-Cost-Daily/ |
| BTC Liquidation Heatmap | VickzinBK | Yes | https://www.tradingview.com/script/L5TplYwb-Moon-Boys-BTC-Liquidation-Heatmap/ |

**Moon Boys Line** — 44/125/200-day SMAs with gold/blue/gray colour band showing trend regime.
**Dollarized Volume** — Volume × Price, shows real capital flow. Works on any asset.
**BTC Production Cost** — CBECI-based mining cost with 378 data points (2011–2026). Macro support zones.
**BTC Liquidation Heatmap** — Binance + Bybit futures OI liquidation zones, heat-mapped by significance.

The BTC-only cards automatically dim/disable when a non-BTC asset is selected in the chart switcher.

---

## 8. Indicator Screenshot Images

Each indicator card has an image slot. Images go in `/public/indicators/` with these exact filenames:

```
public/indicators/moon-boys-line.png
public/indicators/dollarized-volume.png
public/indicators/btc-production-cost.png
public/indicators/liquidation-heatmap.png
```

**How to get them**: Go to each TradingView script page → screenshot or right-click save the chart preview image at the top. Recommended size: **800×450px** (16:9). PNG or JPG both work.

Until images are added, cards show a "📊 Screenshot coming soon" placeholder automatically.

---

## 9. Social Links

All social links are real and live. The Linktree is: https://linktr.ee/moonboyspodcast

| Platform | URL |
|---|---|
| YouTube | https://www.youtube.com/@MoonBoysPodcast |
| Instagram | https://www.instagram.com/moonboyspodcast |
| X / Twitter | https://x.com/moonboyspodcast |
| TikTok | https://www.tiktok.com/@moonboyspodcast |
| Discord | https://discord.com/invite/8qf3PTuzYw |
| Telegram | https://t.me/moonboyspod |
| Twitch | https://www.twitch.tv/moonboyspodcast |
| Patreon | https://www.patreon.com/cw/moonboyspodcast |
| Newsletter | https://substack.com/@moonmag |

---

## 10. Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Copy env file and fill in WalletConnect Project ID (needed for wallet button)
cp .env.local.example .env.local

# 3. Start dev server
npm run dev
# → http://localhost:3000
```

No git remote is needed for local development. The dev server is purely local.

---

## 11. Deploying to Vercel

The site deploys under theotzu's Vercel account connected to the `main` branch.

**For the Vercel owner (theotzu)**:
1. Connect the GitHub repo to Vercel
2. Set `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` in Vercel → Environment Variables
3. Vercel auto-deploys on every push/merge to `main`

**For the developer (vick2592)**:
1. Work on `indicator-landing-beta`
2. `git push vick indicator-landing-beta`
3. Open PR → theotzu merges → auto-deploy

---

## 12. Subscribe Page (Phase 2)

The `/subscribe` route exists at `src/app/subscribe/page.tsx` and is fully built with:
- RainbowKit wallet connect
- Monthly / Yearly tier cards
- Placeholder subscription buttons

It is **intentionally not linked in the Navbar** until paid indicators are ready. To re-enable:
1. Add a `Subscribe` link to `src/components/Navbar.tsx`
2. Deploy a subscription smart contract on Base
3. Wire up the `onClick` handlers in `subscribe/page.tsx` to call the contract

---

## 13. Current TODO / Roadmap

### Phase 1 — Demo branch (in progress)
- [x] Next.js 15 + Tailwind + TypeScript scaffold
- [x] Landing page: hero, ticker tape, live chart, indicator cards, community section
- [x] TradingView embed with BTC/ETH/SOL/BNB asset switcher
- [x] 4 indicator cards with descriptions, tags, BTC-only gating
- [x] All social links in Navbar, Community section, and Footer
- [x] Subscribe page scaffolded (hidden from nav)
- [ ] **Add indicator screenshots** to `public/indicators/` (see Section 8)
- [ ] Add Moon Boys logo image to `public/` and update Navbar
- [ ] Podcast episode embeds or links section

### Phase 2 — Web3 Subscription
- [ ] Deploy subscription smart contract on Base
- [ ] Wire contract call in `/subscribe` page
- [ ] Gate premium indicator content behind subscription check
- [ ] Re-enable Subscribe link in Navbar
- [ ] Discord role gating (collab.land or custom)

### Future
- [ ] SEO: OG images, sitemap, structured data
- [ ] Analytics: Vercel Analytics or Plausible
- [ ] More indicators as they are published

---

## 14. Key Contacts

| Role | GitHub / TradingView |
|---|---|
| Developer | GitHub: `vick2592` / TradingView: `VickzinBK` |
| Vercel / Deployment owner | GitHub: `theotzu` / TradingView: `theotzu` |


> **For any AI assistant picking up this project**: read this file first. It covers the project purpose, architecture, conventions, and current state so you can contribute immediately.

---

## 1. What Is This

**Moon Boys Indicators** is the web frontend for the Moon Boys Podcast — a crypto trading & analysis show. The site serves two purposes:

1. **Free landing page** — displays live TradingView chart embeds for featured indicators/pairs.
2. **Web3 subscription** — users connect their wallet and pay on-chain (ETH on Base L2) to unlock premium indicator access.

The site is deployed to **Vercel** under a collaborator's account. Merging to `main` triggers an automatic deploy.

---

## 2. Git Workflow

```
main  ←  production (Vercel auto-deploys from here — owned by friend's account)
  └── indicator-landing-beta  ←  primary development branch (vick2592)
```

- All development happens on `indicator-landing-beta` (or feature branches off it)
- Open PRs from `indicator-landing-beta` → `main` for review before deploy
- **Do not push directly to `main`**

### Remotes
| Remote | URL |
|---|---|
| `origin` | `https://github.com/theotzu/moonboys-indicators-frontend` |

---

## 3. Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 15** (App Router, TypeScript) | Best Vercel integration, SSR/SSG |
| Styling | **Tailwind CSS v4** | Utility-first, fast iteration |
| Wallet | **RainbowKit v2 + wagmi v2 + viem** | Industry standard EVM wallet UX |
| Query | **@tanstack/react-query v5** | Required peer dep for wagmi v2 |
| Charts | **TradingView Widget embeds** | Free, real-time, no API key for basic usage |
| Deployment | **Vercel** | Zero-config Next.js hosting |

---

## 4. Project Structure

```
src/
  app/
    globals.css          # Global styles (dark theme forced)
    layout.tsx           # Root layout — wraps everything in Web3Providers + Navbar
    page.tsx             # Landing page (ticker tape, hero, indicators grid, CTA)
    subscribe/
      page.tsx           # Subscription page (wallet connect, tier cards)
  components/
    Navbar.tsx           # Top nav with RainbowKit ConnectButton
    TradingViewWidget.tsx # TradingView chart embed + ticker tape wrappers
    Web3Providers.tsx    # WagmiProvider + QueryClientProvider + RainbowKitProvider
  lib/
    wagmi.ts             # wagmi config — chains: [base, mainnet]
```

---

## 5. Environment Variables

Copy `.env.local.example` → `.env.local` and fill in:

```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_id_here
```

Get a free WalletConnect Project ID at: https://cloud.walletconnect.com

The `.env.local` file is gitignored and must **never** be committed.

For Vercel deployment, add environment variables in the Vercel dashboard under Project → Settings → Environment Variables.

---

## 6. Brand / Design System

| Token | Value |
|---|---|
| Background | `#000000` (pure black) |
| Accent / Primary | `yellow-400` (`#facc15`) |
| Text primary | `white` |
| Text secondary | `gray-400` |
| Border | `yellow-500/20` |
| Glow | `yellow-500/10` blurred |

The brand vibe is dark/crypto-native with gold/yellow accents. Think Bloomberg terminal meets degen culture.

---

## 7. TradingView Embeds

Charts use TradingView's free **Advanced Chart Widget** (script embed, no API key required for public symbols).

**Component**: `src/components/TradingViewWidget.tsx`

- `<TradingViewWidget symbol="BINANCE:BTCUSDT" height={450} />` — full chart
- `<TradingViewTicker />` — scrolling ticker tape for the top of the page

To add a new indicator to the landing page, edit the `INDICATORS` array in `src/app/page.tsx`:

```ts
const INDICATORS = [
  {
    id: "btc",
    label: "BTC/USDT",
    symbol: "BINANCE:BTCUSDT",      // TradingView symbol format: EXCHANGE:PAIR
    description: "Brief description",
  },
  // ...
];
```

TradingView symbol format: `EXCHANGE:PAIR` (e.g. `BINANCE:BTCUSDT`, `COINBASE:ETHUSD`, `BYBIT:SOLUSDT`).

---

## 8. Web3 / Subscription (Current State)

**Phase 1 (current)**: UI scaffolded, wallet connection works, subscription buttons are placeholders.

**Phase 2 (TODO)**: 
- Deploy subscription smart contract on Base
- Integrate contract call in `src/app/subscribe/page.tsx`
- Add gate logic — check on-chain subscription status to show/hide premium content
- Consider using [OpenZeppelin subscription patterns](https://docs.openzeppelin.com/) or a service like [Unlock Protocol](https://unlock-protocol.com/)

Chains configured: **Base** (primary, cheap fees) + **Ethereum mainnet** (fallback).

---

## 9. Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Copy env file and fill in WalletConnect Project ID
cp .env.local.example .env.local

# 3. Start dev server
npm run dev
# → http://localhost:3000
```

---

## 10. Deploying to Vercel

The site is deployed under a collaborator's Vercel account connected to the `main` branch of `theotzu/moonboys-indicators-frontend`.

**Steps for the Vercel owner (friend)**:
1. Connect the GitHub repo to Vercel
2. Set `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` in Vercel → Environment Variables
3. Vercel auto-deploys on every push/merge to `main`

**For the developer (vick2592)**:
1. Work on `indicator-landing-beta`
2. Push branch: `git push origin indicator-landing-beta`
3. Open PR on GitHub: `indicator-landing-beta` → `main`
4. Friend reviews + merges → Vercel deploys automatically

---

## 11. Current TODO / Roadmap

- [ ] **Phase 1 (in progress)**: Landing page, indicators display, wallet connection UI
- [ ] Get WalletConnect Project ID and add to Vercel env vars
- [ ] Add custom Moon Boys logo/branding assets to `public/`
- [ ] Add podcast episode embeds or links section
- [ ] **Phase 2**: Smart contract for subscriptions on Base
- [ ] **Phase 2**: Gate premium indicator content behind subscription check
- [ ] **Phase 2**: Discord role gating via collab.land or custom middleware
- [ ] SEO: add proper OG images, sitemap
- [ ] Analytics: add Vercel Analytics or Plausible

---

## 12. Key Contacts

| Role | GitHub |
|---|---|
| Developer | `vick2592` |
| Vercel / Deployment owner | `theotzu` |
