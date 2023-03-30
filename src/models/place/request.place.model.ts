import { IModel } from "../../interfaces/model.interface";

export interface RequestPlaceModel extends IModel {
    activities: ActivityType[];
    priceTypes: PriceType[];
    movingTypes: MovingType[];
    latitude: number;
    longitude: number;
    address: String;
    maxHour: number;
    maxMin: number;
}

export enum ActivityType {
    culturel,
    sport,
    restaurant,
    bar,
    shopping,
    grocery,
}

export enum PriceType {
    free,
    notFree,
}

export enum MovingType {
    byCar,
    byWalk,
    byBicycle,
}

