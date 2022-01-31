"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwt = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("./config");
class JWT {
    verify(token) {
        return new Promise((resolve, reject) => {
            (0, jsonwebtoken_1.verify)(token, config_1.Configuration.JWT_SECRET, (err, decoded) => {
                if (err)
                    reject(err);
                resolve(decoded);
            });
        });
    }
    sign(data) {
        return (0, jsonwebtoken_1.sign)({
            data,
        }, config_1.Configuration.JWT_SECRET, { expiresIn: config_1.Configuration.JWT_EXPIRY });
    }
}
exports.jwt = new JWT();
//# sourceMappingURL=jwt.js.map