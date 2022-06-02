import { Joi } from 'celebrate';

const params: object = {
    cartId: Joi.string()
        .required()
        .description('Id of User')
};

export const CartSchema = {
    get: {
        params: params
    },
    addCart: {
        body: Joi.object({
            quantity: Joi.number()
                .integer()
                .required()
                .example(1)
                .description('Quantity of the product'),
        })
    }
}