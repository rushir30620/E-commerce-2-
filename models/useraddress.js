'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserAddress extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserAddress.init({
    user_Id: DataTypes.NUMBER,
    addressLine1: DataTypes.STRING,
    addressLine2: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    postalCode: DataTypes.STRING,
    IsDeleted: DataTypes.BOOLEAN,
    mobile: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserAddress',
  });
  return UserAddress;
};