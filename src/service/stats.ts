import { BigNumber, Contract } from "ethers";
import PoolAbi from "../assets/PoolABI.json";
import ERC20Abi from "../assets/ERC20Abi.json";
import UniPairAbi from "../assets/UniPairAbi.json";
import { logger } from "../utils/logger";

import { provider } from "../app/provider";
import { Addresses } from "../app/config";

const stats = {
    blockNumber: 0,
    supply: BigNumber.from("0"),
    price: 0,
};

const getRemainingRewards = async (poolAddress: string) => {
    try {
        const poolContract = new Contract(poolAddress, PoolAbi, provider);
        const [rewardRate, finish, block] = await Promise.all([
            poolContract.rewardRate(),
            poolContract
                .periodFinish()
                .then((val: BigNumber) => val.toString()),
            provider.getBlock("latest"),
        ]);

        return rewardRate.mul(+finish - block.timestamp);
    } catch (e) {
        logger.error(e);
        return null;
    }
};

const getSupply = async () => {
    try {
        const enbContract = new Contract(
            Addresses.enbAddress,
            ERC20Abi,
            provider
        );
        const totalSupply: BigNumber = await enbContract.totalSupply();
        const investor: BigNumber = await enbContract.balanceOf(
            Addresses.investorVesting
        );
        const team: BigNumber = await enbContract.balanceOf(
            Addresses.teamVesting
        );
        const ecosystemRewards: BigNumber = await enbContract.balanceOf(
            Addresses.ecosystemRewardsVesting
        );
        const [govRewards, uniRewards, balRewards] = await Promise.all([
            getRemainingRewards(Addresses.govPoolAddress),
            getRemainingRewards(Addresses.uniLpPoolAddress),
            getRemainingRewards(Addresses.balLpPoolAddress),
        ]);

        const burned = BigNumber.from(10).pow(16).mul(1070266);

        return totalSupply
            .sub(investor)
            .sub(ecosystemRewards)
            .sub(team)
            .sub(govRewards || 0)
            .sub(uniRewards || 0)
            .sub(balRewards || 0)
            .sub(burned);
    } catch (e) {
        logger.error(e);
        return null;
    }
};

const getPrice = async () => {
    try {
        const enbEth = new Contract(
            Addresses.uniLpAddress,
            UniPairAbi,
            provider
        );
        const usdcEth = new Contract(
            "0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc",
            UniPairAbi,
            provider
        );

        const [enbEthReserves, usdcEthReserves] = await Promise.all([
            enbEth.getReserves(),
            usdcEth.getReserves(),
        ]);

        const ethPrice =
            (+usdcEthReserves[0].toString() * 10 ** 12) /
            +usdcEthReserves[1].toString();
        const ethPerEnb =
            +enbEthReserves[1].toString() / +enbEthReserves[0].toString();
        return ethPerEnb * ethPrice;
    } catch (e) {
        logger.error(e);
        return null;
    }
};

const updateStats = async (blockNumber: number) => {
    stats.blockNumber = blockNumber;
    stats.supply = (await getSupply()) || stats.supply;
    stats.price = (await getPrice()) || stats.price;
};

const handleNewBlock = (blockNumber: number) => {
    if (stats.blockNumber > blockNumber) return;
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    updateStats(blockNumber);
};

provider.on("block", handleNewBlock);

setInterval(() => {
    provider.off("block", handleNewBlock);
    provider.on("block", handleNewBlock);
}, 5 * 60 * 1000);

// eslint-disable-next-line @typescript-eslint/no-floating-promises
updateStats(0);

export const getStats = () => ({ ...stats });
