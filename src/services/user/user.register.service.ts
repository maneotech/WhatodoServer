import { IResponse } from "../../interfaces/request.interface";
import { IUserDocument } from "../../models/user/user.model";
import { UserAdminService } from "./user.admin.service";

export class UserRegisterService {
    static async register(data : any) : Promise<IResponse<IUserDocument>> {
        return UserAdminService.create(data);
    }
}