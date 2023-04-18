import mongoose, { ObjectId } from "mongoose";
import { IModel } from "../../interfaces/model.interface";
import { db } from "../../services/databases.service";
import { MongooseCustomSchema } from "../../services/mongoose.service";
import { UserModel } from "../user/user.model";
import { GeneratedOptionPlaceModel } from "./generated.option.place.model";
import { ResponsePlaceModel } from "./response.place.model";

const schema = new MongooseCustomSchema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: UserModel,
        required: true,
    },

    place: {
        type: mongoose.Schema.Types.Mixed,
        ref: ResponsePlaceModel,
    },
    accepted: {
        type: Boolean,
        required: true,
        default: false
    },
    generatedOptions: {
        type: mongoose.Schema.Types.Mixed,
        ref: GeneratedOptionPlaceModel
    }
});

export interface IShowedPlaceModel extends IModel {
    user: ObjectId;
    place: ResponsePlaceModel;
    accepted?: boolean;
    generatedOptions : GeneratedOptionPlaceModel;
}

export interface IShowedPlaceDocument extends mongoose.Document<ObjectId>, IShowedPlaceModel { }

export const ShowedPlaceModel = db.local.model<IShowedPlaceDocument>('ShowedPlace', schema);
