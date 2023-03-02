import { UserLoginRequestError, UserRole, UserStatus } from "../../constants/user/user.constant";
import { IUserLoginResponse } from "../../constants/user/user.login.constant";
import { IResponse } from "../../interfaces/request.interface";
import { IUserModel } from "../../models/user/user.model";
import UserRepository from "../../repositories/user/user.repository";
import { MailsService } from "../mail.service";
import UserService from "./user.service";
import { UserTokenService } from "./user.token.service";

const userRepository = new UserRepository();

export class UserLoginService {
    static async getLoginResponse(user : IUserModel) : Promise<IUserLoginResponse> {
        return {
            data : await UserTokenService.createToken(user._id),
            user : user
        }
    }
    static async login(username : string, password : string, role : UserRole) : Promise<IResponse> {
        let response : IResponse = UserLoginRequestError.NO_ERROR;

        if (!username || !username.length)
            return UserLoginRequestError.ID_EMPTY;

        if (!password || !password.length)
            return UserLoginRequestError.ID_EMPTY;

        username = username.trim();
        if (MailsService.isValid(username)) {
            username = MailsService.formatMail(username);
        }

        const selectors = {username: username, password : UserService.hashPassword(password), role : role };
        const user = await userRepository.getOne(selectors, [], []);

        if (!user)
            return UserLoginRequestError.ID_INVALID;
        if (user.status != UserStatus.enabled)
            return UserLoginRequestError.STATUS_DISABLED;

        const data = await UserLoginService.getLoginResponse(user);
        response.data = data;

        return response;
    }
}