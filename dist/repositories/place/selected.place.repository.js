"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const selected_place_model_1 = require("../../models/place/selected.place.model");
const repository_service_1 = __importDefault(require("../../services/repository.service"));
class SelectedPlaceRepository extends repository_service_1.default {
    constructor() {
        super(selected_place_model_1.SelectedPlaceModel);
    }
}
exports.default = SelectedPlaceRepository;
//# sourceMappingURL=selected.place.repository.js.map