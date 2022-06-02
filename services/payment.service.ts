import { db } from '../models/index';
import { Product } from '../models/product';
import { Cart } from '../models/cart';
import { Order } from '../models/order';

export class PaymentService {

    public async getProducts(): Promise<Product[]> {
        return db.Product.findAll();
    }

    public async getOrder(orderId:string): Promise<Order | null>{
        return db.Order.findOne({ where: {order_Id:orderId}});
    }
}