import { Product } from "../models/product";
import { Request, Response, NextFunction } from "express";
import { ProductService } from "../services/product.service";


export class ProductController {

    public constructor(private readonly productService: ProductService) {
        this.productService = productService;
    };

    public addProduct = async (req: Request, res: Response): Promise<Response> => {
        if (req.body.user.userTypeId === 1) {
            req.body.image = req.file?.originalname;
            return this.productService.addProduct(req.body)
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
    };

    public getAllProduct = async (req: Request, res: Response): Promise<Response> => {
        return this.productService.getAllProduct()
            .then((product: Product[]) => {
                if (product) {
                    return res.status(200).json({ success: true, product, error: {} });
                }
                return res.status(404).json({ success: false, product: {}, error: { error: 'Product Not Available' } });
            })
            .catch((error: Error) => {
                return res.status(500).json({ success: false, product: {}, error: { error: error } });
            });
    };

    public getProductById = async (req: Request, res: Response): Promise<Response> => {
        return this.productService.getProductById(req.params.prodId)
            .then((product) => {
                if (product) {
                    return res.status(200).json({ success: true, product, error: {} });
                }
                return res.status(404).json({ success: false, product: {}, error: { error: 'Product Not Available' } });
            })
            .catch((error: Error) => {
                return res.status(500).json({ success: false, product: {}, error: { error: error } });
            });
    }
}