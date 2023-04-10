import { DateConstants } from '../../constants/date.constant';
import { IJWTTokenPayload, UserTokenRequestError, UserTokenStatus, UserTokenType } from '../../constants/user/user.token.constant';
import { ObjId } from '../../interfaces/model.interface';
import { IResponse } from '../../interfaces/request.interface';
import { IUserTokenDocument, IUserTokenModel } from '../../models/user/user.token.model';
import UserRepository from "../../repositories/user/user.repository";
import UserTokenRepository from '../../repositories/user/user.token.repository';
import { AuthentificationService } from '../autentification.service';
import { MongooseService } from '../mongoose.service';


const userRepository = new UserRepository();
const userTokenRepository = new UserTokenRepository();

export interface IAuthentificationToken {
    token : string,
    refreshToken : string,
    tokenExpireAt : Date,
    refreshTokenExpireAt : Date
}

export class UserTokenService {

    static async createToken(userId : ObjId) : Promise<IAuthentificationToken> {
        let user = await userRepository.getById(userId, [], ['_id', 'role', 'status']);
        let result : IAuthentificationToken = null;
        if (user) {
            let now = new Date();
            let data : IUserTokenModel = {
                user : user._id,
                status : UserTokenStatus.enabled
            }

            data.expireAt = new Date(now.getTime() + 180 * DateConstants.day);
            data.refreshExpireAt = new Date(now.getTime() + 365 * DateConstants.day);

            let doc = await userTokenRepository.create(data);
            if (doc) {
                const token = AuthentificationService.encodeJWTToken(user._id.toString(), doc._id.toString(), UserTokenType.normal);
                const refreshToken = AuthentificationService.encodeJWTToken(user._id.toString(), doc._id.toString(), UserTokenType.refresh);
                result = {
                    token : token,
                    refreshToken : refreshToken,
                    tokenExpireAt : data.expireAt,
                    refreshTokenExpireAt : data.refreshExpireAt
                }
            }
        }
        return result;
    }

    static async tokenIsValid(token : string) : Promise<IResponse<IUserTokenDocument>> {
        if (!token) UserTokenRequestError.TOKEN_INVALID;
        const decoded : IJWTTokenPayload = AuthentificationService.decodeJWTToken(token);

        if (!decoded.tokenId || !decoded.userId)
            return UserTokenRequestError.TOKEN_INVALID;

        if (decoded?.type != UserTokenType.normal)
            return UserTokenRequestError.INVALID_TYPE;

        let doc = await userTokenRepository.getById(decoded.tokenId);
        if (!doc || !MongooseService.areSameIds(decoded.userId, doc.user))
            return UserTokenRequestError.TOKEN_INVALID;

        if (doc.status != UserTokenStatus.enabled)
            return UserTokenRequestError.TOKEN_INVALID;

        const response : IResponse = UserTokenRequestError.NO_ERROR;
        response.data = doc;
        return response;
    }

    static tokenExpired(doc : IUserTokenDocument) : IResponse<IUserTokenDocument> {
        let now = new Date();
        if (doc.expireAt && now.getTime() > doc.expireAt.getTime())
            return UserTokenRequestError.TOKEN_EXPIRED;
        if (doc.limit && doc.used >= doc.limit)
            return UserTokenRequestError.TOKEN_EXPIRED;
        const response : IResponse = UserTokenRequestError.NO_ERROR;
        response.data = doc;
        return response;
    }

    static async refreshTokenIsValid(token : string, refreshToken : string) : Promise<IResponse<IUserTokenDocument>> {
        if (!refreshToken)
            return UserTokenRequestError.REFRESH_TOKEN_INVALID;
        let response : IResponse = await UserTokenService.tokenIsValid(token);
        if (!response.success)
            return response;
        const doc = response.data;
        let now = new Date();
        if (doc.status != UserTokenStatus.enabled)
            return UserTokenRequestError.REFRESH_TOKEN_INVALID;
        if (doc.refreshExpireAt && now.getTime() > doc.refreshExpireAt.getTime())
            return UserTokenRequestError.REFRESH_TOKEN_EXPIRED;
        if (doc.refreshedAt && now.getTime() > doc.refreshedAt.getTime() + 1 * DateConstants.day)
            return UserTokenRequestError.REFRESH_TOKEN_ALREADY_USED;

        const decoded : IJWTTokenPayload = AuthentificationService.decodeJWTToken(refreshToken);
        if (!MongooseService.areSameIds(decoded?.userId, doc.user))
            return UserTokenRequestError.REFRESH_TOKEN_INVALID;

        if (!MongooseService.areSameIds(decoded?.tokenId, doc._id))
            return UserTokenRequestError.REFRESH_TOKEN_INVALID;

        if (decoded?.type != UserTokenType.refresh)
            return UserTokenRequestError.INVALID_TYPE;

        response = UserTokenRequestError.NO_ERROR;
        response.data = doc;
        return response;
    }

    static async refreshToken(token : string, refreshToken : string) : Promise<IResponse<IAuthentificationToken>> {
        let result : IResponse<any> = await UserTokenService.refreshTokenIsValid(token, refreshToken);
        if (result.success) {
            const doc : IUserTokenDocument = result.data;
            result = UserTokenRequestError.NO_ERROR;
            result.data = await UserTokenService.createToken(doc.user.toString());
            await userTokenRepository.updateById(doc._id, {refreshedAt : new Date()});
        }
        return result;
    }

    static async tokenIsValidated(tokenId : ObjId) {
        await userTokenRepository.incrementUse(tokenId);
    }
}