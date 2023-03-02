import mongoose, { ObjectId } from 'mongoose';
import { UserTokenStatus } from '../../constants/user/user.token.constant';
import { IModel } from '../../interfaces/model.interface';
import { db } from '../../services/databases.service';
import { MongooseCustomSchema } from '../../services/mongoose.service';
import { IUserModel, UserModel } from './user.model';

const schema = new MongooseCustomSchema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: UserModel
    },
    status : {
        type : String,
        enum: UserTokenStatus
    },
    expireAt: {
        type: Date,
    },
    refreshExpireAt: {
        type: Date,
    },
    used: {
        type : Number,
        default : 0
    },
    limit : {
        type : Number
    },
    refreshable : {
        type : Boolean,
        default : true
    },
    refreshedAt : {
        type : Date,
    }
});

export interface IUserTokenModel<User extends (ObjectId | IUserModel) = ObjectId> extends IModel {
    user : User;
    status : UserTokenStatus;
    expireAt? : Date;
    refreshExpireAt? : Date;
    used? : number,
    limit? : number,
    refreshable? : boolean,
    refreshedAt? : Date
}

export interface IUserTokenDocument extends mongoose.Document<ObjectId>, IUserTokenModel {}

schema.index({ expireAt: -1});
schema.index({ user: -1});
export const UserTokenModel = db.local.model<IUserTokenDocument>('User_Token', schema);