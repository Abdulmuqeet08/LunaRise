
const { sequelize } = require("models/index.js");

module.exports = class UpsertFormConfigurationQuery {
    constructor(details) {
        if (!details?.formId) {
            throw new Error('formId is required');
        }
        this.formId = details.formId;
        this.formData = details.formData || {};
        console.log('Received form data:', { formId: this.formId, formData: this.formData });
    }

    async get() {
        const transaction = await sequelize.transaction(); // Start transaction
        try {
            if (!this.formId) {
                throw new Error('Missing formId');
            }

            await sequelize.query(
                `
                MERGE INTO p4u_FormConfiguration AS target
                USING (SELECT :formId AS FormId) AS source
                ON target.FormId = source.FormId
                WHEN MATCHED THEN 
                    UPDATE SET 
                        SubmittedData = :submittedData,
                        updatedAt = GETDATE()
                WHEN NOT MATCHED THEN 
                    INSERT (FormId, SubmittedData, createdAt, updatedAt)
                    VALUES (:formId, :submittedData, GETDATE(), GETDATE());
                `,
                {
                    replacements: {
                        formId: this.formId,
                        submittedData: JSON.stringify(this.formData)
                    },
                    type: sequelize.QueryTypes.RAW, // Use RAW instead of INSERT for MERGE
                    transaction
                }
            );

            await transaction.commit(); // Commit transaction
            console.log('Form submission upserted successfully');
            return { message: 'Form submission upserted successfully' };
        } catch (error) {
            await transaction.rollback(); // Rollback transaction on error
            console.error('Error storing form submission:', error);
            throw error;
        }
    }
};
