import express from "express";
import { celebrate } from "celebrate";
import { IndexController } from "../controller";
import { IndexService } from "../services/index.service";
import { AuthMiddleware } from "../middleware/auth";
import { CartSchema } from "../Validation/cart.validation";

const router: express.Router = express.Router();

const { get, addCart } = CartSchema;

const indexController: IndexController = new IndexController();
const cartController = indexController.CartController;

const indexService: IndexService = new IndexService();
const authMiddleware: AuthMiddleware = new AuthMiddleware(indexService.UserLoginService);

router.post('/add-to-cart/:prodId', celebrate(addCart), authMiddleware.validateTokenMiddleware, cartController.addToCart);
router.get('/all-carts', authMiddleware.validateTokenMiddleware, cartController.getAllCarts);
// router.get('/get-cart/:prodId', celebrate(get), authMiddleware.validateTokenMiddleware, cartController.getCartById);
router.delete('/remove-cart/:cartId', celebrate(get), authMiddleware.validateTokenMiddleware, cartController.removeFromCart);

export = router;