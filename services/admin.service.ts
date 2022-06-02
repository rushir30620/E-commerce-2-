import { db } from "../models/index";
import { User } from "../models/user";
import { Order } from "../models/order";
import { Product } from "../models/product";
import { OrderAddress } from "../models/orderaddress";
import { Rating } from "../models/rating";

export class AdminService {

    public async getAllOrderRequest(): Promise<Order[]> {
        return db.Order.findAll();
    }

    public async getOrderById(orderId: string): Promise<Order | null> {
        return db.Order.findOne({ where: {order_Id:orderId}});
    }

    public async rescheduleOrderDate(date: Date, orderId: string): Promise<[number | Order[]]> {
        return db.Order.update({ orderDeliveryDate: date }, { where: {order_Id:orderId}});
    }

    public async getUserById(userId : number): Promise<User | null> {
        return db.User.findOne({ where: {id:userId}});
    }

    public async getUserByEmail(userEmail: string): Promise<User | null> {
        return db.User.findOne({ where: {email:userEmail}});
    }
    
    public async getProductById(productId: number): Promise<Product | null> {
        return db.Product.findOne({ where: {product_Id:productId}});
    }

    public async getOrderAddress(orderId: number): Promise<OrderAddress | null> {
        return db.OrderAddress.findOne({ where: {order_Id:orderId}});
    }

    public async getProductRatings(orderId: string): Promise<Rating | null> {
        return db.Rating.findOne({ where: {order_Id:orderId}});
    }
}