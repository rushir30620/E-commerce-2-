"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerSchema = void 0;
var celebrate_1 = require("celebrate");
var params = {
    orderId: celebrate_1.Joi.string()
        .required()
        .description('Id of User')
};
exports.CustomerSchema = {
    getId: {
        params: params
    },
    UpdateUserDetails: {
        body: celebrate_1.Joi.object({
            firstName: celebrate_1.Joi.string()
                .required()
                .example('Rushikesh')
                .description('First Name of User'),
            lastName: celebrate_1.Joi.string()
                .required()
                .example('Rathod')
                .description('Last Name of User'),
            email: celebrate_1.Joi.string()
                .required()
                .email()
                .example('abc@gmail.com')
                .description('Email Id of User'),
            mobile: celebrate_1.Joi.string()
                .required()
                .length(10)
                .example('1234567890')
                .description('Mobile number user'),
            zipCode: celebrate_1.Joi.string()
                .required()
                .length(6)
                .example('361210')
                .description('User address zipcode'),
        })
    },
    addUserAddress: {
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
    ChangePassword: {
        body: celebrate_1.Joi.object({
            oldPassword: celebrate_1.Joi.string()
                .required()
                .example('rushi')
                .description('password'),
            newPassword: celebrate_1.Joi.string()
                .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
                .required()
                .example('2vdveb')
                .description('password'),
            cpassword: celebrate_1.Joi.string()
                .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
                .required()
                .example('2vdveb')
                .description('password')
        })
    },
    Rating: {
        body: celebrate_1.Joi.object({
            Comments: celebrate_1.Joi.string()
                .example('very good service provider')
                .description('comments or feedback'),
            OnTimeArrival: celebrate_1.Joi.number()
                .example('4'),
            QualityOfProduct: celebrate_1.Joi.number()
                .example('5'),
        })
    },
};
//# sourceMappingURL=customer.validation.js.map