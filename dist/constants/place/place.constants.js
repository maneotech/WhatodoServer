"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceRequestError = void 0;
const api_errors_constants_1 = require("../api-errors.constants");
const httpstatuscode_constant_1 = require("../httpstatuscode.constant");
exports.PlaceRequestError = {
    NO_ERROR: { success: true, data: null, message: null, error: api_errors_constants_1.ApiError.NO_ERRORS, status: httpstatuscode_constant_1.HttpStatusCode.Ok },
    UNKNOWN_ERROR: { success: false, data: null, message: null, error: api_errors_constants_1.ApiError.PLACE_UNKNOWN_ERROR, status: httpstatuscode_constant_1.HttpStatusCode.InternalServerError },
    FETCHING_API: { success: false, data: null, message: "error during http api fetching", error: api_errors_constants_1.ApiError.PLACE_API_FETCHING, status: httpstatuscode_constant_1.HttpStatusCode.InternalServerError },
    PRICE_TYPE_EMPTY: { success: false, data: null, message: "price type is empty", error: api_errors_constants_1.ApiError.PLACE_PRICE_TYPE_EMPTY, status: httpstatuscode_constant_1.HttpStatusCode.InternalServerError },
    ACTIVITIES_EMPTY: { success: false, data: null, message: "activities are empty", error: api_errors_constants_1.ApiError.PLACE_ACTIVITY_EMPTY, status: httpstatuscode_constant_1.HttpStatusCode.InternalServerError },
    BODY_EMPTY: { success: false, data: null, message: "body is empty", error: api_errors_constants_1.ApiError.PLACE_BODY_EMPTY, status: httpstatuscode_constant_1.HttpStatusCode.InternalServerError },
    BODY_ERROR: { success: false, data: null, message: "body is not clean", error: api_errors_constants_1.ApiError.PLACE_BODY_ERROR, status: httpstatuscode_constant_1.HttpStatusCode.InternalServerError },
    NO_RESULT: { success: false, data: null, message: "no result", error: api_errors_constants_1.ApiError.PLACE_NO_RESULT, status: httpstatuscode_constant_1.HttpStatusCode.InternalServerError },
    ERROR_SPENDING_TOKEN: { success: false, data: null, message: "error spending token", error: api_errors_constants_1.ApiError.PLACE_ERROR_SPENDING_TOKEN, status: httpstatuscode_constant_1.HttpStatusCode.InternalServerError },
    NOT_ENOUGH_TOKEN: { success: false, data: null, message: "not enough token", error: api_errors_constants_1.ApiError.PLACE_NOT_ENOUGH_TOKEN, status: httpstatuscode_constant_1.HttpStatusCode.InternalServerError },
    NOT_CREATED_ERROR: { success: false, data: null, message: "showed place couldn't be created", error: api_errors_constants_1.ApiError.PLACE_NOT_CREATED, status: httpstatuscode_constant_1.HttpStatusCode.InternalServerError },
    ACCEPT_ERROR: { success: false, data: null, message: "accept place error", error: api_errors_constants_1.ApiError.PLACE_NOT_ACCEPTED, status: httpstatuscode_constant_1.HttpStatusCode.InternalServerError },
    GET_ACCEPTED_ERROR: { success: false, data: null, message: "get accepted places error", error: api_errors_constants_1.ApiError.PLACE_GET_ACCEPTED, status: httpstatuscode_constant_1.HttpStatusCode.InternalServerError },
    REFUSE_ERROR: { success: false, data: null, message: "refuse place error", error: api_errors_constants_1.ApiError.PLACE_NOT_REFUSED, status: httpstatuscode_constant_1.HttpStatusCode.InternalServerError },
    SAVE_SELECTED_PLACE: { success: false, data: null, message: "save selected place error", error: api_errors_constants_1.ApiError.PLACE_SAVE_SELECTED, status: httpstatuscode_constant_1.HttpStatusCode.InternalServerError },
};
//# sourceMappingURL=place.constants.js.map