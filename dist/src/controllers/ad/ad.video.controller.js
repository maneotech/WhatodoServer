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
exports.clickAd = exports.endAd = exports.startAd = void 0;
const ad_constants_1 = require("../../constants/ad/ad.constants");
const ad_video_service_1 = require("../../services/ad/ad.video.service");
const request_service_1 = __importDefault(require("../../services/request.service"));
const utilities_service_1 = require("../../services/utilities.service");
const enum_service_1 = __importDefault(require("../../services/enum.service"));
const transaction_service_1 = __importDefault(require("../../services/transaction/transaction.service"));
function startAd(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.user;
        const body = req.body;
        if (utilities_service_1.UtilitiesService.isEmpty(body)) {
            return request_service_1.default.send(res, ad_constants_1.AdRequestError.BODY_EMPTY);
        }
        if (!body.language && !body.platform) {
            return request_service_1.default.send(res, ad_constants_1.AdRequestError.BODY_ERROR);
        }
        if ((yield ad_video_service_1.AdVideoService.isLastVideoDelayRespected(user._id)) == false) {
            return request_service_1.default.send(res, ad_constants_1.AdRequestError.DELAY_NOT_RESPECTED);
        }
        const response = ad_constants_1.AdRequestError.NO_ERROR;
        var language = enum_service_1.default.fromLanguageStringToEnum(body.language);
        var platform = enum_service_1.default.fromPlatformStringToEnum(body.platform);
        const result = yield ad_video_service_1.AdVideoService.startAd(language, platform, user._id);
        if (result == null) {
            return request_service_1.default.send(res, ad_constants_1.AdRequestError.INSERTING_DB);
        }
        response.data = result;
        return request_service_1.default.send(res, response);
    });
}
exports.startAd = startAd;
function endAd(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.user;
        const body = req.body;
        const response = ad_constants_1.AdRequestError.NO_ERROR;
        if (utilities_service_1.UtilitiesService.isEmpty(body)) {
            return request_service_1.default.send(res, ad_constants_1.AdRequestError.BODY_EMPTY);
        }
        if (!body.docId) {
            return request_service_1.default.send(res, ad_constants_1.AdRequestError.BODY_ERROR);
        }
        if ((yield ad_video_service_1.AdVideoService.endAd(body.docId, user._id)) == null) {
            return request_service_1.default.send(res, ad_constants_1.AdRequestError.INSERTING_DB);
        }
        if ((yield transaction_service_1.default.earnOneToken(user._id)) == false) {
            return request_service_1.default.send(res, ad_constants_1.AdRequestError.ERROR_SPENDING_TOKEN);
        }
        return request_service_1.default.send(res, response);
    });
}
exports.endAd = endAd;
function clickAd(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.user;
        const body = req.body;
        const response = ad_constants_1.AdRequestError.NO_ERROR;
        if (utilities_service_1.UtilitiesService.isEmpty(body)) {
            return request_service_1.default.send(res, ad_constants_1.AdRequestError.BODY_EMPTY);
        }
        if (!body.docId) {
            return request_service_1.default.send(res, ad_constants_1.AdRequestError.BODY_ERROR);
        }
        const result = yield ad_video_service_1.AdVideoService.clickAd(body.docId, user._id);
        if (result == null) {
            return request_service_1.default.send(res, ad_constants_1.AdRequestError.INSERTING_DB);
        }
        return request_service_1.default.send(res, response);
    });
}
exports.clickAd = clickAd;
//# sourceMappingURL=ad.video.controller.js.map