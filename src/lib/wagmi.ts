import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet, base } from "wagmi/chains";

export const wagmiConfig = getDefaultConfig({
  appName: "Moon Boys Indicators",
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? "YOUR_WALLETCONNECT_PROJECT_ID",
  chains: [base, mainnet],
  ssr: true,
});
