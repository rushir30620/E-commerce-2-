"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var add_product_service_1 = require("../services/add-product.service");
var add_product_1 = require("../controller/add-product");
var user_service_1 = require("../services/user.service");
// import { UserController } from "../controller/user.login";
var auth_1 = require("../middleware/auth");
var router = express_1.default.Router();
var productService = new add_product_service_1.AddProductService();
var productController = new add_product_1.AddProductController(productService);
var userService = new user_service_1.UserLoginService();
// const userController: UserController = new UserController(userService);
var authMiddleware = new auth_1.AuthMiddleware(userService);
router.post('/add-product', authMiddleware.validateTokenMiddleware, productController.addProduct);
module.exports = router;
