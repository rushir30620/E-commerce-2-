'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Product',[{
      title:"Nike Shoes",
      description:"Best in india",
      image:"Nike Shoes image",
      size:"9",
      color:"Black",
      price:3000,
      createdAt: new Date(),
      updatedAt: new Date() 
    }])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Product', null, {});
  }
};
