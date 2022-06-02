import { db } from "../models/index";
import { Order } from "../models/order";
import { OrderAddress } from "../models/orderaddress";
import { Rating } from "../models/rating";
import { User } from "../models/user";
import { UserAddress } from "../models/useraddress";

export class CustomerService {

    public async getOrders(userId: string): Promise<Order[]> {
        return db.Order.findAll({ where: {user_Id:userId, status: ["Order Placed", "Order Accepted"]}});
    }

    public async getOrderDetail(orderId: string): Promise<Order | null> {
        return db.Order.findOne({ where: {order_Id:orderId}});
    }

    public async getOrderAddress(orderId: string): Promise<OrderAddress | null> {
        return db.OrderAddress.findOne({ where: {order_Id:orderId}});
    }

    public async orderHistory(userId: string): Promise<Order[]> {
        return db.Order.findAll({ where: {user_Id:userId, status: ["Order Cancelled", "Order Completed"]}});
    }

/////////////////////////////////////// Update users details //////////////////////////////////////////
    public async getUserDetails(userId: string): Promise<User | null> {
        return db.User.findOne({ where: {id:userId, userTypeId:2}});
    }

    public async updateDetails(user: User, userId: string): Promise<[number | User[]]>{
        return db.User.update(user, { where: {id:userId}});
    }

    public async getUserAddressByUserId(userId: string): Promise<UserAddress[] | null> {
        return db.UserAddress.findAll({ where: {user_Id:userId, IsDeleted:false}});
    }

    public async updateUserAddress(address: UserAddress, addressId: string): Promise<[number | UserAddress[]]>{
        return db.UserAddress.update(address, { where: {user_address_Id:addressId}});
    }

    public async addNewAddress(address: {[key: number | string] : UserAddress}): Promise<UserAddress> {
        return db.UserAddress.create(address);
    }

    public async deleteAddress(addressId: string, userId: string){
        return db.UserAddress.update({IsDeleted:true}, { where: {user_address_Id:addressId, user_Id:userId}});
    }

    public async getPassById(userId:string): Promise<User | null>{
        return db.User.findOne({ where: { id: userId }});
    }

    public async changePassword(password: string, userId: string): Promise<[number | User[]]>{
        return db.User.update({password:password}, { where: {id:userId}});
    }

    public async alreadyRatingGivenOrNot(orderId:string): Promise<Rating | null> {
        return db.Rating.findOne({ where: {order_Id:orderId}});
    } 

    public async productRating(rating: {[key: number | string]: Rating}): Promise<Rating> {
        return db.Rating.create(rating);
    }
}