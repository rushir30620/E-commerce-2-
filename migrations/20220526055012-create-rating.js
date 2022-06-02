'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Rating', {
      RatingId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      order_Id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Order',
          key: 'order_Id',
          as: 'order_Id'
        }
      },
      RatingFrom: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'User',
          key: 'id',
          as: 'RatingFrom'
        }
      },
      RatingTo: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Product',
          key: 'product_Id',
          as: 'RatingTo'
        }
      },
      Ratings: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      Comments: {
        allowNull: true,
        type: Sequelize.STRING
      },
      RatingDate: {
        allowNull: true,
        type: Sequelize.DATE
      },
      OnTimeArrival: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      QualityOfProduct: {
        allowNull: false,
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Rating');
  }
};