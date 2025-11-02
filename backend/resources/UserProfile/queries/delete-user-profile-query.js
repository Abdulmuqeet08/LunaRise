const { sequelize } = require('models/index.js');

module.exports = class DeleteUserProfileQuery {
    constructor({ userId }) {
        this.userId = userId;
        console.log('Received user profile delete request for:', this.userId);
    }

    async execute() {
        try {
            // Execute SQL DELETE query
            const result = await sequelize.query(`
                DELETE FROM dbo.p4u_UserProfiles
                WHERE UserID = :userId;
            `, {
                replacements: { userId: this.userId },
                type: sequelize.QueryTypes.DELETE
            });

            console.log('✅ User profile deleted successfully:', result);
            return result;
        } catch (error) {
            console.error('❌ Error deleting user profile:', error);
            throw error;
        }
    }
};
