import { ActivityStringsConstant } from "../../constants/place/activities.constants";
import { ActivityType } from "../../models/place/request.place.model";
import { UtilitiesService } from "../utilities.service";

export default class ActivityService {

    static fromActivityStringToEnum(activity: string): ActivityType {
        if (ActivityStringsConstant.RESTAURANT.includes(activity)) {
            return ActivityType.restaurant;
        }
        else if (ActivityStringsConstant.BAR.includes(activity)) {
            return ActivityType.bar;
        }

        else if (ActivityStringsConstant.DISCOVERING.includes(activity)) {
            return ActivityType.discovering;
        }
        else if (ActivityStringsConstant.SNACKING.includes(activity)) {
            return ActivityType.snacking;
        }
        else if (ActivityStringsConstant.SHOPPING.includes(activity)) {
            return ActivityType.shopping;
        }
        else return ActivityType.random;

    }

    static fromEnumToActivityString(activities: ActivityType[]): String {
        var type: String = "";

        if (activities.length == 0)
            throw new Error();

        UtilitiesService.shuffleArray(activities);
        var selectedActivity: ActivityType = activities[0];

        //end of shuffle
        var types = [];

        switch (selectedActivity) {

            case ActivityType.restaurant:
                types = ActivityStringsConstant.RESTAURANT;
                break;

            case ActivityType.bar:
                types = ActivityStringsConstant.BAR;
                break;

            case ActivityType.random:
                types = ActivityStringsConstant.RANDOM
                break;

            case ActivityType.discovering:
                types = ActivityStringsConstant.DISCOVERING;
                break;

            case ActivityType.snacking:
                types = ActivityStringsConstant.SNACKING;
                break;

            case ActivityType.shopping:
                types = ActivityStringsConstant.SHOPPING;
                break;

            default:
                throw new Error();
        }

        UtilitiesService.shuffleArray(types);

        if (types.length == 0) {
            throw new Error();
        }

        type = types[0];

        return type;
    }

}