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
const ad_sponsorship_service_1 = require("../ad/ad.sponsorship.service");
const mail_service_1 = require("../mail.service");
const utilities_service_1 = require("../utilities.service");
const user_service_1 = __importDefault(require("./user.service"));
const userRepository = new user_repository_1.default();
class UserAdminService {
    static create(data, userThirdPart) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = user_constant_1.UserRequestError.UNKNOWN_ERROR;
            if (utilities_service_1.UtilitiesService.isEmpty(data))
                return user_constant_1.UserRequestError.DATA_IS_EMPTY;
            if (!mail_service_1.MailsService.isValid(data.email))
                return user_constant_1.UserRequestError.MAIL_IS_INVALID;
            if (!data.password || !data.password.length)
                return user_constant_1.UserRequestError.PASSWORD_IS_EMPTY;
            const keysRequired = user_constant_1.UserFieldModelRequired[user_constant_1.UserRole.user];
            for (let k of keysRequired) {
                if (!(k in data)) {
                    response = user_constant_1.UserRequestError.KEY_IS_NEEDED;
                    response.message += k;
                }
            }
            const email = mail_service_1.MailsService.formatMail(data.email);
            let user = {
                email: email,
                firstname: data.firstname,
                password: user_service_1.default.hashPassword(data.password),
                thirdPart: userThirdPart
            };
            if (yield user_service_1.default.emailAlreadyUsed(user.email))
                return user_constant_1.UserRequestError.EMAIL_ALREADY_USED;
            const result = yield userRepository.create(user);
            if (result) {
                //no error management because no needed.
                yield ad_sponsorship_service_1.AdSponsorshipService.validateSponsorship(user.email);
                response = user_constant_1.UserRequestError.NO_ERROR;
                response.data = result;
            }
            return response;
        });
    }
}
exports.UserAdminService = UserAdminService;
//# sourceMappingURL=user.admin.service.js.map