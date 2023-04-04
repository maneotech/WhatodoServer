import { DateConstants } from "../src/constants/date.constant";
import { ConfEnvironment, IConf } from "./conf.type";

export const ConfDev : IConf  = {
    env : ConfEnvironment.DEVELOPMENT,
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
                host: "mongodb://127.0.0.1:27017/whatodo",
                options: {
                    user: "",
                    pass: "",
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                }
            }
    },
    urlPort: "http://localhost:3010/"
}