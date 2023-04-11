"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabasesService = exports.db = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.Promise = global.Promise;
exports.db = {
    local: null
};
class DatabasesService {
    static initDatabases() {
        exports.db.local = mongoose_1.default.createConnection(process.env.MONGODB_URI, { dbName: process.env.DB_NAME, user: process.env.DB_USER, pass: process.env.DB_PASS });
        return exports.db;
    }
}
exports.DatabasesService = DatabasesService;
//# sourceMappingURL=databases.service.js.map