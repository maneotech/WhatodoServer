"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTokenRequestError = exports.UserTokenType = exports.UserTokenStatus = void 0;
const api_errors_constants_1 = require("../api-errors.constants");
const httpstatuscode_constant_1 = require("../httpstatuscode.constant");
var UserTokenStatus;
(function (UserTokenStatus) {
    UserTokenStatus["enabled"] = "enabled";
    UserTokenStatus["disabled"] = "disabled";
    UserTokenStatus["canceled"] = "canceled";
})(UserTokenStatus = exports.UserTokenStatus || (exports.UserTokenStatus = {}));
var UserTokenType;
(function (UserTokenType) {
    UserTokenType["normal"] = "normal";
    UserTokenType["refresh"] = "refresh";
})(UserTokenType = exports.UserTokenType || (exports.UserTokenType = {}));
exports.UserTokenRequestError = {
    NO_ERROR: { success: true, data: null, message: "no error", error: api_errors_constants_1.ApiError.NO_ERRORS, status: httpstatuscode_constant_1.HttpStatusCode.Ok },
    UNKNOWN_ERROR: { success: false, data: null, message: "unknown error", error: api_errors_constants_1.ApiError.USER_TOKEN_UNKOWN_ERROR, status: httpstatuscode_constant_1.HttpStatusCode.InternalServerError },
    TOKEN_INVALID: { success: false, data: null, message: "token is invalid", error: api_errors_constants_1.ApiError.USER_TOKEN_TOKEN_INVALID, status: httpstatuscode_constant_1.HttpStatusCode.BadRequest },
    TOKEN_EXPIRED: { success: false, data: null, message: "token expired", error: api_errors_constants_1.ApiError.USER_TOKEN_TOKEN_EXPIRED, status: httpstatuscode_constant_1.HttpStatusCode.BadRequest },
    INVALID_TYPE: { success: false, data: null, message: "type of token is invalid", error: api_errors_constants_1.ApiError.USER_TOKEN_INVALID_TYPE, status: httpstatuscode_constant_1.HttpStatusCode.BadRequest },
    REFRESH_TOKEN_INVALID: { success: false, data: null, message: "refresh token is invalid", error: api_errors_constants_1.ApiError.USER_TOKEN_REFRESH_TOKEN_INVALID, status: httpstatuscode_constant_1.HttpStatusCode.BadRequest },
    REFRESH_TOKEN_EXPIRED: { success: false, data: null, message: "refresh token expired", error: api_errors_constants_1.ApiError.USER_TOKEN_REFRESH_TOKEN_EXPIRED, status: httpstatuscode_constant_1.HttpStatusCode.BadRequest },
    REFRESH_TOKEN_ALREADY_USED: { success: false, data: null, message: "refresh token already used", error: api_errors_constants_1.ApiError.USER_TOKEN_REFRESH_TOKEN_ALREADY_USED, status: httpstatuscode_constant_1.HttpStatusCode.BadRequest },
};
//# sourceMappingURL=user.token.constant.js.map