import { Joi } from 'celebrate';

const params: object = {
    id: Joi.number()
        .integer()
        .required()
        .description('Id of User')
};

export const ContactUserSchema = {
    getContactId: {
        params: params
    },
    addContact: {
        body: Joi.object({
            name: Joi.string()
                .required()
                .example('Rushikesh')
                .description('Name of Contact User'),
            email: Joi.string()
                .required()
                .email()
                .example('abc@gmail.com')
                .description('Email Id of Contact User'),
            phoneNumber: Joi.number()
                .integer()
                .required()
                .example(1234567890)
                .description('Mobile number of contact user'),
            message: Joi.string()
                .required()
                .example('Hello! This is my first api')
                .description('Message of contact user'),
        })
    }
}