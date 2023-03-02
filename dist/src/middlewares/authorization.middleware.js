"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeIpAddresses = exports.authorize = void 0;
const lodash_1 = __importDefault(require("lodash"));
const request_errors_service_1 = __importDefault(require("../services/request-errors.service"));
const localhostIps = ['::1', '127.0.0.1', 'localhost'];
function authorize(roles) {
    let _roles = [];
    if (Array.isArray(roles)) {
        _roles = [...roles];
    }
    else {
        _roles = [roles];
    }
    return function (req, res, next) {
        const user = req.user;
        if (!user || !user.role)
            return request_errors_service_1.default.accessForbidden(req, res);
        if (_roles.indexOf(user.role.toString()) < 0)
            return request_errors_service_1.default.accessForbidden(req, res);
        next();
    };
}
exports.authorize = authorize;
function authorizeIpAddresses(ips, localhostEnabled = true) {
    if (lodash_1.default.isString(ips)) {
        ips = [ips];
    }
    return function (req, res, next) {
        let clientIp = req.clientIp;
        if (ips) {
            if (ips.includes(clientIp))
                return next();
            if (localhostEnabled && localhostIps.includes(clientIp))
                return next();
        }
        return request_errors_service_1.default.accessForbidden(req, res);
    };
}
exports.authorizeIpAddresses = authorizeIpAddresses;
//# sourceMappingURL=authorization.middleware.js.map