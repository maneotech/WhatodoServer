import { UserRole } from "../../constants/user/user.constant";
import { ObjId } from "../../interfaces/model.interface";
import { IUserDocument, IUserModel, UserModel } from "../../models/user/user.model";
import Repository from "../../services/repository.service";

export default class UserRepository extends Repository<IUserDocument>  {
	constructor() {
		super(UserModel);
	}

	async getUserByUsername(username : string, role : UserRole = undefined, excludeUserId : ObjId = undefined) : Promise<IUserDocument> {
		if (!username || !username.length) {
			throw new Error("username can't be null")
		}
		let selectors = {username : username};
		if (excludeUserId) selectors['_id'] = {$ne : excludeUserId}
		if (role) selectors['role'] = role;
		return await this.getOne(selectors);
	}

	async getUserByEmail(email : string, role : UserRole = undefined, excludeUserId : ObjId = undefined) : Promise<IUserDocument> {
		if (!email || !email.length) {
			throw new Error("username can't be null")
		}
		let selectors = {email : email};
		if (excludeUserId) selectors['_id'] = {$ne : excludeUserId}
		if (role) selectors['role'] = role;
		return await this.getOne(selectors);
	}
}