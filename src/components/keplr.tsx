// https://docs.keplr.app/api/suggest-chain.html
import fs from "fs";
const chainInfo = JSON.parse(fs.readFileSync("chain-info.json", "utf8"));
export function convertFromMicroDenom(denom: string) {
  return denom?.substring(1).toUpperCase();
}

interface CosmosKeplrWindow extends Window {
  keplr: any;
  getOfflineSigner: Function;
}

declare let window: CosmosKeplrWindow;

export const connectKeplr = async (counter: number) => {
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
