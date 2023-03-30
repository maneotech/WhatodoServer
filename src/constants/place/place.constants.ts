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

}