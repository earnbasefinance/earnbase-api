import { providers } from "ethers";
import { ALCHEMY_KEY } from "./config";

export const provider = new providers.WebSocketProvider(
    `wss://eth-mainnet.ws.alchemyapi.io/v2/${ALCHEMY_KEY}`
);
export const getProvider = () => provider;
