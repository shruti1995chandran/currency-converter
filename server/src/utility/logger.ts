import winston from "winston";

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

export const Logger = winston.createLogger({
  level: level(),
  levels,
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
    winston.format.colorize({ all: true }),
    winston.format.printf(
      (info) => `${info.timestamp} ${info.level}: ${info.message}`
    )
  ),
  transports: [
    new winston.transports.Console({
      level: "debug",
    }),
    new winston.transports.File({
      level: "error",
      // Create the log directory if it does not exist
      filename: "logs/error.log",
    }),
  ],
  //transports: [new winston.transports.Console()]
});

winston.addColors({
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
});
