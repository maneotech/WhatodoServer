import { DateConstants } from "../src/constants/date.constant";
import { ConfEnvironment, IConf, IConfAuthentification, IConfDb } from "./conf.type";

export const ConfProd : IConf  = {
    env : ConfEnvironment.PRODUCTION,
    port : 3010,
    staticBaseUrl : "",
    hashPasswordSecret : "P@cKm@n@G3RCørP;",
    authentification : {
        tokenSecret : "XXXXXXXXXXXXX",
        refreshTokenSecret : "XXXXXXXXXXXXX",
        tokenExpireAfter : DateConstants.day,
        refreshTokenExpireAfter : 365 * DateConstants.day,
        delayRefreshMultiUse : 1 * DateConstants.day
    },
    schedulePersistentTask: {
        enabled : true
    },
    db: {
            local : {
                host: "127.0.0.1",
                options: {
                    user: "test",
                    pass: "test",
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                }
            }
    },
    staticRelativePath : '../static'
}