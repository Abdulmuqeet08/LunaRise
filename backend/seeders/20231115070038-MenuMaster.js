

/** @type {import('sequelize-cli').Migration} */

const models = require("../models");
const TRA_MenuMaster = models.P4U_MenuMaster;
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('P4U_MenuMaster', [
      {
        menu_id: 1,
        menu_Title: 'Dashboard',
        menu_Type: 'main', 
        menu_Icon: 'heroicons_outline:home',
        menu_Link: '/pages/profile',
        menu_parentId: null,
        menu_isActive: 1, 
        menu_userRole: '1'
      },
      {
        menu_id: 2,
        menu_Title: 'Health Insights',
        menu_Type: 'main',
        menu_Icon: 'heroicons_outline:document-report',
        menu_Link: '/pages/insights',
        menu_parentId: null,
        menu_isActive: 1,
        menu_userRole: '1'
      },
      {
        menu_id: 3,
        menu_Title: 'History',
        menu_Type: 'main',
        menu_Icon: 'heroicons_outline:document-text',
        menu_Link: '/pages/history', 
        menu_parentId: null,
        menu_isActive: 1,
        menu_userRole: '1'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
  }
};
