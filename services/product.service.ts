import { db } from "../models/index";
import { Product } from "../models/product";

export class ProductService{
    public async addProduct(product: {[key: number | string] : Product}): Promise<Product> {
        return db.Product.create(product);
    }

    public async getAllProduct(): Promise<Product[]> {
        return db.Product.findAll();
    }

    public async getProductById(productId:string): Promise<Product | null> {
        return db.Product.findOne({ where: { product_Id: productId }});
    }

}