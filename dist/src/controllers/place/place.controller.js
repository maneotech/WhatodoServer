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
exports.getOnePlace = void 0;
const place_constants_1 = require("../../constants/place/place.constants");
const place_service_1 = __importDefault(require("../../services/place/place.service"));
const request_service_1 = __importDefault(require("../../services/request.service"));
const utilities_service_1 = require("../../services/utilities.service");
function getOnePlace(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        //const userId = req.user._id;
        const body = req.body;
        if (utilities_service_1.UtilitiesService.isEmpty(body)) {
            return request_service_1.default.send(res, place_constants_1.PlaceRequestError.BODY_EMPTY);
        }
        if (place_service_1.default.canBeCasted(body) == false) {
            return request_service_1.default.send(res, place_constants_1.PlaceRequestError.BODY_ERROR);
        }
        const requestPlaceModel = body;
        console.log(requestPlaceModel);
        const response = yield place_service_1.default.getOnePlace(requestPlaceModel);
        request_service_1.default.send(res, response);
    });
}
exports.getOnePlace = getOnePlace;
//# sourceMappingURL=place.controller.js.map