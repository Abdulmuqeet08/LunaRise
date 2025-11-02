"use strict";
const { Model } = require("sequelize");
const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class p4u_UserRole extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            p4u_UserRole.belongsTo(models.p4u_ModuleType, {
                foreignKey: { name: "id_Module_Type" },
            });

        }
    }
    p4u_UserRole.init(
        {
            id_Role: { type: DataTypes.INTEGER, primaryKey: true ,autoIncrement: true },
            role_Name: DataTypes.STRING,
            is_Active: DataTypes.INTEGER,
            id_Module_Type: DataTypes.INTEGER
        },
        {
            sequelize,
            freezeTableName: true,
            modelName: "p4u_UserRole",
            timestamps: false,
            // createdAt: false,
            // updatedAt: false,
        }
    );
    return p4u_UserRole;
};
