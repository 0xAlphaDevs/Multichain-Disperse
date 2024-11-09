"use client";

import React from "react";

import { ConnectKitProvider, createConfig } from "@particle-network/connectkit";
import { authWalletConnectors } from "@particle-network/connectkit/auth";
import type { Chain } from "@particle-network/connectkit/chains";
// embedded wallet start
import { EntryPosition, wallet } from "@particle-network/connectkit/wallet";
// embedded wallet end
// aa start
import { aa } from "@particle-network/connectkit/aa";
// aa end
// evm start
import {
  arbitrum,
  arbitrumSepolia,
  base,
  baseSepolia,
  mainnet,
  optimism,
  optimismSepolia,
  sepolia,
} from "viem/chains";
import { evmWalletConnectors } from "@particle-network/connectkit/evm";
// evm end

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string;
const clientKey = process.env.NEXT_PUBLIC_CLIENT_KEY as string;
const appId = process.env.NEXT_PUBLIC_APP_ID as string;
const walletConnectProjectId = process.env
  .NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string;

if (!projectId || !clientKey || !appId) {
  throw new Error("Please configure the Particle project in .env first!");
}

const supportChains: Chain[] = [];
// evm start
supportChains.push(mainnet, arbitrum, optimism, base);
// evm end

const config = createConfig({
  projectId,
  clientKey,
  appId,
  appearance: {
    // theme: {
    //   '--pcm-font-family': '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    //   '--pcm-accent-color': '#8A2BE2',
    //   '--pcm-body-background': '#ffffff',
    //   '--pcm-body-background-secondary': '#f8f9fa',
    //   '--pcm-body-background-tertiary': '#f1f3f5',
    //   '--pcm-body-color': '#000000',
    //   '--pcm-body-color-secondary': '#4b5563',
    //   '--pcm-body-color-tertiary': '#6b7280',
    //   '--pcm-button-border-color': '#e5e7eb',
    //   '--pcm-button-font-weight': '500',
    //   '--pcm-button-hover-shadow': '0px 4px 12px rgba(0, 0, 0, 0.1)',
    //   '--pcm-primary-button-color': '#ffffff',
    //   '--pcm-primary-button-bankground': '#8A2BE2',
    //   '--pcm-primary-button-hover-background': '#7B1FA2',
    //   '--pcm-secondary-button-color': '#374151',
    //   '--pcm-secondary-button-bankground': '#ffffff',
    //   '--pcm-secondary-button-hover-background': '#f9fafb',
    //   '--pcm-body-action-color': '#8A2BE2',
    //   '--pcm-error-color': '#ef4444',
    //   '--pcm-success-color': '#22c55e',
    //   '--pcm-warning-color': '#f59e0b',
    //   '--pcm-overlay-background': 'rgba(255, 255, 255, 0.95)',
    //   '--pcm-overlay-backdrop-filter': 'blur(8px)',
    //   '--pcm-modal-box-shadow': '0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)',
    //   '--pcm-rounded-sm': '0.25rem',
    //   '--pcm-rounded-md': '0.375rem',
    //   '--pcm-rounded-lg': '0.5rem',
    //   '--pcm-rounded-xl': '0.75rem',
    //   '--pcm-rounded-full': '9999px',
    // },
    recommendedWallets: [
      { walletId: "metaMask", label: "Recommended" },
      { walletId: "coinbaseWallet", label: "Popular" },
    ],
    language: "en-US",
  },
  walletConnectors: [
    authWalletConnectors(),
    // evm start
    evmWalletConnectors({
      // TODO: replace it with your app metadata.
      metadata: {
        name: "Multichain Disperse",
        icon:
          typeof window !== "undefined"
            ? `${window.location.origin}/favicon.ico`
            : "",
        description:
          "A chain abstracted disperse app for instant multi chain token transfer in single zap.",
        url: typeof window !== "undefined" ? window.location.origin : "",
      },
      walletConnectProjectId: walletConnectProjectId,
    }),
    // evm end
  ],
  // plugins: [
  //   // embedded wallet start
  //   wallet({
  //     visible: true,
  //     entryPosition: EntryPosition.BR,
  //   }),
  //   // embedded wallet end
  //   // aa config start
  //   aa({
  //     name: "BICONOMY",
  //     version: "2.0.0",
  //   }),
  //   // aa config end
  // ],
  chains: supportChains as unknown as readonly [Chain, ...Chain[]],
});

// Wrap your application with this component.
export const ParticleConnectkit = ({ children }: React.PropsWithChildren) => {
  return <ConnectKitProvider config={config}>{children}</ConnectKitProvider>;
};
