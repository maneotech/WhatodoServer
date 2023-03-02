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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRegisterService = void 0;
const user_constant_1 = require("../../constants/user/user.constant");
const user_admin_service_1 = require("./user.admin.service");
class UserRegisterService {
    static register(data, role) {
        return __awaiter(this, void 0, void 0, function* () {
            if (role != user_constant_1.UserRole.user)
                return user_constant_1.UserRequestError.ROLE_IS_INVALID;
            return user_admin_service_1.UserAdminService.create(data);
        });
    }
}
exports.UserRegisterService = UserRegisterService;
//# sourceMappingURL=user.register.service.js.map