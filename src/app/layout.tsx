import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Web3Providers } from "@/components/Web3Providers";
import { Navbar } from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.moonboyspod.com"),
  title: "Moon Boys Podcast | Free Crypto Trading Indicators",
  description: "Open-source TradingView indicators by the Moon Boys Podcast — trend regimes, mining cost floors, liquidation heatmaps, capital flow. Free for everyone.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Moon Boys Podcast | Free Crypto Trading Indicators",
    description: "Open-source TradingView indicators by the Moon Boys Podcast.",
    type: "website",
    url: "https://www.moonboyspod.com",
    siteName: "Moon Boys Podcast",
  },
  twitter: {
    card: "summary_large_image",
    title: "Moon Boys Podcast | Free Crypto Trading Indicators",
    description: "Open-source TradingView indicators — free for everyone.",
    creator: "@moonboyspodcast",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-black text-white">
        <Web3Providers>
          <Navbar />
          <main className="flex-1 pt-[72px]">{children}</main>
        </Web3Providers>
      </body>
    </html>
  );
}
