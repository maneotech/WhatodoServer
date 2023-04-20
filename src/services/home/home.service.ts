import { ObjectId } from "mongoose";
import { HomeResponseModel } from "../../models/home/home.response.model";
import { AdSponsorshipService } from "../ad/ad.sponsorship.service";
import { AdVideoService } from "../ad/ad.video.service";
import { IUserModel } from "../../models/user/user.model";

export default class HomeService {
    static async getHome(user: IUserModel): Promise<HomeResponseModel>{
        var lastSponsorshipFirstname = null;
        var lastSponsorship = await AdSponsorshipService.getLastSponsorshipToBeNotified(user._id);
        
        if (lastSponsorship != null){
            lastSponsorshipFirstname= lastSponsorship.emailTarget;
        }

        var enableAdVideo: boolean = await  AdVideoService.isLastVideoDelayRespected(user._id);


        var homeResponse = new HomeResponseModel (lastSponsorshipFirstname, enableAdVideo, user);

        return homeResponse;
    }
}