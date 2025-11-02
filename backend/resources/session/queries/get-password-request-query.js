const Models = require('models');
const { sequelize } = require("models/index.js");
var aes256 = require("aes256");

module.exports = class GetPasswordRequestQuery {
    constructor() {
        
    }

    async get() {        
        return await Models.P4U_UserMaster.findAll(
           {                
                where: {
                    password_Reset_Request: 1
                },
            }
        );
    
    }
};