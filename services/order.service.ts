import { Cart } from "../models/cart";
import { db } from "../models/index";
import { Order } from "../models/order";
import { OrderAddress } from "../models/orderaddress";
import { Product } from "../models/product";
import { User } from "../models/user";
import { UserAddress } from "../models/useraddress";

export class OrderService{

    public async createOrder(order: {[key: number | string] : Order}): Promise<Order> {
        return db.Order.create(order, { include: ['OrderAddress'] });
    }

    public async addNewAddress(address: {[key: number | string] : UserAddress}): Promise<UserAddress> {
        return db.UserAddress.create(address);
    }

    public async orderSummary(orderId:string): Promise<Order | null> {
        return db.Order.findOne({where: { order_Id : orderId }});
    }

    public async getUserWithAddress(userId:number): Promise<UserAddress[]> {
        return db.UserAddress.findAll({ where: {user_Id:userId}});
    }

    public async getProduct(productId:string): Promise<Product | null>{
        return db.Product.findOne({ where: {product_Id: productId}});
    }

    public async getOrderAddress(orderId:number): Promise<OrderAddress | null> {
        return db.OrderAddress.findOne({ where: {order_Id:orderId}});
    }

    public async getProductsFromCart(userId:number): Promise<Cart[]> {
        return db.Cart.findAll({where: { user_Id: userId }});
    }

    public async createOrderFromCart(cartOrder: {[key: number | string] : Order}): Promise<Order> {
        return db.Order.create(cartOrder, { include: ['OrderAddress'] });
    }

    public async getOrderById(orderId: string): Promise<Order | null> {
        return db.Order.findOne({ where: {order_Id:orderId}});
    }
}