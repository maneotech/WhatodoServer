import mongoose, { ObjectId } from 'mongoose';
import { UserRole, UserSex, UserStatus } from '../../constants/user/user.constant';
import { IModel } from '../../interfaces/model.interface';
import { db } from '../../services/databases.service';
import { MongooseCustomSchema } from '../../services/mongoose.service';


const schema = new MongooseCustomSchema({
    firstname : {
        type : String
    },
    email : {
        type : String,
        select : false
    },
    password : {
        type: String,
        required: true,
        select: false
    },
    status : {
        type : String,
        enum : UserStatus,
        default : UserStatus.enabled
    },
    token: {
        type: Number,
        default: 3
    }
});

export interface IUserModel extends IModel {
    firstname? : string;
    email : string;
    password? : string;
    status? : UserStatus;
    token?: number;
}

export interface IUserDocument extends mongoose.Document<ObjectId>, IUserModel {}

schema.index({ email: -1});
schema.index({ firstname: -1});


export const UserModel = db.local.model<IUserDocument>('User', schema);