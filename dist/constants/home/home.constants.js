"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeRequestError = void 0;
const api_errors_constants_1 = require("../api-errors.constants");
const httpstatuscode_constant_1 = require("../httpstatuscode.constant");
exports.HomeRequestError = {
    NO_ERROR: { success: true, data: null, message: null, error: api_errors_constants_1.ApiError.NO_ERRORS, status: httpstatuscode_constant_1.HttpStatusCode.Ok },
};
//# sourceMappingURL=home.constants.js.map