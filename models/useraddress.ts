import { Model, DataTypes, ModelAttributes } from "sequelize";

export class UserAddress extends Model{

    user_address_Id!: number;
    user_Id!: number;
    addressLine1!: string;
    addressLine2!: string;
    city!: string;
    state!: string;
    postalCode!: string;
    IsDeleted!: boolean;
    mobile!: string;
    email!: string;

}

export const UserAddressAttributes: ModelAttributes = {

    user_address_Id: {
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
    IsDeleted: {
        type: DataTypes.BOOLEAN
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
//   class UserAddress extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   UserAddress.init({
//     user_Id: DataTypes.NUMBER,
//     addressLine1: DataTypes.STRING,
//     addressLine2: DataTypes.STRING,
//     city: DataTypes.STRING,
//     state: DataTypes.STRING,
//     postalCode: DataTypes.STRING,
//     IsDeleted: DataTypes.BOOLEAN,
//     mobile: DataTypes.STRING,
//     email: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'UserAddress',
//   });
//   return UserAddress;
// };