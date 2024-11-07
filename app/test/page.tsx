"use client";

import Button from "@/components/demo/modules/Button";
import { ConnectButton, useAccount } from "@particle-network/connectkit";
import {
  base,
  isEVMChain,
  optimism,
  mainnet,
  arbitrum,
} from "@particle-network/connectkit/chains";
import {
  buildMultichainReadonlyClient,
  buildRpcInfo,
  initKlaster,
  klasterNodeHost,
  loadBiconomyV2Account,
  loadSafeV141Account,
  mcUSDC,
  mcUSDT,
  MultichainClient,
  MultichainTokenMapping,
} from "klaster-sdk";
import { createWalletClient, custom } from "viem";

export default function Component() {
  const { isConnected, chain } = useAccount();

  async function handleClick() {
    console.log("Button Clicked");
    const signer = createWalletClient({
      transport: custom((window as any).ethereum),
    });

    const [address] = await signer.getAddresses();

    console.log("Signer Address", address);

    const klaster = await initKlaster({
      accountInitData: loadBiconomyV2Account({
        owner: address, // Fetch
      }),
      nodeUrl: klasterNodeHost.default,
    });

    const mcClient = buildMultichainReadonlyClient(
      [optimism, base, mainnet, arbitrum].map((x) => {
        return {
          chainId: x.id,
          rpcUrl: x.rpcUrls.default.http[0],
        };
      })
    );

    console.log("MC Client", mcClient);
    console.log(
      "do token and client intersect?",
      intersectTokenAndClients(mcUSDC, mcClient)
    );
    console.log(
      "do token and client intersect?",
      intersectTokenAndClients(mcUSDT, mcClient)
    );
  }

  async function handleUnifiedBalance() {
    console.log("Button Clicked");
    const signer = createWalletClient({
      transport: custom((window as any).ethereum),
    });

    const [address] = await signer.getAddresses();

    console.log("Signer Address", address);

    const klaster = await initKlaster({
      accountInitData: loadBiconomyV2Account({
        owner: address, // Fetch
      }),
      nodeUrl: klasterNodeHost.default,
    });

    console.log("Klaster account", klaster);

    const mcClient = buildMultichainReadonlyClient(
      [optimism, base, mainnet, arbitrum].map((x) => {
        return {
          chainId: x.id,
          rpcUrl: x.rpcUrls.default.http[0],
        };
      })
    );

    // console.log("MC Client", mcClient);
    // console.log(
    //   "do token and client intersect?",
    //   intersectTokenAndClients(mcUSDC, mcClient)
    // );
    // console.log(
    //   "do token and client intersect?",
    //   intersectTokenAndClients(mcUSDT, mcClient)
    // );

    const tokenMapping = intersectTokenAndClients(mcUSDC, mcClient);
    console.log("Token Mapping", tokenMapping);

    const uBalance = await mcClient.getUnifiedErc20Balance({
      tokenMapping: tokenMapping,
      account: klaster.account,
    });

    console.log("Unified Balance", uBalance);
  }

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

  return (
    <div className="flex flex-col min-h-screen">
      <header className="fixed top-0 left-0 right-0 flex items-center justify-between py-4 px-8 bg-purple-900 text-white z-10">
        <p className="text-lg font-bold">Multichain Disperse</p>
        <ConnectButton />
      </header>
      <main className="flex-grow flex justify-center items-center p-8 mt-16">
        {isConnected && chain && isEVMChain(chain) ? (
          <>
            {" "}
            <div>Test : {chain.name}</div>
            <Button onClick={handleClick}>Test</Button>
            <Button onClick={handleUnifiedBalance}>
              Fetch Unified Balance
            </Button>
          </>
        ) : (
          <div className="flex flex-col items-center gap-4 justify-center text-center">
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
  );
}
