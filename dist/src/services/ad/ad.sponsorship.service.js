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
exports.AdSponsorshipService = void 0;
const ad_sponsorship_repository_1 = __importDefault(require("../../repositories/ad/ad.sponsorship.repository"));
const adSponsorshipRepository = new ad_sponsorship_repository_1.default();
class AdSponsorshipService {
    static doesSponsorshipExist(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield adSponsorshipRepository.exists({ emailTarget: email });
            }
            catch (error) {
                return true;
            }
        });
    }
    static validateSponsorship(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var doc = yield adSponsorshipRepository.updateOne({ emailTarget: email }, { targetHasConnected: true });
                return doc == null ? false : true;
            }
            catch (error) {
                return false;
            }
        });
    }
    static createSponsorship(email, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var sponsorshipModel = {
                    userFrom: userId,
                    emailTarget: email,
                    targetHasConnected: false,
                    userFromHasBeenNotified: false
                };
                return yield adSponsorshipRepository.create(sponsorshipModel);
            }
            catch (error) {
                return null;
            }
        });
    }
    static getLastSponsorshipToBeNotified(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield adSponsorshipRepository.getOne({ userFrom: userId, targetHasConnected: true, userFromHasBeenNotified: false });
            }
            catch (error) {
                return null;
            }
        });
    }
    static notifySponsorship(lastSponsorshipEmail, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var doc = yield adSponsorshipRepository.updateOne({ userFrom: userId, emailTarget: lastSponsorshipEmail }, { userFromHasBeenNotified: true });
                return doc ? true : false;
            }
            catch (_a) {
                return false;
            }
        });
    }
}
exports.AdSponsorshipService = AdSponsorshipService;
//# sourceMappingURL=ad.sponsorship.service.js.map