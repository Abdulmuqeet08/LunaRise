const Models = require("models");
const { sequelize } = require('models/index.js');

module.exports = class GetFormDetailsQuery {
    constructor(details) {
        if (!details?.formId) {
            throw new Error('FormId is required');
        }
        this.formId = details.formId;
    }

    async get() {
        const query = `
            SELECT 
                f.FormId, f.FormName, f.Destination, f.Description, f.LayoutType,
                f.GridColumns, f.IsResponsive, f.TabularLayout,
                fs.SectionId, fs.SectionName, fs.LayoutType AS SectionLayout,
                fs.GridColumns AS SectionGridColumns, fs.IsCollapsible,
                fs.OrderIndex AS SectionOrder,
                ff.FieldId, ff.FieldName, ff.Label, ff.FieldType,
                ff.GridColumnSpan, ff.GridRowSpan, ff.IsFullWidth,
                ff.LabelPosition, ff.IsRequired, ff.DefaultValue,
                ff.ValidationPattern, ff.Placeholder, ff.OrderIndex AS FieldOrder,
                fo.OptionId, fo.OptionSource, fo.Value, fo.DisplayText,
                fo.SourceTable, fo.ValueColumn, fo.DisplayColumn,
                fo.WhereClause, fo.DependentFieldId,
                lc.ConfigId, lc.BreakpointName, lc.MinWidth, 
                lc.ColumnCount, lc.GutterSize
            FROM p4u_Forms f
            LEFT JOIN p4u_FormSections fs ON f.FormId = fs.FormId
            LEFT JOIN p4u_FormFields ff ON fs.SectionId = ff.SectionId AND fs.FormId = ff.FormId
            LEFT JOIN p4u_FieldOptions fo ON ff.FieldId = fo.FieldId
            LEFT JOIN p4u_LayoutConfigurations lc 
                   ON (lc.FormId = f.FormId AND lc.SectionId IS NULL)
                   OR lc.SectionId = fs.SectionId
            WHERE f.FormId = :formId 
              AND f.IsActive = 1
            ORDER BY fs.OrderIndex, ff.OrderIndex, fo.OrderIndex, lc.MinWidth;
        `;

        try {
            console.log('Executing query for formId:', this.formId);
            const results = await sequelize.query(query, {
                replacements: { formId: this.formId },
                type: sequelize.QueryTypes.SELECT
            });

            console.log('Query results:', results);
            return {
                success: true,
                data: results
            };
        } catch (e) {
            console.error('Error executing query', e);
            throw new Error(`Failed to get form details: ${e.message}`);
        }
    }
};
