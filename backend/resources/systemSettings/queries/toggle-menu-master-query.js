const Models = require("models");
const { sequelize } = require("models/index.js");

module.exports = class ToggleMenuMasterQuery {
    constructor(details) {
        this.menuid = details.menu_id; 
        this.menu_isActive = details.menu_isActive
        console.log("---Parameter-----",this.menuid)
        
    }

    async get() {
        try{    
        return await Models.p4u_MenuMaster.update(
            {
                menu_isActive:this.menu_isActive 
            },
            {
                where: {
                    menu_id:  this.menuid,
                },
               
            },
            {logging: console.log}
        );
    }catch(e){
        console.log(e)
    }
        }
};
