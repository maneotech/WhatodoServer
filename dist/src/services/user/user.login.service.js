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
exports.UserLoginService = void 0;
const user_constant_1 = require("../../constants/user/user.constant");
const user_repository_1 = __importDefault(require("../../repositories/user/user.repository"));
const mail_service_1 = require("../mail.service");
const user_service_1 = __importDefault(require("./user.service"));
const user_token_service_1 = require("./user.token.service");
const userRepository = new user_repository_1.default();
class UserLoginService {
    static getLoginResponse(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                data: yield user_token_service_1.UserTokenService.createToken(user._id),
                user: user
            };
        });
    }
    static login(username, password, role) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = user_constant_1.UserLoginRequestError.NO_ERROR;
            if (!username || !username.length)
                return user_constant_1.UserLoginRequestError.ID_EMPTY;
            if (!password || !password.length)
                return user_constant_1.UserLoginRequestError.ID_EMPTY;
            username = username.trim();
            if (mail_service_1.MailsService.isValid(username)) {
                username = mail_service_1.MailsService.formatMail(username);
            }
            const selectors = { username: username, password: user_service_1.default.hashPassword(password), role: role };
            const user = yield userRepository.getOne(selectors, [], []);
            if (!user)
                return user_constant_1.UserLoginRequestError.ID_INVALID;
            if (user.status != user_constant_1.UserStatus.enabled)
                return user_constant_1.UserLoginRequestError.STATUS_DISABLED;
            const data = yield UserLoginService.getLoginResponse(user);
            response.data = data;
            return response;
        });
    }
}
exports.UserLoginService = UserLoginService;
//# sourceMappingURL=user.login.service.js.map