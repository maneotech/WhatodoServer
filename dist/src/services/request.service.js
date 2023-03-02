"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const httpstatuscode_constant_1 = require("../constants/httpstatuscode.constant");
class RequestService {
    static generateResponseData(success, data, status = httpstatuscode_constant_1.HttpStatusCode.Ok, message = '', error) {
        return {
            success: success,
            data: data,
            status: status,
            message: message,
            error: error
        };
    }
    static assignData(response, data) {
        const result = Object.assign({}, response);
        result.data = data;
        return result;
    }
    static send(res, data, detail = null) {
        if (detail)
            data.detail = detail;
        if (data.success) {
            res.status(data.status).json(data.data);
        }
        else {
            res.status(data.status).json({ error: data.error, message: data.message, data: data.data, detail: data.detail });
        }
    }
    static redirect(res, url, code = httpstatuscode_constant_1.HttpStatusCode.PermanentRedirect) {
        console.log("Url : " + url + " - code : " + code);
        return res.redirect(code, url);
    }
}
exports.default = RequestService;
//# sourceMappingURL=request.service.js.map