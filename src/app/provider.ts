import { providers } from "ethers";
import { INFURA_KEY } from "./config";

export const provider = new providers.WebSocketProvider(
    `wss://mainnet.infura.io/ws/v3/${INFURA_KEY}`
);
export const getProvider = () => provider;
