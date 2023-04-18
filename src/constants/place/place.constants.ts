import { IResponse } from "../../interfaces/request.interface";
import { ApiError } from "../api-errors.constants";
import { HttpStatusCode } from "../httpstatuscode.constant";

export const PlaceRequestError = {
    NO_ERROR: { success: true, data: null, message: null, error: ApiError.NO_ERRORS, status: HttpStatusCode.Ok } as IResponse,
    UNKNOWN_ERROR: { success: false, data: null, message: null, error: ApiError.PLACE_UNKNOWN_ERROR, status: HttpStatusCode.InternalServerError } as IResponse,
    FETCHING_API: { success: false, data: null, message: "error during http api fetching", error: ApiError.PLACE_API_FETCHING, status: HttpStatusCode.InternalServerError } as IResponse,
    PRICE_TYPE_EMPTY: { success: false, data: null, message: "price type is empty", error: ApiError.PLACE_PRICE_TYPE_EMPTY, status: HttpStatusCode.InternalServerError } as IResponse,
    ACTIVITIES_EMPTY: { success: false, data: null, message: "activities are empty", error: ApiError.PLACE_ACTIVITY_EMPTY, status: HttpStatusCode.InternalServerError } as IResponse,
    BODY_EMPTY: { success: false, data: null, message: "body is empty", error: ApiError.PLACE_BODY_EMPTY, status: HttpStatusCode.InternalServerError } as IResponse,
    BODY_ERROR: { success: false, data: null, message: "body is not clean", error: ApiError.PLACE_BODY_ERROR, status: HttpStatusCode.InternalServerError } as IResponse,
    NO_RESULT: { success: false, data: null, message: "no result", error: ApiError.PLACE_NO_RESULT, status: HttpStatusCode.InternalServerError } as IResponse,
    ERROR_SPENDING_TOKEN: { success: false, data: null, message: "error spending token", error: ApiError.PLACE_ERROR_SPENDING_TOKEN, status: HttpStatusCode.InternalServerError } as IResponse,
    NOT_ENOUGH_TOKEN: { success: false, data: null, message: "not enough token", error: ApiError.PLACE_NOT_ENOUGH_TOKEN, status: HttpStatusCode.InternalServerError } as IResponse,
    NOT_CREATED_ERROR: { success: false, data: null, message: "showed place couldn't be created", error: ApiError.PLACE_NOT_CREATED, status: HttpStatusCode.InternalServerError } as IResponse,
    ACCEPT_ERROR: { success: false, data: null, message: "accept place error", error: ApiError.PLACE_NOT_ACCEPTED, status: HttpStatusCode.InternalServerError } as IResponse,
    GET_ACCEPTED_ERROR: { success: false, data: null, message: "get accepted places error", error: ApiError.PLACE_GET_ACCEPTED, status: HttpStatusCode.InternalServerError } as IResponse,
    REFUSE_ERROR: { success: false, data: null, message: "refuse place error", error: ApiError.PLACE_NOT_REFUSED, status: HttpStatusCode.InternalServerError } as IResponse,
    SAVE_SELECTED_PLACE: { success: false, data: null, message: "save selected place error", error: ApiError.PLACE_SAVE_SELECTED, status: HttpStatusCode.InternalServerError } as IResponse,
    INVALID_REQUEST: { success: false, data: null, message: "invalid request place error", error: ApiError.PLACE_INVALID_REQUEST, status: HttpStatusCode.InternalServerError } as IResponse,

}