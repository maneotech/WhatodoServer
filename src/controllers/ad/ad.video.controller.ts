import { Request, Response } from 'express';

import { AdRequestError } from "../../constants/ad/ad.constants";
import { AdVideoService } from '../../services/ad/ad.video.service';
import RequestService from "../../services/request.service";
import { UtilitiesService } from '../../services/utilities.service';
import LanguageService from '../../services/enum.service';
import { LanguageEnum } from '../../constants/language.constants';
import EnumService from '../../services/enum.service';
import { PlatformEnum } from '../../constants/platform.constants';
import TransactionService from '../../services/transaction/transaction.service';

export async function startAd(req: Request, res: Response) {
    const user = req.user;
    const body = req.body;

    if (UtilitiesService.isEmpty(body)) {
        return RequestService.send(res, AdRequestError.BODY_EMPTY);
    }
    if (!body.language && !body.platform) {
        return RequestService.send(res, AdRequestError.BODY_ERROR);
    }

    if (await AdVideoService.isLastVideoDelayRespected(user._id) == false) {
        return RequestService.send(res, AdRequestError.DELAY_NOT_RESPECTED);
    }

    const response = AdRequestError.NO_ERROR;
    var language: LanguageEnum = EnumService.fromLanguageStringToEnum(body.language);
    var platform: PlatformEnum = EnumService.fromPlatformStringToEnum(body.platform);

    const result = await AdVideoService.startAd(language, platform, user._id);

    if (result == null) {
        return RequestService.send(res, AdRequestError.INSERTING_DB);
    }

    response.data = result;

    return RequestService.send(res, response);
}

export async function endAd(req: Request, res: Response) {
    const user = req.user;
    const body = req.body;
    const response = AdRequestError.NO_ERROR;

    if (UtilitiesService.isEmpty(body)) {
        return RequestService.send(res, AdRequestError.BODY_EMPTY);
    }
    if (!body.docId) {
        return RequestService.send(res, AdRequestError.BODY_ERROR);
    }

    if (await AdVideoService.endAd(body.docId, user._id) == null) {
        return RequestService.send(res, AdRequestError.INSERTING_DB);
    }

    if (await TransactionService.earnOneToken(user._id) == false) {
        return RequestService.send(res, AdRequestError.ERROR_SPENDING_TOKEN);
    }

    return RequestService.send(res, response);
}


export async function clickAd(req: Request, res: Response) {
    const user = req.user;
    const body = req.body;

    const response = AdRequestError.NO_ERROR;

    if (UtilitiesService.isEmpty(body)) {
        return RequestService.send(res, AdRequestError.BODY_EMPTY);
    }
    if (!body.docId) {
        return RequestService.send(res, AdRequestError.BODY_ERROR);
    }

    const result = await AdVideoService.clickAd(body.docId, user._id);

    if (result == null) {
        return RequestService.send(res, AdRequestError.INSERTING_DB);
    }

    return RequestService.send(res, response);
}