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
exports.notifySponsorship = exports.createSponsorship = void 0;
const ad_constants_1 = require("../../constants/ad/ad.constants");
const request_service_1 = __importDefault(require("../../services/request.service"));
const utilities_service_1 = require("../../services/utilities.service");
const ad_sponsorship_service_1 = require("../../services/ad/ad.sponsorship.service");
const user_service_1 = __importDefault(require("../../services/user/user.service"));
function createSponsorship(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.user;
        const body = req.body;
        if (utilities_service_1.UtilitiesService.isEmpty(body)) {
            return request_service_1.default.send(res, ad_constants_1.AdRequestError.BODY_EMPTY);
        }
        if (!body.email) {
            return request_service_1.default.send(res, ad_constants_1.AdRequestError.BODY_ERROR);
        }
        if (yield ad_sponsorship_service_1.AdSponsorshipService.doesSponsorshipExist(body.email)) {
            return request_service_1.default.send(res, ad_constants_1.AdRequestError.SPONSORSHIP_ALREADY_EXIST);
        }
        if (yield user_service_1.default.emailAlreadyUsed(body.email)) {
            return request_service_1.default.send(res, ad_constants_1.AdRequestError.USER_ALREADY_EXIST);
        }
        const result = yield ad_sponsorship_service_1.AdSponsorshipService.createSponsorship(body.email, user._id);
        if (result == null) {
            return request_service_1.default.send(res, ad_constants_1.AdRequestError.INSERTING_DB);
        }
        const response = ad_constants_1.AdRequestError.NO_ERROR;
        return request_service_1.default.send(res, response);
    });
}
exports.createSponsorship = createSponsorship;
function notifySponsorship(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.user;
        const body = req.body;
        if (utilities_service_1.UtilitiesService.isEmpty(body)) {
            return request_service_1.default.send(res, ad_constants_1.AdRequestError.BODY_EMPTY);
        }
        if (!body.lastSponsorshipEmail) {
            return request_service_1.default.send(res, ad_constants_1.AdRequestError.BODY_ERROR);
        }
        const result = yield ad_sponsorship_service_1.AdSponsorshipService.notifySponsorship(body.lastSponsorshipEmail, user._id);
        if (!result) {
            return request_service_1.default.send(res, ad_constants_1.AdRequestError.INSERTING_DB);
        }
        const response = ad_constants_1.AdRequestError.NO_ERROR;
        return request_service_1.default.send(res, response);
    });
}
exports.notifySponsorship = notifySponsorship;
//# sourceMappingURL=ad.sponsorship.controller.js.map