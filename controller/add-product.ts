import { Product } from "../models/product";
import { Request, Response, NextFunction } from "express";
import { AddProductService } from "../services/add-product.service";
import jwt from "jsonwebtoken";


export class AddProductController {

    public constructor(private readonly addProductService: AddProductService) {
        this.addProductService = addProductService;
    };

    public addProduct = async (req: Request, res: Response): Promise<Response> => {
        if (req.body.user.userTypeId === 1) {
            // req.body.image = req.file?.originalname;
            return this.addProductService.addProduct(req.body)
                .then((product: Product) => {
                    if (product) {
                        console.log(product);
                        return res.status(200).json({ success: true, product, error: {} });
                    }
                    else {
                        return res.status(401).json({ success: false, product , message: "Product is not added..." });
                    }
                })
                .catch((error: Error) => {
                    console.log(error);
                    return res.status(500).json({ success: false, product: {} , error: { error: error } });
                });
        }
        else {
            return res.status(402).json({ success: false, product: {}, message: "Admin not found..." });
        }
    }
}