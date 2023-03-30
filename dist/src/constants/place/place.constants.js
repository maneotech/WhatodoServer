"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceRequestError = void 0;
const api_errors_constants_1 = require("../api-errors.constants");
const httpstatuscode_constant_1 = require("../httpstatuscode.constant");
exports.PlaceRequestError = {
    NO_ERROR: { success: true, data: null, message: null, error: api_errors_constants_1.ApiError.NO_ERRORS, status: httpstatuscode_constant_1.HttpStatusCode.Ok },
    UNKNOWN_ERROR: { success: false, data: null, message: null, error: api_errors_constants_1.ApiError.PLACE_UNKNOWN_ERROR, status: httpstatuscode_constant_1.HttpStatusCode.InternalServerError },
    ALREADY_EXIST: { success: false, data: null, message: "no place", error: api_errors_constants_1.ApiError.PLACE_NO_RESULT, status: httpstatuscode_constant_1.HttpStatusCode.InternalServerError },
    FETCHING_API: { success: false, data: null, message: "error during http api fetching", error: api_errors_constants_1.ApiError.PLACE_API_FETCHING, status: httpstatuscode_constant_1.HttpStatusCode.InternalServerError },
    PRICE_TYPE_EMPTY: { success: false, data: null, message: "price type is empty", error: api_errors_constants_1.ApiError.PLACE_PRICE_TYPE_EMPTY, status: httpstatuscode_constant_1.HttpStatusCode.InternalServerError },
    ACTIVITIES_EMPTY: { success: false, data: null, message: "activities are empty", error: api_errors_constants_1.ApiError.PLACE_PRICE_TYPE_EMPTY, status: httpstatuscode_constant_1.HttpStatusCode.InternalServerError },
};
//# sourceMappingURL=place.constants.js.map