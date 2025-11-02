
const Models = require('models');

module.exports = class UpdateCreatedAtInScoreQuery {
    constructor(scoreId, createdAt) {
        this.details = {
            scoreId,
            createdAt
        };
    }

    async get() {
        return Models.Score.update({
            createdAt: this.details.createdAt
        }, {
            where: {
                id: this.details.scoreId
            }
        });
    }
};
