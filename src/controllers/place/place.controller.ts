import { Request, Response } from 'express';
import { PlaceRequestError } from '../../constants/place/place.constants';
import { IResponse } from '../../interfaces/request.interface';
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
    var response = await PlaceService.getOnePlace(user._id, requestPlaceModel);

    if (response.success) {
        //use one token
        if (await TransactionService.spendOneToken(user._id) == false) {
            return RequestService.send(res, PlaceRequestError.ERROR_SPENDING_TOKEN);
        }
        console.log(response.data);

        const savedShowedPlace = await PlaceService.saveShowedPlace(response.data);
        if (savedShowedPlace == null) {
            return RequestService.send(res, PlaceRequestError.NOT_CREATED_ERROR);
        }
        else {
            response.data = savedShowedPlace;
        }
    }

    return RequestService.send(res, response);
}


export async function acceptPlace(req: Request, res: Response) {
    const body = req.body;
    const user = req.user;

    if (UtilitiesService.isEmpty(body)) {
        return RequestService.send(res, PlaceRequestError.BODY_EMPTY);
    }

    if (!body.docId) {
        return RequestService.send(res, PlaceRequestError.BODY_ERROR);
    }


    const result = await PlaceService.acceptPlace(body.docId, user._id);


    if (result) {
        const response: IResponse = PlaceRequestError.NO_ERROR;
        return RequestService.send(res, response);
    }
    else {
        return RequestService.send(res, PlaceRequestError.ACCEPT_ERROR);

    }
}

export async function refusePlace(req: Request, res: Response) {
    const body = req.body;
    const user = req.user;

    console.log(body);

    if (UtilitiesService.isEmpty(body)) {
        return RequestService.send(res, PlaceRequestError.BODY_EMPTY);
    }

    if (!body.docId) {
        return RequestService.send(res, PlaceRequestError.BODY_ERROR);
    }

    const result = await PlaceService.refusePlace(body.docId, user._id);


    if (result) {
        const response: IResponse = PlaceRequestError.NO_ERROR;
        return RequestService.send(res, response);
    }
    else {
        return RequestService.send(res, PlaceRequestError.REFUSE_ERROR);

    }

}

export async function getAcceptedPlaces(req: Request, res: Response) {
    const user = req.user;
    const result = await PlaceService.getAcceptedPlaces(user._id);

    var response: IResponse = PlaceRequestError.NO_ERROR;
    if (result){
        response.data = result;
    }
    else {
        response = PlaceRequestError.GET_ACCEPTED_ERROR;
    }

    return RequestService.send(res, response);
}
