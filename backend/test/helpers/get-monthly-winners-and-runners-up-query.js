
const Models = require('models');

module.exports = class GetMonthlyWinnersAndRunnersUpQuery {
    async get() {
        return Models.MonthlyWinnersAndRunnersUp.findAll();
    }
};
