
const Models = require('models');

module.exports = class GetWeeklyWinnerAndRunnersUpQuery {
    async get() {
        return Models.WeeklyWinnersAndRunnersUp.findAll();
    }
};
