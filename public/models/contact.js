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
exports.ContactModelAttributes = exports.Contact = void 0;
var sequelize_1 = require("sequelize");
var Contact = /** @class */ (function (_super) {
    __extends(Contact, _super);
    function Contact() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Contact;
}(sequelize_1.Model));
exports.Contact = Contact;
;
exports.ContactModelAttributes = {
    id: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        unique: true
    },
    phoneNumber: {
        type: sequelize_1.DataTypes.BIGINT
    },
    message: {
        type: sequelize_1.DataTypes.STRING
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
