import { Model, DataTypes, ModelAttributes } from "sequelize";

export class OrderAddress extends Model {

    order_address_Id!: number;
    order_Id!: number;
    addressLine1!: string;
    addressLine2!: string;
    city!: string;
    state!: string;
    postalCode!: string;
    mobile!: string;
    email!: string;

}

export const OrderAddressAttributes: ModelAttributes = {

    order_address_Id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
    },
    order_Id: {
        references: {
            model: "Order",
            key: "order_Id"
        },
        type: DataTypes.UUID,
        allowNull: false
    },
    addressLine1: {
        type: DataTypes.STRING
    },
    addressLine2: {
        type: DataTypes.STRING
    },
    city: {
        type: DataTypes.STRING
    },
    state: {
        type: DataTypes.STRING
    },
    postalCode: {
        type: DataTypes.STRING
    },
    mobile: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    }

}


// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class OrderAddress extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   OrderAddress.init({
//     order_Id: DataTypes.NUMBER,
//     addressLine1: DataTypes.STRING,
//     addressLine2: DataTypes.STRING,
//     city: DataTypes.STRING,
//     state: DataTypes.STRING,
//     postalCode: DataTypes.STRING,
//     mobile: DataTypes.STRING,
//     email: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'OrderAddress',
//   });
//   return OrderAddress;
// };