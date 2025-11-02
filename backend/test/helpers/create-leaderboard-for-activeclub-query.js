const { QueryTypes } = require('sequelize');

const { sequelize } = require('models/index.js');
let randomId = Math.random().toString(36).substring(10);
const t = sequelize.transaction();
module.exports = class CreateLeaderboardForActiveClubQuery {
    constructor(esId, leaderboardforactiveclubDetails) {
        this.details = {
            esId,
            leaderboardforactiveclubDetails
        };
    }

    async get() {

        return sequelize.transaction(t => {

            // chain all your queries here. make sure you return them.

            return sequelize.query('INSERT INTO `Leaderboards` VALUES (:id, :name ,:groupId, :groupType, :createdAt, :updatedAt, :active);', {
                replacements: {
                    id: this.details.esId,
                    name: this.details.leaderboardforactiveclubDetails.name,
                    groupId: randomId,
                    groupType: this.details.leaderboardforactiveclubDetails.groupType,
                    createdAt: '2021-05-31',
                    updatedAt: '2021-05-3',
                    active: this.details.leaderboardforactiveclubDetails.active,
                },
                type: QueryTypes.INSERT
            }, { transaction: t }).then(user => {
                return sequelize.query('INSERT into `ActiveClubGroups` VALUES (:id, :focusGroup, :package,:createdAt,:updatedAt,:focusGroupId,:packageId );', {
                    replacements: {
                        id: randomId,
                        focusGroup: this.details.leaderboardforactiveclubDetails.focusGroup,
                        package: this.details.leaderboardforactiveclubDetails.package,
                        createdAt: '2021-05-31',
                        updatedAt: '2021-05-3',
                        focusGroupId: this.details.leaderboardforactiveclubDetails.focusGroupId,

                        packageId: this.details.leaderboardforactiveclubDetails.packageId,


                    },
                    type: QueryTypes.INSERT
                })


            }, { transaction: t });


        }).then(result => {
            // Transaction has been committed
            console.log("result from transaction", result)
            // result is whatever the result of the promise chain returned to the transaction callback
        }).catch(err => {
            // Transaction has been rolled back
            console.log("error from transaction", err)
            // err is whatever rejected the promise chain returned to the transaction callback
        });



    }
};
