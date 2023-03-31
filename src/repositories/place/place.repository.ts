import { IShowedPlaceDocument, ShowedPlaceModel } from "../../models/place/showed.place.model";
import Repository from "../../services/repository.service";

export default class ShowedPlaceRepository extends Repository<IShowedPlaceDocument>  {
	constructor() {
		super(ShowedPlaceModel);
	}


}