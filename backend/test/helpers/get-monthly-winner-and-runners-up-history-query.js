
const Models = require('models');

module.exports = class GetMonthlyWinnerAndRunnersUpHistoryQuery {
    async get() {
        return Models.MonthlyWinnersAndRunnersUpHistory.findAll();
    }
};
