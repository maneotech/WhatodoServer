"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const activities_constants_1 = require("../../constants/place/activities.constants");
const request_place_model_1 = require("../../models/place/request.place.model");
const utilities_service_1 = require("../utilities.service");
class ActivityService {
    static fromActivityStringToEnum(activity) {
        if (activities_constants_1.ActivityStringsConstant.RESTAURANT.includes(activity)) {
            return request_place_model_1.ActivityType.restaurant;
        }
        else if (activities_constants_1.ActivityStringsConstant.BAR.includes(activity)) {
            return request_place_model_1.ActivityType.bar;
        }
        else if (activities_constants_1.ActivityStringsConstant.DISCOVERING.includes(activity)) {
            return request_place_model_1.ActivityType.discovering;
        }
        else if (activities_constants_1.ActivityStringsConstant.SNACKING.includes(activity)) {
            return request_place_model_1.ActivityType.snacking;
        }
        else if (activities_constants_1.ActivityStringsConstant.SHOPPING.includes(activity)) {
            return request_place_model_1.ActivityType.shopping;
        }
        else
            return request_place_model_1.ActivityType.random;
    }
    static fromEnumToActivityString(activities) {
        var type = "";
        if (activities.length == 0)
            throw new Error();
        utilities_service_1.UtilitiesService.shuffleArray(activities);
        var selectedActivity = activities[0];
        //end of shuffle
        var types = [];
        switch (selectedActivity) {
            case request_place_model_1.ActivityType.restaurant:
                types = activities_constants_1.ActivityStringsConstant.RESTAURANT;
                break;
            case request_place_model_1.ActivityType.bar:
                types = activities_constants_1.ActivityStringsConstant.BAR;
                break;
            case request_place_model_1.ActivityType.random:
                types = activities_constants_1.ActivityStringsConstant.RANDOM;
                break;
            case request_place_model_1.ActivityType.discovering:
                types = activities_constants_1.ActivityStringsConstant.DISCOVERING;
                break;
            case request_place_model_1.ActivityType.snacking:
                types = activities_constants_1.ActivityStringsConstant.SNACKING;
                break;
            case request_place_model_1.ActivityType.shopping:
                types = activities_constants_1.ActivityStringsConstant.SHOPPING;
                break;
            default:
                throw new Error();
        }
        utilities_service_1.UtilitiesService.shuffleArray(types);
        if (types.length == 0) {
            throw new Error();
        }
        type = types[0];
        return type;
    }
}
exports.default = ActivityService;
//# sourceMappingURL=activity.service.js.map