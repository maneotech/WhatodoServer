import mongoose, { ObjectId } from "mongoose";
import { IModel } from "../../interfaces/model.interface";
import { db } from "../../services/databases.service";
import { MongooseCustomSchema } from "../../services/mongoose.service";
import { UserModel } from "../user/user.model";
import { AdContentModel } from "./ad.content.model";

const schema = new MongooseCustomSchema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: UserModel,
        required: true,
    },

    adContent: {
        type: mongoose.Schema.Types.Mixed,
        ref: AdContentModel,
    },
    hasEnded : {
        type: Boolean,
        required: true
    },
    clicked: {
        type: Boolean,
        required: true
    }
});

export interface IAdVideoModel extends IModel {
    user: ObjectId;
    adContent: AdContentModel;
    hasEnded:boolean;
    clicked:boolean;
}

export interface IAdVideoDocument extends mongoose.Document<ObjectId>, IAdVideoModel { }

export const AdVideoModel = db.local.model<IAdVideoDocument>('AdVideo', schema);

