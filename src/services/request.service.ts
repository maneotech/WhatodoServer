import { Response } from "express";
import { ApiError } from "../constants/api-errors.constants";
import { HttpStatusCode } from "../constants/httpstatuscode.constant";
import { IResponse } from "../interfaces/request.interface";

export default class RequestService {

    static generateResponseData(success : boolean, data : any, status : HttpStatusCode = HttpStatusCode.Ok, message : string = '', error : ApiError.NO_ERRORS) : IResponse{
        return  {
            success : success,
            data : data,
            status : status,
            message : message,
            error : error
        }
    }

    static assignData<T>(response : IResponse<T>, data : any) : IResponse<T> {
        const result : IResponse<T> = Object.assign({}, response);
        result.data = data;
        return result;
    }

    static send(res: Response, data : IResponse, detail : string = null) {
        if (detail) data.detail = detail;
        if (data.success) {
            res.status(data.status).json(data.data)
        } else {
            res.status(data.status).json({ error : data.error, message : data.message, data : data.data, detail : data.detail })
        }
    }

    static redirect(res : Response, url : string, code : HttpStatusCode = HttpStatusCode.PermanentRedirect) {
        console.log("Url : " + url + " - code : " + code);
        return res.redirect(code, url);
    }
}