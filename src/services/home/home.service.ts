import { ObjectId } from "mongoose";
import { HomeResponseModel } from "../../models/home/home.response.model";
import { AdSponsorshipService } from "../ad/ad.sponsorship.service";
import { AdVideoService } from "../ad/ad.video.service";

export default class HomeService {
    static async getHome(userId: ObjectId): Promise<HomeResponseModel>{
        var lastSponsorshipFirstname = null;
        var lastSponsorship = await AdSponsorshipService.getLastSponsorshipToBeNotified(userId);
        
        if (lastSponsorship != null){
            lastSponsorshipFirstname= lastSponsorship.emailTarget;
        }

        var enableAdVideo: boolean = await  AdVideoService.isLastVideoDelayRespected(userId);
        var homeResponse = new HomeResponseModel (lastSponsorshipFirstname, enableAdVideo);

        return homeResponse;
    }
}