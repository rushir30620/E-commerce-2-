import express from "express";
import { IndexController } from "../controller";
import { IndexService } from "../services/index.service";
import { AuthMiddleware } from "../middleware/auth";

const router: express.Router = express.Router();

const indexController: IndexController = new IndexController();
const paymentController = indexController.PaymentController;

const indexService: IndexService = new IndexService();
const authMiddleware: AuthMiddleware = new AuthMiddleware(indexService.UserLoginService);

router.get('/checkout/:orderId', authMiddleware.validateTokenMiddleware, paymentController.makePayment);
router.get('/paymentDone', paymentController.paymentSuccess);
router.get('/cancel', paymentController.makePayment);

export = router;