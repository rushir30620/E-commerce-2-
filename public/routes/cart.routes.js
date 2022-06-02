"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var celebrate_1 = require("celebrate");
var controller_1 = require("../controller");
var index_service_1 = require("../services/index.service");
var auth_1 = require("../middleware/auth");
var cart_validation_1 = require("../Validation/cart.validation");
var router = express_1.default.Router();
var get = cart_validation_1.CartSchema.get, addCart = cart_validation_1.CartSchema.addCart;
var indexController = new controller_1.IndexController();
var cartController = indexController.CartController;
var indexService = new index_service_1.IndexService();
var authMiddleware = new auth_1.AuthMiddleware(indexService.UserLoginService);
router.post('/add-to-cart/:prodId', (0, celebrate_1.celebrate)(addCart), authMiddleware.validateTokenMiddleware, cartController.addToCart);
router.get('/all-carts', authMiddleware.validateTokenMiddleware, cartController.getAllCarts);
// router.get('/get-cart/:prodId', celebrate(get), authMiddleware.validateTokenMiddleware, cartController.getCartById);
router.delete('/remove-cart/:cartId', (0, celebrate_1.celebrate)(get), authMiddleware.validateTokenMiddleware, cartController.removeFromCart);
module.exports = router;
//# sourceMappingURL=cart.routes.js.map