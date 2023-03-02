//import { ApplicationName } from "../src/constants/application.constant";

export enum ConfEnvironment {
    DEVELOPMENT = 'DEVELOPMENT',
    PRODUCTION = 'PRODUCTION'
};
export interface IConfDb {
    host : string,
    options: {
        user: string,
        pass: string,
        useNewUrlParser: boolean,
        useUnifiedTopology: boolean
    }
}

export interface IConfNotification {
    topic: string,
    defaultAndroidChannel : string, // can be null
    gcm : {
        id : string,
        phonegap: boolean, // phonegap compatibility mode, see below (defaults to false)
    },
    apn: {
        token: {
            key: string, // path of file file.p8
            keyId: string,
            teamId: string,
        },
        production: boolean
    },
}

export interface IConfAuthentification {
    tokenSecret : string,
    refreshTokenSecret : string,
    tokenExpireAfter : number, //ms
    refreshTokenExpireAfter : number, //ms
    delayRefreshMultiUse : number, //ms
}

/*export interface IConfNotifications {
    [ApplicationName.mobile] : IConfNotification
}*/

export interface IConf {
    env : ConfEnvironment;
    port : number;
    staticBaseUrl: string;
    hashPasswordSecret : string;
    authentification : IConfAuthentification;
    schedulePersistentTask: {
        enabled : boolean
    },
    db: {
        local : IConfDb
    },
    //notification : IConfNotifications,
    staticRelativePath : string
}
