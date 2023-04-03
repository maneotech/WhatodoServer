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
exports.AdVideoService = void 0;
const ad_constants_1 = require("../../constants/ad/ad.constants");
const ad_repository_1 = __importDefault(require("../../repositories/ad/ad.repository"));
const utilities_service_1 = require("../utilities.service");
const language_constants_1 = require("../../constants/language.constants");
const platform_constants_1 = require("../../constants/platform.constants");
const adRepository = new ad_repository_1.default();
class AdVideoService {
    static startAd(language, platform, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            var adVideoObjectList = [];
            ad_constants_1.AdVideoObjectList.forEach(videoContent => {
                if ((videoContent.language == language_constants_1.LanguageEnum.ALL || videoContent.language == language) &&
                    videoContent.platform == platform_constants_1.PlatformEnum.ALL || videoContent.platform == platform) {
                    adVideoObjectList.push(videoContent);
                }
            });
            utilities_service_1.UtilitiesService.shuffleArray(adVideoObjectList);
            if (adVideoObjectList.length == 0) {
                return null;
            }
            var adVideoObject = adVideoObjectList[0];
            try {
                var videoModel = {
                    user: userId,
                    adContent: adVideoObject,
                    hasEnded: false,
                    clicked: false,
                };
                return yield adRepository.create(videoModel);
            }
            catch (error) {
                return null;
            }
        });
    }
    static endAd(docId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var doc = yield adRepository.updateOne({ _id: docId, user: userId }, { hasEnded: true });
                return doc == null ? false : true;
            }
            catch (error) {
                return false;
            }
        });
    }
    static clickAd(docId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var doc = yield adRepository.updateOne({ _id: docId, user: userId }, { clicked: true });
                return doc == null ? false : true;
            }
            catch (error) {
                return false;
            }
        });
    }
}
exports.AdVideoService = AdVideoService;
//# sourceMappingURL=ad.service.js.map