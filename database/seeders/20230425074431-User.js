'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert(
    'users',
    [
      {
        email: 'john.doe@example.com',
        password: 'P@ssw0rd',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'jane.doe@example.com',
        password: 'P@ssw0rD',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'sam.pope@example.com',
        password: 'p@ssw0rd',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'jimmy.shanon@example.com',
        password: 'p@ssw0rD',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'michell.starr@example.com',
        password: 'Passw0rd',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]
   );
  },

  async down (queryInterface, Sequelize) {
    queryInterface.bulkDelete('users', null, {});
  }
};
