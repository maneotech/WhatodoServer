"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const conf_dev_1 = require("./conf.dev");
const conf_prod_1 = require("./conf.prod");
const conf_type_1 = require("./conf.type");
const env = conf_type_1.ConfEnvironment.DEVELOPMENT;
let conf = null;
if (env == conf_type_1.ConfEnvironment.DEVELOPMENT) {
    conf = conf_dev_1.ConfDev;
}
else {
    conf = conf_prod_1.ConfProd;
}
exports.default = conf;
//# sourceMappingURL=conf.js.map