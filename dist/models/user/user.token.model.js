"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTokenModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_token_constant_1 = require("../../constants/user/user.token.constant");
const databases_service_1 = require("../../services/databases.service");
const mongoose_service_1 = require("../../services/mongoose.service");
const user_model_1 = require("./user.model");
const schema = new mongoose_service_1.MongooseCustomSchema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: user_model_1.UserModel
    },
    status: {
        type: String,
        enum: user_token_constant_1.UserTokenStatus
    },
    expireAt: {
        type: Date,
    },
    refreshExpireAt: {
        type: Date,
    },
    used: {
        type: Number,
        default: 0
    },
    limit: {
        type: Number
    },
    refreshable: {
        type: Boolean,
        default: true
    },
    refreshedAt: {
        type: Date,
    }
});
schema.index({ expireAt: -1 });
schema.index({ user: -1 });
exports.UserTokenModel = databases_service_1.db.local.model('User_Token', schema);
//# sourceMappingURL=user.token.model.js.map