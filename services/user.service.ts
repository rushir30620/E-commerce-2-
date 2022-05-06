import { User } from "../models/user";
import { db } from "../models/index";

export class UserLoginService{
    public async createUser(user: {[key: number | string]: User}): Promise<User> {
        return db.User.create(user);
    }

    public async loginUser(userEmail: string): Promise<User | null>{
        return db.User.findOne({ where: {email: userEmail}});
    }
}