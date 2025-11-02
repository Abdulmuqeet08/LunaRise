const { sequelize } = require('models/index.js');

module.exports = class FetchDynamicOptionsQuery {
    constructor(record) {
        const data = record.getDynamicOptions || record;
        if (!data?.SourceTable || !data?.ValueColumn || !data?.DisplayColumn) {
            throw new Error('SourceTable, ValueColumn, and DisplayColumn are required');
        }

        this.sourceTable = data.SourceTable;
        this.valueColumn = data.ValueColumn;
        this.displayColumn = data.DisplayColumn;
        this.whereClause = data.WhereClause;
    }

    /**
     * Fetches dynamic dropdown options from the database securely
     */
    async get() {
        try {
            // Validate table and column names to prevent SQL injection
            if (!/^[a-zA-Z0-9_]+$/.test(this.sourceTable)) {
                throw new Error('Invalid table name');
            }
            if (!/^[a-zA-Z0-9_]+$/.test(this.valueColumn) || !/^[a-zA-Z0-9_]+$/.test(this.displayColumn)) {
                throw new Error('Invalid column name');
            }

            let dynamicQuery = `
                SELECT [${this.valueColumn}] AS Value, [${this.displayColumn}] AS Label
                FROM [${this.sourceTable}]
            `;

            // Handle where clause safely
            let replacements = {};
            if (this.whereClause) {
                dynamicQuery += ` WHERE ${this.whereClause}`;
            }

            console.log('Executing secure dynamic query:', dynamicQuery);

            const dropdownOptions = await sequelize.query(dynamicQuery, {
                type: sequelize.QueryTypes.SELECT,
                replacements
            });

            return dropdownOptions;
        } catch (error) {
            console.error(`Error fetching dynamic options for ${this.sourceTable}:`, error);
            return [];
        }
    }
};
