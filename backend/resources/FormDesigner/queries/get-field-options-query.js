const { FieldOptions } = require('models');
const { QueryTypes } = require('sequelize');
const { sequelize } = require('models/index.js');

class GetFieldOptionsQuery {
    constructor(params) {
        this.fieldId = params.fieldId;
        this.dependentValue = params.dependentValue || null;
    }

    async execute() {
        // First get the option configuration
        const optionConfig = await FieldOptions.findOne({
            where: {
                FieldId: this.fieldId,
                OptionSource: 'dynamic'
            }
        });

        if (!optionConfig) return [];

        // Construct the dynamic query
        let query = `SELECT ${optionConfig.ValueColumn} as value, ${optionConfig.DisplayColumn} as label 
                    FROM ${optionConfig.SourceTable}`;

        // Add where clause if dependent value exists
        if (this.dependentValue && optionConfig.WhereClause) {
            query += ` WHERE ${optionConfig.WhereClause.replace('${value}', this.dependentValue)}`;
        }

        // Execute the dynamic query
        const options = await sequelize.query(query, {
            type: QueryTypes.SELECT
        });

        return options;
    }
}

