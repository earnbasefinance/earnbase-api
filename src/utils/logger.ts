import winston from "winston";
const { format } = winston;
const { NODE_ENV } = process.env;

// winston.addColors(custom.colors);
export const myFormat = format.printf(
    info => `[${info.timestamp}] [${info.level}] [38;5;13m[1m=>[22m[39m ${info.message}`
);

export const logger = winston.createLogger({
    // levels: custom.levels,
    level: NODE_ENV === "production" ? "error" : "debug",
    format: format.combine(
        format.label({ label: "order-api errors" }),
        format.timestamp(),
        // format.colorize({ colors: custom.colors }),
        format.json(),
        myFormat
    ),

    transports: [
        new winston.transports.File({ filename: "info.log", level: "debug" }),
        new winston.transports.File({ filename: "error.log", level: "error" }),
        new winston.transports.File({ filename: "combined.log" }),
        new winston.transports.Console({
            level: NODE_ENV === "production" ? "error" : "debug",
        }),
    ],
});
