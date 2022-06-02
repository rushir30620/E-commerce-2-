import { Model, DataTypes, ModelAttributes, ArrayDataType } from "sequelize";

export class Order extends Model {

    order_Id!: number;
    user_Id!: number;
    product_Id!: number;
    products!: Array<String>;
    quantity!: number;
    amount!: number;
    status!: string;
    orderDate!: Date;
    orderAcceptedDate!: Date;
    paymentStatus!: string;
    refundedAmount!: number;
    comment!: string;

}

export const OrderAttributes: ModelAttributes = {
    order_Id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
    },
    user_Id: {
        references: {
            model: "User",
            key: "id"
        },
        type: DataTypes.UUID
    },
    product_Id: {
        references: {
            model: 'Product',
            key: 'product_Id'
        },
        type: DataTypes.UUID
    },
    products: {
        type: DataTypes.ARRAY(DataTypes.STRING)
    },
    quantity: {
        type: DataTypes.INTEGER,
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
    orderDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    orderAcceptedDate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    orderDeliveryDate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    paymentStatus: {
        type: DataTypes.STRING
    },
    refundedAmount: {
        type: DataTypes.DECIMAL,
        allowNull: true
    },
    comment: {
        type: DataTypes.STRING
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