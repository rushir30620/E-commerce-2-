"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexValidation = void 0;
// contact validation //
var contact_validation_1 = require("./contact.validation");
var getContactId = contact_validation_1.ContactUserSchema.getContactId, addContact = contact_validation_1.ContactUserSchema.addContact;
// user validation //
var user_validation_1 = require("./user.validation");
var add = user_validation_1.UserSchema.add, addLogin = user_validation_1.UserSchema.addLogin, addForgotPass = user_validation_1.UserSchema.addForgotPass, addNewPassword = user_validation_1.UserSchema.addNewPassword;
// product validation //
var product_validation_1 = require("./product.validation");
var getProductId = product_validation_1.ProductSchema.getProductId, addProduct = product_validation_1.ProductSchema.addProduct;
// order validation //
var order_validation_1 = require("./order.validation");
var getOrderId = order_validation_1.OrderSchema.getOrderId, order = order_validation_1.OrderSchema.order, userAddress = order_validation_1.OrderSchema.userAddress;
// cart validation //
var cart_validation_1 = require("./cart.validation");
var get = cart_validation_1.CartSchema.get, addCart = cart_validation_1.CartSchema.addCart;
var IndexValidation = /** @class */ (function () {
    function IndexValidation() {
        this.contactValidation = { getContactId: getContactId, addContact: addContact };
        this.userValidation = { add: add, addLogin: addLogin, addForgotPass: addForgotPass, addNewPassword: addNewPassword };
        this.productValidation = { getProductId: getProductId, addProduct: addProduct };
        this.orderValidation = { getOrderId: getOrderId, order: order, userAddress: userAddress };
        this.cartValidation = { get: get, addCart: addCart };
    }
    return IndexValidation;
}());
exports.IndexValidation = IndexValidation;
//# sourceMappingURL=index.validation.js.map