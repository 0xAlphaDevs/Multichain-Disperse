import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Address } from "viem";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function chainIdToChainName(chainId: string) {
  switch (chainId) {
    case "1":
      return "Ethereum";
    case "10":
      return "Optimism";
    case "8453":
      return "Base";
    case "42161":
      return "Arbitrum";
    default:
      return "Unknown";
  }
}

export function chainNameToChainId(chainName: string): number {
  switch (chainName.toLowerCase()) {
    case "mainnet":
      return 1;
    case "optimism":
      return 10;
    case "base":
      return 8453;
    case "arbitrum":
      return 42161;
    default:
      return 8453;
  }
}

export function getTokenAddress(
  chain: string,
  selectedToken: string,
  receiver: Address
): Address {
  const tokenAddresses: { [key: string]: { [key: string]: Address } } = {
    mainnet: {
      usdt: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      usdc: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    },
    optimism: {
      usdt: "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58",
      usdc: "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85",
    },
    base: {
      usdt: "0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2",
      usdc: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    },
    arbitrum: {
      usdt: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
      usdc: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
    },
  };

  const chainKey = chain.toLowerCase();
  const tokenKey = selectedToken.toLowerCase();

  return tokenAddresses[chainKey]?.[tokenKey] || receiver;
}
