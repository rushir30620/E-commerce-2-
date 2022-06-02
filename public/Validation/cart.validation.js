"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartSchema = void 0;
var celebrate_1 = require("celebrate");
var params = {
    cartId: celebrate_1.Joi.string()
        .required()
        .description('Id of User')
};
exports.CartSchema = {
    get: {
        params: params
    },
    addCart: {
        body: celebrate_1.Joi.object({
            quantity: celebrate_1.Joi.number()
                .integer()
                .required()
                .example(1)
                .description('Quantity of the product'),
        })
    }
};
//# sourceMappingURL=cart.validation.js.map