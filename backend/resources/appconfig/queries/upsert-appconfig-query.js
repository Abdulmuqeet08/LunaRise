const Models = require('models');
const { sequelize } = require('models/index.js');

module.exports = class UpsertAppConfigQuery {
    constructor(details) {
        if (!details || !details.entity) {
            throw new Error("Invalid details: entity is missing.");
        }
        this.details = details;
    }

    async get() {
        try {
            return await Models.p4u_appConfig.upsert({
                UserID: this.details.entity.UserID,
                theme: this.details.entity.theme,
                scheme: this.details.entity.scheme,
                layout: this.details.entity.layout,
                CreatedDate: sequelize.literal("CURRENT_TIMESTAMP"),
                ModifiedDate: sequelize.literal("CURRENT_TIMESTAMP")
            }, {
                where: {
                    UserID: this.details.entity.UserID 
                }
            });
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
};
