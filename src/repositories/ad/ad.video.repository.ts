import { AdVideoModel, IAdVideoDocument } from "../../models/ad/ad.video.model";
import Repository from "../../services/repository.service";

export default class AdVideoRepository extends Repository<IAdVideoDocument>  {
	constructor() {
		super(AdVideoModel);
	}

}
