import { PlaceRequestError } from "../../constants/place/place.constants";
import { IResponse } from "../../interfaces/request.interface";
import { ActivityType, MovingType, PriceType, RequestPlaceModel } from "../../models/place/request.place.model";
import { ResponsePlaceModel } from "../../models/place/response.place.model";
import { UtilitiesService } from "../utilities.service";
const http = require('http');


export default class PlaceService {

    static async getOnePlace(requestPlaceModel: RequestPlaceModel): Promise<IResponse<ResponsePlaceModel>> {

        let response: IResponse = PlaceRequestError.NO_ERROR;

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
        catch {
            return PlaceRequestError.ACTIVITIES_EMPTY;
        }

        try {
            maxprice = PlaceService.getPriceType(requestPlaceModel.priceTypes) == PriceType.notFree ? "4" : "0";
        }
        catch {
            return PlaceRequestError.PRICE_TYPE_EMPTY;
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
                    var responsePlaceModels: ResponsePlaceModel[] = JSON.parse(chunk);
                    response.data = PlaceService.selectBestResultFromApi(responsePlaceModels);
                    return response;
                });
                resp.on('end', () => {
                    console.log(data);
                    return PlaceRequestError.FETCHING_API;
                });
            }).on('error', (error) => {
                console.error(error);
                return PlaceRequestError.FETCHING_API;

            });
        }
        catch {
            return PlaceRequestError.FETCHING_API;
        }


        // check if all the critera are there


        //4. return the object
    }

    static getRadiusFromHourMinute(movingTypes: MovingType[], hours: number, minutes: number): String {
        var radius: String;

        var maxDistanceRangeType: MovingType = MovingType.byCar;

        var byWalk: boolean = false;
        var byBicycle: boolean = false;

        movingTypes.forEach(movingType => {

            if (movingType == MovingType.byWalk) {
                byWalk = true;
            }

            if (movingType == MovingType.byBicycle) {
                byBicycle = true;
            }
        });

        if (byWalk) {
            maxDistanceRangeType = MovingType.byWalk;
        }

        else if (byBicycle) {
            maxDistanceRangeType = MovingType.byBicycle;
        }

        //end of prioritized moving type

        const totalMaxMinutes = hours * 60 + minutes;
        if (maxDistanceRangeType == MovingType.byWalk) {
            //walk 3KM/H

            radius = ((totalMaxMinutes * 3 / 60) * 1000).toString();
        }

        else if (maxDistanceRangeType == MovingType.byBicycle) {
            //bycyle 15KM/h
            radius = ((totalMaxMinutes * 15 / 60) * 1000).toString();
        }

        else {
            //car 14KM/h (traffic jam.. red lights)
            radius = ((totalMaxMinutes * 30 / 60) * 1000).toString();
        }

        return radius;
    }

    static getType(activities: ActivityType[]): String {
        var type: String = "";

        if (activities.length == 0)
            throw new Error();

        UtilitiesService.shuffleArray(activities);
        var selectedActivity: ActivityType = activities[0];

        //end of shuffle
        types = [];

        switch (selectedActivity) {

            case ActivityType.restaurant:
                types = ["restaurant"];
                break;

            case ActivityType.bar:
                types = ["bar"];
                break;

            case ActivityType.culturel:
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

            case ActivityType.sport:
                types = ["bowling_alley", "stadium", "park", "gym"];
                break;

            case ActivityType.grocery:
                types = ["convenience_store", "drugstore", "liquor_store", "supermarket"];
                break;

            case ActivityType.shopping:
                var types = ["shopping_mall", "shoe_store", "jewelry_store", "home_goods_store", "furniture_store", "department_store", "clothing_store"]
                break;

            default:
                throw new Error();
        }

        UtilitiesService.shuffleArray(types);

        if (types.length == 0) {
            throw new Error();
        }

        type = types[0];
        console.log(type);


        return type;
    }

    static getPriceType(priceTypes: PriceType[]): PriceType {

        if (priceTypes.length == 0) {
            throw Error();
        }

        UtilitiesService.shuffleArray(priceTypes);
        return priceTypes[0];
    }

    static getKeyword(): String {
        return "";
    }

    static selectBestResultFromApi(responses: ResponsePlaceModel[]) : ResponsePlaceModel{

        if (responses.length == 0){
            throw new Error();
        }

        UtilitiesService.shuffleArray(responses);
        return responses[0];
    }
}