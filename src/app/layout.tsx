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
  title: "Moon Boys | Crypto Indicators",
  description: "Premium crypto trading indicators by the Moon Boys. Get edge in any market.",
  openGraph: {
    title: "Moon Boys | Crypto Indicators",
    description: "Premium crypto trading indicators by the Moon Boys.",
    type: "website",
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
