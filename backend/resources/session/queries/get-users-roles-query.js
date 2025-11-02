const Models = require("models");

module.exports = class GetUsersRolesQuery {
    constructor() {
        // this.id = req.params;
    }

    async get() {       
            return  Models.p4u_UserRole.findAll({                
                include: [
                    {
                    model: Models.p4u_ModuleType,
                    }
                    
                ],               
            });
       
    }
};
