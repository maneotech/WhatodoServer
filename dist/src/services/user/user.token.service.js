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
exports.UserTokenService = void 0;
const conf_1 = __importDefault(require("../../../confs/conf"));
const user_token_constant_1 = require("../../constants/user/user.token.constant");
const user_repository_1 = __importDefault(require("../../repositories/user/user.repository"));
const user_token_repository_1 = __importDefault(require("../../repositories/user/user.token.repository"));
const autentification_service_1 = require("../autentification.service");
const mongoose_service_1 = require("../mongoose.service");
const userRepository = new user_repository_1.default();
const userTokenRepository = new user_token_repository_1.default();
class UserTokenService {
    static createToken(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield userRepository.getById(userId, [], ['_id', 'role', 'status']);
            let result = null;
            if (user) {
                let now = new Date();
                let data = {
                    user: user._id,
                    status: user_token_constant_1.UserTokenStatus.enabled
                };
                data.expireAt = new Date(now.getTime() + conf_1.default.authentification.tokenExpireAfter);
                data.refreshExpireAt = new Date(now.getTime() + conf_1.default.authentification.refreshTokenExpireAfter);
                let doc = yield userTokenRepository.create(data);
                if (doc) {
                    const token = autentification_service_1.AuthentificationService.encodeJWTToken(user._id.toString(), doc._id.toString(), user_token_constant_1.UserTokenType.normal);
                    const refreshToken = autentification_service_1.AuthentificationService.encodeJWTToken(user._id.toString(), doc._id.toString(), user_token_constant_1.UserTokenType.refresh);
                    result = {
                        token: token,
                        refreshToken: refreshToken,
                        tokenExpireAt: data.expireAt,
                        refreshTokenExpireAt: data.refreshExpireAt
                    };
                }
            }
            return result;
        });
    }
    static tokenIsValid(token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!token)
                user_token_constant_1.UserTokenRequestError.TOKEN_INVALID;
            const decoded = autentification_service_1.AuthentificationService.decodeJWTToken(token);
            if (!decoded.tokenId || !decoded.userId)
                return user_token_constant_1.UserTokenRequestError.TOKEN_INVALID;
            if ((decoded === null || decoded === void 0 ? void 0 : decoded.type) != user_token_constant_1.UserTokenType.normal)
                return user_token_constant_1.UserTokenRequestError.INVALID_TYPE;
            let doc = yield userTokenRepository.getById(decoded.tokenId);
            if (!doc || !mongoose_service_1.MongooseService.areSameIds(decoded.userId, doc.user))
                return user_token_constant_1.UserTokenRequestError.TOKEN_INVALID;
            if (doc.status != user_token_constant_1.UserTokenStatus.enabled)
                return user_token_constant_1.UserTokenRequestError.TOKEN_INVALID;
            const response = user_token_constant_1.UserTokenRequestError.NO_ERROR;
            response.data = doc;
            return response;
        });
    }
    static tokenExpired(doc) {
        let now = new Date();
        if (doc.expireAt && now.getTime() > doc.expireAt.getTime())
            return user_token_constant_1.UserTokenRequestError.TOKEN_EXPIRED;
        if (doc.limit && doc.used >= doc.limit)
            return user_token_constant_1.UserTokenRequestError.TOKEN_EXPIRED;
        const response = user_token_constant_1.UserTokenRequestError.NO_ERROR;
        response.data = doc;
        return response;
    }
    static refreshTokenIsValid(token, refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!refreshToken)
                return user_token_constant_1.UserTokenRequestError.REFRESH_TOKEN_INVALID;
            let response = yield UserTokenService.tokenIsValid(token);
            if (!response.success)
                return response;
            const doc = response.data;
            let now = new Date();
            if (doc.status != user_token_constant_1.UserTokenStatus.enabled)
                return user_token_constant_1.UserTokenRequestError.REFRESH_TOKEN_INVALID;
            if (doc.refreshExpireAt && now.getTime() > doc.refreshExpireAt.getTime())
                return user_token_constant_1.UserTokenRequestError.REFRESH_TOKEN_EXPIRED;
            if (doc.refreshedAt && now.getTime() > doc.refreshedAt.getTime() + conf_1.default.authentification.delayRefreshMultiUse)
                return user_token_constant_1.UserTokenRequestError.REFRESH_TOKEN_ALREADY_USED;
            const decoded = autentification_service_1.AuthentificationService.decodeJWTToken(refreshToken);
            if (!mongoose_service_1.MongooseService.areSameIds(decoded === null || decoded === void 0 ? void 0 : decoded.userId, doc.user))
                return user_token_constant_1.UserTokenRequestError.REFRESH_TOKEN_INVALID;
            if (!mongoose_service_1.MongooseService.areSameIds(decoded === null || decoded === void 0 ? void 0 : decoded.tokenId, doc._id))
                return user_token_constant_1.UserTokenRequestError.REFRESH_TOKEN_INVALID;
            if ((decoded === null || decoded === void 0 ? void 0 : decoded.type) != user_token_constant_1.UserTokenType.refresh)
                return user_token_constant_1.UserTokenRequestError.INVALID_TYPE;
            response = user_token_constant_1.UserTokenRequestError.NO_ERROR;
            response.data = doc;
            return response;
        });
    }
    static refreshToken(token, refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield UserTokenService.refreshTokenIsValid(token, refreshToken);
            if (result.success) {
                const doc = result.data;
                result = user_token_constant_1.UserTokenRequestError.NO_ERROR;
                result.data = yield UserTokenService.createToken(doc.user.toString());
                yield userTokenRepository.updateById(doc._id, { refreshedAt: new Date() });
            }
            return result;
        });
    }
    static tokenIsValidated(tokenId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield userTokenRepository.incrementUse(tokenId);
        });
    }
}
exports.UserTokenService = UserTokenService;
//# sourceMappingURL=user.token.service.js.map