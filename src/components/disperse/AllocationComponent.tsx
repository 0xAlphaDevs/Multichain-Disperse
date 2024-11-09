import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "../ui/progress";
import { useKlasterContext } from "@/context/KlasterContext";
import {
  mcUSDC,
  mcUSDT,
  MultichainAccount,
  MultichainClient,
  MultichainTokenMapping,
  UnifiedBalanceResult,
} from "klaster-sdk";
import { formatEther, formatUnits } from "viem";

interface AllocationData {
  chain: string;
  amount: number;
  icon: string;
}

const AllocationComponent = ({ token }: { token: string }) => {
  const [unifiedBalance, setUnifiedBalance] = useState<UnifiedBalanceResult>({
    balance: BigInt(0),
    decimals: 18,
    breakdown: [],
  });
  const [allocationData, setAllocationData] = useState<AllocationData[]>([]);

  const { klaster, mcClient } = useKlasterContext();

  const intersectTokenAndClients = (
    token: MultichainTokenMapping,
    mcClient: MultichainClient
  ) => {
    return token.filter((deployment) =>
      mcClient.chainsRpcInfo
        .map((info) => info.chainId)
        .includes(deployment.chainId)
    );
  };

  async function getData() {
    let tokenMapping;

    if (token == "usdc") {
      tokenMapping = intersectTokenAndClients(
        mcUSDC,
        mcClient as MultichainClient
      );
      console.log("Token Mapping", tokenMapping);
    }
    if (token == "usdt") {
      tokenMapping = intersectTokenAndClients(
        mcUSDT,
        mcClient as MultichainClient
      );
      console.log("Token Mapping", tokenMapping);
    }

    const unifiedBalance = await mcClient?.getUnifiedErc20Balance({
      tokenMapping: tokenMapping as MultichainTokenMapping,
      account: klaster?.account as MultichainAccount,
    });
    console.log("Unified Balance", unifiedBalance);
    let allocationDataArray = unifiedBalance?.breakdown.map((item) => {
      switch (item.chainId) {
        case 1:
          return {
            chain: "Ethereum",
            amount: formatUnits(item.amount, unifiedBalance.decimals),
            icon: "/icons/eth.png",
          };
        case 42161:
          return {
            chain: "Arbitrum",
            amount: formatUnits(item.amount, unifiedBalance.decimals),
            icon: "/icons/arbitrum.png",
          };
        case 10:
          return {
            chain: "Optimism",
            amount: formatUnits(item.amount, unifiedBalance.decimals),
            icon: "/icons/optimism.png",
          };
        case 8453:
          return {
            chain: "Base",
            amount: formatUnits(item.amount, unifiedBalance.decimals),
            icon: "/icons/base.png",
          };
        default:
          return { chain: "Unknown", amount: 0, icon: "/icons/unknown.png" };
      }
    });

    setUnifiedBalance(unifiedBalance as UnifiedBalanceResult);
    setAllocationData(allocationDataArray as AllocationData[]);
  }

  useEffect(() => {
    if (!klaster || !mcClient) return;
    else {
      getData();
    }
  }, [klaster, mcClient, token]);

  return (
    <div className="flex justify-between w-full">
      <p className="text-gray-600 font-semibold">
        {" Unified Balance : "}
        {formatUnits(
          unifiedBalance?.balance as bigint,
          unifiedBalance?.decimals as number
        )}{" "}
        {token.toUpperCase()}
      </p>
      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm" variant="outline" className="">
            View {token.toUpperCase()} Allocation
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{token.toUpperCase()} Token Allocation</DialogTitle>
            <DialogDescription>
              <div className="space-y-2 py-4">
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
                      <span className="text-xs">${item.amount}</span>
                    </div>
                    <Progress
                      value={
                        (item.amount /
                          Number(
                            formatUnits(
                              unifiedBalance?.balance as bigint,
                              unifiedBalance?.decimals as number
                            )
                          )) *
                        100
                      }
                      className="h-1"
                    />
                  </div>
                ))}
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AllocationComponent;
