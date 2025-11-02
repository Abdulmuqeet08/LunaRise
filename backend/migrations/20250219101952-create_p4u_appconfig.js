'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('p4u_appconfig', {
      Id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      UserID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'p4u_Users', // Ensure you have a Users table
          key: 'UserID' // Updated to match the column name in Users table
        }        
      },
     theme: {
        type: Sequelize.STRING,
        allowNull: true
      },
      scheme: {
        type: Sequelize.STRING,
        allowNull: true
      },
      layout: {
        type: Sequelize.STRING,
        allowNull: true
      },
      CreatedDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      ModifiedDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        onUpdate: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('p4u_appconfig');
  }
};
