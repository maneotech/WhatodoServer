import { Request, Response } from 'express';
import { PlaceRequestError } from '../../constants/place/place.constants';
import { RequestPlaceModel } from '../../models/place/request.place.model';
import PlaceService from '../../services/place/place.service';
import RequestService from '../../services/request.service';
import { UtilitiesService } from '../../services/utilities.service';

export async function getOnePlace(req: Request, res: Response) {
    //const userId = req.user._id;
    const body = req.body;

    if (UtilitiesService.isEmpty(body)) {
        return RequestService.send(res, PlaceRequestError.BODY_EMPTY);
    }

    if (PlaceService.canBeCasted(body) == false) {
        return RequestService.send(res, PlaceRequestError.BODY_ERROR);
    }
    const requestPlaceModel : RequestPlaceModel = body;
    console.log(requestPlaceModel);
    const response = await PlaceService.getOnePlace(requestPlaceModel);

    RequestService.send(res, response);
}