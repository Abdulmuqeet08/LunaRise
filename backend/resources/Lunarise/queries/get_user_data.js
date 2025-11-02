const { sequelize } = require('models/index.js');
const { QueryTypes } = require('sequelize');

module.exports = class GetUserCycleData {
    constructor({ UserID }) {
        this.userId = UserID;
    }

    async get() {
        try {
            if (!this.userId) {
                throw new Error("UserID is required to fetch data.");
            }

            // SQL query to fetch the data from both tables, joining based on UserID
            const query = `
                SELECT 
                    c.StartDate, 
                    c.EndDate, 
                    p.PredictedNextStartDate
                FROM 
                    LunaRise.dbo.Cycles c
                LEFT JOIN 
                    LunaRise.dbo.period_predictions p ON c.UserID = p.UserID
                WHERE 
                    c.UserID = :userId;
            `;

            // Run the query using Sequelize
            const result = await sequelize.query(query, {
                type: QueryTypes.SELECT,
                replacements: { userId: this.userId },
            });

            // If no data is found, return an empty array
            if (!result || result.length === 0) {
                return [];
            }

            // Format the result before returning
            const formattedResult = result.map(record => ({
                StartDate: record.StartDate,
                EndDate: record.EndDate,
                PredictedNextStartDate: record.PredictedNextStartDate || null,  // If no prediction, return null
            }));

            return formattedResult;

        } catch (error) {
            throw error;
        }
    }
};
