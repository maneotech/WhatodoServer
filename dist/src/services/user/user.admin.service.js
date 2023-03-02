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
exports.UserAdminService = void 0;
const user_constant_1 = require("../../constants/user/user.constant");
const user_repository_1 = __importDefault(require("../../repositories/user/user.repository"));
const mail_service_1 = require("../mail.service");
const utilities_service_1 = require("../utilities.service");
const user_service_1 = __importDefault(require("./user.service"));
const userRepository = new user_repository_1.default();
class UserAdminService {
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = user_constant_1.UserRequestError.UNKNOWN_ERROR;
            if (utilities_service_1.UtilitiesService.isEmpty(data))
                return user_constant_1.UserRequestError.DATA_IS_EMPTY;
            if (!utilities_service_1.UtilitiesService.enumContainsString(user_constant_1.UserRole, data.role)) {
                return user_constant_1.UserRequestError.ROLE_IS_INVALID;
            }
            if (!mail_service_1.MailsService.isValid(data.email))
                return user_constant_1.UserRequestError.MAIL_IS_INVALID;
            if (!data.password || !data.password.length)
                return user_constant_1.UserRequestError.PASSWORD_IS_EMPTY;
            if (!data.nickname || !data.nickname.length)
                return user_constant_1.UserRequestError.NICKNAME_IS_EMPTY;
            const keysRequired = user_constant_1.UserFieldModelRequired[data.role];
            const keysAuthorized = user_constant_1.UserFieldModelAuthorized[data.role];
            for (let k of keysRequired) {
                if (!(k in data)) {
                    response = user_constant_1.UserRequestError.KEY_IS_NEEDED;
                    response.message += k;
                }
            }
            let usernameIsEmail = false;
            const email = mail_service_1.MailsService.formatMail(data.email);
            let username = data.username || email;
            if (mail_service_1.MailsService.isSameMail(email, username)) {
                username = mail_service_1.MailsService.formatMail(username);
                usernameIsEmail = true;
            }
            if (!usernameIsEmail && mail_service_1.MailsService.isValid(username))
                return user_constant_1.UserRequestError.USERNAME_CANT_BE_EMAIL;
            let user = {
                role: data.role,
                email: email,
                nickname: data.nickname,
                username: username,
                password: user_service_1.default.hashPassword(data.password)
            };
            if (yield user_service_1.default.usernameAlreadyUsed(user.username, user.role))
                return user_constant_1.UserRequestError.USERNAME_ALREADY_USED;
            if (yield user_service_1.default.emailAlreadyUsed(user.email, user.role))
                return user_constant_1.UserRequestError.EMAIL_ALREADY_USED;
            for (let k of keysAuthorized) {
                if (!user[k])
                    user[k] = data[k];
            }
            const result = yield userRepository.create(user);
            if (result) {
                response = user_constant_1.UserRequestError.NO_ERROR;
                response.data = result;
            }
            return response;
        });
    }
    static update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = user_constant_1.UserRequestError.UNKNOWN_ERROR;
            const user = yield userRepository.getById(id, [], [], { full_projections: true });
            if (!user)
                return user_constant_1.UserRequestError.USER_DOESNT_EXIST;
            if (data.role && user.role != data.role)
                return user_constant_1.UserRequestError.UDPATE_ROLE;
            const keysAuthorized = user_constant_1.UserFieldModelAuthorized[user.role];
            const usernameIsEmail = user.username == user.email;
            const email = data.email ? mail_service_1.MailsService.formatMail(data.email) : user.email;
            let username = data.username ? data.username : null;
            if (username) {
                if (mail_service_1.MailsService.isValid(username) && username != email)
                    return user_constant_1.UserRequestError.USERNAME_CANT_BE_EMAIL;
            }
            else if (usernameIsEmail) {
                username = email;
            }
            let update = {};
            for (let k of keysAuthorized) {
                if (k in data)
                    update[k] = data[k];
            }
            if (email && (yield user_service_1.default.emailAlreadyUsed(email, user.role, user._id)))
                return user_constant_1.UserRequestError.EMAIL_ALREADY_USED;
            if (username && (yield user_service_1.default.usernameAlreadyUsed(username, user.role, user._id)))
                return user_constant_1.UserRequestError.USERNAME_ALREADY_USED;
            update.email = email;
            if (username) {
                update.username = username;
            }
            if (data.password) {
                if (data.password.length) {
                    update.password = user_service_1.default.hashPassword(data.password);
                }
                else {
                    return user_constant_1.UserRequestError.PASSWORD_IS_EMPTY;
                }
            }
            const result = yield userRepository.updateById(user._id, update);
            if (result) {
                response = user_constant_1.UserRequestError.NO_ERROR;
                response.data = result;
            }
            return response;
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = user_constant_1.UserRequestError.NO_ERROR;
            const user = yield userRepository.getById(id);
            response.data = user;
            if (!user) {
                return user_constant_1.UserRequestError.USER_DOESNT_EXIST;
            }
            yield userRepository.deleteById(user._id);
            return response;
        });
    }
}
exports.UserAdminService = UserAdminService;
//# sourceMappingURL=user.admin.service.js.map