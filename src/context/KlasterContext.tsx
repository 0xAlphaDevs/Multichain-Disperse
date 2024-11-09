import React, { createContext, useContext, useEffect, useState } from "react";
import {
  AccountInitData,
  BicoV2AccountInitParams,
  buildMultichainReadonlyClient,
  buildRpcInfo,
  initKlaster,
  klasterNodeHost,
  KlasterSDK,
  loadBiconomyV2Account,
  loadSafeV141Account,
  mcUSDC,
  mcUSDT,
  MultichainClient,
  MultichainTokenMapping,
} from "klaster-sdk";
import { createWalletClient, custom, Transport, WalletClient } from "viem";
import { useAccount } from "@particle-network/connectkit";
import { base, optimism, mainnet, arbitrum } from "viem/chains";

interface KlasterContextProps {
  klaster: KlasterSDK<AccountInitData<BicoV2AccountInitParams>> | undefined;
  mcClient: MultichainClient | undefined;
  signer: WalletClient<Transport> | undefined;
  nodeFeeChain: string;
  setNodeFeeChain: (chain: string) => void;
}

interface KlasterProviderProps {
  children: React.ReactNode;
}

// create a context for the Klaster SDK
const KlasterContext = createContext<KlasterContextProps>({
  klaster: undefined,
  mcClient: undefined,
  signer: undefined,
  nodeFeeChain: "base",
  setNodeFeeChain: () => {},
});

// create a provider for the Klaster SDK

export const KlasterProvider: React.FC<KlasterProviderProps> = ({
  children,
}) => {
  const [klaster, setKlaster] =
    useState<KlasterSDK<AccountInitData<BicoV2AccountInitParams>>>();
  const [mcClient, setMcClient] = useState<MultichainClient>();
  const [signer, setSigner] = useState<WalletClient<Transport>>();
  const [nodeFeeChain, setNodeFeeChain] = useState<string>("base");
  const { isConnected } = useAccount();

  useEffect(() => {
    console.log("isConnected", isConnected);
    if (!isConnected) return;
    console.log("setting up klaster context");
    (async () => {
      const signer = createWalletClient({
        transport: custom((window as any).ethereum),
      });

      setSigner(signer);

      const [address] = await signer.getAddresses();

      const klaster = await initKlaster({
        accountInitData: loadBiconomyV2Account({
          owner: address, // Fetch
        }),
        nodeUrl: klasterNodeHost.default,
      });

      setKlaster(klaster);

      // const mcClient = buildMultichainReadonlyClient(
      //   [optimism, base, mainnet, arbitrum].map((x) => {
      //     return {
      //       chainId: x.id,
      //       rpcUrl: x.rpcUrls.default.http[0],
      //     };
      //   })
      // );

      const mcClient = buildMultichainReadonlyClient([
        { chainId: 1, rpcUrl: "https://1rpc.io/eth" },
        { chainId: 42161, rpcUrl: "https://arb1.arbitrum.io/rpc" },
        { chainId: 10, rpcUrl: "https://mainnet.optimism.io" },
        { chainId: 8453, rpcUrl: "	https://mainnet.base.org" },
      ]);

      setMcClient(mcClient);
    })();
  }, [isConnected]);

  return (
    <KlasterContext.Provider
      value={{ klaster, mcClient, signer, nodeFeeChain, setNodeFeeChain }}
    >
      {children}
    </KlasterContext.Provider>
  );
};

// Custom hook for easier context access
export const useKlasterContext = (): KlasterContextProps => {
  const context = useContext(KlasterContext);
  if (!context) {
    throw new Error("useKlasterContext must be used within KlasterProvider");
  }
  return context;
};
