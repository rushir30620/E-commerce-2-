"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var celebrate_1 = require("celebrate");
var controller_1 = require("../controller");
var index_service_1 = require("../services/index.service");
var auth_1 = require("../middleware/auth");
var order_validation_1 = require("../Validation/order.validation");
var router = express_1.default.Router();
var getOrderId = order_validation_1.OrderSchema.getOrderId, order = order_validation_1.OrderSchema.order, userAddress = order_validation_1.OrderSchema.userAddress;
var indexController = new controller_1.IndexController();
var orderController = indexController.OrderController;
var indexService = new index_service_1.IndexService();
var authMiddleware = new auth_1.AuthMiddleware(indexService.UserLoginService);
router.post('/order-now/:prodId', (0, celebrate_1.celebrate)(order), authMiddleware.validateTokenMiddleware, orderController.createOrder);
router.get('/order-summary/:orderId', (0, celebrate_1.celebrate)(getOrderId), authMiddleware.validateTokenMiddleware, orderController.orderSummary);
router.get('/existing-addresses', authMiddleware.validateTokenMiddleware, orderController.getExistingAddress);
router.post('/add-newAddress', (0, celebrate_1.celebrate)(userAddress), authMiddleware.validateTokenMiddleware, orderController.addNewAddress);
router.post('/cart-order', authMiddleware.validateTokenMiddleware, orderController.createOrderFromCart);
router.delete('/cancle-order/:orderId', authMiddleware.validateTokenMiddleware, orderController.cancelOrder);
module.exports = router;
//# sourceMappingURL=order.routes.js.map