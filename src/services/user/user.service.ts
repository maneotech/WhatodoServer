
import crypto from 'crypto'
import { ObjectId } from 'mongoose';
import { UserRole } from '../../constants/user/user.constant';
import { ObjId } from '../../interfaces/model.interface';
import UserRepository from '../../repositories/user/user.repository';

const userRepository = new UserRepository();

export default class UserService {

    static hashPassword(password : string) : string {
        const hash = crypto.createHmac('sha256', process.env.HASH_PWD_SECRET);
        hash.update(password);
        return hash.digest('hex');
    }
    
    static async usernameAlreadyUsed(username : string, role : UserRole = undefined, excludeUserId : ObjId = undefined) : Promise<boolean> {
		return await userRepository.getUserByUsername(username, role, excludeUserId) != null;
	}

    static async emailAlreadyUsed(email : string, role : UserRole = undefined, excludeUserId : ObjId = undefined) : Promise<boolean> {
		return await userRepository.getUserByEmail(email, role, excludeUserId) != null;
	}
}