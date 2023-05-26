import {
  ISigningCosmWasmClientContext,
  NetworkConfig,
} from "./components/models";

export function useSigningClient(): ISigningCosmWasmClientContext;
export const SigningCosmWasmProvider: React.FC<{
  networkConfig: NetworkConfig;
}>;
