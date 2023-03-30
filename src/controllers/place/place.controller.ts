import { Request, Response } from 'express';
import PlaceService from '../../services/place/place.service';
import RequestService from '../../services/request.service';

export async function getOnePlace(req : Request, res: Response){
    const userId = req.user._id;
    const body = req.body;
    const response = await PlaceService.getOnePlace(body);

    RequestService.send(res, response);
}