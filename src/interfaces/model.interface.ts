import mongoose, { ObjectId } from "mongoose";

export interface IModel {
    _id? : ObjectId,
    createdAt? : Date,
    updatedAt? : Date,
    __search_score? : number
}

export interface IDocument extends mongoose.Document<ObjectId>, IModel {}


export type ObjId = string | ObjectId;