import { BuildOptions, Model, Sequelize } from "sequelize";
import { Contact, ContactModelAttributes } from "./contact";
import { User, UserModelAttributes } from "./user";
import { Product, ProductModelAttributes } from "./product";
import { Cart, CartAttributes } from "./cart";

const env = process.env.NODE_ENV || 'development';

const config = require('../config/config')[env];

const sequelize = config.url
    ? new Sequelize(config.url, config)
    : new Sequelize(config.database, config.username, config.password, config);

export { Sequelize, sequelize };

//ModelStatic
type ContactModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): Contact;
};

type UserModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): User;
};

type ProductModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): Product;
};

type CartModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): Cart;
}

//Define Models
const ContactDefineModel = sequelize.define(
  'Contact',
  {
    ...ContactModelAttributes
  },
  {
    tableName: 'Contact'
  }
) as ContactModelStatic;

const UserDefineModel = sequelize.define(
  'User',
  {
    ...UserModelAttributes
  },
  {
    tableName: 'User'
  }
) as UserModelStatic;

const ProductDefineModel = sequelize.define(
  'Product',
  {
    ...ProductModelAttributes
  },
  {
    tableName: 'Product'
  }
) as ProductModelStatic;

const CartDefineModel = sequelize.define(
  'Cart',
  {
    ...CartAttributes
  },
  {
    tableName: 'Cart'
  }
) as CartModelStatic;

//Interfaces
export interface DbContext {
  sequelize: Sequelize;
  Contact: ContactModelStatic;
  User: UserModelStatic;
  Product: ProductModelStatic;
  Cart: CartModelStatic;
}

export const db: DbContext = {
  sequelize: sequelize,
  Contact: ContactDefineModel,
  User: UserDefineModel,
  Product: ProductDefineModel,
  Cart: CartDefineModel,
}

db.User.hasMany(db.Cart, {
  foreignKey: {
    name: "user_Id",
    allowNull: false,
  },
  as: "UserCart",
  constraints: true,
  onDelete: "CASCADE",
});
db.Cart.belongsTo(db.User, {
  foreignKey: {
    name: "user_Id",
    allowNull: false,
  },
  as: "UserCart",
  constraints: true,
  onDelete: "CASCADE",
});

db.Cart.hasMany(db.Product, {
  foreignKey: {
    name: "product_Id",
    allowNull: false,
  },
  as: "CartProduct",
  constraints: true,
  onDelete: "CASCADE",
});
db.Product.belongsTo(db.Cart, {
  foreignKey: {
    name: "product_Id",
    allowNull: false,
  },
  as: "CartProduct",
  constraints: true,
  onDelete: "CASCADE",
});

export default db;






























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
