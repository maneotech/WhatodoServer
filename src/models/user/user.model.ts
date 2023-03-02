import mongoose, { ObjectId } from 'mongoose';
import { UserRole, UserSex, UserStatus } from '../../constants/user/user.constant';
import { IModel } from '../../interfaces/model.interface';
import { db } from '../../services/databases.service';
import { MongooseCustomSchema } from '../../services/mongoose.service';


const schema = new MongooseCustomSchema({
    firstname : {
        type : String
    },
    lastname : {
        type : String
    },
    nickname : {
        type : String,
        required : true
    },
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        select : false
    },
    role : {
        type: String,
        enum: UserRole,
        select : false
    },
    password : {
        type: String,
        required: true,
        select: false
    },
    birthday : {
        type : Date,
        select : false
    },
    height: {
        type : Number,
        select : false
    },
    weight: {
        type : Number,
        select : false
    },
    sex : {
        type: String,
        enum: UserSex,
        select : false
    },
    picture : {
        type: String,
    },
    status : {
        type : String,
        enum : UserStatus,
        default : UserStatus.enabled
    }
});

export interface IUserModel extends IModel {
    firstname? : string;
    lastname? : string;
    nickname : string;
    username : string;
    email : string;
    role : string;
    password? : string;
    birthday? : Date;
    height?: number;
    weight?: number;
    sex? : UserSex;
    picture? : string;
    status? : UserStatus;
    connected? : boolean;
}

export interface IUserDocument extends mongoose.Document<ObjectId>, IUserModel {}

schema.index({ email: -1});
schema.index({ username: -1});
schema.index({ firstname: -1});
schema.index({ lastname: -1});
schema.index({ role: -1});

// VIRTUAL VARIABLE
schema.virtual('connected');

// VIRTUAL POPULATE
schema.virtual('lastPosition', {
    ref: 'Position',
    localField: '_id',
    foreignField: 'user',
    justOne: true,
    options : {sort : {time : -1}}
});

schema.virtual('positions', {
    ref: 'Position',
    localField: '_id',
    foreignField: 'user',
    justOne: false,
    options : {sort : {time : -1}}
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


export const UserModel = db.local.model<IUserDocument>('User', schema);