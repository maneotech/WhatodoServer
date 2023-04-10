import mongoose from 'mongoose'
mongoose.Promise = global.Promise;

export type DatabasesType = {
    local : mongoose.Connection
}

export let db : DatabasesType = {
    local : null as any
}


export class DatabasesService {

    public static initDatabases() : DatabasesType {
        db.local = mongoose.createConnection(process.env.MONGODB_URI, {dbName: process.env.DB_NAME});   
        return db;
    }
}