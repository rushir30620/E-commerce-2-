import express from "express";
import { celebrate } from "celebrate";
import { UserLoginService } from "../services/user.service";
import { UserController } from "../controller/user.login";
import { UserSchema } from "../Validation/user.validation";

const { add, addLogin } = UserSchema;

const router: express.Router = express.Router();

const userService: UserLoginService = new UserLoginService();
const userController: UserController = new UserController(userService);

router.post('/signup', celebrate(add), userController.createUser);
router.get('/verify/user/:token', userController.verifyEmail);
router.post('/login', celebrate(addLogin), userController.loginUser);
router.delete('/logout', userController.deleteToken);

export = router;