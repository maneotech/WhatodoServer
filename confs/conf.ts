import { ConfDev } from "./conf.dev";
import { ConfProd } from "./conf.prod";
import { ConfEnvironment, IConf } from "./conf.type";

const env : ConfEnvironment = ConfEnvironment.DEVELOPMENT;

let conf : IConf = null as any;

if (env == ConfEnvironment.DEVELOPMENT) {
    conf = ConfDev;
}
else {
    conf = ConfProd;
}


export default conf;