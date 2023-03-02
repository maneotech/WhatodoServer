import { Request, Response } from 'express';
import _ from 'lodash'
import { UserRole } from '../constants/user/user.constant';
import RequestErrors from '../services/request-errors.service';

const localhostIps = ['::1', '127.0.0.1', 'localhost'];

export function authorize(roles : UserRole | UserRole[]) {
    let _roles = []
    if (Array.isArray(roles)) {
        _roles = [...roles];
    } else {
        _roles = [roles]
    }
    return function (req : Request, res : Response, next) {
        const user = req.user;
        if (!user || !user.role)
            return RequestErrors.accessForbidden(req, res);
        if (_roles.indexOf(user.role.toString()) < 0)
            return RequestErrors.accessForbidden(req, res);
        next();
    };
}


export function authorizeIpAddresses(ips, localhostEnabled = true) {
    if (_.isString(ips)) {
        ips = [ips];
    }
    return function (req : Request, res  : Response, next) {
        let clientIp = req.clientIp;
        if (ips) {
            if (ips.includes(clientIp))
                return next();
            if (localhostEnabled && localhostIps.includes(clientIp))
                return next();
        }
        return RequestErrors.accessForbidden(req, res);
    };
}