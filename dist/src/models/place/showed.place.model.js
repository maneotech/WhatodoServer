"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShowedPlaceModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const databases_service_1 = require("../../services/databases.service");
const mongoose_service_1 = require("../../services/mongoose.service");
const user_model_1 = require("../user/user.model");
const generated_option_place_model_1 = require("./generated.option.place.model");
const response_place_model_1 = require("./response.place.model");
const schema = new mongoose_service_1.MongooseCustomSchema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: user_model_1.UserModel,
        required: true,
    },
    place: {
        type: mongoose_1.default.Schema.Types.Mixed,
        ref: response_place_model_1.ResponsePlaceModel,
    },
    accepted: {
        type: Boolean,
        required: true,
        default: false
    },
    generatedOptions: {
        type: mongoose_1.default.Schema.Types.Mixed,
        ref: generated_option_place_model_1.GeneratedOptionPlaceModel
    }
});
exports.ShowedPlaceModel = databases_service_1.db.local.model('ShowedPlace', schema);
//# sourceMappingURL=showed.place.model.js.map