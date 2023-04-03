import { AdSponsorshipModel, IAdSponsorshipDocument } from "../../models/ad/ad.sponsorship.model";
import Repository from "../../services/repository.service";

export default class AdSponsorshipRepository extends Repository<IAdSponsorshipDocument>  {
	constructor() {
		super(AdSponsorshipModel);
	}

}
