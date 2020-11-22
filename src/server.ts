import http from "http";
import { start } from "./express";
import { logger } from "./utils/logger";

const app = start(process.env.NODE_ENV || "development");
const port = process.env.PORT || 4000;
const server = http.createServer(app);

server.listen(Number(port), () => {
    logger.info("server up and running");
    logger.info(`at: http://localhost:${port}`);
    logger.info(`as ${process.env.NODE_ENV}`);
});
