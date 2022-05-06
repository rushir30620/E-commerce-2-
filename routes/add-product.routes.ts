import express from "express";
import { AddProductService } from "../services/add-product.service";
import { AddProductController } from "../controller/add-product";
import { UserLoginService } from "../services/user.service";
import { UserController } from "../controller/user.login";

const router: express.Router = express.Router();

const productService: AddProductService = new AddProductService();
const productController: AddProductController = new AddProductController(productService);

const userService: UserLoginService = new UserLoginService();
const userController: UserController = new UserController(userService);

router.post('/add-product', userController.validateTokenMiddleware, productController.addProduct);

export = router;