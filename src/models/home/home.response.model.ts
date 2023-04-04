export class HomeResponseModel {
    lastSponsorshipEmail : String;
    enableAdVideo: boolean;

     constructor(lastSponsorshipEmail: String, enableAdVideo: boolean){
        this.lastSponsorshipEmail = lastSponsorshipEmail;
        this.enableAdVideo = enableAdVideo;
     }
}