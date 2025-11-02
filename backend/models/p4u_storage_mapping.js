'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class p4u_storagemappings extends Model {
    static associate(models) {
      // Define associations here if needed in the future
    }
  }

  p4u_storagemappings.init(
    {
      StorageID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      ModuleName: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      AbsolutePath: {
        type: DataTypes.STRING(1000),
        allowNull: false,
      },
      CreatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      UpdatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'p4u_storagemappings',
      tableName: 'p4u_storagemappings',
      timestamps: true,
      createdAt: 'CreatedAt',
      updatedAt: 'UpdatedAt',
    }
  );

  return p4u_storagemappings;
};
