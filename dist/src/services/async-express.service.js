"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncExpressService = void 0;
const express_1 = __importDefault(require("express"));
const express_asyncify_1 = __importDefault(require("express-asyncify"));
class AsyncExpressService {
    static getAsyncExpress() {
        return AsyncExpressService.asyncify((0, express_1.default)());
    }
    static getAsyncRouter() {
        return AsyncExpressService.asyncify(express_1.default.Router());
    }
    static asyncify(router) {
        return (0, express_asyncify_1.default)(router);
    }
}
exports.AsyncExpressService = AsyncExpressService;
//# sourceMappingURL=async-express.service.js.map