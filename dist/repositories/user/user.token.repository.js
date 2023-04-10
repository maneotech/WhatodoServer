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
const user_token_model_1 = require("../../models/user/user.token.model");
const repository_service_1 = __importDefault(require("../../services/repository.service"));
class UserTokenRepository extends repository_service_1.default {
    constructor() {
        super(user_token_model_1.UserTokenModel);
    }
    incrementUse(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.updateById(id, { $inc: { used: 1 } });
        });
    }
}
exports.default = UserTokenRepository;
//# sourceMappingURL=user.token.repository.js.map