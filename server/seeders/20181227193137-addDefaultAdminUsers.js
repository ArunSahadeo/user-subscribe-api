'use strict';

require('dotenv').config({ path: __dirname + '/../.env' });
const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

      return queryInterface.bulkInsert('admins', [
        {
            username: 'admin',
            email: process.env.ADMIN_1_EMAIL,
            password: bcrypt.hashSync(process.env.ADMIN_1_PASSWORD, 10)
        },
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */

    return queryInterface.bulkDelete('admins', null, {});
  }
};
