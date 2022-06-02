import { Joi } from 'celebrate';

const params: object = {
        prodId: Joi.string()
                .required()
                .description('Id of User')
};

export const ProductSchema = {
        getProductId: {
                params: params
        },
        addProduct: {
                body: Joi.object({
                        title: Joi.string()
                                .required()
                                .example('Puma T-Shirt')
                                .description('Product Title'),
                        description: Joi.string()
                                .required()
                                .example('Best in market')
                                .description('Description of the product'),
                        image: Joi.string()
                                .example('Cobra.png')
                                .description('Product Image'),
                        size: Joi.string()
                                .required()
                                .example('M')
                                .description('Size of the product'),
                        color: Joi.string()
                                .required()
                                .example('Red')
                                .description('Color of the product'),
                        price: Joi.number()
                                .integer()
                                .required()
                                .example(200)
                                .description('Price of the product')
                })
        },
}