"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../../models/user/user.model");
const repository_service_1 = __importDefault(require("../../services/repository.service"));
class UserRepository extends repository_service_1.default {
    constructor() {
        super(user_model_1.UserModel);
    }
    getUserByUsername(username, role = undefined, excludeUserId = undefined) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!username || !username.length) {
                throw new Error("username can't be null");
            }
            let selectors = { username: username };
            if (excludeUserId)
                selectors['_id'] = { $ne: excludeUserId };
            if (role)
                selectors['role'] = role;
            return yield this.getOne(selectors);
        });
    }
    getUserByEmail(email, role = undefined, excludeUserId = undefined) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!email || !email.length) {
                throw new Error("username can't be null");
            }
            let selectors = { email: email };
            if (excludeUserId)
                selectors['_id'] = { $ne: excludeUserId };
            if (role)
                selectors['role'] = role;
            return yield this.getOne(selectors);
        });
    }
}
exports.default = UserRepository;
//# sourceMappingURL=user.repository.js.map