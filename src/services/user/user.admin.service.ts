import { UserRequestError, UserFieldModelRequired, UserRole, UserThirdPart } from "../../constants/user/user.constant";
import { ObjId } from "../../interfaces/model.interface";
import { IResponse } from "../../interfaces/request.interface";
import { IUserDocument, IUserModel } from "../../models/user/user.model";
import UserRepository from "../../repositories/user/user.repository";
import { AdSponsorshipService } from "../ad/ad.sponsorship.service";
import { MailsService } from "../mail.service";
import { UtilitiesService } from "../utilities.service";
import UserService from "./user.service";

const userRepository = new UserRepository();

export class UserAdminService {

    static async create(data : any, userThirdPart: UserThirdPart) : Promise<IResponse<IUserDocument>> {
        let response : IResponse = UserRequestError.UNKNOWN_ERROR;

        if (UtilitiesService.isEmpty(data))
            return UserRequestError.DATA_IS_EMPTY;

        if (!MailsService.isValid(data.email)) 
        return UserRequestError.MAIL_IS_INVALID;

        if (!data.password || !data.password.length)
            return UserRequestError.PASSWORD_IS_EMPTY; 

        

        const keysRequired = UserFieldModelRequired[UserRole.user];

        for (let k of keysRequired) {
            if (!(k in data)) {
                response = UserRequestError.KEY_IS_NEEDED;
                response.message += k;
            }
        }

        const email =  MailsService.formatMail(data.email);
    

        let user : IUserModel = {
            email : email,
            firstname : data.firstname,
            password : UserService.hashPassword(data.password),
            thirdPart: userThirdPart
        }
        
        if (await UserService.emailAlreadyUsed(user.email))
            return UserRequestError.EMAIL_ALREADY_USED;

        
        const result = await userRepository.create(user);
        if (result) {

            //no error management because no needed.
            await AdSponsorshipService.validateSponsorship(user.email);

            response = UserRequestError.NO_ERROR;
            response.data = result;
        }
        return response;
    }
}