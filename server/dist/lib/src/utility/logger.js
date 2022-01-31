"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const winston_1 = __importDefault(require("winston"));
// winston default logging levels { error: 0, warn: 1, info: 2, http: 3, debug: 4 }
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};
const level = () => {
    const env = process.env.NODE_ENV || "development";
    const isDevelopment = env === "development";
    return isDevelopment ? "debug" : "warn";
};
exports.Logger = winston_1.default.createLogger({
    level: level(),
    levels,
    format: winston_1.default.format.combine(winston_1.default.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }), winston_1.default.format.colorize({ all: true }), winston_1.default.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)),
    transports: [
        new winston_1.default.transports.Console({
            level: "debug",
        }),
        new winston_1.default.transports.File({
            level: "error",
            // Create the log directory if it does not exist
            filename: "logs/error.log",
        }),
    ],
    //transports: [new winston.transports.Console()]
});
winston_1.default.addColors({
    error: "red",
    warn: "yellow",
    info: "green",
    http: "magenta",
    debug: "white",
});
//# sourceMappingURL=logger.js.map