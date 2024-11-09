"use client";

import { use, useEffect, useState } from "react";
import { CopyCheckIcon, CopyIcon, RefreshCwIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { useKlasterContext } from "@/context/KlasterContext";
import { useAccount } from "@particle-network/connectkit";
import { Address, Chain, formatEther } from "viem";
import {
  KlasterSDK,
  AccountInitData,
  MultichainClient,
  BicoV2AccountInitParams,
  MultichainAccount,
} from "klaster-sdk";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const allocationData = [
  {
    chain: "Ethereum",
    amount: 352.32,
    color: "bg-blue-500",
    icon: "/icons/eth.png",
  },
  {
    chain: "Arbitrum",
    amount: 559.78,
    color: "bg-purple-500",
    icon: "/icons/arbitrum.png",
  },
  {
    chain: "Optimism",
    amount: 94.02,
    color: "bg-red-500",
    icon: "/icons/optimism.png",
  },
  { chain: "Base", amount: 0, color: "bg-blue-300", icon: "/icons/base.png" },
];

export function UnifiedBalance() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [universalAddress, setUniversalAddress] = useState<Address>();
  const [unifiedEthBalance, setUnifiedEthBalance] = useState(0);
  const [usdUnifiedEthBalance, setUsdUnifiedEthBalance] = useState(0);

  const { klaster, mcClient, nodeFeeChain, setNodeFeeChain } =
    useKlasterContext();
  const { chain } = useAccount();

  const handleCopy = () => {
    navigator.clipboard.writeText(universalAddress as string);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  async function getEthPrice(): Promise<number> {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
      );
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      console.log(data);
      return data.ethereum.usd;
    } catch (error) {
      console.log(error);
      return 0;
    }
  }

  async function getData(mcClient: MultichainClient, chain: Chain) {
    setUniversalAddress(klaster?.account.getAddress(chain.id));
    const unifiedEthBalance = await mcClient.getUnifiedNativeBalance({
      account: klaster?.account as MultichainAccount,
    });
    console.log("Unified ETH Balance", unifiedEthBalance);
    const balance = formatEther(unifiedEthBalance);
    setUnifiedEthBalance(Number(balance));
    const ethPrice = await getEthPrice();
    setUsdUnifiedEthBalance(Number(balance) * ethPrice);
  }

  async function handleRefresh() {
    setIsSpinning(true);
    await getData(mcClient as MultichainClient, chain as Chain);
    setIsSpinning(false);
  }

  useEffect(() => {
    if (!klaster || !mcClient || !chain) return;
    else {
      console.log("MC Client", mcClient);
      console.log("klaster", klaster);
      getData(mcClient, chain);
    }
  }, [klaster, mcClient, chain]);

  return (
    <div className="bg-muted py-4 rounded-lg">
      <h3 className="font-bold text-3xl mb-4">Unified ETH Balance</h3>
      <div className="text-white flex gap-8">
        <Card className="flex-1 p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-2 items-center">
              <div className="bg-gradient-to-r from-purple-500 to-purple-700 rounded-full h-16 w-16 flex items-center justify-center mr-2">
                {/* Content inside the circle, if any */}
              </div>
              <div>
                <p className="text-lg font-semibold">Universal Account</p>
                <div className="flex items-center gap-4">
                  <p className="text-sm text-gray-500">{universalAddress}</p>
                  <button
                    onClick={handleCopy}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {isCopied ? (
                      <CopyCheckIcon className="text-green-500 h-4 w-4" />
                    ) : (
                      <CopyIcon className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <button
              onClick={handleRefresh}
              className="focus:outline-none"
              aria-label="Refresh balance"
            >
              <RefreshCwIcon
                className={`w-6 h-6 font-bold text-gray-400 transition-transform duration-1000 ease-in-out ${
                  isSpinning ? "animate-spin" : ""
                }`}
              />
            </button>
          </div>
          <div className="flex justify-between px-4">
            <div className="flex gap-2 mt-2 items-center">
              <p className="text-lg text-gray-700 mr-2">Available Chains :</p>
              {allocationData.map((item) => (
                <img
                  key={item.chain}
                  src={item.icon}
                  className="w-6 h-6 rounded-full"
                ></img>
              ))}
            </div>
            <div className="flex items-center">
              <p className="text-md font-semibold mr-4">Pay Gas on : </p>
              <Select
                value={nodeFeeChain}
                onValueChange={(value) => {
                  console.log("Selected Chain", value);
                  setNodeFeeChain(value);
                }}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select Chain" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mainnet">Mainnet</SelectItem>
                  <SelectItem value="arbitrum">Arbitrum</SelectItem>
                  <SelectItem value="optimism">Optimism</SelectItem>
                  <SelectItem value="base">Base</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex w-full justify-end px-4 mt-2 items-center">
            <p className="text-md font-semibold mr-4">Gas Token : </p>
            <Select value={"eth"}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select Chain" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="eth">ETH</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1 mt-12 ml-2">
            <div className="flex">
              <span className="text-4xl font-bold">
                ${usdUnifiedEthBalance.toFixed(2)}
              </span>
            </div>
            <div>
              <span className="text-lg text-gray-700">
                {unifiedEthBalance.toFixed(6)} ETH
              </span>
              {/* <span className="text-sm text-green-500 ml-1">+2.24%</span> */}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
