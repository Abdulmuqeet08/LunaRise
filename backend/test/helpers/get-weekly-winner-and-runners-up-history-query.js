
const Models = require('models');

module.exports = class GetWeeklyWinnerAndRunnersUpHistoryQuery {
    async get() {
        return Models.WeeklyWinnersAndRunnersUpHistory.findAll();
    }
};
