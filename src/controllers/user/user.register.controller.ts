import { Request, Response } from 'express';
import { UserRole } from '../../constants/user/user.constant';
import { IResponse } from '../../interfaces/request.interface';
import RequestService from '../../services/request.service';
import { UserRegisterService } from '../../services/user/user.register.service';

export async function register(req : Request, res: Response){
    const body = req.body;
    const role = req.params.role as UserRole;
    body.role = role;
    if (body.code != "carotte07*") {
        const response : IResponse = {success : false, status : 400, message : "Only bêta-testeurs are allowed (with good code)", data : null, error : 0};
        return RequestService.send(res, response);
    }
    const response : IResponse = await UserRegisterService.register(body, role);
    RequestService.send(res, response);
}