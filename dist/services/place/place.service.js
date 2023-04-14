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
const place_constants_1 = require("../../constants/place/place.constants");
const request_place_model_1 = require("../../models/place/request.place.model");
const place_repository_1 = __importDefault(require("../../repositories/place/place.repository"));
const utilities_service_1 = require("../utilities.service");
const activity_service_1 = __importDefault(require("./activity.service"));
const selected_place_repository_1 = __importDefault(require("../../repositories/place/selected.place.repository"));
const https = require('https');
const showedPlaceRepository = new place_repository_1.default();
const selectedPlaceRepository = new selected_place_repository_1.default();
class PlaceService {
    static getOnePlace(userId, requestPlaceModel) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = place_constants_1.PlaceRequestError.NO_ERROR;
            //1. prepare google map request the best as possible
            const lat = requestPlaceModel.latitude;
            const lng = requestPlaceModel.longitude;
            const location = lat + "," + lng;
            const movingType = PlaceService.selectOneMovingType(requestPlaceModel.movingTypes);
            const radius = PlaceService.getRadiusFromHourMinute(movingType, requestPlaceModel.maxHour, requestPlaceModel.maxMin);
            const opennow = true;
            var type = null;
            var maxprice = "0";
            var keyword = PlaceService.getKeyword();
            try {
                //type = ActivityService.fromEnumToActivityString(requestPlaceModel.activities);
                type = "restaurant";
            }
            catch (_a) {
                return place_constants_1.PlaceRequestError.ACTIVITIES_EMPTY;
            }
            try {
                maxprice = PlaceService.getPriceType(requestPlaceModel.priceTypes) == request_place_model_1.PriceType.notFree ? "4" : "4";
            }
            catch (_b) {
                return place_constants_1.PlaceRequestError.PRICE_TYPE_EMPTY;
            }
            const googleApiKey = "AIzaSyBv2zOoqxBElmBJH4jFBieXnoDXqy_YRkw";
            //2. send google map request
            const url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?type=" +
                type + "&location=" +
                location + "&radius=" +
                radius + "&opennow=" +
                opennow + "&maxprice=" +
                maxprice + "&keyword=" +
                keyword + "&key=" +
                googleApiKey;
            console.log(url);
            //3. parse the result and pick the best one as possible
            // check if the one selected has already been done (check database)
            var data = null;
            try {
                data = JSON.parse(yield PlaceService.fetchApi(url));
            }
            catch (error) {
                return place_constants_1.PlaceRequestError.FETCHING_API;
            }
            if (data.results) {
                if (data.results.length == 0) {
                    return place_constants_1.PlaceRequestError.NO_RESULT;
                }
                try {
                    var responsePlaceModels = [];
                    data.results.forEach(result => {
                        var json = JSON.stringify(result);
                        responsePlaceModels.push(JSON.parse(json));
                    });
                    var responsePlaceModel = yield PlaceService.selectBestResultFromApi(responsePlaceModels);
                    /** Save selected Place (avoid same places as a result) */
                    var selectedPlace = {
                        user: userId,
                        placeId: responsePlaceModel.place_id
                    };
                    if ((yield PlaceService.saveSelectedPlace(selectedPlace)) == null) {
                        return place_constants_1.PlaceRequestError.SAVE_SELECTED_PLACE;
                    }
                    var generatedOptions = {
                        activityType: activity_service_1.default.fromActivityStringToEnum(type),
                        movingType: movingType,
                        priceType: maxprice == "0" ? request_place_model_1.PriceType.free : request_place_model_1.PriceType.notFree,
                        travellingDuration: 10
                    };
                    var showedPlaceModel = {
                        user: userId,
                        place: responsePlaceModel,
                        generatedOptions: generatedOptions
                    };
                    response.data = showedPlaceModel;
                    return response;
                }
                catch (error) {
                    return place_constants_1.PlaceRequestError.FETCHING_API;
                }
            }
            else {
                return place_constants_1.PlaceRequestError.FETCHING_API;
            }
            // check if all the critera are there
            //4. return the object
        });
    }
    static getRadiusFromHourMinute(movingType, hours, minutes) {
        var radius;
        const totalMaxMinutes = hours * 60 + minutes;
        if (movingType == request_place_model_1.MovingType.byWalk) {
            //walk 3KM/H
            radius = ((totalMaxMinutes * 3 / 60) * 1000).toString();
        }
        else if (movingType == request_place_model_1.MovingType.byBicycle) {
            //bycyle 15KM/h
            radius = ((totalMaxMinutes * 15 / 60) * 1000).toString();
        }
        else {
            //car 14KM/h (traffic jam.. red lights)
            radius = ((totalMaxMinutes * 30 / 60) * 1000).toString();
        }
        return radius;
    }
    static getPriceType(priceTypes) {
        if (priceTypes.length == 0) {
            throw Error();
        }
        utilities_service_1.UtilitiesService.shuffleArray(priceTypes);
        return priceTypes[0];
    }
    static getKeyword() {
        return "";
    }
    static selectBestResultFromApi(responses) {
        return __awaiter(this, void 0, void 0, function* () {
            if (responses.length == 0) {
                throw new Error();
            }
            responses.sort((a, b) => b.rating - a.rating);
            var ids = [];
            responses.forEach(element => {
                ids.push(element.place_id);
            });
            var notAlreadySelected = yield PlaceService.getIdsNotAlreadySelected(ids);
            if (notAlreadySelected.length == 0) {
                // THE PERSON HAS USE 20 TOKEN FROM THE SAME PLACE WITH THE SAME REQUEST PARAMETERS 
                // -> 
                utilities_service_1.UtilitiesService.shuffleArray(responses);
                notAlreadySelected = [responses[0].place_id];
            }
            var bestResult = responses.find(response => response.place_id == notAlreadySelected[0]);
            if (!bestResult) {
                throw Error();
            }
            return bestResult;
        });
    }
    static canBeCasted(json) {
        return (json.hasOwnProperty('latitude') &&
            json.hasOwnProperty('longitude') &&
            json.hasOwnProperty('movingTypes') &&
            json.hasOwnProperty('maxHour') &&
            json.hasOwnProperty('maxMin') &&
            json.hasOwnProperty('activities') &&
            json.hasOwnProperty('priceTypes'));
    }
    static fetchApi(url) {
        return new Promise((resolve, reject) => {
            let data = '';
            https.get(url, res => {
                res.on('data', chunk => { data += chunk; });
                res.on('end', () => {
                    resolve(data);
                });
            });
        });
    }
    static saveShowedPlace(showedPlaceModel) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield showedPlaceRepository.create(showedPlaceModel);
            }
            catch (e) {
                return null;
            }
        });
    }
    static saveSelectedPlace(selectedPlaceModel) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield selectedPlaceRepository.create(selectedPlaceModel);
            }
            catch (e) {
                console.log(e);
                return null;
            }
        });
    }
    static getIdsNotAlreadySelected(selectedIds) {
        return __awaiter(this, void 0, void 0, function* () {
            var notAlreadySelectedIds = [];
            try {
                console.log("selectedIds");
                console.log(selectedIds);
                // find documents in the collection that match the query
                const query = { placeId: { $in: selectedIds } };
                var results = yield selectedPlaceRepository.get(query);
                console.log("results");
                console.log(results);
                // extract the IDs from the returned documents
                const foundIds = results.map(doc => doc.placeId.toString());
                console.log("foundIds");
                console.log(foundIds);
                // compare the original array with the found IDs to get the missing IDs
                notAlreadySelectedIds = selectedIds.filter(id => !foundIds.includes(id.toString()));
                console.log("notAlreadySelectedIds");
                console.log(notAlreadySelectedIds);
                return notAlreadySelectedIds;
            }
            catch (e) {
                return [];
            }
        });
    }
    static selectOneMovingType(movingTypes) {
        var selectedMovingType = request_place_model_1.MovingType.byCar;
        var byWalk = false;
        var byBicycle = false;
        movingTypes.forEach(movingType => {
            if (movingType == request_place_model_1.MovingType.byWalk) {
                byWalk = true;
            }
            if (movingType == request_place_model_1.MovingType.byBicycle) {
                byBicycle = true;
            }
        });
        if (byWalk) {
            selectedMovingType = request_place_model_1.MovingType.byWalk;
        }
        else if (byBicycle) {
            selectedMovingType = request_place_model_1.MovingType.byBicycle;
        }
        return selectedMovingType;
    }
    static acceptPlace(docId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield showedPlaceRepository.updateOne({ _id: docId, user: userId }, { accepted: true });
            }
            catch (error) {
                return null;
            }
        });
    }
    static refusePlace(docId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield showedPlaceRepository.updateOne({ _id: docId, user: userId }, { accepted: false });
            }
            catch (error) {
                return null;
            }
        });
    }
    static getAcceptedPlaces(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield showedPlaceRepository.getAcceptedForUser(userId);
            }
            catch (error) {
                return null;
            }
        });
    }
}
exports.default = PlaceService;
//# sourceMappingURL=place.service.js.map