import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
