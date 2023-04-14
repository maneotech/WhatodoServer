import mongoose, { ObjectId } from "mongoose";
import { IModel } from "../../interfaces/model.interface";
import { db } from "../../services/databases.service";
import { MongooseCustomSchema } from "../../services/mongoose.service";
import { UserModel } from "../user/user.model";

const schema = new MongooseCustomSchema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: UserModel,
        required: true,
    },

    placeId: {
        type: String,
        required: true,
    },
});

export interface ISelectedPlaceModel extends IModel {
    user: ObjectId;
    placeId: String;
}

export interface ISelectedPlaceDocument extends mongoose.Document<ObjectId>, ISelectedPlaceModel { }

export const SelectedPlaceModel = db.local.model<ISelectedPlaceDocument>('SelectedPlace', schema);
