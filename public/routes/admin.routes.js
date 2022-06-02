"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var celebrate_1 = require("celebrate");
var controller_1 = require("../controller");
var index_service_1 = require("../services/index.service");
var auth_1 = require("../middleware/auth");
var admin_validation_1 = require("../Validation/admin.validation");
var router = express_1.default.Router();
var AcceptOrder = admin_validation_1.AdminSchema.AcceptOrder, RescheduleOrder = admin_validation_1.AdminSchema.RescheduleOrder, RefundAmount = admin_validation_1.AdminSchema.RefundAmount;
var indexController = new controller_1.IndexController();
var adminController = indexController.AdminController;
var indexService = new index_service_1.IndexService();
var authMiddleware = new auth_1.AuthMiddleware(indexService.UserLoginService);
router.get('/all-orders', authMiddleware.validateTokenMiddleware, adminController.getAllOrderRequest);
router.put('/accept-order/:orderId', (0, celebrate_1.celebrate)(AcceptOrder), authMiddleware.validateTokenMiddleware, adminController.acceptOrderRequest);
router.put('/reschedule-order/:orderId', (0, celebrate_1.celebrate)(RescheduleOrder), authMiddleware.validateTokenMiddleware, adminController.rescheduleOrderDate);
router.delete('/cancel-order/:orderId', authMiddleware.validateTokenMiddleware, adminController.cancelOrder);
router.get('/apply-filters', authMiddleware.validateTokenMiddleware, adminController.filters);
router.put('/refund-amount/:orderId', (0, celebrate_1.celebrate)(RefundAmount), authMiddleware.validateTokenMiddleware, adminController.refundAmount);
router.get('/product-ratings/:orderId', authMiddleware.validateTokenMiddleware, adminController.getProductRatings);
module.exports = router;
//# sourceMappingURL=admin.routes.js.map