'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.renameTable('users', 'Users');
    queryInterface.renameTable('comments', 'Comments');
    queryInterface.renameTable('posts', 'Posts');
  },

  async down (queryInterface, Sequelize) {
    queryInterface.renameTable('Users', 'users');
    queryInterface.renameTable('Comments', 'comments');
    queryInterface.renameTable('Posts', 'posts');
  }
};
