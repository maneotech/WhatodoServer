import mongoose, { Model, ObjectId, SchemaDefinition, SchemaDefinitionType, SchemaOptions } from 'mongoose';
import { ObjId } from '../interfaces/model.interface';

const defaultOptions : SchemaOptions = {
    timestamps: true, 
    strict : true,
    strictQuery : false,
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
}
export class MongooseCustomSchema<DocType = any, M = Model<DocType, any, any, any>, TInstanceMethods = {}> extends mongoose.Schema {
    constructor(definition?: SchemaDefinition<SchemaDefinitionType<DocType>>, options: SchemaOptions = defaultOptions) {
        super(definition, options)
        this.virtual('__search_score');
    }
}


export class MongooseService {

    public static generateId() : string {
        return (new mongoose.mongo.ObjectId()).toString();
    }

    public static idIsValid(id : ObjId) : boolean {
        var result = false;
        if (id && mongoose.Types.ObjectId.isValid(id.toString())) {
            result = true;
        }
        return result;
    }

    public static getIdFromStringOrObject(obj : any, asString : boolean = true) : string {
        var result = null;
        if (obj) {
            if (MongooseService.idIsValid(obj)) {
                result = obj;
            } else if (obj._id) {
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

    public static areSameIds(obj1 : any, obj2 : any, allNullAreSame : boolean = false) : boolean {
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

    public static getObjectId(id : any) : mongoose.Types.ObjectId {
        return MongooseService.toObjectId(id);
    }

    public static toObjectId(id) : mongoose.Types.ObjectId {
        return new mongoose.Types.ObjectId(id.toString());
    }
}