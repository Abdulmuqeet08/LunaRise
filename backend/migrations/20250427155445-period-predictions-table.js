'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Drop the table if it already exists
    await queryInterface.dropTable('period_predictions');

    // Create the table with the required columns
    await queryInterface.createTable('period_predictions', {
      PredictionID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      UserID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'p4u_Users', // Make sure this matches your user table name
          key: 'UserID',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      StartDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      PredictedNextStartDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      CreatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Drop the newly created table if reverting
    await queryInterface.dropTable('period_predictions');
  },
};
