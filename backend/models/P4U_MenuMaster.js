"use strict";
const { Model } = require("sequelize");
const Sequelize = require("sequelize");
 
module.exports = (sequelize, DataTypes) => {
    class p4u_MenuMaster extends Model {
        static associate(models) {
            p4u_MenuMaster.belongsTo(models.p4u_UserRole, {
                foreignKey: { name: "menu_userRole" },
            });
 
           
 
            // p4u_UserRole.belongsTo(models.p4u_ModuleType, {
            //     foreignKey: { name: "ModuleTypeID" },
            // });
        }
       
    }
    p4u_MenuMaster.init(
        {
            menu_id: { type: DataTypes.INTEGER, primaryKey: true },
            menu_Title: DataTypes.STRING,
            menu_Type: DataTypes.STRING,
            menu_Icon: DataTypes.STRING,
            menu_Link: DataTypes.STRING,
            menu_parentId: DataTypes.STRING,
            menu_parent_label: DataTypes.STRING,
            menu_isActive: DataTypes.STRING,
            menu_userRole: DataTypes.STRING,
            menu_userRole_label: DataTypes.STRING,
 
        },
        {
            sequelize,
            freezeTableName: true,
            modelName: "p4u_MenuMaster",
 
            timestamps: false,
            createdAt: false,
            updatedAt: false,
        }
    );
    return p4u_MenuMaster;
};