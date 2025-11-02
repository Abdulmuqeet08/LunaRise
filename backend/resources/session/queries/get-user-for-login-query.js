const { QueryTypes } = require('sequelize');
const { sequelize } = require('models/index.js');
const Models = require("models");


module.exports = class GetUserLoginQuery {
    constructor(credentials) {
        // console.log("-----credentials---",credentials)
        this.Username = credentials.Username;
        this.Password=credentials.password;
    }

    
    async get() {    
        // console.log("execting query",this.Username)   
        return Models.P4U_UserMaster.findOne({
            // logging:console.log,
            // raw: true,
            where: {
                Username: this.Username, 
                Status: 1, 
                
            }
        })

        
        

    }
};
