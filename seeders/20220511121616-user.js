'use strict';

const bcrypt = require("bcryptjs");

module.exports = {
  async up (queryInterface, Sequelize) {
    const hashPassword = bcrypt.hashSync(process.env.SEED_PASS,10);
    return queryInterface.bulkInsert('User',[{
      firstName:"Abhay",
      lastName:"Patel",
      email:"abhaypatel@gmail.com",
      password:hashPassword,
      mobile:"1234567890",
      userTypeId:2,
      zipCode:"361211",
      createdAt: new Date(),
      updatedAt: new Date() 
    }])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('User', null, {});
  }
};
