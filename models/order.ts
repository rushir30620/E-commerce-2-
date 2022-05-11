import { Model, DataTypes, ModelAttributes } from "sequelize/types";

export class Cart extends Model {

    order_Id!: number;
    user_Id!: number;
    product_Id!: number;
    quantity!: number;
    amount!: number;
    status!: string;
    orderAcceptedDate!: Date;
    refundedAmount!: number;

}

export const CartAttributes: ModelAttributes = {
    order_Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    quantity: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    amount: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    orderAcceptedDate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    refundedAmount: {
        type: DataTypes.DECIMAL,
        allowNull: true
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE
    },
    updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
    }
}



























// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Order extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   Order.init({
//     user_Id: DataTypes.NUMBER,
//     product_Id: DataTypes.NUMBER,
//     quantity: DataTypes.NUMBER,
//     amount: DataTypes.DECIMAL,
//     status: DataTypes.STRING,
//     orderAcceptedDate: DataTypes.DATE,
//     refundedAmount: DataTypes.DECIMAL
//   }, {
//     sequelize,
//     modelName: 'Order',
//   });
//   return Order;
// };