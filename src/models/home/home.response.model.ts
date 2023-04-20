import { IUserModel } from "../user/user.model";

export class HomeResponseModel {
    lastSponsorshipEmail : String;
    enableAdVideo: boolean;
    user: IUserModel;

     constructor(lastSponsorshipEmail: String, enableAdVideo: boolean, user: IUserModel){
        this.lastSponsorshipEmail = lastSponsorshipEmail;
        this.enableAdVideo = enableAdVideo;
        this.user = user;
     }
}