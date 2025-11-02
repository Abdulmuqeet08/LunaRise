const Models = require("models");


module.exports = class FetchFormDataQuery {
    constructor() {
        
    }
      async get() {
            try {
                return await Models.p4u_Forms.findAndCountAll({   
                  where :{
                    IsActive:1
                  }
                });
            } catch (e) {
                console.log(e);
            }
        }
    };
