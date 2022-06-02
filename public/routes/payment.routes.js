"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var controller_1 = require("../controller");
var index_service_1 = require("../services/index.service");
var auth_1 = require("../middleware/auth");
var router = express_1.default.Router();
var indexController = new controller_1.IndexController();
var paymentController = indexController.PaymentController;
var indexService = new index_service_1.IndexService();
var authMiddleware = new auth_1.AuthMiddleware(indexService.UserLoginService);
router.get('/checkout/:orderId', authMiddleware.validateTokenMiddleware, paymentController.makePayment);
router.get('/paymentDone', paymentController.paymentSuccess);
router.get('/cancel', paymentController.makePayment);
module.exports = router;
//# sourceMappingURL=payment.routes.js.map