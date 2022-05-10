import { db } from "../models/index";
import { User } from "../models/user";
import { Product } from "../models/product";
import { Cart } from "../models/cart";

export class CartService{
    public async addToCart(cartProducts: {[key: number | string] : Cart}): Promise<Cart>{
        return db.Cart.create(cartProducts,{include:['UserCart', 'CartProduct']});
    }

    public async getAllCart(): Promise<Cart[]>{
        return db.Cart.findAll();
    }

    public async getCartById(cartId: number): Promise<Cart | null> {
        return db.Cart.findOne({ where: {id: cartId}});
    }

    public async deleteCart(cartId: number): Promise<number> {
        return db.Cart.destroy({ where: {cart_id: cartId}});  
    }
}