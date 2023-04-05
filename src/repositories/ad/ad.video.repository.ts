import { AdContentModel } from "../../models/ad/ad.content.model";
import { AdVideoModel, IAdVideoDocument, IAdVideoModel } from "../../models/ad/ad.video.model";
import Repository from "../../services/repository.service";

export default class AdVideoRepository extends Repository<IAdVideoDocument>  {
	constructor() {
		super(AdVideoModel);
	}

	async createVideo(adVideoModel: IAdVideoModel): Promise<IAdVideoModel> {
		var doc = await this.create(adVideoModel);
		if (doc) {
			var adVideoModel : IAdVideoModel = {
				_id : doc.id,
				adContent: new AdContentModel(doc.adContent.urlSrc, doc.adContent.redirectTo)
			}

			return adVideoModel;

		}
		else {
			return null;
		}
	}
}
