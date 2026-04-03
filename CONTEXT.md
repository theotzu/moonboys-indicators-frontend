# Moon Boys Indicators — Project Context

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
