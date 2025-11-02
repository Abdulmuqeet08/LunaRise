const { sequelize } = require('../../../models/index.js');

module.exports = class Storage {
    constructor(moduleName) {
        this.moduleName = moduleName;
    }

    async get() {
        try {
            console.log(`🔍 Fetching storage path for module: ${this.moduleName}`);

            const query = `
                SELECT AbsolutePath 
                FROM p4u_StorageMappings 
                WHERE ModuleName = :moduleName
            `;

            const result = await sequelize.query(query, {
                replacements: { moduleName: this.moduleName },
                type: sequelize.QueryTypes.SELECT
            });

            console.log("📄 Raw Query Result from DB:", JSON.stringify(result, null, 2));

            // Ensure result is not empty and contains AbsolutePath
            if (!result || result.length === 0) {
                console.error(`🚨 No storage path found for module: ${this.moduleName}`);
                throw new Error(`Storage path not configured for module: ${this.moduleName}`);
            }

            const absolutePath = result[0]?.AbsolutePath?.trim(); // Ensure correct access

            if (!absolutePath) {
                console.error(`⚠️ Retrieved storage path is empty or undefined for module: ${this.moduleName}`);
                throw new Error(`Invalid storage path returned for module: ${this.moduleName}`);
            }

            console.log("✅ Retrieved Storage Path:", absolutePath);

            // Normalize path for Windows if necessary
            return absolutePath
        } catch (error) {
            console.error("❌ Error fetching storage path:", error.stack);
            throw error;
        }
    }
};
