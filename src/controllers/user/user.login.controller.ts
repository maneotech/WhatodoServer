import { Request, Response } from 'express';
import { UserRole } from '../../constants/user/user.constant';
import RequestService from '../../services/request.service';
import { UserLoginService } from '../../services/user/user.login.service';

export async function login(req : Request, res: Response){
    const body = req.body;
    const role = req.params.role as UserRole;
    const response = await UserLoginService.login(body.username, body.password, role);
    RequestService.send(res, response);
}