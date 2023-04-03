"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ad_video_model_1 = require("../../models/ad/ad.video.model");
const repository_service_1 = __importDefault(require("../../services/repository.service"));
class AdRepository extends repository_service_1.default {
    constructor() {
        super(ad_video_model_1.AdVideoModel);
    }
}
exports.default = AdRepository;
//# sourceMappingURL=ad.repository.js.map