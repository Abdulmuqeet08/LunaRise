const Models = require('models');
const { sequelize } = require("models/index.js");
module.exports = class UpdateMenuRoleLabelQuery {
    constructor(details) {
        this.menuid = details.menu_id,
        this.menuUserRole = details.menu_userRole.replace(',','')
        // console.log("----Parameter1---UpdateMenuRoleLabelQuery-",details)
    }


    async get() {     
    //   console.log("----UpdateMenuRoleLabelQuery--query --",this.menuid)  
      return await sequelize.query(        `
        UPDATE p4u_MenuMaster 
        SET menu_userRole_label = (
            SELECT STRING_AGG(role_Name,',') FROM p4u_UserRole WHERE id_role IN (:userRole)
        )
        WHERE menu_id = :menuid`,
        {
            replacements: {
                menuid: this.menuid,
                userRole: this.menuUserRole,
            },
            type: sequelize.QueryTypes.UPDATE, // Use UPDATE type for update queries
            raw: true
        
        },
        // {logging:console.log}
    )
}
};

 
