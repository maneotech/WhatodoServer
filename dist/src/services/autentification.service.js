"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthentificationService = void 0;
const user_token_constant_1 = require("../constants/user/user.token.constant");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const conf_1 = __importDefault(require("../../confs/conf"));
class AuthentificationService {
    static extractBearerToken(req) {
        const auth = req.headers.authorization;
        if (auth) {
            const splitted = req.headers.authorization.split(' ');
            if ((splitted === null || splitted === void 0 ? void 0 : splitted.length) == 2) {
                if (splitted[0] === 'Bearer') {
                    return splitted[1];
                }
            }
        }
        return null;
    }
    static encodeJWTToken(userId, tokenId, type) {
        if (type == user_token_constant_1.UserTokenType.normal)
            return jsonwebtoken_1.default.sign({
                userId: userId,
                tokenId: tokenId,
                type: user_token_constant_1.UserTokenType.normal
            }, conf_1.default.authentification.tokenSecret);
        else if (type == user_token_constant_1.UserTokenType.refresh)
            return jsonwebtoken_1.default.sign({
                userId: userId,
                tokenId: tokenId,
                type: user_token_constant_1.UserTokenType.refresh
            }, conf_1.default.authentification.refreshTokenSecret);
        return null;
    }
    static decodeJWTToken(token) {
        return jsonwebtoken_1.default.decode(token);
    }
}
exports.AuthentificationService = AuthentificationService;
//# sourceMappingURL=autentification.service.js.map