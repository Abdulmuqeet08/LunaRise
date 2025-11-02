'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class p4u_Users extends Model {
    static associate(models) {
      p4u_Users.hasOne(models.p4u_appConfig, { foreignKey: "UserID" });
    }
  }

  p4u_Users.init(
    {
      UserID: {
        type: DataTypes.INTEGER,
        primaryKey: true, // Ensure primary key is defined
        autoIncrement: true,
      },
      UserName: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
     
      Email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      CountryCode: {
        type: DataTypes.STRING(5),
        allowNull: false,
      },
      ContactNumber: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
      },
      PasswordHash: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      ProfilePicture: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      Bio: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      RoleId: {
        type: DataTypes.STRING(1),
        allowNull: false,
      },
      IsActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: 'p4u_Users',
      tableName: 'p4u_Users',
    }
  );

  return p4u_Users;
};
