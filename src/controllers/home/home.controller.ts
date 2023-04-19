import { Request, Response } from 'express';
import RequestService from '../../services/request.service';
import { HomeRequestError } from '../../constants/home/home.constants';
import HomeService from '../../services/home/home.service';

export async function getHome(req: Request, res: Response) {
    const user = req.user;
    const response = HomeRequestError.NO_ERROR;

    const result = await HomeService.getHome(user);
    response.data = result;

    return RequestService.send(res, response);
}