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
exports.CartAttributes = exports.Cart = void 0;
var sequelize_1 = require("sequelize");
var Cart = /** @class */ (function (_super) {
    __extends(Cart, _super);
    function Cart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Cart;
}(sequelize_1.Model));
exports.Cart = Cart;
exports.CartAttributes = {
    cart_Id: {
        allowNull: false,
        // autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
    },
    user_Id: {
        references: {
            model: 'User',
            key: 'id'
        },
        type: sequelize_1.DataTypes.UUID,
    },
    userName: {
        type: sequelize_1.DataTypes.STRING
    },
    product_Id: {
        references: {
            model: 'Product',
            key: 'product_Id'
        },
        type: sequelize_1.DataTypes.UUID,
    },
    quantity: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false
    },
    price: {
        type: sequelize_1.DataTypes.INTEGER,
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
//# sourceMappingURL=cart.js.map