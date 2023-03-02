"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientIpMiddleware = void 0;
function clientIpMiddleware(req, res, next) {
    var _a;
    var ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress || '').toString();
    if (ip.substr(0, 7) == "::ffff:") {
        ip = ip.substr(7);
    }
    var realIp = (_a = req.headers['x-real-ip']) === null || _a === void 0 ? void 0 : _a.toString();
    if (realIp && realIp.substr(0, 7) == "::ffff:") {
        realIp = realIp.substr(7);
    }
    req.clientIp = ip;
    req.realIp = realIp || ip;
    next();
}
exports.clientIpMiddleware = clientIpMiddleware;
//# sourceMappingURL=clientip.middleware.js.map