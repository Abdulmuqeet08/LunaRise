"use strict";
const { Model } = require("sequelize");
const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class p4u_ModuleType extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        // static associate(models) {
        //     p4u_ModuleType.belongsTo(models.p4u_UserMaster, {
        //         through: {
        //             model: models.p4u_UserRole
        //         },
        //         foreignKey: 'id_Module_Type'
        //     });
        // }
    }
    p4u_ModuleType.init(
        {
            id_Module_Type: { type: DataTypes.INTEGER, primaryKey: true ,autoIncrement: true },
            module_Type_Name: DataTypes.STRING,
            is_Active: DataTypes.INTEGER,
        },
        {
            sequelize,
            freezeTableName: true,
            modelName: "p4u_ModuleType",

            timestamps: false,
            createdAt: false,
            updatedAt: false,
        }
    );
    return p4u_ModuleType;
};
