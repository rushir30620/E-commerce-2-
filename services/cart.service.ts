import { db } from "../models/index";
import { User } from "../models/user";
import { Product } from "../models/product";
import { Cart } from "../models/cart";

export class CartService{

    // Add to cart services
    public async addToCart(cartProducts: {[key: number | string] : Cart}): Promise<Cart>{
        return db.Cart.create(cartProducts,{include:['UserCart', 'CartProduct']});
    }

    public async getProduct(productId:string): Promise<Product | null>{
        return db.Product.findOne({ where: {product_Id: productId}});
    }

    public async getAllProducts(): Promise<Product[]> {
        return db.Product.findAll();
    }

    public async getUserById(userId:number): Promise<User | null>{
        return db.User.findOne({ where: {id: userId}});
    }

    public async getAllCart(): Promise<Cart[]>{
        return db.Cart.findAll();
    }

    public async getCartById(prodId: string): Promise<Cart | null> {
        return db.Cart.findOne({ where: {product_Id: prodId}});
    }

    public async removeFromCart(cartId: string): Promise<number> {
        return db.Cart.destroy({ where: {cart_Id: cartId}});  
    }
}