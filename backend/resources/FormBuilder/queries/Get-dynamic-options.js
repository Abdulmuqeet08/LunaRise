const { sequelize } = require('models/index.js');
const { QueryTypes } = require('sequelize');

module.exports = class GetFieldOptionsQuery {
    constructor(options = null) {
        if (options && typeof options === 'object') {
            this.tableName = options.tableName;
            this.valueField = options.valueField || 'Value';
            this.displayField = options.displayField || 'DisplayText';
        } else {
            this.tableName = options;
            this.valueField = 'Value';
            this.displayField = 'DisplayText';
        }
    }

    async get(transaction = null) {
        if (!this.tableName) {
            return this.getAllTables(transaction);
        }
        return this.getTableOptions(this.tableName, transaction);
    }

    // Get all tables
    async getAllTables(transaction = null) {
        try {
            const databaseName = sequelize.config.database;
            const tables = await sequelize.query(`
                SELECT TABLE_NAME
                FROM INFORMATION_SCHEMA.TABLES
                WHERE TABLE_TYPE = 'BASE TABLE'
                AND TABLE_CATALOG = '${databaseName}'
                AND TABLE_SCHEMA = 'dbo'
            `, {
                type: QueryTypes.SELECT,
                transaction
            });
            return tables;
        } catch (error) {
            console.error('Error fetching tables:', error);
            return [];
        }
    }

    // Get Value and DisplayText for a specific table
    async getTableOptions(tableName, transaction = null) {
        try {
            // Validate table name to prevent SQL injection
            if (typeof tableName !== 'string' || !tableName.match(/^[a-zA-Z0-9_]+$/)) {
                throw new Error('Invalid table name format: Must be alphanumeric with underscores only');
            }

            console.log(`Fetching options for table: ${tableName}, valueField: ${this.valueField}, displayField: ${this.displayField}`);
            const options = await sequelize.query(`
                SELECT TOP (1000) [${this.valueField}] as Value, [${this.displayField}] as DisplayText
                FROM [p4uhc_dev].[dbo].[${tableName}]
            `, {
                type: QueryTypes.SELECT,
                transaction
            });
            return options;
        } catch (error) {
            console.error(`Error fetching options for table ${tableName}:`, error);
            throw error;
        }
    }
}; 