"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongooseService = exports.MongooseCustomSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const defaultOptions = {
    timestamps: true,
    strict: true,
    strictQuery: false,
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
};
class MongooseCustomSchema extends mongoose_1.default.Schema {
    constructor(definition, options = defaultOptions) {
        super(definition, options);
        this.virtual('__search_score');
    }
}
exports.MongooseCustomSchema = MongooseCustomSchema;
class MongooseService {
    static generateId() {
        return (new mongoose_1.default.mongo.ObjectId()).toString();
    }
    static idIsValid(id) {
        var result = false;
        if (id && mongoose_1.default.Types.ObjectId.isValid(id.toString())) {
            result = true;
        }
        return result;
    }
    static getIdFromStringOrObject(obj, asString = true) {
        var result = null;
        if (obj) {
            if (MongooseService.idIsValid(obj)) {
                result = obj;
            }
            else if (obj._id) {
                if (MongooseService.idIsValid(obj._id)) {
                    result = obj._id;
                }
            }
        }
        if (asString) {
            if (result) {
                result = result.toString();
            }
        }
        return result;
    }
    static areSameIds(obj1, obj2, allNullAreSame = false) {
        var result = false;
        let id1 = MongooseService.getIdFromStringOrObject(obj1);
        let id2 = MongooseService.getIdFromStringOrObject(obj2);
        if (id1 && id2) {
            if (id1.toString() == id2.toString()) {
                result = true;
            }
        }
        if (!id1 && !id2 && allNullAreSame) {
            result = true;
        }
        return result;
    }
    static getObjectId(id) {
        return MongooseService.toObjectId(id);
    }
    static toObjectId(id) {
        return new mongoose_1.default.Types.ObjectId(id.toString());
    }
}
exports.MongooseService = MongooseService;
//# sourceMappingURL=mongoose.service.js.map