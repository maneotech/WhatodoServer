import { UserLoginRequestError, UserRole, UserStatus, UserThirdPart } from "../../constants/user/user.constant";
import { IUserLoginResponse } from "../../constants/user/user.login.constant";
import { IResponse } from "../../interfaces/request.interface";
import { IUserDocument, IUserModel } from "../../models/user/user.model";
import UserRepository from "../../repositories/user/user.repository";
import { MailsService } from "../mail.service";
import { UserRegisterService } from "./user.register.service";
import UserService from "./user.service";
import { UserTokenService } from "./user.token.service";

const userRepository = new UserRepository();

export class UserLoginService {
    static async getLoginResponse(user: IUserModel): Promise<IUserLoginResponse> {
        return {
            data: await UserTokenService.createToken(user._id),
            user: user
        }
    }
    static async login(email: string, password: string): Promise<IResponse> {
        let response: IResponse = UserLoginRequestError.NO_ERROR;

        if (!email || !email.length)
            return UserLoginRequestError.ID_EMPTY;

        if (!password || !password.length)
            return UserLoginRequestError.ID_EMPTY;

        if (MailsService.isValid(email)) {
            email = MailsService.formatMail(email);
        }

        const selectors = { email: email, password: UserService.hashPassword(password) };
        const user = await userRepository.getOne(selectors, [], []);

        if (!user)
            return UserLoginRequestError.ID_INVALID;
        if (user.status != UserStatus.enabled)
            return UserLoginRequestError.STATUS_DISABLED;

        const data = await UserLoginService.getLoginResponse(user);
        response.data = data;

        return response;
    }

    static async loginWithThirdPart(email: string, password: string, firstname: string, thirdPart: UserThirdPart): Promise<IResponse> {
        if (!email || !password || !firstname) {
            return UserLoginRequestError.BODY_ERROR;
        }
    
        
        if (MailsService.isValid(email) == false) {
            return UserLoginRequestError.ID_INVALID;
        }

        email = MailsService.formatMail(email);
        const selectors = { email: email, password: UserService.hashPassword(password) };

        var user: IUserDocument = await userRepository.getOne(selectors, [], []);

        
        if (!user){
            const body = {
                email: email,
                password: password,
                firstname: firstname
            };

            var registerResponse: IResponse = UserLoginRequestError.NO_ERROR;

            if (thirdPart == UserThirdPart.GOOGLE){
                registerResponse = await UserRegisterService.registerWithGoogle(body);
            }
            else if (thirdPart == UserThirdPart.FACEBOOK){
                registerResponse = await UserRegisterService.registerWithFacebook(body);
            }
            else if (thirdPart == UserThirdPart.APPLE){
                registerResponse = await UserRegisterService.registerWithApple(body);
            }
            else {
                return UserLoginRequestError.WRONG_THIRD_TYPE;
            }
             
            if (registerResponse.success == false)
            {
                return registerResponse;
            }

            user = registerResponse.data;
        }

        if (!user){
            return UserLoginRequestError.USER_EMPTY;
        }

        if (user.status != UserStatus.enabled)
            return UserLoginRequestError.STATUS_DISABLED;

        const data = await UserLoginService.getLoginResponse(user);

        let response: IResponse = UserLoginRequestError.NO_ERROR;
        response.data = data;

        return response;

    }


}