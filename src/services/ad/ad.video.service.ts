import { ObjectId } from "mongoose";
import { AdVideoObjectList } from "../../constants/ad/ad.constants";
import { AdContentModel } from "../../models/ad/ad.content.model";
import { IAdVideoDocument, IAdVideoModel } from "../../models/ad/ad.video.model";
import AdVideoRepository from "../../repositories/ad/ad.video.repository";
import { UtilitiesService } from "../utilities.service";
import { LanguageEnum } from "../../constants/language.constants";
import { PlatformEnum } from "../../constants/platform.constants";
import { IAdSponsorshipDocument } from "../../models/ad/ad.sponsorship.model";
const adVideoRepository = new AdVideoRepository();

export class AdVideoService {

    static async startAd(language: LanguageEnum, platform: PlatformEnum, userId: ObjectId): Promise<IAdVideoModel> {

        var adVideoObjectList: AdContentModel[] = [];

        AdVideoObjectList.forEach(videoContent => {
            if ((videoContent.language == LanguageEnum.ALL || videoContent.language == language) &&
                videoContent.platform == PlatformEnum.ALL || videoContent.platform == platform) {
                adVideoObjectList.push(videoContent);
            }
        });

        UtilitiesService.shuffleArray(adVideoObjectList);

        if (adVideoObjectList.length == 0) {
            return null;
        }

        var adVideoObject: AdContentModel = adVideoObjectList[0];

        try {
            var videoModel: IAdVideoModel = {
                user: userId,
                adContent: adVideoObject,
                hasEnded: false,
                clicked: false,
            };

            return await adVideoRepository.createVideo(videoModel);
        }
        catch (error) {
            return null;
        }
    }

    static async endAd(docId: ObjectId, userId: ObjectId): Promise<boolean> {
        try {

            var doc = await adVideoRepository.updateOne({ _id: docId, user: userId }, { hasEnded: true });
            return doc == null ? false : true;
        }
        catch (error) {
            return false;
        }

    }

    static async clickAd(docId: ObjectId, userId: ObjectId): Promise<boolean> {
        try {

            var doc = await adVideoRepository.updateOne({ _id: docId, user: userId }, { clicked: true });
            return doc == null ? false : true;
        }
        catch (error) {
            return false;
        }
    }

    static async isLastVideoDelayRespected(userId: ObjectId): Promise<boolean> {
        try {
            var doc = await adVideoRepository.getOne({ user: userId }, null, null, { sort: { createdAt: -1 } });
            if (doc == null) {
                return true;
            }

            const now = new Date();
            const lastDate = doc.createdAt;

            const timeDiff = now.getTime() - lastDate.getTime();
            const diffDays = timeDiff / (1000 * 3600 * 24);

            if (diffDays >= 3) {
                return true;
            }
            else {
                return false;
            }

        }
        catch (error) {
            return true;
        }
    }
}
