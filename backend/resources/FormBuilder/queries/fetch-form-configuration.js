const { sequelize } = require("models/index.js");

module.exports = class FetchFormConfigurationQuery {
    constructor(details) {
        this.formId = details.formId || null;
    }

    /**
     * Fetch form data by formId
     */
    async get() {
        try {
            const result = await sequelize.query(
                `SELECT SubmittedData FROM p4u_FormConfiguration WHERE FormId = :formId`,
                {
                    replacements: { formId: this.formId }, // Use object, not array
                    type: sequelize.QueryTypes.SELECT, // Ensure we return results
                }
            );

            return result.length ? result[0] : null;
        } catch (error) {
            console.error('Error fetching form data:', error);
            throw error;
        }
    }
}
