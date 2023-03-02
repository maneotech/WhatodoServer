import mongoose from 'mongoose'
import conf from '../../confs/conf';
mongoose.Promise = global.Promise;

export type DatabasesType = {
    local : mongoose.Connection
}

export let db : DatabasesType = {
    local : null as any
}


export class DatabasesService {

    public static initDatabases() : DatabasesType {
        db.local = mongoose.createConnection(conf.db.local.host, conf.db.local.options);   
        return db;
    }
}