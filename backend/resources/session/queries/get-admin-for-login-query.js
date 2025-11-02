const Models = require('models');
const { sequelize } = require('models/index.js');


module.exports = class GetAdminForLoginQuery {
    constructor(credentials) {
        this.Username = credentials.Username.trim();
    }   

    async get() {
        try {
            return await Models.p4u_Users.findOne({
            //    raw:true,
            //    logging:console.log,
                where: {
                    UserName: this.Username, 
                    IsActive: 1,
                }, 
                include: [
                    {
                        model: Models.p4u_appConfig,
                        required: false  // Makes this a LEFT JOIN instead of INNER JOIN
                    }
                ],  
            });
        } catch (e) {
            console.log(e);
        }
    }
};

  
