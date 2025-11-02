const Models = require('models');
const { sequelize } = require('models/index.js');

module.exports = class UpsertAppConfigQuery {
    constructor(details) {
        this.details = details;
    }

    async get() {
        try {
            // Using upsert - it will create if not exists, update if exists
            return await Models.AppConfig.upsert({
                UserID: this.details.entity.UserID,
                theme: this.details.entity.theme,
                scheme: this.details.entity.scheme,
                layout: this.details.entity.layout,
                CreatedDate: sequelize.literal("CURRENT_TIMESTAMP"), // Set the current timestamp for CreatedDate
                ModifiedDate: sequelize.literal("CURRENT_TIMESTAMP") // Set the current timestamp for ModifiedDate
            }, {
                where: {
                    UserID: this.details.entity.UserID // Assuming UserID is unique or used to identify the app config
                }
            });
        }
        catch (e) {
            console.log(e);
            throw e; // Throw the error for proper error handling
        }
    }
};