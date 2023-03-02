import { UserRequestError, UserFieldModelAuthorized, UserFieldModelRequired, UserRole } from "../../constants/user/user.constant";
import { ObjId } from "../../interfaces/model.interface";
import { IResponse } from "../../interfaces/request.interface";
import { IUserDocument, IUserModel } from "../../models/user/user.model";
import UserRepository from "../../repositories/user/user.repository";
import { MailsService } from "../mail.service";
import { UtilitiesService } from "../utilities.service";
import UserService from "./user.service";

const userRepository = new UserRepository();

export class UserAdminService {

    static async create(data : any) : Promise<IResponse<IUserDocument>> {
        let response : IResponse = UserRequestError.UNKNOWN_ERROR;

        if (UtilitiesService.isEmpty(data))
            return UserRequestError.DATA_IS_EMPTY;

        if (!UtilitiesService.enumContainsString(UserRole, data.role)) {
            return UserRequestError.ROLE_IS_INVALID;
        }

        if (!MailsService.isValid(data.email)) 
        return UserRequestError.MAIL_IS_INVALID;

        if (!data.password || !data.password.length)
            return UserRequestError.PASSWORD_IS_EMPTY; 

        if (!data.nickname || !data.nickname.length)
            return UserRequestError.NICKNAME_IS_EMPTY; 

        const keysRequired = UserFieldModelRequired[data.role];
        const keysAuthorized = UserFieldModelAuthorized[data.role];

        for (let k of keysRequired) {
            if (!(k in data)) {
                response = UserRequestError.KEY_IS_NEEDED;
                response.message += k;
            }
        }

        let usernameIsEmail = false;
        const email =  MailsService.formatMail(data.email);
        let username = data.username || email;
    
        if (MailsService.isSameMail(email, username)) {
            username = MailsService.formatMail(username);
            usernameIsEmail = true;
        }

        if (!usernameIsEmail && MailsService.isValid(username))
            return UserRequestError.USERNAME_CANT_BE_EMAIL;

        let user : IUserModel = {
            role : data.role,
            email : email,
            nickname : data.nickname,
            username : username,
            password : UserService.hashPassword(data.password)
        }
        
        if (await UserService.usernameAlreadyUsed(user.username, user.role as UserRole))
            return UserRequestError.USERNAME_ALREADY_USED;

        if (await UserService.emailAlreadyUsed(user.email, user.role as UserRole))
            return UserRequestError.EMAIL_ALREADY_USED;

        for (let k of keysAuthorized) {
            if (!user[k])
                user[k] = data[k];
        }


        const result = await userRepository.create(user);
        if (result) {
            response = UserRequestError.NO_ERROR;
            response.data = result;
        }
        return response;
    }

    static async update(id : ObjId, data : any) : Promise<IResponse> {
        let response : IResponse = UserRequestError.UNKNOWN_ERROR;
        const user = await userRepository.getById(id, [], [], {full_projections : true});

        if (!user)
            return UserRequestError.USER_DOESNT_EXIST;

        if (data.role && user.role != data.role)
            return UserRequestError.UDPATE_ROLE;

        const keysAuthorized = UserFieldModelAuthorized[user.role];
        const usernameIsEmail = user.username == user.email;
        const email = data.email ? MailsService.formatMail(data.email) : user.email;
        let username = data.username ? data.username : null;

        if (username) {
            if (MailsService.isValid(username) && username != email)
                return UserRequestError.USERNAME_CANT_BE_EMAIL;
        } else if (usernameIsEmail) {
            username = email;
        }          

        let update : Partial<IUserModel> = {};
        for (let k of keysAuthorized) {
            if (k in data)
                update[k] = data[k];
        }

        if (email && await UserService.emailAlreadyUsed(email, user.role as UserRole, user._id))
            return UserRequestError.EMAIL_ALREADY_USED;
        if (username && await UserService.usernameAlreadyUsed(username, user.role as UserRole, user._id))
            return UserRequestError.USERNAME_ALREADY_USED;

        update.email = email;
        if (username) {
            update.username = username;
        }


        if (data.password) {
            if (data.password.length) {
                update.password = UserService.hashPassword(data.password); 
            } else {
                return UserRequestError.PASSWORD_IS_EMPTY; 
            }
        }
        const result = await userRepository.updateById(user._id, update);
        if (result) {
            response = UserRequestError.NO_ERROR;
            response.data = result;
        }
        return response;
    }

    static async delete(id : ObjId) : Promise<IResponse> {
        let response : IResponse = UserRequestError.NO_ERROR;
        const user = await userRepository.getById(id);
        response.data = user;
        if (!user) {
            return UserRequestError.USER_DOESNT_EXIST;
        }
        await userRepository.deleteById(user._id);
        return response;
    }
}