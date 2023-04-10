"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ad_sponsorship_model_1 = require("../../models/ad/ad.sponsorship.model");
const repository_service_1 = __importDefault(require("../../services/repository.service"));
class AdSponsorshipRepository extends repository_service_1.default {
    constructor() {
        super(ad_sponsorship_model_1.AdSponsorshipModel);
    }
}
exports.default = AdSponsorshipRepository;
//# sourceMappingURL=ad.sponsorship.repository.js.map