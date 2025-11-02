'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
  
     await queryInterface.createTable('p4u_MenuMaster', {
      menu_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      menu_Title: {
        type: Sequelize.STRING,
        allowNull: true
      },
      menu_Type: {
        type: Sequelize.STRING,
        allowNull: true
      },
      menu_Icon: {
        type: Sequelize.STRING,
        allowNull: true
      },
      menu_Link: {
        type: Sequelize.STRING,
        allowNull: true
      },
      menu_parentId: {
        type: Sequelize.STRING,
        allowNull: true
      },
      menu_parent_label: {
        type: Sequelize.STRING,
        allowNull: true
      },
      menu_isActive: {
        type: Sequelize.STRING,
        allowNull: true
      },
      menu_userRole: {
        type: Sequelize.STRING,
        allowNull: true
      },
      menu_userRole_label: {
        type: Sequelize.STRING,
        allowNull: true
      }
      });
  
  },

  async down (queryInterface, Sequelize) {
  
      await queryInterface.dropTable('p4u_MenuMaster');
 
  }
};