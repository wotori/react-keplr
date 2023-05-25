import React from "react";
import { createContext, useContext, ReactNode } from "react";
import { useSigningCosmWasmClient } from "./hooks";
import { ISigningCosmWasmClientContext } from "./models";

const CosmWasmContext = createContext<ISigningCosmWasmClientContext>({
  walletAddress: "",
  client: null,
  signingClient: null,
  loading: false,
  error: null,
  connectWallet: () => {},
  disconnect: () => {},
});

const { Provider } = CosmWasmContext;

export const useSigningClient = (): ISigningCosmWasmClientContext =>
  useContext(CosmWasmContext);

export const SigningCosmWasmProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const value = useSigningCosmWasmClient();
  return <Provider value={value}>{children}</Provider>;
};
