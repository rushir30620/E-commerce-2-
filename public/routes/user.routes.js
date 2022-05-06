"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var celebrate_1 = require("celebrate");
var user_service_1 = require("../services/user.service");
var user_login_1 = require("../controller/user.login");
var user_validation_1 = require("../Validation/user.validation");
var add = user_validation_1.UserSchema.add, addLogin = user_validation_1.UserSchema.addLogin;
var router = express_1.default.Router();
var userService = new user_service_1.UserLoginService();
var userController = new user_login_1.UserController(userService);
router.post('/signup', (0, celebrate_1.celebrate)(add), userController.createUser);
router.get('/verify/user/:token', userController.verifyEmail);
router.post('/login', (0, celebrate_1.celebrate)(addLogin), userController.loginUser);
router.delete('/logout', userController.deleteToken);
module.exports = router;
