"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModelAttributes = exports.User = void 0;
var sequelize_1 = require("sequelize");
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return User;
}(sequelize_1.Model));
exports.User = User;
;
exports.UserModelAttributes = {
    id: {
        // autoIncrement: true,
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        unique: true
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        unique: true
    },
    mobile: {
        type: sequelize_1.DataTypes.STRING,
        unique: true
    },
    userTypeId: {
        type: sequelize_1.DataTypes.INTEGER
    },
    gender: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    dateOfBirth: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    isRegisteredUser: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false
    },
    zipCode: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    }
};
// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Customer extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   Customer.init({
//     firstName: DataTypes.STRING,
//     lastName: DataTypes.STRING,
//     email: DataTypes.STRING,
//     password: DataTypes.STRING,
//     mobile: DataTypes.STRING,
//     userTypeId: DataTypes.NUMBER,
//     gender: DataTypes.STRING,
//     dateOfBirth: DataTypes.DATE,
//     isRegisteredUser: DataTypes.BOOLEAN,
//     zipCode: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'Customer',
//   });
//   return Customer;
// };
//# sourceMappingURL=user.js.map