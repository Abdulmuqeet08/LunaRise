const { sequelize } = require('models/index.js');
const { QueryTypes } = require('sequelize');

module.exports = class GetTableColumnsQuery {
    constructor(details) {
        this.tableName = details.tableName?.toLowerCase(); // Convert table name to lowercase
        console.log("In query constructor:", details);
    }

    async get() {
        try {
            console.log("Fetching columns for table:", this.tableName);
            
            const query = `
                SELECT column_name 
                FROM information_schema.columns 
                WHERE table_name = :tableName
            `;
            
            const result = await sequelize.query(query, {
                replacements: { tableName: this.tableName },
                type: QueryTypes.SELECT
            });

            console.log("Query Result:", result);

            if (!result || result.length === 0) {
                throw new Error(`No columns found for table: ${this.tableName}`);
            }

            // Filter out unwanted columns: containing 'id', 'created_at', 'updated_at', 'latitude', 'longitude'
            const excludedColumns = ['id', 'createdat', 'updatedat', 'latitude', 'longitude'];
            const filteredColumns = result
                .map(row => row.column_name)
                .filter(column => !excludedColumns.some(exclude => column.toLowerCase().includes(exclude)));

            if (filteredColumns.length === 0) {
                throw new Error(`No valid user-filled columns found for table: ${this.tableName}`);
            }

            // Map to JSON format
            const columnsJson = filteredColumns.map(column => ({
                columns_id: column,
                columns_value: column
            }));

            console.log("Filtered Columns JSON:", columnsJson);
            return columnsJson;
        } catch (error) {
            console.error("Error fetching table columns:", error.message);
            throw error;
        }
    }
};
