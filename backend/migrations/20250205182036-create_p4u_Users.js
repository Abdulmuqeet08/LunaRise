'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('p4u_Users', {
      UserID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      UserName: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },     
      Email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      CountryCode: {
        type: Sequelize.STRING(5),
        allowNull: false,
      },
      ContactNumber: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true,
      },
      PasswordHash: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      ProfilePicture: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      Bio: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      RoleId: {
        type: Sequelize.STRING(1),
        allowNull: false,
      },
      CreatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      UpdatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      IsActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('p4u_Users');
  },
};