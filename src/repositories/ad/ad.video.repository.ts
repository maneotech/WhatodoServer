import { ObjId } from "../../interfaces/model.interface";
import { AdContentModel } from "../../models/ad/ad.content.model";
import { AdVideoModel, IAdVideoDocument, IAdVideoModel } from "../../models/ad/ad.video.model";
import { IShowedPlaceDocument } from "../../models/place/showed.place.model";
import Repository from "../../services/repository.service";

export default class AdVideoRepository extends Repository<IAdVideoDocument>  {
	constructor() {
		super(AdVideoModel);
	}

	async createVideo(adVideoModel: IAdVideoModel): Promise<AdContentModel> {
		var doc = await this.create(adVideoModel);
		if (doc) {
			return new AdContentModel(doc.adContent.urlSrc, doc.adContent.redirectTo);
		}
		else {
			return null;
		}
	}
}
