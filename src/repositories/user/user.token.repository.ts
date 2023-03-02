import { ObjId } from "../../interfaces/model.interface";
import { IUserTokenDocument, UserTokenModel } from "../../models/user/user.token.model";
import Repository from "../../services/repository.service";

export default class UserTokenRepository extends Repository<IUserTokenDocument>  {
	constructor() {
		super(UserTokenModel);
	}

	async incrementUse(id : ObjId) {
        return this.updateById(id, {$inc : {used : 1}});
    }
}