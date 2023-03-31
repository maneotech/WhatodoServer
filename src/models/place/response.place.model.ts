export class ResponsePlaceModel {

    geometry : ILocationModel;
    icon: String;
    name : String;
    place_id: String;
    price_level: number;
    rating: number;
    types: String[];
    user_ratings_total: number;
    vicinity: String;

    constructor(geometry, icon, name, place_id, price_level, rating, types, user_ratings_total, vicinity){
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

export interface ILocationModel {
    lat: number,
    lng: number
}