'use strict';

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

      return queryInterface.bulkInsert('users', [
        {
            first_name: 'John',
            last_name: 'Doe',
            email: 'johndoe@example.com',
            opt_in: true
        },

        {
            first_name: 'John',
            last_name: 'Smith',
            email: 'johnsmith@example.com',
            opt_in: false
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
      
    return queryInterface.bulkDelete('users', null, {});
  }
};
