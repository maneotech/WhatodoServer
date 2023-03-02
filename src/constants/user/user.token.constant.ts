import { IResponse } from "../../interfaces/request.interface";
import { ApiError } from "../api-errors.constants";
import { HttpStatusCode } from "../httpstatuscode.constant";

export enum UserTokenStatus {
    enabled = 'enabled',
    disabled = 'disabled',
    canceled = 'canceled'
}

export enum UserTokenType {
    normal = 'normal',
    refresh = 'refresh'
}

export interface IJWTTokenPayload {
    userId : string,
    tokenId : string,
    type : UserTokenType
}

export const UserTokenRequestError = {
    NO_ERROR : {success : true, data : null, message : "no error", error : ApiError.NO_ERRORS, status : HttpStatusCode.Ok} as IResponse,
    UNKNOWN_ERROR : {success : false, data : null, message : "unknown error", error : ApiError.USER_TOKEN_UNKOWN_ERROR, status : HttpStatusCode.InternalServerError} as IResponse,
    TOKEN_INVALID : {success : false, data : null, message : "token is invalid", error : ApiError.USER_TOKEN_TOKEN_INVALID, status : HttpStatusCode.BadRequest} as IResponse,
    TOKEN_EXPIRED : {success : false, data : null, message : "token expired", error : ApiError.USER_TOKEN_TOKEN_EXPIRED, status : HttpStatusCode.BadRequest} as IResponse,
    INVALID_TYPE : {success : false, data : null, message : "type of token is invalid", error : ApiError.USER_TOKEN_INVALID_TYPE, status : HttpStatusCode.BadRequest} as IResponse,
    REFRESH_TOKEN_INVALID : {success : false, data : null, message : "refresh token is invalid", error : ApiError.USER_TOKEN_REFRESH_TOKEN_INVALID, status : HttpStatusCode.BadRequest} as IResponse,
    REFRESH_TOKEN_EXPIRED : {success : false, data : null, message : "refresh token expired", error : ApiError.USER_TOKEN_REFRESH_TOKEN_EXPIRED, status : HttpStatusCode.BadRequest} as IResponse,
    REFRESH_TOKEN_ALREADY_USED : {success : false, data : null, message : "refresh token already used", error : ApiError.USER_TOKEN_REFRESH_TOKEN_ALREADY_USED, status : HttpStatusCode.BadRequest} as IResponse,
}