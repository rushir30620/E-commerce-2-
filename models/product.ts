import { Model, DataTypes, ModelAttributes } from "sequelize";

export class Product extends Model {
    product_Id!: number;

    title?: string;

    description?: string;

    image?: string;

    //   categories?: Ar;

    size?: string;

    color?: string;

    price?: number;

    createdAt!: Date;

    updatedAt!: Date;
};

export const ProductModelAttributes: ModelAttributes = {
    product_Id: {
        // autoIncrement: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING,
    },
    image: {
        type: DataTypes.STRING
    },
    size: {
        type: DataTypes.STRING
    },
    color: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.INTEGER
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
    }
}










































// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Product extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   Product.init({
//     title: DataTypes.STRING,
//     desc: DataTypes.STRING,
//     img: DataTypes.STRING,
//     categories: DataTypes.ARRAY,
//     size: DataTypes.STRING,
//     color: DataTypes.STRING,
//     price: DataTypes.INTEGER
//   }, {
//     sequelize,
//     modelName: 'Product',
//   });
//   return Product;
// };