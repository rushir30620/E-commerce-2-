import express from "express";
import { celebrate } from "celebrate";
import { IndexController } from "../controller";
import { IndexService } from "../services/index.service";
import { AuthMiddleware } from "../middleware/auth";
import { ProductSchema } from "../Validation/product.validation";

const router: express.Router = express.Router();

const { getProductId, addProduct } = ProductSchema;

const indexController: IndexController = new IndexController();
const productController = indexController.ProductController;

const indexService: IndexService = new IndexService();
const authMiddleware: AuthMiddleware = new AuthMiddleware(indexService.UserLoginService);

router.post('/add-product', celebrate(addProduct), authMiddleware.validateTokenMiddleware, productController.addProduct);
router.get('/all-products', productController.getAllProduct);
router.get('/get-product/:prodId', celebrate(getProductId), productController.getProductById);

export = router;