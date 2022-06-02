import { Joi } from 'celebrate';

const params: object = {
    orderId: Joi.string()
        .required()
        .description('Id of User')
};

export const CustomerSchema = {
    getId: {
        params: params
    },

    UpdateUserDetails: {
        body: Joi.object({
            firstName: Joi.string()
                .required()
                .example('Rushikesh')
                .description('First Name of User'),
            lastName: Joi.string()
                .required()
                .example('Rathod')
                .description('Last Name of User'),
            email: Joi.string()
                .required()
                .email()
                .example('abc@gmail.com')
                .description('Email Id of User'),
            mobile: Joi.string()
                .required()
                .length(10)
                .example('1234567890')
                .description('Mobile number user'),
            zipCode: Joi.string()
                .required()
                .length(6)
                .example('361210')
                .description('User address zipcode'),
        })
    },

    addUserAddress: {
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

    ChangePassword: {
        body: Joi.object({
            oldPassword: Joi.string()
                .required()
                .example('rushi')
                .description('password'),
            newPassword: Joi.string()
                .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
                .required()
                .example('2vdveb')
                .description('password'),
            cpassword: Joi.string()
                .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
                .required()
                .example('2vdveb')
                .description('password')
        })
    },

    Rating: {
        body: Joi.object({
                Comments: Joi.string()
                        .example('very good service provider')
                        .description('comments or feedback'),
                OnTimeArrival: Joi.number()
                        .example('4'),
                QualityOfProduct: Joi.number()
                        .example('5'),
        })
    },
}