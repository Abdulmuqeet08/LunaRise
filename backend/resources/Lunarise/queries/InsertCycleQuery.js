const { sequelize } = require('models/index.js'); // Adjust the path as needed
const Models = require('models');
const { QueryTypes } = require('sequelize');

module.exports = class InsertCycleQuery {
    constructor(details) {
        this.details = details;
    }

    async get() {
        try {
            if (!Models.Cycles) {
                throw new Error("Models.Cycles is undefined. Check model definition.");
            }

            const {
                UserID,
                StartDate,
                EndDate,
                CycleLength,
                AveragePeriodLength,
                Description
            } = this.details;

            // Validate required fields based on migration
            if (!UserID) throw new Error("UserID is required.");
            if (!StartDate || !EndDate) throw new Error("StartDate and EndDate are required.");
            if (!CycleLength) throw new Error("CycleLength is required.");

            const newCycle = await Models.Cycles.create({
                UserID,
                StartDate,
                EndDate,
                CycleLength,
                AveragePeriodLength: AveragePeriodLength ?? null,
                Description: Description ?? null,
                CreatedAt: sequelize.literal("CURRENT_TIMESTAMP"),
                UpdatedAt: sequelize.literal("CURRENT_TIMESTAMP")
            });

            console.log("New cycle created:", newCycle.CycleID);
            return {
                success: true,
                message: "Cycle data saved successfully!",
                cycleId: newCycle.CycleID
            };

        } catch (error) {
            console.error("Error in InsertCycleQuery:", error);
            throw error;
        }
    }
};