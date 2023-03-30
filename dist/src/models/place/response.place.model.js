"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponsePlaceModel = void 0;
class ResponsePlaceModel {
    constructor(geometry, icon, name, place_id, price_level, rating, types, user_ratings_total, vicinity) {
        this.geometry = geometry;
        this.icon = icon;
        this.name = name;
        this.place_id = place_id;
        this.price_level = price_level;
        this.rating = rating;
        this.types = types;
        this.user_ratings_total = user_ratings_total;
        this.vicinity = vicinity;
    }
}
exports.ResponsePlaceModel = ResponsePlaceModel;
//# sourceMappingURL=response.place.model.js.map