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
exports.UserAddressAttributes = exports.UserAddress = void 0;
var sequelize_1 = require("sequelize");
var UserAddress = /** @class */ (function (_super) {
    __extends(UserAddress, _super);
    function UserAddress() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UserAddress;
}(sequelize_1.Model));
exports.UserAddress = UserAddress;
exports.UserAddressAttributes = {
    user_address_Id: {
        allowNull: false,
        primaryKey: true,
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
    },
    user_Id: {
        references: {
            model: "User",
            key: "id"
        },
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    },
    addressLine1: {
        type: sequelize_1.DataTypes.STRING
    },
    addressLine2: {
        type: sequelize_1.DataTypes.STRING
    },
    city: {
        type: sequelize_1.DataTypes.STRING
    },
    state: {
        type: sequelize_1.DataTypes.STRING
    },
    postalCode: {
        type: sequelize_1.DataTypes.STRING
    },
    IsDeleted: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    mobile: {
        type: sequelize_1.DataTypes.STRING
    },
    email: {
        type: sequelize_1.DataTypes.STRING
    }
};
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
//# sourceMappingURL=useraddress.js.map