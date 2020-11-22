import { BigNumber } from "ethers";
import * as express from "express";
import { getStatusText, OK } from "http-status-codes";
import { getStats } from "../service/stats";

export function routes(): express.Router {
    const api: express.Router = express.Router();

    api.get("/", (req: express.Request, res: express.Response) => {
        return res
            .status(OK)
            .send({ success: true, message: getStatusText(OK) });
    });

    api.get("/supply", (req: express.Request, res: express.Response) => {
        return res.json(+getStats().supply.toString() / 10 ** 18);
    });

    api.get("/price", (req: express.Request, res: express.Response) => {
        return res.json(+getStats().price);
    });

    api.get("/total_supply", (req: express.Request, res: express.Response) => {
        return res.json(1000000);
    });

    return api;
}
