"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactUserSchema = void 0;
var celebrate_1 = require("celebrate");
var params = {
    id: celebrate_1.Joi.number()
        .integer()
        .required()
        .description('Id of User')
};
exports.ContactUserSchema = {
    getContactId: {
        params: params
    },
    addContact: {
        body: celebrate_1.Joi.object({
            name: celebrate_1.Joi.string()
                .required()
                .example('Rushikesh')
                .description('Name of Contact User'),
            email: celebrate_1.Joi.string()
                .required()
                .email()
                .example('abc@gmail.com')
                .description('Email Id of Contact User'),
            phoneNumber: celebrate_1.Joi.number()
                .integer()
                .required()
                .example(1234567890)
                .description('Mobile number of contact user'),
            message: celebrate_1.Joi.string()
                .required()
                .example('Hello! This is my first api')
                .description('Message of contact user'),
        })
    }
};
//# sourceMappingURL=contact.validation.js.map