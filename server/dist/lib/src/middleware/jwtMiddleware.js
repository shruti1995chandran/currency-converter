"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtMiddleware = void 0;
const response_1 = require("../utility/response");
const jwt_1 = require("../utility/jwt");
const customMessage_1 = require("../utility/customMessage");
const jwtMiddleware = async (req, res, next) => {
    try {
        // GUIDE : JWT authentication initiated for validation and to save user information
        const token = req.headers['x-user'] || req.cookies.token;
        if (!token) {
            return next(response_1.CustomResponse.unauthorized(customMessage_1.ERROR_CASE.UNAUTHORIZED_USER));
        }
        const decoded = await jwt_1.jwt.verify(token);
        res.locals = {
            userInfo: decoded,
        };
        return next();
    }
    catch (err) {
        return next(response_1.CustomResponse.invalid(customMessage_1.ERROR_CASE.INVALID_REQUEST));
    }
};
exports.jwtMiddleware = jwtMiddleware;
//# sourceMappingURL=jwtMiddleware.js.map