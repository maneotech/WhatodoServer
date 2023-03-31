import { Request, Response } from 'express';
import { PlaceRequestError } from '../../constants/place/place.constants';
import { RequestPlaceModel } from '../../models/place/request.place.model';
import PlaceService from '../../services/place/place.service';
import RequestService from '../../services/request.service';
import TransactionService from '../../services/transaction/transaction.service';
import { UtilitiesService } from '../../services/utilities.service';

export async function getOnePlace(req: Request, res: Response) {
    const body = req.body;
    const user = req.user;

    if (UtilitiesService.isEmpty(body)) {
        return RequestService.send(res, PlaceRequestError.BODY_EMPTY);
    }

    if (PlaceService.canBeCasted(body) == false) {
        return RequestService.send(res, PlaceRequestError.BODY_ERROR);
    }

    console.log("user.token");
    console.log(user.token);

    if (user.token != null && user.token < 1) {
        return RequestService.send(res, PlaceRequestError.NOT_ENOUGH_TOKEN);
    }

    const requestPlaceModel: RequestPlaceModel = body;
    const response = await PlaceService.getOnePlace(requestPlaceModel);

    if (response.success) {
        //use one token
        if (await TransactionService.spendOneToken(user._id) == false) {
            return RequestService.send(res, PlaceRequestError.ERROR_SPENDING_TOKEN);
        }

        if (await PlaceService.saveShowedPlace(user._id, response.data) == false) {
            return RequestService.send(res, PlaceRequestError.NOT_CREATED_ERROR);
        }
    }

    return RequestService.send(res, response);
}