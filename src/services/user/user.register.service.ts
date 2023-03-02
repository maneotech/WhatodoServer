import { UserRequestError, UserRole } from "../../constants/user/user.constant";
import { IResponse } from "../../interfaces/request.interface";
import { IUserDocument } from "../../models/user/user.model";
import { UserAdminService } from "./user.admin.service";

export class UserRegisterService {
    static async register(data : any, role : UserRole) : Promise<IResponse<IUserDocument>> {
        if (role != UserRole.user)
            return UserRequestError.ROLE_IS_INVALID;
            
        return UserAdminService.create(data);
    }
}