const Models = require('models');
const { sequelize } = require("models/index.js");
module.exports = class PutMenuMasterQuery {
    constructor(details) {
        this.menuid = details.menu_id,
        this.menuTitle = details.menu_Title,
        this.menuType = details.menu_Type,
        this.menuIcon = details.menu_Icon,
        this.menulink = details.menu_Link,
        this.menuParentid = details.menu_parentId.toString(),
       // this.menu_parent_label = details.menu_parent_label,
        this.menuisActive = details.menu_isActive,
        this.menuUserRole = details.menu_userRole.toString();
        console.log("----Parameter PutMenuMasterQuery----",this.menuUserRole)
    }


    
    async get() {          
        return await Models.p4u_MenuMaster.upsert(
            {
                menu_id:  this.menuid,
                menu_isActive: this.menuisActive,
                menu_Title: this.menuTitle,
                menu_Type: this.menuType,
                menu_Icon: this.menuIcon,
                menu_Link: this.menulink,
                menu_parentId: this.menuParentid, 
                menu_userRole: this.menuUserRole,
                menu_parent_label: null,
                menu_userRole_label: null,
                
                
            } ,{logging:console.log}
           ); 
       
    
    }
};
