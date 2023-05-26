import {
  ISigningCosmWasmClientContext,
  NetworkConfig,
} from "./components/models";

declare module "react-keplr" {
  export function useSigningClient(): ISigningCosmWasmClientContext;
  export const SigningCosmWasmProvider: React.FC<{
    networkConfig: NetworkConfig;
  }>;
}
