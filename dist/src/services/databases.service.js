"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabasesService = exports.db = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const conf_1 = __importDefault(require("../../confs/conf"));
mongoose_1.default.Promise = global.Promise;
exports.db = {
    local: null
};
class DatabasesService {
    static initDatabases() {
        exports.db.local = mongoose_1.default.createConnection(conf_1.default.db.local.host, conf_1.default.db.local.options);
        return exports.db;
    }
}
exports.DatabasesService = DatabasesService;
//# sourceMappingURL=databases.service.js.map