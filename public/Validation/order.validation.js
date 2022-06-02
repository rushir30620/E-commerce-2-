"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderSchema = void 0;
var celebrate_1 = require("celebrate");
var params = {
    orderId: celebrate_1.Joi.string()
        .required()
        .description('Id of User')
};
exports.OrderSchema = {
    getOrderId: {
        params: params
    },
    order: {
        body: celebrate_1.Joi.object({
            quantity: celebrate_1.Joi.number()
                .integer()
                .required()
                .example(1)
                .description('Quantity of the product'),
            comment: celebrate_1.Joi.string()
                .example('This is new service')
                .description('comment of this service'),
            OrderAddress: celebrate_1.Joi.object()
                .required(),
        })
    },
    userAddress: {
        body: celebrate_1.Joi.object({
            addressLine1: celebrate_1.Joi.string()
                .required()
                .example('Luhar street, mochi bazar, dhrol')
                .description('Addressline 1'),
            addressLine2: celebrate_1.Joi.string()
                .example('380')
                .description('Addressline 2'),
            city: celebrate_1.Joi.string()
                .required()
                .example('dhrol')
                .description('City'),
            state: celebrate_1.Joi.string()
                .example('Gujarat')
                .description('State'),
            IsDeleted: celebrate_1.Joi.boolean()
                .required()
                .example('true'),
            postalCode: celebrate_1.Joi.string()
                .required()
                .example('361210'),
            mobile: celebrate_1.Joi.string()
                .required()
                .length(10)
                .example('9512617297')
                .description('Mobile number')
        })
    },
};
//# sourceMappingURL=order.validation.js.map