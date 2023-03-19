import { Request, Response } from 'express';
import { UserRole } from '../../constants/user/user.constant';
import RequestService from '../../services/request.service';
import { UserLoginService } from '../../services/user/user.login.service';

export async function login(req : Request, res: Response){
    const body = req.body;
    const response = await UserLoginService.login(body.email, body.password);
    RequestService.send(res, response);
}