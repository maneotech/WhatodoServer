import { Request, Response } from "express";

declare global {
    namespace Express {
        interface Request {
            clientIp: string;
            realIp : string;
        }
    }
}


export function clientIpMiddleware(req : Request, res : Response, next) {
    var ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress || '').toString();
    if (ip.substr(0, 7) == "::ffff:") {
        ip = ip.substr(7)
    }
    var realIp = req.headers['x-real-ip']?.toString();
    if (realIp && realIp.substr(0, 7) == "::ffff:") {
        realIp = realIp.substr(7);
    }
    req.clientIp = ip;
    req.realIp = realIp || ip;
    next();
}