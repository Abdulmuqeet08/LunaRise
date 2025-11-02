'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize,DataTypes) => {
  class p4u_uploads extends Model {
    
      static associate(models) {
        p4u_uploads.belongsTo(models.p4u_Users, {foreignKey:  "UserID" });
      
  }
}

  p4u_uploads.init(
    {
      UserID: {
        type: DataTypes.INTEGER,
        references: {
          model: 'p4u_Users',
          key: 'UserID'
        },
        allowNull: true,
      },
      ModuleID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      FileName: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      FileType: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      FileSize: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      FilePath: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      ModuleName :{
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      ModuleType:{
        type: DataTypes.STRING(500),
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
      modelName: 'p4u_uploads',
      tableName: 'p4u_uploads',
      timestamps: true,
      createdAt: 'CreatedAt',
      updatedAt: 'UpdatedAt',
    }
  );

  return p4u_uploads;
};
