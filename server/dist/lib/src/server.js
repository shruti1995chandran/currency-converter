"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appInstance = void 0;
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = require("body-parser");
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./utility/config");
const routes_1 = require("./routes");
const jwtMiddleware_1 = require("./middleware/jwtMiddleware");
const logger_1 = require("./utility/logger");
class App {
    app;
    constructor() {
        this.app = (0, express_1.default)();
        this.addRoutes();
        this.addMiddleware();
        this.setResponseMiddlewares();
    }
    addMiddleware() {
        this.app.use((0, cookie_parser_1.default)());
        this.app.use((0, body_parser_1.json)());
        const corsOption = {
            origin: config_1.Configuration.REACT_APP_URL,
            credentials: true,
        };
        this.app.use((0, cors_1.default)(corsOption));
        this.app.use(jwtMiddleware_1.jwtMiddleware);
    }
    addRoutes() {
        for (const route of routes_1.routes) {
            this.app.use("/", route);
        }
    }
    setResponseMiddlewares() {
        this.app.use(this.responseInterceptors);
    }
    responseInterceptors(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    data, req, res, next) {
        res.status(data.status);
        res.send(data.body);
        logger_1.Logger.info(res);
    }
}
exports.appInstance = new App();
//# sourceMappingURL=server.js.map