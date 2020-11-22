import { EthereumTransactionData } from "bnc-sdk/dist/types/src/interfaces";
import { ethers, Wallet } from "ethers";

export type MemPoolTx = EthereumTransactionData;
export type Address = string;
export type TransactionData = ethers.utils.Deferrable<
    ethers.providers.TransactionRequest
>;
export type TransactionReceipt = ethers.providers.TransactionReceipt;
export type TransactionResponse = ethers.providers.TransactionResponse;

export interface PairInfo {
    address: string;
    reserveETH: number;
    token0Price?: number;
    token1Price?: number;
    reserve0: number;
    reserve1: number;
    token0: string;
    token1: string;
    token0Name?: string;
    token1Name?: string;
    token0Symbol?: string;
    token1Symbol?: string;
    wethReserve?: number;
    tokenReserve?: number;
}

export interface TargetTxInfo {
    hash: string;
    amountIn: number;
    amountOut: number;
    pair: PairInfo;
    token: Address;
    gasPrice: number;
    timestamp: number;
    onSpeedUp?: (newTx: TargetTxInfo) => void;
    onCancel?: () => void;
    onMined?: () => void;
}

export interface Signer {
    nonce: number;
    balance: number;
    wallet: Wallet;
    sendTransaction: (tx: TransactionData) => Promise<TransactionResponse>;
    speedUpTransaction: (
        tx: TransactionData,
        newGasPrice: number
    ) => Promise<TransactionResponse>;
    cancelTransaction: (tx: TransactionData) => Promise<TransactionResponse>;
    currentTxNonces: Set<number>;
}

export interface Trade {
    txBuy: TransactionData;
    txSell: TransactionData;
    buyer: Signer;
    seller: Signer;
    targetTxInfo: TargetTxInfo;
    maxProfit: number;
    buyHash: string;
    sellHash: string;
    status: "started" | "closed" | "cancelling" | 'bought' | 'sold' | 'error' | 'fallback_selling';
    speedUp: (newGasPrice?: number, newSellGasPrice?: number) => void;
    cancel: () => void;
}

export interface BotTxInfo {
    data: string;
    address: string;
    timestamp: number;
    hash: string;
    gasPrice: number;
    from: string;
    to: string;
    nonce: number;
}
