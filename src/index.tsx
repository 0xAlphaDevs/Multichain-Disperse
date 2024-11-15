"use client";

import { ConnectButton, useAccount } from "@particle-network/connectkit";
import { isEVMChain } from "@particle-network/connectkit/chains";
import { UnifiedBalance } from "./components/disperse/UnifiedBalance";
import { DisperseTabs } from "./components/disperse/DisperseTabs";
import { Button } from "./components/ui/button";
import { KlasterProvider } from "./context/KlasterContext";

export default function Component() {
  const { isConnected, chain } = useAccount();

  return (
    <KlasterProvider>
      <div className="flex flex-col min-h-screen">
        <header className="fixed top-0 left-0 right-0 flex items-center justify-between py-4 px-8 bg-white z-10">
          <p className="text-2xl font-semibold text-purple-700">Multichain Disperse</p>
          <ConnectButton />
        </header>
        <main className="mt-16 w-full">
          {isConnected && chain && isEVMChain(chain) ? (
            <div className="flex flex-col gap-4 w-full px-52 pt-8">
              {/* <div className="">
                <p className="text-3xl text-purple-500 font-semibold">
                  Multichain Disperse
                </p>
                <p className="text-gray-400 text-sm">
                  Chain Abstracted Disperse App. Instant multi chain token
                  transfer in single zap.
                </p>
              </div> */}
              <div className="space-y-6 pb-10">
                <UnifiedBalance />
                <DisperseTabs />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 justify-center text-center mt-48">
              <p className="text-lg">
                Please connect your wallet to get started with
              </p>
              <p className="font-semibold text-5xl text-purple-600">
                Multichain Disperse
              </p>
            </div>
          )}
        </main>
      </div>
    </KlasterProvider>
  );
}
