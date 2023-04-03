import { IResponse } from "../../interfaces/request.interface";
import { AdContentModel } from "../../models/ad/ad.content.model";
import { AdVideoModel, IAdVideoModel } from "../../models/ad/ad.video.model";
import { ApiError } from "../api-errors.constants";
import { HttpStatusCode } from "../httpstatuscode.constant";
import { LanguageEnum } from "../language.constants";
import { PlatformEnum } from "../platform.constants";

export const AdRequestError = {
    NO_ERROR: { success: true, data: null, message: null, error: ApiError.NO_ERRORS, status: HttpStatusCode.Ok } as IResponse,
    BODY_EMPTY: { success: false, data: null, message: "body is empty", error: ApiError.AD_BODY_EMPTY, status: HttpStatusCode.InternalServerError } as IResponse,
    BODY_ERROR: { success: false, data: null, message: "body is not clean", error: ApiError.AD_BODY_ERROR, status: HttpStatusCode.InternalServerError } as IResponse,
    UNKNOWN_ID: { success: false, data: null, message: "unkwown ad id", error: ApiError.AD_UNKNOWN_ID, status: HttpStatusCode.InternalServerError } as IResponse,
    INSERTING_DB: { success: false, data: null, message: "error inserting db", error: ApiError.AD_INSERT_DB, status: HttpStatusCode.InternalServerError } as IResponse,
    ERROR_SPENDING_TOKEN: { success: false, data: null, message: "error earning one token", error: ApiError.AD_EARN_TOKEN, status: HttpStatusCode.InternalServerError } as IResponse,
    SPONSORSHIP_ALREADY_EXIST: { success: false, data: null, message: "sponsorship already exist", error: ApiError.AD_SPONSORSHIP_EXISTS, status: HttpStatusCode.InternalServerError } as IResponse,
    USER_ALREADY_EXIST: { success: false, data: null, message: "user already exist", error: ApiError.AD_USER_EXISTS, status: HttpStatusCode.InternalServerError } as IResponse,

}

export const AdVideoObjectList: AdContentModel[] = [
    new AdContentModel("b5f30c84-8ac4-4ebc-ad86-2f8612c52e1c", "voyageengus", "https://assets.mixkit.co/videos/preview/mixkit-winter-fashion-cold-looking-woman-concept-video-39874-large.mp4", "https://maneotech.fr", LanguageEnum.ALL, PlatformEnum.ANDROID),
    new AdContentModel("4027dd64-c645-4638-a251-bbbab12a5ac9", "crapaud", "https://assets.mixkit.co/videos/preview/mixkit-red-frog-on-a-log-1487-large.mp4", "https://facebook.com", LanguageEnum.FR, PlatformEnum.ALL),


]