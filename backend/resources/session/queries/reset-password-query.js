const Models = require('models');
const { sequelize } = require("models/index.js");
var aes256 = require("aes256");

module.exports = class ResetPasswordQuery {
    constructor(details) {
        this.id_user =details.id_user.trim();       
        this.dbPassword = aes256.encrypt("DP4U-DEV", details.password.trim() );

    }

    async get() {        
        return await Models.P4U_UserMaster.update(
            {
                P4UPassword: this.dbPassword,
                modified_on: sequelize.literal("CURRENT_TIMESTAMP"),
                P4UReset:2
            },
            {
                
                where: {
                    id_user: this.id_user
                },
                logging:console.log
            }
        );
    
    }
};