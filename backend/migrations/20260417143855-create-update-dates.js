"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn("users", 'createdAt', {
      type: Sequelize.DATE,
    });
    await queryInterface.addColumn("users", 'updatedAt', {
      type: Sequelize.DATE,
    });
    await queryInterface.addColumn("categories", 'createdAt', {
      type: Sequelize.DATE,
    });
    await queryInterface.addColumn("categories", 'updatedAt', {
      type: Sequelize.DATE,
    });
    await queryInterface.addColumn("decisions", 'createdAt', {
      type: Sequelize.DATE,
    });
    await queryInterface.addColumn("decisions", 'updatedAt', {
      type: Sequelize.DATE,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
