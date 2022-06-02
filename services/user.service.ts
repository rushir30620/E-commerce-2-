import { User } from "../models/user";
import { db } from "../models/index";

export class UserLoginService{
    public async createUser(user: {[key: number | string]: User}): Promise<User> {
        return db.User.create(user);
    }

    public async loginUser(userEmail: string): Promise<User | null>{
        return db.User.findOne({ where: {email: userEmail}});
    }

    public async forgotPassword(userEmail:string): Promise<User | null> {
        return db.User.findOne({ where: { email: userEmail }});
    }

    public async resetPassword(userId:number): Promise<User | null> {
        return db.User.findOne({ where: { id: userId }});
    }

    public async updateUser(password:string, userId:number): Promise<[User[] | any]> {
        return db.User.update({ password: password }, {where: {id:userId}});
    }
}