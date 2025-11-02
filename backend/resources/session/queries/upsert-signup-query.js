const Models = require('models');
const { sequelize } = require('models/index.js');
var aes256 = require("aes256");
// Add require for environment variables
const config = require('config-handler');

module.exports = class UpsertSignupQuery {
    constructor(details) {
        this.details = details;
        this.userName = details.entity.username;
        this.email = details.entity.email;
        this.countryCode = details.entity.CountryCode;
        this.contactNumber = details.entity.ContactNumber;
        this.roleId = details.entity.roleId;

        this.password = aes256.encrypt(config.jwt_secret, details.entity.password.trim());
    }

    async get() {
        try {
            return await Models.p4u_Users.upsert({
                UserName: this.userName,
                Email: this.email,
                CountryCode: this.countryCode,
                ContactNumber: this.contactNumber,
                RoleId: this.roleId || 1,
                PasswordHash: this.password,
                IsActive: true
            }, {
                where: {
                    Email: this.email
                }
            });
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    }
}; 