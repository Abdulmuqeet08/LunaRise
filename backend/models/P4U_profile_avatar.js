'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize,DataTypes) => {
  class P4U_profile_avatar extends Model {
    static associate(models) {
        P4U_profile_avatar.belongsTo(models.p4u_Users, {foreignKey:  "UserID" });
    }
  }

  P4U_profile_avatar.init(
    {
      ImageID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      UserID: {
        type: DataTypes.INTEGER,
        references: {
          model: 'p4u_Users',
          key: 'UserID'
        },
        allowNull: true,
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
      ImagePath: {
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
      modelName: 'P4U_profile_avatar',
      tableName: 'P4U_profile_avatar',
      timestamps: true,
      createdAt: 'CreatedAt',
      updatedAt: 'UpdatedAt',
    }
  );

  return P4U_profile_avatar;
};
