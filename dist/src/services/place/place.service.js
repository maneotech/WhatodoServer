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
Object.defineProperty(exports, "__esModule", { value: true });
const place_constants_1 = require("../../constants/place/place.constants");
const request_place_model_1 = require("../../models/place/request.place.model");
const utilities_service_1 = require("../utilities.service");
const http = require('http');
class PlaceService {
    static getOnePlace(requestPlaceModel) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = place_constants_1.PlaceRequestError.NO_ERROR;
            //1. prepare google map request the best as possible
            const lat = requestPlaceModel.latitude;
            const lng = requestPlaceModel.longitude;
            const location = lat + "," + lng;
            const radius = PlaceService.getRadiusFromHourMinute(requestPlaceModel.movingTypes, requestPlaceModel.maxHour, requestPlaceModel.maxMin);
            const opennow = true;
            var type = null;
            var maxprice = "0";
            var keyword = PlaceService.getKeyword();
            try {
                type = PlaceService.getType(requestPlaceModel.activities);
            }
            catch (_a) {
                return place_constants_1.PlaceRequestError.ACTIVITIES_EMPTY;
            }
            try {
                maxprice = PlaceService.getPriceType(requestPlaceModel.priceTypes) == request_place_model_1.PriceType.notFree ? "4" : "0";
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
            //3. parse the result and pick the best one as possible
            // check if the one selected has already been done (check database)
            try {
                http.get(url, (resp) => {
                    let data = '';
                    resp.on('data', (chunk) => {
                        var responsePlaceModels = JSON.parse(chunk);
                        response.data = PlaceService.selectBestResultFromApi(responsePlaceModels);
                        return response;
                    });
                    resp.on('end', () => {
                        console.log(data);
                        return place_constants_1.PlaceRequestError.FETCHING_API;
                    });
                }).on('error', (error) => {
                    console.error(error);
                    return place_constants_1.PlaceRequestError.FETCHING_API;
                });
            }
            catch (_c) {
                return place_constants_1.PlaceRequestError.FETCHING_API;
            }
            // check if all the critera are there
            //4. return the object
        });
    }
    static getRadiusFromHourMinute(movingTypes, hours, minutes) {
        var radius;
        var maxDistanceRangeType = request_place_model_1.MovingType.byCar;
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
            maxDistanceRangeType = request_place_model_1.MovingType.byWalk;
        }
        else if (byBicycle) {
            maxDistanceRangeType = request_place_model_1.MovingType.byBicycle;
        }
        //end of prioritized moving type
        const totalMaxMinutes = hours * 60 + minutes;
        if (maxDistanceRangeType == request_place_model_1.MovingType.byWalk) {
            //walk 3KM/H
            radius = ((totalMaxMinutes * 3 / 60) * 1000).toString();
        }
        else if (maxDistanceRangeType == request_place_model_1.MovingType.byBicycle) {
            //bycyle 15KM/h
            radius = ((totalMaxMinutes * 15 / 60) * 1000).toString();
        }
        else {
            //car 14KM/h (traffic jam.. red lights)
            radius = ((totalMaxMinutes * 30 / 60) * 1000).toString();
        }
        return radius;
    }
    static getType(activities) {
        var type = "";
        if (activities.length == 0)
            throw new Error();
        utilities_service_1.UtilitiesService.shuffleArray(activities);
        var selectedActivity = activities[0];
        //end of shuffle
        types = [];
        switch (selectedActivity) {
            case request_place_model_1.ActivityType.restaurant:
                types = ["restaurant"];
                break;
            case request_place_model_1.ActivityType.bar:
                types = ["bar"];
                break;
            case request_place_model_1.ActivityType.culturel:
                types = ["amusement_park",
                    "aquarium",
                    "art_gallery",
                    "book_store",
                    "cemetery",
                    "church",
                    "city_hall",
                    "courthouse",
                    "embassy",
                    "florist",
                    "hindu_temple",
                    "library",
                    "mosque",
                    "movie_theater",
                    "museum",
                    "park",
                    "spa",
                    "subway_station",
                    "synagogue",
                    "tourist_attraction",
                    "university",
                    "zoo",
                    "casino",
                ];
                break;
            case request_place_model_1.ActivityType.sport:
                types = ["bowling_alley", "stadium", "park", "gym"];
                break;
            case request_place_model_1.ActivityType.grocery:
                types = ["convenience_store", "drugstore", "liquor_store", "supermarket"];
                break;
            case request_place_model_1.ActivityType.shopping:
                var types = ["shopping_mall", "shoe_store", "jewelry_store", "home_goods_store", "furniture_store", "department_store", "clothing_store"];
                break;
            default:
                throw new Error();
        }
        utilities_service_1.UtilitiesService.shuffleArray(types);
        if (types.length == 0) {
            throw new Error();
        }
        type = types[0];
        console.log(type);
        return type;
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
        if (responses.length == 0) {
            throw new Error();
        }
        utilities_service_1.UtilitiesService.shuffleArray(responses);
        return responses[0];
    }
}
exports.default = PlaceService;
//# sourceMappingURL=place.service.js.map