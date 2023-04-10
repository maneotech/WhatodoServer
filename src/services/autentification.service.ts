import { Request } from "express";
import { IJWTTokenPayload, UserTokenType } from "../constants/user/user.token.constant";
import jwt from 'jsonwebtoken'

export class AuthentificationService {
    public static extractBearerToken(req : Request) : string {
        const auth = req.headers.authorization;
        if (auth) {
            const splitted = req.headers.authorization.split(' ');
            if (splitted?.length == 2) {
                if (splitted[0] === 'Bearer') {
                    return splitted[1]
                }
            }
        }
        return null;
    }

    public static encodeJWTToken(userId : string, tokenId : string, type : UserTokenType) : string {
        if (type == UserTokenType.normal) 
            return jwt.sign({
                userId : userId,
                tokenId : tokenId,
                type : UserTokenType.normal 
            } as IJWTTokenPayload, process.env.TOKEN_SECRET)
        else if (type == UserTokenType.refresh)
            return jwt.sign({
                userId : userId,
                tokenId : tokenId,
                type : UserTokenType.refresh 
            } as IJWTTokenPayload, process.env.REFRESH_TOKEN_SECRET);
        return null;
    }

    public static decodeJWTToken(token : string) : IJWTTokenPayload {
        return jwt.decode(token);
    }
}