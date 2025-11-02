const { sequelize } = require('models/index.js');

module.exports = class upsertFormDetailsQuery {
    constructor(details) {
        console.log('Constructing query with details:', JSON.stringify(details, null, 2));
        
        // Handle both wrapped and unwrapped data structures
        const formData = details.formData || details;

        // Validate required fields
        if (!formData.formId || !formData.destinationTable || !formData.columnMappings) {
            throw new Error('formId, destinationTable, and columnMappings are required');
        }

        this.formId = formData.formId;
        this.destinationTable = formData.destinationTable;
        this.columnMappings = formData.columnMappings;

        console.log('Processed form data:', {
            formId: this.formId,
            destinationTable: this.destinationTable,
            columnMappings: this.columnMappings
        });
    }
    async get() {
        try {
            if (!this.formId || !this.destinationTable || !this.columnMappings) {
                throw new Error('Missing required details: formId, destinationTable, or columnMappings');
            }
    
            // Get existing columns from the destination table
            const existingColumnsQuery = `
                SELECT COLUMN_NAME 
                FROM INFORMATION_SCHEMA.COLUMNS 
                WHERE TABLE_NAME = :tableName;
            `;
    
            const columnsData = await sequelize.query(existingColumnsQuery, {
                replacements: { tableName: this.destinationTable },
                type: sequelize.QueryTypes.SELECT
            });
    
            // Ensure columnsData is an array before calling .map()
            const existingColumns = Array.isArray(columnsData) ? columnsData.map(col => col.COLUMN_NAME) : [];
    
            if (existingColumns.length === 0) {
                throw new Error('No columns found in the destination table.');
            }
    
            // Filter only the columns that exist in the table
            const validColumns = Object.keys(this.columnMappings).filter(col => existingColumns.includes(col));
            const validValues = validColumns.map(col => this.columnMappings[col]);
    
            if (validColumns.length === 0) {
                throw new Error('No valid columns found for insertion in the destination table.');
            }
    
            // Dynamically create parameter placeholders (e.g., :col1, :col2)
            const placeholders = validColumns.map(col => `:${col}`).join(', ');
            const columnNames = validColumns.join(', ');
    
            // Construct the dynamic INSERT query
            const query = `
                INSERT INTO ${this.destinationTable} (${columnNames})
                VALUES (${placeholders});
            `;
    
            console.log('Generated SQL Query:', query);
    
            // Execute the query using Sequelize
            await sequelize.query(query, {
                replacements: { ...this.columnMappings },
                type: sequelize.QueryTypes.INSERT
            });
    
            console.log(`Data inserted into ${this.destinationTable} successfully.`);
            return { success: true, message: `Data inserted into ${this.destinationTable} successfully.` };
    
        } catch (error) {
            console.error('Error storing form submission:', error);
            throw error;
        }
    }
    
    
};
