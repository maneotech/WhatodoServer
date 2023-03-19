import { Request, Response } from 'express';
import { UserRole } from '../constants/user/user.constant';
import { IJWTTokenPayload } from '../constants/user/user.token.constant';
import { IUserModel } from '../models/user/user.model';
import { IUserTokenModel } from '../models/user/user.token.model';
import UserRepository from '../repositories/user/user.repository';
import { AuthentificationService } from '../services/autentification.service';
import RequestErrors from '../services/request-errors.service';
import { UserTokenService } from '../services/user/user.token.service';

const userRepository = new UserRepository()

declare global {
    namespace Express {
        interface Request {
            bearerToken : string;
            user: IUserModel;
            userToken: IUserTokenModel;
            fromAdminUser : boolean;
        }
    }
}

async function getUser(userId : string) : Promise<IUserModel> {
    return await userRepository.getById(userId, [], ["+password", "+email"]);
}


export function authentificate(required = true, ignoreExpiration = false) {
    return async function (req : Request, res : Response, next) {
        const token = AuthentificationService.extractBearerToken(req);
        if (!token) {
            if (required) 
                return RequestErrors.accessForbidden(req, res);
            else
                return next();
        }
        const payload : IJWTTokenPayload = AuthentificationService.decodeJWTToken(token);
        if (!payload)
            return RequestErrors.tokenInvalid(req, res);
        const userId : string = payload.userId;
        const tokenId : string = payload.tokenId;
        let user = null;
        try {
            user = await getUser(userId);
        } catch (err) {
            return RequestErrors.internalError(req, res, err);
        }
    
        if (tokenId) {
            const responseTokenValid = await UserTokenService.tokenIsValid(token);
            req.userToken = responseTokenValid.data;
            if (!responseTokenValid.success) 
                return RequestErrors.tokenInvalid(req, res);
            if (!ignoreExpiration) {
                const responseTokenExpired = UserTokenService.tokenExpired(responseTokenValid.data);
                if (!responseTokenExpired.success) 
                    return RequestErrors.accessExpired(req, res);
            }
        } else {
            return RequestErrors.tokenInvalid(req, res);
        }

        let adminUser = null;
        if (user && user.role == UserRole.superadmin) {
            let targetUserId = req.get('target-user');
            if (targetUserId) {
                adminUser = user;
                try {
                    user = await getUser(targetUserId);
                } catch (err) {
                    return res.status(400).json("Invalid : target-user");
                }
            }
        }

        if (required && !user) {
            return RequestErrors.accessForbidden(req, res);
        }
        UserTokenService.tokenIsValidated(tokenId);

        req.bearerToken = token;
        req.user = user;
        req.fromAdminUser = adminUser;
        return next();
    };
}