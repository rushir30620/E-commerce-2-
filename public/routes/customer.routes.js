"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var celebrate_1 = require("celebrate");
var controller_1 = require("../controller");
var index_service_1 = require("../services/index.service");
var auth_1 = require("../middleware/auth");
var customer_validation_1 = require("../Validation/customer.validation");
var router = express_1.default.Router();
var getId = customer_validation_1.CustomerSchema.getId, UpdateUserDetails = customer_validation_1.CustomerSchema.UpdateUserDetails, addUserAddress = customer_validation_1.CustomerSchema.addUserAddress, ChangePassword = customer_validation_1.CustomerSchema.ChangePassword, Rating = customer_validation_1.CustomerSchema.Rating;
var indexController = new controller_1.IndexController();
var customerController = indexController.CustomerController;
var indexService = new index_service_1.IndexService();
var authMiddleware = new auth_1.AuthMiddleware(indexService.UserLoginService);
router.get('/orders', authMiddleware.validateTokenMiddleware, customerController.getOrders);
router.get('/order-details/:orderId', (0, celebrate_1.celebrate)(getId), authMiddleware.validateTokenMiddleware, customerController.getOrderDetail);
router.get('/order-history', authMiddleware.validateTokenMiddleware, customerController.orderHistory);
router.get('/user-detail', authMiddleware.validateTokenMiddleware, customerController.getUserDetails);
router.put('/update-user-details', (0, celebrate_1.celebrate)(UpdateUserDetails), authMiddleware.validateTokenMiddleware, customerController.updateDetails);
router.get('/useraddress', authMiddleware.validateTokenMiddleware, customerController.getUserAddressByUserId);
router.put('/update-address/:addressId', (0, celebrate_1.celebrate)(addUserAddress), authMiddleware.validateTokenMiddleware, customerController.updateUserAddress);
router.delete('/delete-address/:addressId', authMiddleware.validateTokenMiddleware, customerController.deleteAddress);
router.post('/add-new-address', (0, celebrate_1.celebrate)(addUserAddress), authMiddleware.validateTokenMiddleware, customerController.addNewAddress);
router.put('/change-password', (0, celebrate_1.celebrate)(ChangePassword), authMiddleware.validateTokenMiddleware, customerController.changePassword);
router.post('/product-ratings/:orderId', (0, celebrate_1.celebrate)(Rating), authMiddleware.validateTokenMiddleware, customerController.productRating);
module.exports = router;
//# sourceMappingURL=customer.routes.js.map