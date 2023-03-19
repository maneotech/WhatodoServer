"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const user_constant_1 = require("../../constants/user/user.constant");
const databases_service_1 = require("../../services/databases.service");
const mongoose_service_1 = require("../../services/mongoose.service");
const schema = new mongoose_service_1.MongooseCustomSchema({
    firstname: {
        type: String
    },
    email: {
        type: String,
        select: false
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    status: {
        type: String,
        enum: user_constant_1.UserStatus,
        default: user_constant_1.UserStatus.enabled
    }
});
schema.index({ email: -1 });
schema.index({ firstname: -1 });
exports.UserModel = databases_service_1.db.local.model('User', schema);
//# sourceMappingURL=user.model.js.map