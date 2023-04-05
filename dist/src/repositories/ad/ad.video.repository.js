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
const ad_content_model_1 = require("../../models/ad/ad.content.model");
const ad_video_model_1 = require("../../models/ad/ad.video.model");
const repository_service_1 = __importDefault(require("../../services/repository.service"));
class AdVideoRepository extends repository_service_1.default {
    constructor() {
        super(ad_video_model_1.AdVideoModel);
    }
    createVideo(adVideoModel) {
        var adVideoModel;
        return __awaiter(this, void 0, void 0, function* () {
            var doc = yield this.create(adVideoModel);
            if (doc) {
                adVideoModel = {
                    _id: doc.id,
                    adContent: new ad_content_model_1.AdContentModel(doc.adContent.urlSrc, doc.adContent.redirectTo)
                };
                return adVideoModel;
            }
            else {
                return null;
            }
        });
    }
}
exports.default = AdVideoRepository;
//# sourceMappingURL=ad.video.repository.js.map