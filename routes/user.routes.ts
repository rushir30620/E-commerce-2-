import express from "express";
import { celebrate } from "celebrate";
import { IndexController } from "../controller";
import { UserSchema } from "../Validation/user.validation";

const { add, addLogin, addForgotPass, addNewPassword } = UserSchema;

const router: express.Router = express.Router();

const indexController: IndexController = new IndexController();
const userController = indexController.UserController; 

router.post('/signup', celebrate(add), userController.createUser);
router.get('/verify/user/:token', userController.verifyEmail);
router.post('/login', celebrate(addLogin), userController.loginUser);
router.delete('/logout', userController.deleteToken);
router.post('/forgotPassword', celebrate(addForgotPass), userController.forgotPassword);
router.post('/reset-Password', celebrate(addNewPassword), userController.resetPassword);

export = router;