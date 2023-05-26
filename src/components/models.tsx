import {
  SigningCosmWasmClient,
  CosmWasmClient,
} from "@cosmjs/cosmwasm-stargate";

export interface NetworkConfig {
  chainId: string;
  chainName: string;
  rpc: string;
  rest: string;
  stakeCurrency: {
    coinDenom: string;
    coinMinimalDenom: string;
    coinDecimals: number;
  };
  bip44: {
    coinType: number;
  };
  bech32Config: {
    bech32PrefixAccAddr: string;
    bech32PrefixAccPub: string;
    bech32PrefixValAddr: string;
    bech32PrefixValPub: string;
    bech32PrefixConsAddr: string;
    bech32PrefixConsPub: string;
  };
  currencies: [
    {
      coinDenom: string;
      coinMinimalDenom: string;
      coinDecimals: number;
    }
  ];
  feeCurrencies: [
    {
      coinDenom: string;
      coinMinimalDenom: string;
      coinDecimals: number;
    }
  ];
  coinType: number;
  gasPriceStep: {
    low: number;
    average: number;
    high: number;
  };
  faucets: string[];
  features: string[];
}

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
  networkConfig: NetworkConfig | null;
}
