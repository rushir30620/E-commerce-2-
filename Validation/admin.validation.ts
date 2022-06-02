import { Joi } from "celebrate"

const header: Object = {
    authorization: Joi.string()
                .required()
};

export const AdminSchema = {

    AcceptOrder: {
        body: Joi.object({
            orderDeliveryDate: Joi.string()
                    .required()
                    .example('24-03-2022')
                    .description('Delivery date'),
            orderDeliveryTime: Joi.string()
                    .required()
                    .example("14:00:00")
                    .description('time')
        })
    },

    RescheduleOrder: {
        body: Joi.object({
            orderDeliveryDate: Joi.string()
                    .required()
                    .example('24-03-2022')
                    .description('Delivery date'),
            orderDeliveryTime: Joi.string()
                    .required()
                    .example("14:00:00")
                    .description('time'),
            reason: Joi.string()
                    .example('shortage of the workers or workers not available')
                    .description('Reschedule order reason')
        })
    },

    RefundAmount: {
        body: Joi.object({
            Amount: Joi.number()
                    .required()
                    .example(36)
                    .description('Amount'),
            Mode: Joi.string()
                    .required()
                    .example('Fixed')
                    .description('Select Mode'),
            comment: Joi.string()
                    .example('Amount refunded')
                    .description('Comments')
        })
    },


}