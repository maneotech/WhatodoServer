import mongoose, { ObjectId } from "mongoose";
import { IModel } from "../../interfaces/model.interface";
import { db } from "../../services/databases.service";
import { MongooseCustomSchema } from "../../services/mongoose.service";
import { UserModel } from "../user/user.model";
import { AdContentModel } from "./ad.content.model";

const schema = new MongooseCustomSchema({
    userFrom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: UserModel,
        required: true,
    },

    emailTarget: {
        type: String,
        required: true
    },
    targetHasConnected: {
        type: Boolean,
        required: true
    },
    userFromHasBeenNotified: {
        type: Boolean,
        required: true
    }

});

export interface IAdSponsorshipModel extends IModel {
    userFrom: ObjectId;
    emailTarget: String;
    targetHasConnected: boolean;
    userFromHasBeenNotified: boolean;
}

export interface IAdSponsorshipDocument extends mongoose.Document<ObjectId>, IAdSponsorshipModel { }

export const AdSponsorshipModel = db.local.model<IAdSponsorshipDocument>('AdSponsorship', schema);

