'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Order', {
      order_Id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      user_Id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'User',
          key: 'id',
          as: 'user_Id'
        }
      },
      product_Id: {
        type: Sequelize.UUID,
        references: {
          model: 'Product',
          key: 'product_Id',
          as: 'product_Id'
        },
        allowNull: false
      },
      products: {
        type: Sequelize.STRING
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      amount: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false
      },
      orderDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      orderAcceptedDate: {
        type: Sequelize.DATE
      },
      orderDeliveryDate: {
        type: Sequelize.DATE
      },
      paymentStatus: {
        type: Sequelize.STRING
      },
      refundedAmount: {
        type: Sequelize.DECIMAL
      },
      comment: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Order');
  }
};