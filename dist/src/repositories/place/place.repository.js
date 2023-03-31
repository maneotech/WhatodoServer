"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const showed_place_model_1 = require("../../models/place/showed.place.model");
const repository_service_1 = __importDefault(require("../../services/repository.service"));
class ShowedPlaceRepository extends repository_service_1.default {
    constructor() {
        super(showed_place_model_1.ShowedPlaceModel);
    }
}
exports.default = ShowedPlaceRepository;
//# sourceMappingURL=place.repository.js.map