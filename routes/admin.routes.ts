import express from "express";
import { celebrate } from "celebrate";
import { IndexController } from "../controller";
import { IndexService } from "../services/index.service";
import { AuthMiddleware } from "../middleware/auth";
import { AdminSchema } from "../Validation/admin.validation";

const router: express.Router = express.Router();

const { AcceptOrder, RescheduleOrder, RefundAmount } = AdminSchema;

const indexController: IndexController = new IndexController();
const adminController = indexController.AdminController;

const indexService: IndexService = new IndexService();
const authMiddleware: AuthMiddleware = new AuthMiddleware(indexService.UserLoginService);

router.get('/all-orders', authMiddleware.validateTokenMiddleware, adminController.getAllOrderRequest);
router.put('/accept-order/:orderId', celebrate(AcceptOrder), authMiddleware.validateTokenMiddleware, adminController.acceptOrderRequest);
router.put('/reschedule-order/:orderId', celebrate(RescheduleOrder), authMiddleware.validateTokenMiddleware, adminController.rescheduleOrderDate);
router.delete('/cancel-order/:orderId', authMiddleware.validateTokenMiddleware, adminController.cancelOrder);
router.get('/apply-filters', authMiddleware.validateTokenMiddleware, adminController.filters);
router.put('/refund-amount/:orderId', celebrate(RefundAmount), authMiddleware.validateTokenMiddleware, adminController.refundAmount);
router.get('/product-ratings/:orderId', authMiddleware.validateTokenMiddleware, adminController.getProductRatings);

export = router;