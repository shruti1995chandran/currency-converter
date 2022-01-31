"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const config_1 = require("./utility/config");
const server_1 = require("./server");
const onListening = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const addr = server.address();
    const bind = typeof config_1.Configuration.PORT === "string"
        ? `Pipe ${addr}`
        : `Port ${addr.port}`;
    console.log(`Server listening on ${bind}`);
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onError = (error) => {
    if (error.syscall !== "listen") {
        throw error;
    }
    const bind = typeof config_1.Configuration.PORT === "string"
        ? `Pipe ${config_1.Configuration.PORT}`
        : `Port ${config_1.Configuration.PORT}`;
    // eslint-disable-next-line sonarjs/no-small-switch
    switch (error.code) {
        case "EADDRINUSE":
            console.error(`${bind} is already in use`);
            break;
        default:
            throw error;
    }
};
const server = (0, http_1.createServer)(server_1.appInstance.app);
server.listen(config_1.Configuration.PORT);
server.on("error", onError);
server.on("listening", onListening);
//# sourceMappingURL=app.js.map