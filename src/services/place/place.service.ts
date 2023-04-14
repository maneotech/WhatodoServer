import { ObjectId } from "mongoose";
import { ActivityStringsConstant } from "../../constants/place/activities.constants";
import { PlaceRequestError } from "../../constants/place/place.constants";
import { IResponse } from "../../interfaces/request.interface";
import { GeneratedOptionPlaceModel } from "../../models/place/generated.option.place.model";
import { ActivityType, MovingType, PriceType, RequestPlaceModel } from "../../models/place/request.place.model";
import { ResponsePlaceModel } from "../../models/place/response.place.model";
import { IShowedPlaceDocument, IShowedPlaceModel, ShowedPlaceModel } from "../../models/place/showed.place.model";
import ShowedPlaceRepository from "../../repositories/place/place.repository";
import { UtilitiesService } from "../utilities.service";
import ActivityService from "./activity.service";
import { ISelectedPlaceModel } from "../../models/place/selected.place.model";
import SelectedPlaceRepository from "../../repositories/place/selected.place.repository";
const https = require('https');

const showedPlaceRepository = new ShowedPlaceRepository();
const selectedPlaceRepository = new SelectedPlaceRepository();


export default class PlaceService {

    static async getOnePlace(userId: ObjectId, requestPlaceModel: RequestPlaceModel): Promise<IResponse<IShowedPlaceModel>> {

        let response: IResponse = PlaceRequestError.NO_ERROR;

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
        catch {
            return PlaceRequestError.ACTIVITIES_EMPTY;
        }

        try {
            maxprice = PlaceService.getPriceType(requestPlaceModel.priceTypes) == PriceType.notFree ? "4" : "4";
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


        console.log(url);
        //3. parse the result and pick the best one as possible
        // check if the one selected has already been done (check database)
        var data = null;

        try {
            data = JSON.parse(await PlaceService.fetchApi(url));
        }
        catch (error) {
            return PlaceRequestError.FETCHING_API;
        }

        if (data.results) {

            if (data.results.length == 0) {
                return PlaceRequestError.NO_RESULT;
            }
            try {
                var responsePlaceModels: ResponsePlaceModel[] = [];
                data.results.forEach(result => {
                    var json = JSON.stringify(result);
                    responsePlaceModels.push(JSON.parse(json));
                });


                var responsePlaceModel: ResponsePlaceModel = await PlaceService.selectBestResultFromApi(responsePlaceModels);

                /** Save selected Place (avoid same places as a result) */
                var selectedPlace: ISelectedPlaceModel = {
                    user: userId,
                    placeId: responsePlaceModel.place_id
                }
                if (await PlaceService.saveSelectedPlace(selectedPlace) == null) {
                    return PlaceRequestError.SAVE_SELECTED_PLACE;
                }

                var generatedOptions: GeneratedOptionPlaceModel = {
                    activityType: ActivityService.fromActivityStringToEnum(type),
                    movingType: movingType,
                    priceType: maxprice == "0" ? PriceType.free : PriceType.notFree,
                    travellingDuration: 10
                }
                var showedPlaceModel: IShowedPlaceModel = {
                    user: userId,
                    place: responsePlaceModel,
                    generatedOptions: generatedOptions
                };

                response.data = showedPlaceModel;
                return response;
            }
            catch (error) {
                return PlaceRequestError.FETCHING_API;
            }
        }
        else {
            return PlaceRequestError.FETCHING_API;
        }

        // check if all the critera are there


        //4. return the object
    }

    static getRadiusFromHourMinute(movingType: MovingType, hours: number, minutes: number): String {
        var radius: String;
        const totalMaxMinutes = hours * 60 + minutes;

        if (movingType == MovingType.byWalk) {
            //walk 3KM/H

            radius = ((totalMaxMinutes * 3 / 60) * 1000).toString();
        }

        else if (movingType == MovingType.byBicycle) {
            //bycyle 15KM/h
            radius = ((totalMaxMinutes * 15 / 60) * 1000).toString();
        }

        else {
            //car 14KM/h (traffic jam.. red lights)
            radius = ((totalMaxMinutes * 30 / 60) * 1000).toString();
        }

        return radius;
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

    static async selectBestResultFromApi(responses: ResponsePlaceModel[]): Promise<ResponsePlaceModel> {

        if (responses.length == 0) {
            throw new Error();
        }

        responses.sort((a, b) => b.rating - a.rating);

        var ids : String[] = [];
        responses.forEach(element => {
            ids.push(element.place_id);
        });

        var notAlreadySelected = await PlaceService.getIdsNotAlreadySelected(ids);
        if (notAlreadySelected.length == 0){
            // THE PERSON HAS USE 20 TOKEN FROM THE SAME PLACE WITH THE SAME REQUEST PARAMETERS 
            UtilitiesService.shuffleArray(responses);
            notAlreadySelected = [responses[0].place_id];
        }

        var bestResult =  responses.find(response => response.place_id == notAlreadySelected[0]);

        if (!bestResult){
            throw Error();
        }
        
        return bestResult;
    }

    static canBeCasted(json: {}): boolean {
        return (json.hasOwnProperty('latitude') &&
            json.hasOwnProperty('longitude') &&
            json.hasOwnProperty('movingTypes') &&
            json.hasOwnProperty('maxHour') &&
            json.hasOwnProperty('maxMin') &&
            json.hasOwnProperty('activities') &&
            json.hasOwnProperty('priceTypes'));
    }

    static fetchApi(url: String): Promise<string> {
        return new Promise((resolve, reject) => {
            let data = '';
            https.get(url, res => {
                res.on('data', chunk => { data += chunk })
                res.on('end', () => {
                    resolve(data);
                })
            });
        });
    }

    static async saveShowedPlace(showedPlaceModel: IShowedPlaceModel): Promise<IShowedPlaceModel> {
        try {
            return await showedPlaceRepository.create(showedPlaceModel);
        }
        catch (e) {
            return null;
        }
    }

    static async saveSelectedPlace(selectedPlaceModel: ISelectedPlaceModel): Promise<ISelectedPlaceModel> {
        try {
            return await selectedPlaceRepository.create(selectedPlaceModel);
        }
        catch (e) {
            console.log(e);
            return null;
        }
    }

    static async getIdsNotAlreadySelected(selectedIds: String[]): Promise<String[]> {
        var notAlreadySelectedIds: String[] = [];

        try {
            
            console.log("selectedIds");
            console.log(selectedIds);

            // find documents in the collection that match the query
            const query = { placeId: { $in: selectedIds } };
            var results = await selectedPlaceRepository.get(query);
            
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
    }

    static selectOneMovingType(movingTypes: MovingType[]): MovingType {
        var selectedMovingType: MovingType = MovingType.byCar;

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
            selectedMovingType = MovingType.byWalk;
        }

        else if (byBicycle) {
            selectedMovingType = MovingType.byBicycle;
        }

        return selectedMovingType;
    }

    static async acceptPlace(docId: ObjectId, userId: ObjectId): Promise<IShowedPlaceDocument> {
        try {
            return await showedPlaceRepository.updateOne({ _id: docId, user: userId }, { accepted: true });
        }
        catch (error) {
            return null;
        }
    }


    static async refusePlace(docId: ObjectId, userId: ObjectId): Promise<IShowedPlaceDocument> {
        try {
            return await showedPlaceRepository.updateOne({ _id: docId, user: userId }, { accepted: false });
        }
        catch (error) {
            return null;
        }
    }



    static async getAcceptedPlaces(userId: ObjectId): Promise<IShowedPlaceModel[]> {
        try {
            return await showedPlaceRepository.getAcceptedForUser(userId);
        }
        catch (error) {
            return null;
        }
    }

}