"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLoginRequestError = exports.UserRequestError = exports.UserFieldModelRequired = exports.UserThirdPart = exports.UserStatus = exports.UserRole = void 0;
const api_errors_constants_1 = require("../api-errors.constants");
const httpstatuscode_constant_1 = require("../httpstatuscode.constant");
var UserRole;
(function (UserRole) {
    UserRole["user"] = "user";
    UserRole["superadmin"] = "superadmin";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
var UserStatus;
(function (UserStatus) {
    UserStatus["enabled"] = "enabled";
    UserStatus["disabled"] = "disabled";
})(UserStatus = exports.UserStatus || (exports.UserStatus = {}));
var UserThirdPart;
(function (UserThirdPart) {
    UserThirdPart["NO"] = "no";
    UserThirdPart["FACEBOOK"] = "facebook";
    UserThirdPart["GOOGLE"] = "google";
    UserThirdPart["APPLE"] = "apple";
})(UserThirdPart = exports.UserThirdPart || (exports.UserThirdPart = {}));
exports.UserFieldModelRequired = {
    [UserRole.user]: ['firstname', 'email', 'password'],
};
exports.UserRequestError = {
    NO_ERROR: { success: true, data: null, message: "no error", error: api_errors_constants_1.ApiError.NO_ERRORS, status: httpstatuscode_constant_1.HttpStatusCode.Ok },
    UNKNOWN_ERROR: { success: false, data: null, message: "unknown error", error: api_errors_constants_1.ApiError.USER_UNKOWN_ERROR, status: httpstatuscode_constant_1.HttpStatusCode.InternalServerError },
    USER_DOESNT_EXIST: { success: false, data: null, message: "user doesn't exist", error: api_errors_constants_1.ApiError.USER_USER_DOEST_EXIST, status: httpstatuscode_constant_1.HttpStatusCode.NotFound },
    DATA_IS_EMPTY: { success: false, data: null, message: "data is empty", error: api_errors_constants_1.ApiError.USER_DATA_IF_EMPTY, status: httpstatuscode_constant_1.HttpStatusCode.BadRequest },
    KEY_IS_NEEDED: { success: false, data: null, message: "key is required : ", error: api_errors_constants_1.ApiError.USER_KEY_IS_NEEDED, status: httpstatuscode_constant_1.HttpStatusCode.BadRequest },
    PASSWORD_IS_EMPTY: { success: false, data: null, message: "password can't be empty", error: api_errors_constants_1.ApiError.USER_PASSWORD_IS_EMPTY, status: httpstatuscode_constant_1.HttpStatusCode.BadRequest },
    EMAIL_ALREADY_USED: { success: false, data: null, message: "email already used", error: api_errors_constants_1.ApiError.USER_EMAIL_ALREADY_USED, status: httpstatuscode_constant_1.HttpStatusCode.BadRequest },
    MAIL_IS_INVALID: { success: false, data: null, message: "mail is invalid", error: api_errors_constants_1.ApiError.USER_MAIL_IS_INVALID, status: httpstatuscode_constant_1.HttpStatusCode.BadRequest },
};
exports.UserLoginRequestError = {
    NO_ERROR: { success: true, data: null, message: "no error", error: api_errors_constants_1.ApiError.NO_ERRORS, status: httpstatuscode_constant_1.HttpStatusCode.Ok },
    UNKNOWN_ERROR: { success: false, data: null, message: "unknown error", error: api_errors_constants_1.ApiError.USER_LOGIN_UNKOWN_ERROR, status: httpstatuscode_constant_1.HttpStatusCode.InternalServerError },
    ID_INVALID: { success: false, data: null, message: "identifiant or password is invalid", error: api_errors_constants_1.ApiError.USER_LOGIN_ID_INVALID, status: httpstatuscode_constant_1.HttpStatusCode.BadRequest },
    ID_EMPTY: { success: false, data: null, message: "identifiant or password can't be empty", error: api_errors_constants_1.ApiError.USER_LOGIN_ID_EMPTY, status: httpstatuscode_constant_1.HttpStatusCode.BadRequest },
    STATUS_DISABLED: { success: false, data: null, message: "status of user is disabled", error: api_errors_constants_1.ApiError.USER_LOGIN_STATUS_DISABLED, status: httpstatuscode_constant_1.HttpStatusCode.BadRequest },
    BODY_EMPTY: { success: false, data: null, message: "body is empty", error: api_errors_constants_1.ApiError.USER_LOGIN_BODY_EMPTY, status: httpstatuscode_constant_1.HttpStatusCode.InternalServerError },
    BODY_ERROR: { success: false, data: null, message: "body error", error: api_errors_constants_1.ApiError.USER_LOGIN_BODY_EMPTY, status: httpstatuscode_constant_1.HttpStatusCode.InternalServerError },
    USER_EMPTY: { success: false, data: null, message: "user empty", error: api_errors_constants_1.ApiError.USER_LOGIN_BODY_EMPTY, status: httpstatuscode_constant_1.HttpStatusCode.InternalServerError },
    WRONG_THIRD_TYPE: { success: false, data: null, message: "wrong third type", error: api_errors_constants_1.ApiError.USER_WRONG_THIRD_TYPE, status: httpstatuscode_constant_1.HttpStatusCode.InternalServerError },
};
//# sourceMappingURL=user.constant.js.map