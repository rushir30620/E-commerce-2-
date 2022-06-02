"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSchema = void 0;
var celebrate_1 = require("celebrate");
var params = {
    prodId: celebrate_1.Joi.string()
        .required()
        .description('Id of User')
};
exports.ProductSchema = {
    getProductId: {
        params: params
    },
    addProduct: {
        body: celebrate_1.Joi.object({
            title: celebrate_1.Joi.string()
                .required()
                .example('Puma T-Shirt')
                .description('Product Title'),
            description: celebrate_1.Joi.string()
                .required()
                .example('Best in market')
                .description('Description of the product'),
            image: celebrate_1.Joi.string()
                .example('Cobra.png')
                .description('Product Image'),
            size: celebrate_1.Joi.string()
                .required()
                .example('M')
                .description('Size of the product'),
            color: celebrate_1.Joi.string()
                .required()
                .example('Red')
                .description('Color of the product'),
            price: celebrate_1.Joi.number()
                .integer()
                .required()
                .example(200)
                .description('Price of the product')
        })
    },
};
//# sourceMappingURL=product.validation.js.map