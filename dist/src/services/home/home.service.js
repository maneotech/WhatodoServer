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
Object.defineProperty(exports, "__esModule", { value: true });
const home_response_model_1 = require("../../models/home/home.response.model");
const ad_sponsorship_service_1 = require("../ad/ad.sponsorship.service");
const ad_video_service_1 = require("../ad/ad.video.service");
class HomeService {
    static getHome(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            var lastSponsorshipFirstname = null;
            var lastSponsorship = yield ad_sponsorship_service_1.AdSponsorshipService.getLastSponsorshipToBeNotified(userId);
            if (lastSponsorship != null) {
                lastSponsorshipFirstname = lastSponsorship.emailTarget;
            }
            var enableAdVideo = yield ad_video_service_1.AdVideoService.isLastVideoDelayRespected(userId);
            var homeResponse = new home_response_model_1.HomeResponseModel(lastSponsorshipFirstname, enableAdVideo);
            return homeResponse;
        });
    }
}
exports.default = HomeService;
//# sourceMappingURL=home.service.js.map