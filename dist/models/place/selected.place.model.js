"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectedPlaceModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const databases_service_1 = require("../../services/databases.service");
const mongoose_service_1 = require("../../services/mongoose.service");
const user_model_1 = require("../user/user.model");
const schema = new mongoose_service_1.MongooseCustomSchema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: user_model_1.UserModel,
        required: true,
    },
    placeId: {
        type: String,
        required: true,
    },
});
exports.SelectedPlaceModel = databases_service_1.db.local.model('SelectedPlace', schema);
//# sourceMappingURL=selected.place.model.js.map