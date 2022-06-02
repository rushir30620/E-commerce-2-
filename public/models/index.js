"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.sequelize = exports.Sequelize = void 0;
var sequelize_1 = require("sequelize");
Object.defineProperty(exports, "Sequelize", { enumerable: true, get: function () { return sequelize_1.Sequelize; } });
var contact_1 = require("./contact");
var user_1 = require("./user");
var product_1 = require("./product");
var cart_1 = require("./cart");
var order_1 = require("./order");
var orderaddress_1 = require("./orderaddress");
var useraddress_1 = require("./useraddress");
var rating_1 = require("./rating");
var env = process.env.NODE_ENV || 'development';
var config = require('../config/config')[env];
var sequelize = config.url
    ? new sequelize_1.Sequelize(config.url, config)
    : new sequelize_1.Sequelize(config.database, config.username, config.password, config);
exports.sequelize = sequelize;
//Define Models
var ContactDefineModel = sequelize.define('Contact', __assign({}, contact_1.ContactModelAttributes), {
    tableName: 'Contact'
});
var UserDefineModel = sequelize.define('User', __assign({}, user_1.UserModelAttributes), {
    tableName: 'User'
});
var ProductDefineModel = sequelize.define('Product', __assign({}, product_1.ProductModelAttributes), {
    tableName: 'Product'
});
var CartDefineModel = sequelize.define('Cart', __assign({}, cart_1.CartAttributes), {
    tableName: 'Cart'
});
var OrderDefineModel = sequelize.define('Order', __assign({}, order_1.OrderAttributes), {
    tableName: 'Order'
});
var OrderAddressDefineModel = sequelize.define('OrderAddress', __assign({}, orderaddress_1.OrderAddressAttributes), {
    tableName: 'OrderAddress'
});
var UserAddressDefineModel = sequelize.define('UserAddress', __assign({}, useraddress_1.UserAddressAttributes), {
    tableName: 'UserAddress'
});
var RatingDefineModel = sequelize.define('Rating', __assign({}, rating_1.RatingAttributes), {
    tableName: 'Rating'
});
exports.db = {
    sequelize: sequelize,
    Contact: ContactDefineModel,
    User: UserDefineModel,
    Product: ProductDefineModel,
    Cart: CartDefineModel,
    Order: OrderDefineModel,
    OrderAddress: OrderAddressDefineModel,
    UserAddress: UserAddressDefineModel,
    Rating: RatingDefineModel,
};
// User and cart associations
exports.db.User.hasMany(exports.db.Cart, {
    foreignKey: {
        name: "user_Id",
        allowNull: false,
    },
    as: "UserCart",
    constraints: true,
    onDelete: "CASCADE",
});
exports.db.Cart.belongsTo(exports.db.User, {
    foreignKey: {
        name: "user_Id",
        allowNull: false,
    },
    as: "UserCart",
    constraints: true,
    onDelete: "CASCADE",
});
// product and cart associations
exports.db.Cart.hasMany(exports.db.Product, {
    foreignKey: {
        name: "product_Id",
        allowNull: true,
    },
    as: "CartProduct",
    constraints: true,
    onDelete: "CASCADE",
});
exports.db.Product.belongsTo(exports.db.Cart, {
    foreignKey: {
        name: "product_Id",
        allowNull: true,
    },
    as: "CartProduct",
    constraints: true,
    onDelete: "CASCADE",
});
// order and orderaddress associations
exports.db.Order.hasOne(exports.db.OrderAddress, {
    foreignKey: {
        name: "order_Id",
        allowNull: false,
    },
    constraints: true,
    onDelete: "CASCADE",
});
exports.db.OrderAddress.belongsTo(exports.db.Order, {
    foreignKey: {
        name: "order_Id",
        allowNull: false,
    },
    constraints: true,
    onDelete: "CASCADE",
});
// order and user associations
exports.db.User.hasMany(exports.db.Order, {
    foreignKey: {
        name: "user_Id",
        allowNull: true,
    },
    as: "UserOrder",
    constraints: true,
    onDelete: "CASCADE",
});
exports.db.Order.belongsTo(exports.db.User, {
    foreignKey: {
        name: "user_Id",
        allowNull: true,
    },
    as: "UserOrder",
    constraints: true,
    onDelete: "CASCADE",
});
// product and order associations
exports.db.Order.hasMany(exports.db.Product, {
    foreignKey: {
        name: "product_Id",
        allowNull: true,
    },
    as: "OrderProduct",
    constraints: true,
    onDelete: "CASCADE",
});
exports.db.Product.belongsTo(exports.db.Order, {
    foreignKey: {
        name: "product_Id",
        allowNull: true,
    },
    as: "OrderProduct",
    constraints: true,
    onDelete: "CASCADE",
});
// user and userAddress associations
exports.db.User.hasMany(exports.db.UserAddress, {
    foreignKey: {
        name: "user_Id",
        allowNull: true,
    },
    as: "UserAddress",
    constraints: true,
    onDelete: "CASCADE",
});
exports.db.UserAddress.belongsTo(exports.db.User, {
    foreignKey: {
        name: "user_Id",
        allowNull: true,
    },
    as: "UserAddress",
    constraints: true,
    onDelete: "CASCADE",
});
exports.db.User.hasMany(exports.db.Rating, {
    foreignKey: {
        name: "RatingFrom",
        allowNull: false
    },
    as: "RatingFrom",
    constraints: true,
    onDelete: "CASCADE"
});
exports.db.Product.hasMany(exports.db.Rating, {
    foreignKey: {
        name: "RatingTo",
        allowNull: false
    },
    as: "RatingTo",
    constraints: true,
    onDelete: "CASCADE"
});
exports.db.Order.hasMany(exports.db.Rating, {
    foreignKey: {
        name: "order_Id",
        allowNull: false
    },
    as: "orderRating",
    constraints: true,
    onDelete: "CASCADE"
});
exports.db.Rating.belongsTo(exports.db.Order, {
    foreignKey: {
        name: "order_Id",
        allowNull: false
    },
    as: "orderRating",
    constraints: true,
    onDelete: "CASCADE"
});
exports.default = exports.db;
// 'use strict';
// const fs = require('fs');
// const path = require('path');
// const Sequelize = require('sequelize');
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config.json')[env];
// const db = {};
// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }
// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });
// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });
// db.sequelize = sequelize;
// db.Sequelize = Sequelize;
// module.exports = db;
//# sourceMappingURL=index.js.map