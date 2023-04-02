import { ObjId } from "../../interfaces/model.interface";
import { IShowedPlaceDocument, ShowedPlaceModel } from "../../models/place/showed.place.model";
import Repository, { Options, Populate, Projection } from "../../services/repository.service";

export default class ShowedPlaceRepository extends Repository<IShowedPlaceDocument>  {
	constructor() {
		super(ShowedPlaceModel);
	}

	async getAcceptedForUser(userId : ObjId, populate : Populate = [], projection : Projection = [], options : Options = {}) : Promise<IShowedPlaceDocument[]> {
        return await this.get({user : userId as any, accepted : true}, populate, projection, options);
    }

}