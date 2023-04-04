import { IResponse } from "../../interfaces/request.interface";
import { ApiError } from "../api-errors.constants";
import { HttpStatusCode } from "../httpstatuscode.constant";

export const HomeRequestError = {
    NO_ERROR: { success: true, data: null, message: null, error: ApiError.NO_ERRORS, status: HttpStatusCode.Ok } as IResponse,
}