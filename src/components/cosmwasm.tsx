import React from "react";
import { createContext, useContext, ReactNode } from "react";
import { useSigningCosmWasmClient } from "./hooks";
import { ISigningCosmWasmClientContext, NetworkConfig } from "./models";

const CosmWasmContext = createContext<ISigningCosmWasmClientContext>({
  walletAddress: "",
  client: null,
  signingClient: null,
  loading: false,
  error: null,
  connectWallet: null,
  disconnect: null,
  networkConfig: null,
});

const { Provider } = CosmWasmContext;

export const useSigningClient = (): ISigningCosmWasmClientContext =>
  useContext(CosmWasmContext);

export const SigningCosmWasmProvider = ({
  children,
  networkConfig,
}: {
  children: ReactNode;
  networkConfig: NetworkConfig;
}) => {
  const value = useSigningCosmWasmClient(networkConfig);
  return <Provider value={value}>{children}</Provider>;
};
