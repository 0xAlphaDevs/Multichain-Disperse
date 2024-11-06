import {
  buildMultichainReadonlyClient,
  buildRpcInfo,
  initKlaster,
  klasterNodeHost,
} from "klaster-sdk";
import { createWalletClient, custom, http } from "viem";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { arbitrum, base, optimism, polygon, scroll } from "viem/chains";

// When in browser environment create a signer
// which uses the injected wallet (e.g. MetaMask, Rabby, ...)
const signer = createWalletClient({
  transport: custom((window as any).ethereum),
});

// When in non-browser environment you can use private key
// to sign messages.
// const privateKey = generatePrivateKey();
// const signerAccount = privateKeyToAccount(privateKey);
// const signer = createWalletClient({
//   transport: http(),
// });
