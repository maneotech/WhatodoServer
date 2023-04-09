import { UserThirdPart } from "../../constants/user/user.constant";
import { IResponse } from "../../interfaces/request.interface";
import { IUserDocument } from "../../models/user/user.model";
import { UserAdminService } from "./user.admin.service";

export class UserRegisterService {
    static async register(data : any) : Promise<IResponse<IUserDocument>> {
        return await UserAdminService.create(data, UserThirdPart.NO);
    }

    static async registerWithGoogle(data : any) : Promise<IResponse<IUserDocument>> {
        return await UserAdminService.create(data, UserThirdPart.GOOGLE);
    }

    static async registerWithFacebook(data : any) : Promise<IResponse<IUserDocument>> {
        return await UserAdminService.create(data, UserThirdPart.FACEBOOK);
    }

    static async registerWithApple(data : any) : Promise<IResponse<IUserDocument>> {
        return await UserAdminService.create(data, UserThirdPart.APPLE);
    }
}