import { Joi } from "celebrate"

const params: object = {
    orderId: Joi.string()
        .required()
        .description('Id of User')
};


export const OrderSchema = {
    getOrderId : {
        params : params
    },

    order: {
        body: Joi.object({
            quantity: Joi.number()
                .integer()
                .required()
                .example(1)
                .description('Quantity of the product'),
            comment: Joi.string()
                .example('This is new service')
                .description('comment of this service'),
            OrderAddress: Joi.object()
                .required(),
        })
    },

    userAddress: {
        body: Joi.object({
            addressLine1: Joi.string()
                .required()
                .example('Luhar street, mochi bazar, dhrol')
                .description('Addressline 1'),
            addressLine2: Joi.string()
                .example('380')
                .description('Addressline 2'),
            city: Joi.string()
                .required()
                .example('dhrol')
                .description('City'),
            state: Joi.string()
                .example('Gujarat')
                .description('State'),
            IsDeleted: Joi.boolean()
                .required()
                .example('true'),
            postalCode: Joi.string()
                .required()
                .example('361210'),
            mobile: Joi.string()
                .required()
                .length(10)
                .example('9512617297')
                .description('Mobile number')

        })
    },

}

