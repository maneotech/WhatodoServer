import { ISelectedPlaceDocument, SelectedPlaceModel } from "../../models/place/selected.place.model";
import Repository from "../../services/repository.service";

export default class SelectedPlaceRepository extends Repository<ISelectedPlaceDocument>  {
	constructor() {
		super(SelectedPlaceModel);
	}
}