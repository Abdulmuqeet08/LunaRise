const Models = require('models');
const { sequelize } = require("models/index.js");
var aes256 = require("aes256");

module.exports = class ApprovePasswordRequestQuery {
    constructor(id_user) {
        this.id_user =id_user;       

    }

    async get() {        
        return await Models.P4U_UserMaster.update(
            {
                modified_on: sequelize.literal("CURRENT_TIMESTAMP"),
                P4UReset:1,
                password_Reset_Request:0
            },
            {                
                where: {
                    id_user: this.id_user
                },
            }
        );
    
    }
};