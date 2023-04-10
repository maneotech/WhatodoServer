"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdSponsorshipModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const databases_service_1 = require("../../services/databases.service");
const mongoose_service_1 = require("../../services/mongoose.service");
const user_model_1 = require("../user/user.model");
const schema = new mongoose_service_1.MongooseCustomSchema({
    userFrom: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: user_model_1.UserModel,
        required: true,
    },
    emailTarget: {
        type: String,
        required: true
    },
    targetHasConnected: {
        type: Boolean,
        required: true
    },
    userFromHasBeenNotified: {
        type: Boolean,
        required: true
    }
});
exports.AdSponsorshipModel = databases_service_1.db.local.model('AdSponsorship', schema);
//# sourceMappingURL=ad.sponsorship.model.js.map