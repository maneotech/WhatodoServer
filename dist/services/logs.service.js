"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogsService = void 0;
const date_service_1 = __importDefault(require("./date.service"));
class LogsService {
    static formatLogs() {
        return '[' + date_service_1.default.toStringSpecificFormat(new Date(), true) + "] : " + '%s';
    }
}
exports.LogsService = LogsService;
//# sourceMappingURL=logs.service.js.map