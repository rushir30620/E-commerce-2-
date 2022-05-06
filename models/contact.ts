import { Model, DataTypes, ModelAttributes } from "sequelize";

export class Contact extends Model {
  id!: number;

  name?: string;

  email?: string;

  phoneNumber?: number;

  message?: string;

  createdAt!: Date;

  updatedAt!: Date;
};

export const ContactModelAttributes: ModelAttributes = {
  id: {
    autoIncrement: true,
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING,
    unique: true
  },
  phoneNumber: {
    type: DataTypes.BIGINT
  },
  message: {
    type: DataTypes.STRING
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
//   class contact extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   contact.init({
//     name: DataTypes.STRING,
//     email: DataTypes.STRING,
//     phoneNumber: DataTypes.INTEGER,
//     message: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'contact',
//   });
//   return contact;
// };