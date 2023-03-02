import { IUserModel } from "../../models/user/user.model";
import { IAuthentificationToken } from "../../services/user/user.token.service";

export interface IUserLoginResponse {
    user : IUserModel,
    data : IAuthentificationToken
}