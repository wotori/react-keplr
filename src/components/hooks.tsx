import { useState } from "react";
import {
  SigningCosmWasmClient,
  CosmWasmClient,
} from "@cosmjs/cosmwasm-stargate";
import { connectKeplr } from "./keplr";
import { ISigningCosmWasmClientContext, NetworkConfig } from "./models";
import { GasPrice } from "@cosmjs/stargate";

export const useSigningCosmWasmClient = (
  networkConfig: NetworkConfig
): ISigningCosmWasmClientContext => {
  const [client, setClient] = useState<CosmWasmClient | null>(null);
  const [signingClient, setSigningClient] =
    useState<SigningCosmWasmClient | null>(null);
  const [walletAddress, setWalletAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [counter, setCounter] = useState(0);
  const connectWallet = async () => {
    setLoading(true);

    try {
      setCounter(counter + 1);
      connectKeplr(counter + 1, networkConfig);

      // enable website to access keplr
      await (window as any).keplr.enable(networkConfig.chainId);

      // get offline signer for signing txs
      const offlineSigner = await (window as any).getOfflineSigner(
        networkConfig.chainId
      );

      let gasPrice = GasPrice.fromString(
        "0.002" + "uconst" // TODO: take from config chain.info.js
      );
      setSigningClient(
        await SigningCosmWasmClient.connectWithSigner(
          networkConfig.rpc, // TODO: take from config chain.info.js
          offlineSigner,
          { gasPrice: gasPrice }
        )
      );

      // get user address
      const [{ address }] = await offlineSigner.getAccounts();
      setWalletAddress(address);

      setLoading(false);
    } catch (error: any) {
      setError(error);
    }

    try {
      setClient(await CosmWasmClient.connect(networkConfig.rpc));
    } catch (error: any) {
      alert(`Unable connect to: ${networkConfig.rpc}`);
    }
  };

  const disconnect = () => {
    if (signingClient) {
      signingClient.disconnect();
    }
    if (client) {
      setClient(null);
    }
    setWalletAddress("");
    setSigningClient(null);
    setLoading(false);
  };

  return {
    walletAddress,
    signingClient,
    loading,
    error,
    connectWallet,
    disconnect,
    client,
    networkConfig,
  };
};
