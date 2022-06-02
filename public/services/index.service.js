"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexService = void 0;
var contact_service_1 = require("./contact.service");
var user_service_1 = require("./user.service");
var product_service_1 = require("./product.service");
var cart_service_1 = require("./cart.service");
var order_service_1 = require("./order.service");
var payment_service_1 = require("./payment.service");
var customer_service_1 = require("./customer.service");
var admin_service_1 = require("./admin.service");
var IndexService = /** @class */ (function () {
    function IndexService() {
        this.ContactUserService = new contact_service_1.ContactUserService();
        this.UserLoginService = new user_service_1.UserLoginService();
        this.ProductService = new product_service_1.ProductService();
        this.CartService = new cart_service_1.CartService();
        this.OrderService = new order_service_1.OrderService();
        this.PaymentService = new payment_service_1.PaymentService();
        this.CustomerService = new customer_service_1.CustomerService();
        this.AdminService = new admin_service_1.AdminService();
    }
    return IndexService;
}());
exports.IndexService = IndexService;
//# sourceMappingURL=index.service.js.map