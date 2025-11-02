const Models = require('models');
const { sequelize } = require("models/index.js");
var aes256 = require("aes256");

module.exports = class ResetPasswordRequestQuery {
    constructor(details) {
        this.user_name =details.username;       

    }

    async get() {        
        return await Models.P4U_UserMaster.update(
            {
               
                modified_on: sequelize.literal("CURRENT_TIMESTAMP"),
                P4UReset:1,
                password_Reset_Request:1
            },
            {
                
                where: {
                    user_name: this.user_name
                },
                attributes: [
                    "Name", "Status", "P4UReset", "created_On", "id_Role", "id_user", "is_Active", "modified_on", "password_Reset_Request", "user_name",
                ],
            }
        );
    
    }
};
//Name, Status, P4UReset, created_On, id_Role, id_user, is_Active, modified_on, password_Reset_Request, user_name,