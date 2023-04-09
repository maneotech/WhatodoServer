import { Request, Response } from 'express';
import { UserThirdPart } from '../../constants/user/user.constant';
import RequestService from '../../services/request.service';
import { UserLoginService } from '../../services/user/user.login.service';

export async function login(req: Request, res: Response) {
    const body = req.body;
    const response = await UserLoginService.login(body.email, body.password);
    return RequestService.send(res, response);
}

export async function loginWithGoogle(req: Request, res: Response) {
    const body = req.body;
    const response = await UserLoginService.loginWithThirdPart(body.email, body.password, body.firstname, UserThirdPart.GOOGLE);
    return RequestService.send(res, response);
}

export async function loginWithFacebook(req: Request, res: Response) {
    const body = req.body;
    const response = await UserLoginService.loginWithThirdPart(body.email, body.password, body.firstname, UserThirdPart.FACEBOOK);
    return RequestService.send(res, response);
}

export async function loginWithApple(req: Request, res: Response) {
    const body = req.body;
    const response = await UserLoginService.loginWithThirdPart(body.email, body.password, body.firstname, UserThirdPart.APPLE);
    return RequestService.send(res, response);
}