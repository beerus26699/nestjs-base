'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'it_users',
      {
        id: {
          type: Sequelize.DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        email: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        password_hash: {
          type: Sequelize.DataTypes.STRING,
          allowNull: true,
        },
        is_activated: {
          type: Sequelize.DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        activation_token: {
          type: Sequelize.DataTypes.STRING,
          allowNull: true,
        },
        activation_token_expires: {
          type: Sequelize.DataTypes.DATE,
          allowNull: true,
        },
        google_id: {
          type: Sequelize.DataTypes.STRING,
          allowNull: true,
        },
        avatar: {
          type: Sequelize.DataTypes.STRING,
          allowNull: true,
        },
        full_name: {
          type: Sequelize.DataTypes.STRING,
          allowNull: true,
        },
        role: {
          type: Sequelize.DataTypes.ENUM('admin', 'user'),
          allowNull: false,
          defaultValue: 'user',
        },
        created_at: {
          type: Sequelize.DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.DataTypes.NOW,
        },
        updated_at: {
          type: Sequelize.DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.DataTypes.NOW,
        },
        deleted_at: {
          type: Sequelize.DataTypes.DATE,
          allowNull: true,
        },
      },
    );
    /**
     * Add altering commands here.
     *
     * Example:
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
