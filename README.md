# react-keplr

This project provides integration between React and Keplr Wallet for blockchain connection. With this project, you can use Keplr Wallet across all dapp components and perform basic functions such as sending signed transactions and querying the blockchain.

## Installation

To install this project, simply run:

```
npm install react-keplr
```

## Basic Usage

To use the Keplr Wallet in your app, wrap your app with the `SigningCosmWasmProvider` component. This will give you access to custom hooks that allow you to call the wallet and execute transactions in any space.


```jsx
export default function App(props: Properties) {
  const { Component, pageProps } = props;

  return (
    <SigningCosmWasmProvider>
      <Head>
        <title>NFText</title>
      </Head>
      <Component {...pageProps} />
    </SigningCosmWasmProvider>
  );
}
```

Here are the available hooks:

- `useWalletAddress`: Returns the current wallet address.
- `useClient`: Returns the current client.
- `useSigningClient`: Returns the current signing client.
- `useLoading`: Returns a boolean indicating whether a request is loading.
- `useError`: Returns any errors that occurred during a request.
- `useConnectWallet`: Connects the wallet to the app.
- `useDisconnect`: Disconnects the wallet from the app.

Here's an example of how to use these hooks:

```jsx
import { KeplrProvider, useWalletAddress, useSigningClient } from 'react-keplr';

...
const { connectWallet, signingClient } = useSigningClient();

  useEffect(() => {
    connectWallet();
  }, []);

  ...

  function handleMinting() {
    signingClient
      ?.execute(
        walletAddress,
        cw721Address,
        {
          mint: {
            token_id: token_id.toString(),
            owner: `${walletAddress}`,
            token_uri: `data:application/json;base64, ${encodedMetadata}`,
          },
        },
        calculateFee(600_000, "20uconst")
      )
      .then((response: any) => {
        dappState.setOff();
        alert("Successfully minted!");
      })
  }


```

## chain-info.json example
```jsx
// https://docs.keplr.app/api/suggest-chain.html

const DENOM_MINI = process.env.NEXT_PUBLIC_STAKING_DENOM;
const DENOM = DENOM_MINI?.substring(1).toUpperCase();
const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID;
const CHAIN_NAME = process.env.NEXT_PUBLIC_CHAIN_NAME;
const RPC = process.env.NEXT_PUBLIC_CHAIN_RPC_ENDPOINT;
const REST = process.env.NEXT_PUBLIC_CHAIN_REST_ENDPOINT;
const BECH32 = process.env.NEXT_PUBLIC_CHAIN_BECH32_PREFIX;
const NEXT_PUBLIC_FAUCET = process.env.NEXT_PUBLIC_FAUCET;

const chainInfo = {
  chainId: CHAIN_ID,
  chainName: CHAIN_NAME,
  rpc: RPC,
  rest: REST,
  stakeCurrency: {
    coinDenom: DENOM,
    coinMinimalDenom: DENOM_MINI,
    coinDecimals: 6,
  },
  bip44: {
    coinType: 118,
  },
  bech32Config: {
    bech32PrefixAccAddr: BECH32,
    bech32PrefixAccPub: `${BECH32}pub`,
    bech32PrefixValAddr: `${BECH32}valoper`,
    bech32PrefixValPub: `${BECH32}valoperpub`,
    bech32PrefixConsAddr: `${BECH32}valcons`,
    bech32PrefixConsPub: `${BECH32}valconspub`,
  },
  currencies: [
    {
      coinDenom: DENOM,
      coinMinimalDenom: DENOM_MINI,
      coinDecimals: 6,
      // You can get id from https://api.coingecko.com/api/v3/coins/list if it is listed.
      // coinGeckoId: ""
    },
  ],
  feeCurrencies: [
    {
      coinDenom: DENOM,
      coinMinimalDenom: DENOM_MINI,
      coinDecimals: 6,
    },
  ],
  coinType: 118,
  gasPriceStep: {
    low: 0,
    average: 0.1,
    high: 0.2,
  },
  faucets: [NEXT_PUBLIC_FAUCET],
  features: ["cosmwasm"],
};

export default chainInfo;

```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
```