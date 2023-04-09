import { IResponse } from "../../interfaces/request.interface"
import { ApiError } from "../api-errors.constants"
import { HttpStatusCode } from "../httpstatuscode.constant"

export enum UserRole {
    user = 'user',
    superadmin = 'superadmin'
}

export enum UserStatus {
    enabled = 'enabled',
    disabled = 'disabled'
}

export enum UserThirdPart {
    NO = "no",
    FACEBOOK ="facebook",
    GOOGLE = "google",
    APPLE = "apple"
}

export const UserFieldModelRequired = {
    [UserRole.user] : ['firstname', 'email', 'password'],
}

export const UserRequestError = {
    NO_ERROR : {success : true, data : null, message : "no error", error : ApiError.NO_ERRORS, status : HttpStatusCode.Ok} as IResponse,
    UNKNOWN_ERROR : {success : false, data : null, message : "unknown error", error : ApiError.USER_UNKOWN_ERROR, status : HttpStatusCode.InternalServerError} as IResponse,
    USER_DOESNT_EXIST : {success : false, data : null, message : "user doesn't exist", error : ApiError.USER_USER_DOEST_EXIST, status : HttpStatusCode.NotFound} as IResponse,
    DATA_IS_EMPTY : {success : false, data : null, message : "data is empty", error : ApiError.USER_DATA_IF_EMPTY, status : HttpStatusCode.BadRequest} as IResponse,
    KEY_IS_NEEDED : {success : false, data : null, message : "key is required : ", error : ApiError.USER_KEY_IS_NEEDED, status : HttpStatusCode.BadRequest} as IResponse,
    PASSWORD_IS_EMPTY : {success : false, data : null, message : "password can't be empty", error : ApiError.USER_PASSWORD_IS_EMPTY, status : HttpStatusCode.BadRequest} as IResponse,
    EMAIL_ALREADY_USED : {success : false, data : null, message : "email already used", error : ApiError.USER_EMAIL_ALREADY_USED, status : HttpStatusCode.BadRequest} as IResponse,
    MAIL_IS_INVALID : {success : false, data : null, message : "mail is invalid", error : ApiError.USER_MAIL_IS_INVALID, status : HttpStatusCode.BadRequest} as IResponse,
}

export const UserLoginRequestError = {
    NO_ERROR : {success : true, data : null, message : "no error", error : ApiError.NO_ERRORS, status : HttpStatusCode.Ok} as IResponse,
    UNKNOWN_ERROR : {success : false, data : null, message : "unknown error", error : ApiError.USER_LOGIN_UNKOWN_ERROR, status : HttpStatusCode.InternalServerError} as IResponse,
    ID_INVALID : {success : false, data : null, message : "identifiant or password is invalid", error : ApiError.USER_LOGIN_ID_INVALID, status : HttpStatusCode.BadRequest} as IResponse,
    ID_EMPTY : {success : false, data : null, message : "identifiant or password can't be empty", error : ApiError.USER_LOGIN_ID_EMPTY, status : HttpStatusCode.BadRequest} as IResponse,
    STATUS_DISABLED : {success : false, data : null, message : "status of user is disabled", error : ApiError.USER_LOGIN_STATUS_DISABLED, status : HttpStatusCode.BadRequest} as IResponse,
    BODY_EMPTY: { success: false, data: null, message: "body is empty", error: ApiError.USER_LOGIN_BODY_EMPTY, status: HttpStatusCode.InternalServerError } as IResponse,
    BODY_ERROR: { success: false, data: null, message: "body error", error: ApiError.USER_LOGIN_BODY_EMPTY, status: HttpStatusCode.InternalServerError } as IResponse,
    USER_EMPTY: { success: false, data: null, message: "user empty", error: ApiError.USER_LOGIN_BODY_EMPTY, status: HttpStatusCode.InternalServerError } as IResponse,
    WRONG_THIRD_TYPE: { success: false, data: null, message: "wrong third type", error: ApiError.USER_WRONG_THIRD_TYPE, status: HttpStatusCode.InternalServerError } as IResponse,

}