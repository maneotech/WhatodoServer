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
const crypto_1 = __importDefault(require("crypto"));
const conf_1 = __importDefault(require("../../../confs/conf"));
const user_repository_1 = __importDefault(require("../../repositories/user/user.repository"));
const userRepository = new user_repository_1.default();
class UserService {
    static hashPassword(password) {
        const hash = crypto_1.default.createHmac('sha256', conf_1.default.hashPasswordSecret);
        hash.update(password);
        return hash.digest('hex');
    }
    static usernameAlreadyUsed(username, role = undefined, excludeUserId = undefined) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield userRepository.getUserByUsername(username, role, excludeUserId)) != null;
        });
    }
    static emailAlreadyUsed(email, role = undefined, excludeUserId = undefined) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield userRepository.getUserByEmail(email, role, excludeUserId)) != null;
        });
    }
}
exports.default = UserService;
//# sourceMappingURL=user.service.js.map