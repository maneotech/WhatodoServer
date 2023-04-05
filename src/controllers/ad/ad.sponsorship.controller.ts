import { Request, Response } from 'express';

import { AdRequestError } from "../../constants/ad/ad.constants";
import { LanguageEnum } from "../../constants/language.constants";
import { PlatformEnum } from "../../constants/platform.constants";
import { AdVideoService } from "../../services/ad/ad.video.service";
import EnumService from "../../services/enum.service";
import RequestService from "../../services/request.service";
import { UtilitiesService } from "../../services/utilities.service";
import { AdSponsorshipService } from '../../services/ad/ad.sponsorship.service';
import UserService from '../../services/user/user.service';

export async function createSponsorship(req: Request, res: Response) {
    const user = req.user;
    const body = req.body;

    if (UtilitiesService.isEmpty(body)) {
        return RequestService.send(res, AdRequestError.BODY_EMPTY);
    }
    if (!body.email) {
        return RequestService.send(res, AdRequestError.BODY_ERROR);
    }

    if (await AdSponsorshipService.doesSponsorshipExist(body.email)) {
        return RequestService.send(res, AdRequestError.SPONSORSHIP_ALREADY_EXIST);
    }

    if (await UserService.emailAlreadyUsed(body.email)) {
        return RequestService.send(res, AdRequestError.USER_ALREADY_EXIST);
    }


    const result = await AdSponsorshipService.createSponsorship(body.email, user._id);

    if (result == null) {
        return RequestService.send(res, AdRequestError.INSERTING_DB);
    }

    const response = AdRequestError.NO_ERROR;
    return RequestService.send(res, response);
}

export async function notifySponsorship(req: Request, res: Response) {
    const user = req.user;
    const body = req.body;

    if (UtilitiesService.isEmpty(body)) {
        return RequestService.send(res, AdRequestError.BODY_EMPTY);
    }
    if (!body.lastSponsorshipEmail) {
        return RequestService.send(res, AdRequestError.BODY_ERROR);
    }

    const result = await AdSponsorshipService.notifySponsorship(body.lastSponsorshipEmail, user._id);

    if (!result) {
        return RequestService.send(res, AdRequestError.INSERTING_DB);
    }


    const response = AdRequestError.NO_ERROR;
    return RequestService.send(res, response);

}



