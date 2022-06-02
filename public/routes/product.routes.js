"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var celebrate_1 = require("celebrate");
var controller_1 = require("../controller");
var index_service_1 = require("../services/index.service");
var auth_1 = require("../middleware/auth");
var product_validation_1 = require("../Validation/product.validation");
var router = express_1.default.Router();
var getProductId = product_validation_1.ProductSchema.getProductId, addProduct = product_validation_1.ProductSchema.addProduct;
var indexController = new controller_1.IndexController();
var productController = indexController.ProductController;
var indexService = new index_service_1.IndexService();
var authMiddleware = new auth_1.AuthMiddleware(indexService.UserLoginService);
router.post('/add-product', (0, celebrate_1.celebrate)(addProduct), authMiddleware.validateTokenMiddleware, productController.addProduct);
router.get('/all-products', productController.getAllProduct);
router.get('/get-product/:prodId', (0, celebrate_1.celebrate)(getProductId), productController.getProductById);
module.exports = router;
//# sourceMappingURL=product.routes.js.map