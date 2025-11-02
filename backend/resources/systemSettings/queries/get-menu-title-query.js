const Models = require("models");
const { literal } = require('sequelize');
module.exports = class UpdateMenuLabelQuery {

  constructor(details) {
    this.menuId = details.menu_id;
    this.menu_parentId = details.menu_parentId;
    this.menu_userRole = details.menu_userRole;

    console.log("hitting UpdateMenuLabelQuery", details)
  }

  async get() {
    if (this.menu_parentId != '' && this.menu_userRole != '') {
      return await Models.p4u_MenuMaster.update({
        menu_parent_label: literal(`(SELECT menu_Title FROM p4u_MenuMaster WHERE menu_id=${this.menu_parentId})`),
        menu_userRole_label: literal(`(SELECT STRING_AGG(role_Name,',') FROM p4u_UserRole WHERE id_Role IN (${this.menu_userRole}))`)
      },
        {
          where: {
            menu_id: this.menuId
          }
        },
      );
    }
    else if (this.menu_userRole != '') {
      return await Models.p4u_MenuMaster.update({
        menu_userRole_label: literal(`(SELECT STRING_AGG(role_Name,',') FROM p4u_UserRole WHERE id_Role IN (${this.menu_userRole}))`)
      },
        {
          where: {
            menu_id: this.menuId
          }
        },
      )
    }
    else if (this.menu_parentId != '') {
      return await Models.p4u_MenuMaster.update({
        menu_parent_label: literal(`(SELECT menu_Title FROM p4u_MenuMaster WHERE menu_id=${this.menu_parentId})`),
      },
        {
          where: {
            menu_id: this.menuId
          }
        },
      );
    }

  }
};