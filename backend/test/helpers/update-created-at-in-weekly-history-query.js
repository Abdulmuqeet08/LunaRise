
const Models = require('models');

module.exports = class UpdateCreatedAtInWeeklyHistoryQuery {
    constructor(smId, leaderboardId, createdAt) {
        this.details = {
            smId,
            leaderboardId,
            createdAt
        };
    }

    async get() {
        return Models.WeeklyWinnersAndRunnersUpHistory.update({
            createdAt: this.details.createdAt
        }, {
            where: {
                smId: this.details.smId,
                leaderboardId: this.details.leaderboardId
            }
        });
    }
};
