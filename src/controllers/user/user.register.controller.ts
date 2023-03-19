import { Request, Response } from 'express';
import { UserRole } from '../../constants/user/user.constant';
import { IResponse } from '../../interfaces/request.interface';
import RequestService from '../../services/request.service';
import { UserRegisterService } from '../../services/user/user.register.service';

export async function register(req : Request, res: Response){
    const body = req.body;
    const response : IResponse = await UserRegisterService.register(body);
    RequestService.send(res, response);
}