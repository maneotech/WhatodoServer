import { ObjId } from "../../interfaces/model.interface";
import UserRepository from "../../repositories/user/user.repository";

const userRepository = new UserRepository();

export default class TransactionService {

    static async spendOneToken(userId: ObjId): Promise<boolean> {
        try {
            var doc = await userRepository.updateById(userId, { $inc: { token: -1 } });
            return doc == null ? false : true; 
        }
        catch (error) {
            return false;
        }
    }

    static async earnOneToken(userId: ObjId): Promise<boolean> {
        try {
            var doc = await userRepository.updateById(userId, { $inc: { token: 1 } });
            return doc == null ? false : true; 
        }
        catch (error) {
            return false;
        }
    }
}