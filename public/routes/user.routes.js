"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var celebrate_1 = require("celebrate");
var controller_1 = require("../controller");
var user_validation_1 = require("../Validation/user.validation");
var add = user_validation_1.UserSchema.add, addLogin = user_validation_1.UserSchema.addLogin, addForgotPass = user_validation_1.UserSchema.addForgotPass, addNewPassword = user_validation_1.UserSchema.addNewPassword;
var router = express_1.default.Router();
var indexController = new controller_1.IndexController();
var userController = indexController.UserController;
router.post('/signup', (0, celebrate_1.celebrate)(add), userController.createUser);
router.get('/verify/user/:token', userController.verifyEmail);
router.post('/login', (0, celebrate_1.celebrate)(addLogin), userController.loginUser);
router.delete('/logout', userController.deleteToken);
router.post('/forgotPassword', (0, celebrate_1.celebrate)(addForgotPass), userController.forgotPassword);
router.post('/reset-Password', (0, celebrate_1.celebrate)(addNewPassword), userController.resetPassword);
module.exports = router;
//# sourceMappingURL=user.routes.js.map