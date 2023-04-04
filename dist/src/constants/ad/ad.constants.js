"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdVideoObjectList = exports.AdRequestError = void 0;
const ad_content_model_1 = require("../../models/ad/ad.content.model");
const api_errors_constants_1 = require("../api-errors.constants");
const httpstatuscode_constant_1 = require("../httpstatuscode.constant");
const internal_path_constant_1 = require("../internal-path.constant");
const language_constants_1 = require("../language.constants");
const platform_constants_1 = require("../platform.constants");
exports.AdRequestError = {
    NO_ERROR: { success: true, data: null, message: null, error: api_errors_constants_1.ApiError.NO_ERRORS, status: httpstatuscode_constant_1.HttpStatusCode.Ok },
    BODY_EMPTY: { success: false, data: null, message: "body is empty", error: api_errors_constants_1.ApiError.AD_BODY_EMPTY, status: httpstatuscode_constant_1.HttpStatusCode.InternalServerError },
    BODY_ERROR: { success: false, data: null, message: "body is not clean", error: api_errors_constants_1.ApiError.AD_BODY_ERROR, status: httpstatuscode_constant_1.HttpStatusCode.InternalServerError },
    UNKNOWN_ID: { success: false, data: null, message: "unkwown ad id", error: api_errors_constants_1.ApiError.AD_UNKNOWN_ID, status: httpstatuscode_constant_1.HttpStatusCode.InternalServerError },
    INSERTING_DB: { success: false, data: null, message: "error inserting db", error: api_errors_constants_1.ApiError.AD_INSERT_DB, status: httpstatuscode_constant_1.HttpStatusCode.InternalServerError },
    ERROR_SPENDING_TOKEN: { success: false, data: null, message: "error earning one token", error: api_errors_constants_1.ApiError.AD_EARN_TOKEN, status: httpstatuscode_constant_1.HttpStatusCode.InternalServerError },
    SPONSORSHIP_ALREADY_EXIST: { success: false, data: null, message: "sponsorship already exist", error: api_errors_constants_1.ApiError.AD_SPONSORSHIP_EXISTS, status: httpstatuscode_constant_1.HttpStatusCode.InternalServerError },
    USER_ALREADY_EXIST: { success: false, data: null, message: "user already exist", error: api_errors_constants_1.ApiError.AD_USER_EXISTS, status: httpstatuscode_constant_1.HttpStatusCode.InternalServerError },
    DELAY_NOT_RESPECTED: { success: false, data: null, message: "3 days are required between two ads", error: api_errors_constants_1.ApiError.AD_DELAY, status: httpstatuscode_constant_1.HttpStatusCode.InternalServerError },
};
exports.AdVideoObjectList = [
    new ad_content_model_1.AdContentModel("b5f30c84-8ac4-4ebc-ad86-2f8612c52e1c", "Quentin Rathonie", internal_path_constant_1.InternalPathConstants.adVideos + '6446706906_iptv_fr.mp4', "https://apps.apple.com/fr/app/play-iptv-player/id6446706906", language_constants_1.LanguageEnum.FR, platform_constants_1.PlatformEnum.ALL),
    new ad_content_model_1.AdContentModel("4027dd64-c645-4638-a251-bbbab12a5ac9", "Quentin Rathonie", internal_path_constant_1.InternalPathConstants.adVideos + '6446706906_iptv_en.mp4', "https://apps.apple.com/fr/app/play-iptv-player/id6446706906", language_constants_1.LanguageEnum.EN, platform_constants_1.PlatformEnum.ALL),
    new ad_content_model_1.AdContentModel("e0da8960-50e1-45d1-9f1d-09c0e645531c", "Quentin Rathonie", internal_path_constant_1.InternalPathConstants.adVideos + '6446706906_iptv_es.mp4', "https://apps.apple.com/fr/app/play-iptv-player/id6446706906", language_constants_1.LanguageEnum.ES, platform_constants_1.PlatformEnum.ALL),
];
//# sourceMappingURL=ad.constants.js.map