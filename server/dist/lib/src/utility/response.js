"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomResponse = void 0;
class CustomResponse {
    static unauthorized(error) {
        return {
            body: {
                error,
            },
            status: 401,
        };
    }
    static excessRequest(error) {
        return {
            body: {
                error,
            },
            status: 429,
        };
    }
    static invalid(error) {
        return {
            body: {
                error,
            },
            status: 400,
        };
    }
    static internalServerError() {
        return {
            body: {
                error: "Internal Server Error",
            },
            status: 500,
        };
    }
    static success(body) {
        return {
            body,
            status: 200,
        };
    }
}
exports.CustomResponse = CustomResponse;
//# sourceMappingURL=response.js.map