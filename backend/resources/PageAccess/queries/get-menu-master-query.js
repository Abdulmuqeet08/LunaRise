const Models = require("models");
const { Op } = require('sequelize');
const { sequelize } = require("models/index.js");

const menuTypeOrder = ['main', 'basic', 'group', 'collapsible'];

module.exports = class P4UMenuMasterQuery {
  constructor(type, parentId, UserRole) {
    this.menuType = type
    this.parentId = parentId
    this.UserRole = UserRole
  }

  async get() {
    return await Models.p4u_MenuMaster.findAll({
      attributes: [
        ['menu_id', 'id'],
        ['menu_Title', 'title'],
        ['menu_Type', 'type'],
        ['menu_Icon', 'icon'],
        ['menu_Link', 'link']
      ],
      order: [
        [
          sequelize.literal(`CASE menu_Type 
            WHEN '${menuTypeOrder[0]}' THEN 1  
            WHEN '${menuTypeOrder[1]}' THEN 2
            WHEN '${menuTypeOrder[2]}' THEN 3
            WHEN '${menuTypeOrder[3]}' THEN 4
            ELSE 5
          END`),
        ],
        ['menu_id']
      ],
      where: {
        [Op.and]: [{ menu_Type: this.menuType },
        { menu_isActive: 1 },
        ],
        [Op.or]: [
          { menu_userRole: { [Op.like]: `%${this.UserRole}%` } },
          { menu_userRole: null }, // Include menus with no specified roles
        ]
      }
    });
  }
}
