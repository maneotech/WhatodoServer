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
exports.login = void 0;
const request_service_1 = __importDefault(require("../../services/request.service"));
const user_login_service_1 = require("../../services/user/user.login.service");
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        const response = yield user_login_service_1.UserLoginService.login(body.email, body.password);
        request_service_1.default.send(res, response);
    });
}
exports.login = login;
//# sourceMappingURL=user.login.controller.js.map