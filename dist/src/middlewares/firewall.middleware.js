"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.firewallMiddleware = void 0;
const request_errors_service_1 = __importDefault(require("../services/request-errors.service"));
function firewallMiddleware(req, res, next) {
    let enabled = true;
    let checkHosts = false;
    let checkIpBlacklisted = true;
    let hosts = [];
    let ipBlacklisted = [];
    let authorized = true;
    if (enabled) {
        let host = req.get('host');
        let ip = req.clientIp;
        if (checkHosts && hosts) {
            if (hosts.indexOf(host) < 0) {
                authorized = false;
                console.log("Host blacklisted : " + host + " url : " + req.url);
            }
        }
        if (checkIpBlacklisted && ipBlacklisted) {
            if (ipBlacklisted.indexOf(ip) >= 0) {
                authorized = false;
                console.log("IP blacklisted : " + ip + " url : " + req.url);
            }
        }
    }
    if (!authorized) {
        request_errors_service_1.default.accessForbidden(req, res);
    }
    else {
        next();
    }
}
exports.firewallMiddleware = firewallMiddleware;
//# sourceMappingURL=firewall.middleware.js.map