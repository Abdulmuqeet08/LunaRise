'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Cycles extends Model {
    static associate(models) {
      // Define association with p4u_Users (if necessary)
      Cycles.belongsTo(models.p4u_Users, { foreignKey: "UserID" });
    }
  }

  Cycles.init(
    {
      CycleID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      UserID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      StartDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      EndDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      CycleLength: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      AveragePeriodLength: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Description: {
        type: DataTypes.STRING, // Added the Description field
        allowNull: true, // Optional
      },
      CreatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      UpdatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Cycles', // Model name for reference
      tableName: 'Cycles', // Table name in the database
      timestamps: false, // Since timestamps are managed manually (via migration)
    }
  );

  return Cycles;
};
