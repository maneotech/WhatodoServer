export class HomeResponseModel {
    lastSponsorshipEmail : String;
    enableAdVideo: boolean;
    token: number;

     constructor(lastSponsorshipEmail: String, enableAdVideo: boolean, token: number){
        this.lastSponsorshipEmail = lastSponsorshipEmail;
        this.enableAdVideo = enableAdVideo;
        this.token = token;
     }
}