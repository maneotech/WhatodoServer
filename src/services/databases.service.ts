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
        console.log("ici:");
        console.log(process.env.MONGODB_URI);
        console.log(process.env.DB_NAME);
        console.log(process.env.DB_USER);
        console.log(process.env.DB_PASS);

        db.local = mongoose.createConnection(process.env.MONGODB_URI, {dbName: process.env.DB_NAME, user: process.env.DB_USER, pass: process.env.DB_PASS});   
        return db;
    }
}