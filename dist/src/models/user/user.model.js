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
    lastname: {
        type: String
    },
    nickname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        select: false
    },
    role: {
        type: String,
        enum: user_constant_1.UserRole,
        select: false
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    birthday: {
        type: Date,
        select: false
    },
    height: {
        type: Number,
        select: false
    },
    weight: {
        type: Number,
        select: false
    },
    sex: {
        type: String,
        enum: user_constant_1.UserSex,
        select: false
    },
    picture: {
        type: String,
    },
    status: {
        type: String,
        enum: user_constant_1.UserStatus,
        default: user_constant_1.UserStatus.enabled
    }
});
schema.index({ email: -1 });
schema.index({ username: -1 });
schema.index({ firstname: -1 });
schema.index({ lastname: -1 });
schema.index({ role: -1 });
// VIRTUAL VARIABLE
schema.virtual('connected');
// VIRTUAL POPULATE
schema.virtual('lastPosition', {
    ref: 'Position',
    localField: '_id',
    foreignField: 'user',
    justOne: true,
    options: { sort: { time: -1 } }
});
schema.virtual('positions', {
    ref: 'Position',
    localField: '_id',
    foreignField: 'user',
    justOne: false,
    options: { sort: { time: -1 } }
});
// get relation from initiator
schema.virtual('relationshipsFromInitiator', {
    ref: 'Relationship',
    localField: '_id',
    foreignField: 'initiator',
    justOne: false
});
// get relation from target
schema.virtual('relationshipsFromTarget', {
    ref: 'Relationship',
    localField: '_id',
    foreignField: 'target',
    justOne: false
});
exports.UserModel = databases_service_1.db.local.model('User', schema);
//# sourceMappingURL=user.model.js.map