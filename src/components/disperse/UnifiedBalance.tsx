"use client";

import { use, useEffect, useState } from "react";
import { CopyCheckIcon, CopyIcon, RefreshCwIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { useKlasterContext } from "@/context/KlasterContext";

const address = "0xtebuj8o75efnji8900iug" // TO DO : pass the dynamic address

const allocationData = [
  {
    chain: "Arbitrum",
    amount: 559.78,
    color: "bg-purple-500",
    icon: "/icons/arbitrum.png",
  },
  {
    chain: "Ethereum",
    amount: 352.32,
    color: "bg-blue-500",
    icon: "/icons/eth.png",
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
  const totalBalance = allocationData.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  const { klaster, mcClient } = useKlasterContext();

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleRefresh = () => {
    setIsSpinning(true);
    // Simulating a refresh action
    setTimeout(() => setIsSpinning(false), 1000);
  };

  useEffect(() => {
    if (!klaster || !mcClient) return;
    else {
      console.log("MC Client", mcClient);
      console.log("klaster", klaster);
    }
  }, [klaster, mcClient]);

  return (
    <div className="bg-muted py-4 rounded-lg">
      <h3 className="font-bold text-3xl mb-4">Unified ETH Balance</h3>
      <div className="text-white flex gap-8">
        <Card className="flex-1 p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-2 items-center">
              <div className="bg-gradient-to-r from-purple-500 to-purple-700 rounded-full h-16 w-16 flex items-center justify-center">
                {/* Content inside the circle, if any */}
              </div>
              <div>
                <p className="text-lg font-semibold">Universal Account</p>
                <div className="flex items-center gap-4">
                  <p className="text-sm text-gray-500">{address}</p>
                  <button onClick={handleCopy} className="text-gray-500 hover:text-gray-700">
                    {isCopied ? <CopyCheckIcon className="text-green-500 h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
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
                className={`w-6 h-6 font-bold text-gray-400 transition-transform duration-1000 ease-in-out ${isSpinning ? "animate-spin" : ""
                  }`}
              />
            </button>
          </div>
          <div className="flex flex-col gap-1 mt-12">
            <div className="flex">
              <span className="text-4xl font-bold">
                ${totalBalance.toFixed(2)}
              </span>
            </div>
            <div>
              <span className="text-sm text-green-500">+$22.39</span>
              <span className="text-sm text-green-500 ml-1">+2.24%</span>
            </div>
          </div>
        </Card>

        <Card className="flex-1 p-4">
          <h4 className="text-xl font-semibold mb-4">Allocation</h4>
          <div className="space-y-2">
            {allocationData.map((item) => (
              <div key={item.chain} className="space-y-1">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <img
                      src={`${item.icon}`}
                      className={`w-6 h-6 rounded-full mr-2`}
                    ></img>
                    <span className="text-xs">{item.chain}</span>
                  </div>
                  <span className="text-xs">${item.amount.toFixed(2)}</span>
                </div>
                <Progress
                  value={(item.amount / totalBalance) * 100}
                  className="h-1"
                />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
