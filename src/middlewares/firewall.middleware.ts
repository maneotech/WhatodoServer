import RequestErrors from "../services/request-errors.service";

export function firewallMiddleware(req, res, next) {
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
        RequestErrors.accessForbidden(req, res);
    } else {
        next();
    }
}