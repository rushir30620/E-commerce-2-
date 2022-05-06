import { db } from "../models/index";
import { Product } from "../models/product";

export class AddProductService{
    public async addProduct(product: {[key: number | string] : Product}): Promise<Product> {
        return db.Product.create(product);
    }

    // public async getAdmin(user)
}