"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var contact_route_1 = __importDefault(require("./contact.route"));
var user_routes_1 = __importDefault(require("./user.routes"));
var product_routes_1 = __importDefault(require("./product.routes"));
var cart_routes_1 = __importDefault(require("./cart.routes"));
var order_routes_1 = __importDefault(require("./order.routes"));
// import paymentRouter from "./payment.routes";
var customer_routes_1 = __importDefault(require("./customer.routes"));
var admin_routes_1 = __importDefault(require("./admin.routes"));
var app = (0, express_1.default)();
app.use('/', contact_route_1.default);
app.use('/', user_routes_1.default);
app.use('/', product_routes_1.default);
app.use('/', cart_routes_1.default);
app.use('/', order_routes_1.default);
// app.use('/', paymentRouter);
app.use('/', customer_routes_1.default);
app.use('/admin', admin_routes_1.default);
module.exports = app;
//# sourceMappingURL=index.routes.js.map