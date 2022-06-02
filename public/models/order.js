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
exports.OrderAttributes = exports.Order = void 0;
var sequelize_1 = require("sequelize");
var Order = /** @class */ (function (_super) {
    __extends(Order, _super);
    function Order() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Order;
}(sequelize_1.Model));
exports.Order = Order;
exports.OrderAttributes = {
    order_Id: {
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
        type: sequelize_1.DataTypes.UUID
    },
    product_Id: {
        references: {
            model: 'Product',
            key: 'product_Id'
        },
        type: sequelize_1.DataTypes.UUID
    },
    products: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING)
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    amount: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: false
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    orderDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    orderAcceptedDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    orderDeliveryDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    paymentStatus: {
        type: sequelize_1.DataTypes.STRING
    },
    refundedAmount: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: true
    },
    comment: {
        type: sequelize_1.DataTypes.STRING
    },
    createdAt: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE
    },
    updatedAt: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE
    }
};
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
//# sourceMappingURL=order.js.map