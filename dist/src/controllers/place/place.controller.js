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
exports.getAcceptedPlaces = exports.refusePlace = exports.acceptPlace = exports.getOnePlace = void 0;
const place_constants_1 = require("../../constants/place/place.constants");
const place_service_1 = __importDefault(require("../../services/place/place.service"));
const request_service_1 = __importDefault(require("../../services/request.service"));
const transaction_service_1 = __importDefault(require("../../services/transaction/transaction.service"));
const utilities_service_1 = require("../../services/utilities.service");
function getOnePlace(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        const user = req.user;
        if (utilities_service_1.UtilitiesService.isEmpty(body)) {
            return request_service_1.default.send(res, place_constants_1.PlaceRequestError.BODY_EMPTY);
        }
        if (place_service_1.default.canBeCasted(body) == false) {
            return request_service_1.default.send(res, place_constants_1.PlaceRequestError.BODY_ERROR);
        }
        if (user.token != null && user.token < 1) {
            return request_service_1.default.send(res, place_constants_1.PlaceRequestError.NOT_ENOUGH_TOKEN);
        }
        const requestPlaceModel = body;
        var response = yield place_service_1.default.getOnePlace(user._id, requestPlaceModel);
        if (response.success) {
            const savedShowedPlace = yield place_service_1.default.saveShowedPlace(response.data);
            if (savedShowedPlace == null) {
                return request_service_1.default.send(res, place_constants_1.PlaceRequestError.NOT_CREATED_ERROR);
            }
            else {
                response.data = savedShowedPlace;
            }
            //use one token
            if ((yield transaction_service_1.default.spendOneToken(user._id)) == false) {
                return request_service_1.default.send(res, place_constants_1.PlaceRequestError.ERROR_SPENDING_TOKEN);
            }
        }
        return request_service_1.default.send(res, response);
    });
}
exports.getOnePlace = getOnePlace;
function acceptPlace(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        const user = req.user;
        if (utilities_service_1.UtilitiesService.isEmpty(body)) {
            return request_service_1.default.send(res, place_constants_1.PlaceRequestError.BODY_EMPTY);
        }
        if (!body.docId) {
            return request_service_1.default.send(res, place_constants_1.PlaceRequestError.BODY_ERROR);
        }
        const result = yield place_service_1.default.acceptPlace(body.docId, user._id);
        if (result) {
            const response = place_constants_1.PlaceRequestError.NO_ERROR;
            return request_service_1.default.send(res, response);
        }
        else {
            return request_service_1.default.send(res, place_constants_1.PlaceRequestError.ACCEPT_ERROR);
        }
    });
}
exports.acceptPlace = acceptPlace;
function refusePlace(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        const user = req.user;
        if (utilities_service_1.UtilitiesService.isEmpty(body)) {
            return request_service_1.default.send(res, place_constants_1.PlaceRequestError.BODY_EMPTY);
        }
        if (!body.docId) {
            return request_service_1.default.send(res, place_constants_1.PlaceRequestError.BODY_ERROR);
        }
        const result = yield place_service_1.default.refusePlace(body.docId, user._id);
        if (result) {
            const response = place_constants_1.PlaceRequestError.NO_ERROR;
            return request_service_1.default.send(res, response);
        }
        else {
            return request_service_1.default.send(res, place_constants_1.PlaceRequestError.REFUSE_ERROR);
        }
    });
}
exports.refusePlace = refusePlace;
function getAcceptedPlaces(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.user;
        const result = yield place_service_1.default.getAcceptedPlaces(user._id);
        var response = place_constants_1.PlaceRequestError.NO_ERROR;
        if (result) {
            response.data = result;
        }
        else {
            response = place_constants_1.PlaceRequestError.GET_ACCEPTED_ERROR;
        }
        return request_service_1.default.send(res, response);
    });
}
exports.getAcceptedPlaces = getAcceptedPlaces;
//# sourceMappingURL=place.controller.js.map