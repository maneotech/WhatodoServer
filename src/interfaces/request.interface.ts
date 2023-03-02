import { ApiError } from "../constants/api-errors.constants";
import { HttpStatusCode } from "../constants/httpstatuscode.constant";

export interface IDefaultDataResponse {
    success : boolean, 
    code : number,
    message : string,
    data : any
}

export interface IResponse<T = any> {
    success : boolean;
    status : HttpStatusCode,
    message : string,
    detail? : string,
    data : T,
    error : ApiError
}
