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
exports.authentificate = void 0;
const user_constant_1 = require("../constants/user/user.constant");
const user_repository_1 = __importDefault(require("../repositories/user/user.repository"));
const autentification_service_1 = require("../services/autentification.service");
const request_errors_service_1 = __importDefault(require("../services/request-errors.service"));
const user_token_service_1 = require("../services/user/user.token.service");
const userRepository = new user_repository_1.default();
function getUser(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield userRepository.getById(userId, [], ["+password", "+role", "+email"]);
    });
}
function authentificate(required = true, ignoreExpiration = false) {
    return function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = autentification_service_1.AuthentificationService.extractBearerToken(req);
            if (!token) {
                if (required)
                    return request_errors_service_1.default.accessForbidden(req, res);
                else
                    return next();
            }
            const payload = autentification_service_1.AuthentificationService.decodeJWTToken(token);
            if (!payload)
                return request_errors_service_1.default.tokenInvalid(req, res);
            const userId = payload.userId;
            const tokenId = payload.tokenId;
            let user = null;
            try {
                user = yield getUser(userId);
            }
            catch (err) {
                return request_errors_service_1.default.internalError(req, res, err);
            }
            if (tokenId) {
                const responseTokenValid = yield user_token_service_1.UserTokenService.tokenIsValid(token);
                req.userToken = responseTokenValid.data;
                if (!responseTokenValid.success)
                    return request_errors_service_1.default.tokenInvalid(req, res);
                if (!ignoreExpiration) {
                    const responseTokenExpired = user_token_service_1.UserTokenService.tokenExpired(responseTokenValid.data);
                    if (!responseTokenExpired.success)
                        return request_errors_service_1.default.accessExpired(req, res);
                }
            }
            else {
                return request_errors_service_1.default.tokenInvalid(req, res);
            }
            let adminUser = null;
            if (user && user.role == user_constant_1.UserRole.superadmin) {
                let targetUserId = req.get('target-user');
                if (targetUserId) {
                    adminUser = user;
                    try {
                        user = yield getUser(targetUserId);
                    }
                    catch (err) {
                        return res.status(400).json("Invalid : target-user");
                    }
                }
            }
            if (required && !user) {
                return request_errors_service_1.default.accessForbidden(req, res);
            }
            user_token_service_1.UserTokenService.tokenIsValidated(tokenId);
            req.bearerToken = token;
            req.user = user;
            req.fromAdminUser = adminUser;
            return next();
        });
    };
}
exports.authentificate = authentificate;
//# sourceMappingURL=authentification.middleware.js.map