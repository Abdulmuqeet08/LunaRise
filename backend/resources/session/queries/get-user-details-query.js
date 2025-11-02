const Models = require('models');
const { Sequelize, Op } = require("sequelize");
const { Model } = require('sequelize');

const db = require('models/index.js');


module.exports = class VerifyUserName {
    constructor(username) {
        this.Username = username;
    }
    get() {
        // console.log('Request to verify availability of a username',this.Username)
        return Models.p4u_Users.findAndCountAll({
            // logging:console.log,
            // raw: true,
            where: {
                [Op.or]: [
                    { UserName: this.Username },
                    { Email: this.Username }
                ]
            },
        })

    }
};