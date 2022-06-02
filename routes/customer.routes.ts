import express from "express";
import { celebrate } from "celebrate";
import { IndexController } from "../controller";
import { IndexService } from "../services/index.service";
import { AuthMiddleware } from "../middleware/auth";
import { CustomerSchema } from "../Validation/customer.validation";

const router: express.Router = express.Router();

const { getId, UpdateUserDetails, addUserAddress, ChangePassword, Rating } = CustomerSchema;

const indexController: IndexController = new IndexController();
const customerController = indexController.CustomerController;

const indexService: IndexService = new IndexService();
const authMiddleware: AuthMiddleware = new AuthMiddleware(indexService.UserLoginService);

router.get('/orders', authMiddleware.validateTokenMiddleware, customerController.getOrders);

router.get('/order-details/:orderId', celebrate(getId), authMiddleware.validateTokenMiddleware, customerController.getOrderDetail);

router.get('/order-history', authMiddleware.validateTokenMiddleware, customerController.orderHistory);

router.get('/user-detail', authMiddleware.validateTokenMiddleware, customerController.getUserDetails);

router.put('/update-user-details', celebrate(UpdateUserDetails), authMiddleware.validateTokenMiddleware, customerController.updateDetails);

router.get('/useraddress', authMiddleware.validateTokenMiddleware, customerController.getUserAddressByUserId);

router.put('/update-address/:addressId', celebrate(addUserAddress), authMiddleware.validateTokenMiddleware, customerController.updateUserAddress);

router.delete('/delete-address/:addressId', authMiddleware.validateTokenMiddleware, customerController.deleteAddress);

router.post('/add-new-address', celebrate(addUserAddress), authMiddleware.validateTokenMiddleware, customerController.addNewAddress);

router.put('/change-password', celebrate(ChangePassword), authMiddleware.validateTokenMiddleware, customerController.changePassword);

router.post('/product-ratings/:orderId', celebrate(Rating), authMiddleware.validateTokenMiddleware, customerController.productRating);

export = router;