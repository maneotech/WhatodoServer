import { ObjectId } from "mongoose";
import { IAdSponsorshipDocument, IAdSponsorshipModel } from "../../models/ad/ad.sponsorship.model";
import AdSponsorshipRepository from "../../repositories/ad/ad.sponsorship.repository";

const adSponsorshipRepository = new AdSponsorshipRepository();


export class AdSponsorshipService {

    static async doesSponsorshipExist(email: String): Promise<boolean> {
        try {
            return await adSponsorshipRepository.exists({emailTarget: email});
        }
        catch (error) {
            console.log(error);
            return true;
        }
    }

    static async validateSponsorship(email: String): Promise<boolean> {
        try {
            var doc = await adSponsorshipRepository.updateOne({emailTarget: email}, {targetHasConnected: true});
            return doc == null ? false : true;
        }
        catch (error) {
            return false;
        }
    }


    static async createSponsorship(email: String, userId: ObjectId): Promise<IAdSponsorshipDocument> {
        try {

            var sponsorshipModel: IAdSponsorshipModel = {
                userFrom: userId,
                emailTarget: email,
                targetHasConnected: false,
                userFromHasBeenNotified: false
            };
    
            return await adSponsorshipRepository.create(sponsorshipModel);
        }
        catch (error) {
            return null;
        }
    }

    static async getLastSponsorshipToBeNotified(userId: ObjectId) : Promise<IAdSponsorshipDocument>{
        try {
            return await adSponsorshipRepository.getOne({userFrom: userId, targetHasConnected: true, userFromHasBeenNotified: false});
        }
        catch (error) {
            return null;
        }
    }

    static async notifySponsorship(lastSponsorshipEmail: String, userId: ObjectId): Promise<boolean>{
        try {
            var doc = await adSponsorshipRepository.updateOne({userFrom: userId, emailTarget: lastSponsorshipEmail}, {userFromHasBeenNotified: true});
            return doc ? true : false;
        }
        catch {
            return false
        }
    }
}