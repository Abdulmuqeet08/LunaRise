'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class p4u_appConfig extends Model {
    static associate(models) {
      p4u_appConfig.belongsTo(models.p4u_Users, {foreignKey:  "UserID" });
    }
  }

  p4u_appConfig.init(
    {
      Id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      UserID: {
        type: DataTypes.INTEGER,
        references: {
          model: 'p4u_Users',
          key: 'UserID'
        },
        allowNull: true,
        unique:true
      },
      theme: {
        type: DataTypes.STRING,
        allowNull: true
      },
      scheme: {
        type: DataTypes.STRING,
        allowNull: true
      },
      layout: {
        type: DataTypes.STRING,
        allowNull: true
      },
      CreatedDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      ModifiedDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      }
    },
    {
      sequelize,
      modelName: 'p4u_appConfig',
      tableName: 'p4u_appConfig',
      timestamps: false
    }
  );

  return p4u_appConfig;
};
