"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfProd = void 0;
const date_constant_1 = require("../src/constants/date.constant");
const conf_type_1 = require("./conf.type");
exports.ConfProd = {
    env: conf_type_1.ConfEnvironment.PRODUCTION,
    port: 3010,
    staticBaseUrl: "",
    hashPasswordSecret: "P@cKm@n@G3RCørP;",
    authentification: {
        tokenSecret: "XXXXXXXXXXXXX",
        refreshTokenSecret: "XXXXXXXXXXXXX",
        tokenExpireAfter: date_constant_1.DateConstants.day,
        refreshTokenExpireAfter: 365 * date_constant_1.DateConstants.day,
        delayRefreshMultiUse: 1 * date_constant_1.DateConstants.day
    },
    schedulePersistentTask: {
        enabled: true
    },
    db: {
        local: {
            host: "mongodb://127.0.0.1:27017/",
            options: {
                user: "test",
                pass: "test",
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        }
    },
    urlPort: "http://0.0.0.0:3010/"
};
//# sourceMappingURL=conf.prod.js.map