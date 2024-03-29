"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovingType = exports.PriceType = exports.ActivityType = exports.RequestPlaceModel = void 0;
class RequestPlaceModel {
}
exports.RequestPlaceModel = RequestPlaceModel;
var ActivityType;
(function (ActivityType) {
    ActivityType[ActivityType["culturel"] = 0] = "culturel";
    ActivityType[ActivityType["sport"] = 1] = "sport";
    ActivityType[ActivityType["restaurant"] = 2] = "restaurant";
    ActivityType[ActivityType["bar"] = 3] = "bar";
    ActivityType[ActivityType["shopping"] = 4] = "shopping";
    ActivityType[ActivityType["snacking"] = 5] = "snacking";
})(ActivityType = exports.ActivityType || (exports.ActivityType = {}));
var PriceType;
(function (PriceType) {
    PriceType[PriceType["free"] = 0] = "free";
    PriceType[PriceType["notFree"] = 1] = "notFree";
})(PriceType = exports.PriceType || (exports.PriceType = {}));
var MovingType;
(function (MovingType) {
    MovingType[MovingType["byCar"] = 0] = "byCar";
    MovingType[MovingType["byWalk"] = 1] = "byWalk";
    MovingType[MovingType["byBicycle"] = 2] = "byBicycle";
})(MovingType = exports.MovingType || (exports.MovingType = {}));
//# sourceMappingURL=request.place.model.js.map