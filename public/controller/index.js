"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexController = void 0;
var contact_1 = require("./contact");
var user_login_1 = require("./user.login");
var product_1 = require("./product");
var cart_1 = require("./cart");
var order_1 = require("./order");
var payment_1 = require("./payment");
var customer_1 = require("./customer");
var admin_1 = require("./admin");
var index_service_1 = require("../services/index.service");
var IndexController = /** @class */ (function () {
    function IndexController() {
        this.service = new index_service_1.IndexService();
        this.ContactUserController = new contact_1.ContactUserController(this.service.ContactUserService);
        this.UserController = new user_login_1.UserController(this.service.UserLoginService);
        this.ProductController = new product_1.ProductController(this.service.ProductService);
        this.CartController = new cart_1.CartController(this.service.CartService);
        this.OrderController = new order_1.OrderController(this.service.OrderService);
        this.PaymentController = new payment_1.PaymentController(this.service.PaymentService);
        this.CustomerController = new customer_1.CustomerController(this.service.CustomerService);
        this.AdminController = new admin_1.AdminController(this.service.AdminService);
    }
    return IndexController;
}());
exports.IndexController = IndexController;
//# sourceMappingURL=index.js.map