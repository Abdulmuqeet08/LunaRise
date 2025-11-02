
const Models = require('models');

module.exports = class GetStudentLeaderboardBySmIdAndLeaderboardIdQuery {
    constructor(smId, leaderboardId) {
        this.smId = smId;
        this.leaderboardId = leaderboardId;
    }

    async get() {
        return Models.StudentLeaderboard.findOne({
            where: {
                smId: this.smId,
                leaderboardId: this.leaderboardId
            }
        });
    }
};
