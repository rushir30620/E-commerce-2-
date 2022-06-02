import express from "express";
import { celebrate } from "celebrate";
import { IndexController } from "../controller";
import { IndexService } from "../services/index.service";
import { AuthMiddleware } from "../middleware/auth";
import { OrderSchema } from "../Validation/order.validation";

const router: express.Router = express.Router();

const { getOrderId, order, userAddress } = OrderSchema;

const indexController: IndexController = new IndexController();
const orderController = indexController.OrderController;

const indexService: IndexService = new IndexService();
const authMiddleware: AuthMiddleware = new AuthMiddleware(indexService.UserLoginService);

router.post('/order-now/:prodId', celebrate(order), authMiddleware.validateTokenMiddleware, orderController.createOrder);
router.get('/order-summary/:orderId', celebrate(getOrderId), authMiddleware.validateTokenMiddleware, orderController.orderSummary);
router.get('/existing-addresses', authMiddleware.validateTokenMiddleware, orderController.getExistingAddress);
router.post('/add-newAddress', celebrate(userAddress), authMiddleware.validateTokenMiddleware, orderController.addNewAddress);
router.post('/cart-order', authMiddleware.validateTokenMiddleware, orderController.createOrderFromCart);
router.delete('/cancle-order/:orderId', authMiddleware.validateTokenMiddleware, orderController.cancelOrder);
export = router;