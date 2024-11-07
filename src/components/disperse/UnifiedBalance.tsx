"use client";

import { useState } from "react";
import { RefreshCwIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";

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
  const totalBalance = allocationData.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  const handleRefresh = () => {
    setIsSpinning(true);
    // Simulating a refresh action
    setTimeout(() => setIsSpinning(false), 1000);
  };

  return (
    <div className="bg-muted py-4 rounded-lg">
      <h3 className="font-medium mb-2">Unified ETH Balance</h3>
      <div className="text-white flex gap-8">
        <Card className="flex-1 rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-sm text-gray-400">Universal Account</p>
              <p className="text-xs text-gray-500">0x5a28...5278</p>
            </div>
            <button
              onClick={handleRefresh}
              className="focus:outline-none"
              aria-label="Refresh balance"
            >
              <RefreshCwIcon
                className={`w-4 h-4 text-gray-400 transition-transform duration-1000 ease-in-out ${
                  isSpinning ? "animate-spin" : ""
                }`}
              />
            </button>
          </div>
          <div className="flex flex-col">
            <div className="flex">
              <span className="text-3xl font-bold">
                ${totalBalance.toFixed(2)}
              </span>
            </div>
            <div>
              <span className="text-sm text-green-500">+$22.39</span>
              <span className="text-xs text-green-500 ml-1">+2.24%</span>
            </div>
          </div>
        </Card>

        <Card className="flex-1 rounded-lg p-4">
          <h4 className="text-sm font-medium mb-2">Allocation</h4>
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
