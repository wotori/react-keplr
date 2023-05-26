import { NetworkConfig } from "./models";
import { Window as KeplrWindow } from "@keplr-wallet/types";

// https://docs.keplr.app/api/suggest-chain.html
export function convertFromMicroDenom(denom: string) {
  return denom?.substring(1).toUpperCase();
}

declare let window: KeplrWindow;

export const connectKeplr = async (
  counter: number,
  chainInfo: NetworkConfig
) => {
  if (!window.getOfflineSigner || !window.keplr) {
    if (counter > 1) {
      alert(
        "Install keplr extension. Without It you will be unable to login, mint tokens and use other amazing features."
      );
    }
  } else {
    try {
      console.log("keplr connection\nnetwork settings:", chainInfo);
      await window.keplr.experimentalSuggestChain(chainInfo);
    } catch {
      alert("Failed to suggest the chain");
    }
  }
};
