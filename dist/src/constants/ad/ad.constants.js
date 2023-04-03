"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdVideoObjectList = exports.AdRequestError = void 0;
const ad_content_model_1 = require("../../models/ad/ad.content.model");
const api_errors_constants_1 = require("../api-errors.constants");
const httpstatuscode_constant_1 = require("../httpstatuscode.constant");
const language_constants_1 = require("../language.constants");
const platform_constants_1 = require("../platform.constants");
exports.AdRequestError = {
    NO_ERROR: { success: true, data: null, message: null, error: api_errors_constants_1.ApiError.NO_ERRORS, status: httpstatuscode_constant_1.HttpStatusCode.Ok },
    BODY_EMPTY: { success: false, data: null, message: "body is empty", error: api_errors_constants_1.ApiError.AD_BODY_EMPTY, status: httpstatuscode_constant_1.HttpStatusCode.InternalServerError },
    BODY_ERROR: { success: false, data: null, message: "body is not clean", error: api_errors_constants_1.ApiError.AD_BODY_ERROR, status: httpstatuscode_constant_1.HttpStatusCode.InternalServerError },
    UNKNOWN_ID: { success: false, data: null, message: "unkwown ad id", error: api_errors_constants_1.ApiError.AD_UNKNOWN_ID, status: httpstatuscode_constant_1.HttpStatusCode.InternalServerError },
    INSERTING_DB: { success: false, data: null, message: "error inserting db", error: api_errors_constants_1.ApiError.AD_INSERT_DB, status: httpstatuscode_constant_1.HttpStatusCode.InternalServerError },
    ERROR_SPENDING_TOKEN: { success: false, data: null, message: "error earning one token", error: api_errors_constants_1.ApiError.AD_EARN_TOKEN, status: httpstatuscode_constant_1.HttpStatusCode.InternalServerError },
};
exports.AdVideoObjectList = [
    new ad_content_model_1.AdContentModel("b5f30c84-8ac4-4ebc-ad86-2f8612c52e1c", "voyageengus", "https://assets.mixkit.co/videos/preview/mixkit-winter-fashion-cold-looking-woman-concept-video-39874-large.mp4", "https://maneotech.fr", language_constants_1.LanguageEnum.ALL, platform_constants_1.PlatformEnum.ANDROID),
    new ad_content_model_1.AdContentModel("4027dd64-c645-4638-a251-bbbab12a5ac9", "crapaud", "https://assets.mixkit.co/videos/preview/mixkit-red-frog-on-a-log-1487-large.mp4", "https://facebook.com", language_constants_1.LanguageEnum.FR, platform_constants_1.PlatformEnum.ALL),
];
//# sourceMappingURL=ad.constants.js.map