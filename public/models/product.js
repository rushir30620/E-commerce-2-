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
exports.ProductModelAttributes = exports.Product = void 0;
var sequelize_1 = require("sequelize");
var Product = /** @class */ (function (_super) {
    __extends(Product, _super);
    function Product() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Product;
}(sequelize_1.Model));
exports.Product = Product;
;
exports.ProductModelAttributes = {
    id: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: sequelize_1.DataTypes.STRING
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
    },
    image: {
        type: sequelize_1.DataTypes.STRING
    },
    size: {
        type: sequelize_1.DataTypes.STRING
    },
    color: {
        type: sequelize_1.DataTypes.STRING
    },
    price: {
        type: sequelize_1.DataTypes.INTEGER
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
