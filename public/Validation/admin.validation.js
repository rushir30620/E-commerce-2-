"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminSchema = void 0;
var celebrate_1 = require("celebrate");
var header = {
    authorization: celebrate_1.Joi.string()
        .required()
};
exports.AdminSchema = {
    AcceptOrder: {
        body: celebrate_1.Joi.object({
            orderDeliveryDate: celebrate_1.Joi.string()
                .required()
                .example('24-03-2022')
                .description('Delivery date'),
            orderDeliveryTime: celebrate_1.Joi.string()
                .required()
                .example("14:00:00")
                .description('time')
        })
    },
    RescheduleOrder: {
        body: celebrate_1.Joi.object({
            orderDeliveryDate: celebrate_1.Joi.string()
                .required()
                .example('24-03-2022')
                .description('Delivery date'),
            orderDeliveryTime: celebrate_1.Joi.string()
                .required()
                .example("14:00:00")
                .description('time'),
            reason: celebrate_1.Joi.string()
                .example('shortage of the workers or workers not available')
                .description('Reschedule order reason')
        })
    },
    RefundAmount: {
        body: celebrate_1.Joi.object({
            Amount: celebrate_1.Joi.number()
                .required()
                .example(36)
                .description('Amount'),
            Mode: celebrate_1.Joi.string()
                .required()
                .example('Fixed')
                .description('Select Mode'),
            comment: celebrate_1.Joi.string()
                .example('Amount refunded')
                .description('Comments')
        })
    },
};
//# sourceMappingURL=admin.validation.js.map