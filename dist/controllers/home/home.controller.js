"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHome = void 0;
const request_service_1 = __importDefault(require("../../services/request.service"));
const home_constants_1 = require("../../constants/home/home.constants");
const home_service_1 = __importDefault(require("../../services/home/home.service"));
function getHome(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.user;
        const response = home_constants_1.HomeRequestError.NO_ERROR;
        const result = yield home_service_1.default.getHome(user._id);
        response.data = result;
        return request_service_1.default.send(res, response);
    });
}
exports.getHome = getHome;
//# sourceMappingURL=home.controller.js.map