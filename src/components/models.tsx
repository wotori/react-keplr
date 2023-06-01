import {
  SigningCosmWasmClient,
  CosmWasmClient,
} from "@cosmjs/cosmwasm-stargate";
import { ChainInfo } from "@keplr-wallet/types";

type ConnectWalletFunction = () => Promise<void>;
type DisconnectFunction = () => void;

export interface ISigningCosmWasmClientContext {
  walletAddress: string;
  client: CosmWasmClient | null;
  signingClient: SigningCosmWasmClient | null;
  loading: boolean;
  error: null;
  connectWallet: ConnectWalletFunction | null;
  disconnect: DisconnectFunction | null;
  networkConfig: ChainInfo | null;
}
