const { v4: uuidv4 } = require('uuid');
const { sequelize } = require('models/index.js');
const UpsertFormConfigurationQuery = require('./upsert-form-configuration');

module.exports = class UpsertFormBuilder {
    constructor(details) {
        this.formData = details.formData;
        console.log('Received form data:', this.formData);
    }

    async get() {
        try {
            const form = this.formData;
            console.log('Processing form:', form);

            const formIdentifier = form.FormIdentifier || uuidv4();

            // Helper function to format values properly
            const formatValue = (value) => (value !== undefined && value !== null && value !== '') ? `'${value.replace(/'/g, "''")}'` : 'NULL';

            // Insert or update form
            const [formResult] = await sequelize.query(`
                DECLARE @InsertedForm TABLE (FormId INT);
                MERGE INTO p4u_Forms AS target
                USING (SELECT ${formatValue(formIdentifier)} AS FormIdentifier) AS source
                ON target.FormIdentifier = source.FormIdentifier
                WHEN MATCHED THEN
                    UPDATE SET
                        FormName = ${formatValue(form.FormName)},
                        Description = ${formatValue(form.Description)},
                        LayoutType = ${formatValue(form.LayoutType)},
                        GridColumns = ${form.GridColumns || 12},
                        IsResponsive = ${form.IsResponsive ? 1 : 0},
                        TabularLayout = ${form.TabularLayout ? 1 : 0},
                        IsActive = ${form.IsActive ? 1 : 0},
                        ModifiedDate = GETDATE(),
                        Destination = ${formatValue(form.Destination)}
                WHEN NOT MATCHED THEN
                    INSERT (FormIdentifier, FormName, Description, LayoutType, GridColumns, IsResponsive, TabularLayout, IsActive, CreatedDate, ModifiedDate, Destination)
                    VALUES (${formatValue(formIdentifier)}, ${formatValue(form.FormName)}, ${formatValue(form.Description)}, 
                            ${formatValue(form.LayoutType)}, ${form.GridColumns || 12}, ${form.IsResponsive ? 1 : 0}, 
                            ${form.TabularLayout ? 1 : 0}, ${form.IsActive ? 1 : 0}, GETDATE(), GETDATE(), ${formatValue(form.Destination)})
                OUTPUT inserted.FormId INTO @InsertedForm;

                SELECT FormId FROM @InsertedForm;
            `, { type: sequelize.QueryTypes.SELECT });

            const formId = formResult.FormId;

            // Get existing sections for cleanup
            const existingSections = await sequelize.query(`
                SELECT SectionId, SectionName FROM p4u_FormSections WHERE FormId = ${formId}
            `, { type: sequelize.QueryTypes.SELECT });

            // Insert Sections
            if (Array.isArray(form.Sections)) {
                const processedSectionNames = new Set();

                for (let section of form.Sections) {
                    processedSectionNames.add(section.SectionName);
                    const [sectionResult] = await sequelize.query(`
                        DECLARE @InsertedSection TABLE (SectionId INT);
                        MERGE INTO p4u_FormSections AS target
                        USING (SELECT ${formId} AS FormId, ${formatValue(section.SectionName)} AS SectionName) AS source
                        ON target.FormId = source.FormId AND target.SectionName = source.SectionName
                        WHEN MATCHED THEN
                            UPDATE SET
                                Description = ${formatValue(section.Description)},
                                OrderIndex = ${section.OrderIndex || 0},
                                LayoutType = ${formatValue(section.LayoutType)},
                                GridColumns = ${section.GridColumns || 12},
                                IsCollapsible = ${section.IsCollapsible ? 1 : 0},
                                IsCollapsedByDefault = ${section.IsCollapsedByDefault ? 1 : 0},
                                IsActive = ${section.IsActive ? 1 : 0}
                        WHEN NOT MATCHED THEN
                            INSERT (FormId, SectionName, Description, OrderIndex, LayoutType, GridColumns, IsCollapsible, IsCollapsedByDefault, IsActive)
                            VALUES (${formId}, ${formatValue(section.SectionName)}, ${formatValue(section.Description)}, 
                                    ${section.OrderIndex || 0}, ${formatValue(section.LayoutType)}, ${section.GridColumns || 12}, 
                                    ${section.IsCollapsible ? 1 : 0}, ${section.IsCollapsedByDefault ? 1 : 0}, ${section.IsActive ? 1 : 0})
                        OUTPUT inserted.SectionId INTO @InsertedSection;

                        SELECT SectionId FROM @InsertedSection;
                    `, { type: sequelize.QueryTypes.SELECT });

                    const sectionId = sectionResult.SectionId;

                    // Get existing fields for cleanup
                    const existingFields = await sequelize.query(`
                        SELECT FieldId, FieldName FROM p4u_FormFields WHERE SectionId = ${sectionId}
                    `, { type: sequelize.QueryTypes.SELECT });

                    if (Array.isArray(section.Fields)) {
                        const processedFieldNames = new Set();

                        for (let field of section.Fields) {
                            processedFieldNames.add(field.FieldName);
                            const [fieldResult] = await sequelize.query(`
                                DECLARE @InsertedField TABLE (FieldId INT);
                                MERGE INTO p4u_FormFields AS target
                                USING (SELECT ${formId} AS FormId, ${sectionId} AS SectionId, ${formatValue(field.FieldName)} AS FieldName) AS source
                                ON target.FormId = source.FormId AND target.SectionId = source.SectionId AND target.FieldName = source.FieldName
                                WHEN MATCHED THEN
                                    UPDATE SET
                                        Label = ${formatValue(field.Label)},
                                        FieldType = ${formatValue(field.FieldType)},
                                        GridColumnSpan = ${field.GridColumnSpan || 1},
                                        GridRowSpan = ${field.GridRowSpan || 1},
                                        IsFullWidth = ${field.IsFullWidth ? 1 : 0},
                                        LabelPosition = ${formatValue(field.LabelPosition || 'top')},
                                        IsRequired = ${field.IsRequired ? 1 : 0},
                                        DefaultValue = ${formatValue(field.DefaultValue)},
                                        ValidationPattern = ${formatValue(field.ValidationPattern)},
                                        Placeholder = ${formatValue(field.Placeholder)},
                                        OrderIndex = ${field.OrderIndex || 0},
                                        IsActive = ${field.IsActive ? 1 : 0},
                                        ModifiedDate = GETDATE()
                                WHEN NOT MATCHED THEN
                                    INSERT (FormId, SectionId, FieldName, Label, FieldType, GridColumnSpan, GridRowSpan, 
                                            IsFullWidth, LabelPosition, IsRequired, DefaultValue, ValidationPattern, 
                                            Placeholder, OrderIndex, IsActive, CreatedDate, ModifiedDate) 
                                    VALUES (${formId}, ${sectionId}, ${formatValue(field.FieldName)}, 
                                            ${formatValue(field.Label)}, ${formatValue(field.FieldType)},
                                            ${field.GridColumnSpan || 1}, ${field.GridRowSpan || 1},
                                            ${field.IsFullWidth ? 1 : 0}, ${formatValue(field.LabelPosition || 'top')},
                                            ${field.IsRequired ? 1 : 0}, ${formatValue(field.DefaultValue)},
                                            ${formatValue(field.ValidationPattern)}, ${formatValue(field.Placeholder)},
                                            ${field.OrderIndex || 0}, ${field.IsActive ? 1 : 0},
                                            GETDATE(), GETDATE())
                                OUTPUT inserted.FieldId INTO @InsertedField;

                                SELECT FieldId FROM @InsertedField;
                            `, { type: sequelize.QueryTypes.SELECT });

                            const fieldId = fieldResult.FieldId;

                            if (Array.isArray(field.Options)) {
                                const processedOptionValues = new Set();
                                
                                // Get existing options for cleanup
                                const existingOptions = await sequelize.query(`
                                    SELECT OptionId, Value FROM p4u_FieldOptions WHERE FieldId = ${fieldId}
                                `, { type: sequelize.QueryTypes.SELECT });
                                
                                for (let option of field.Options) {
                                    processedOptionValues.add(option.Value);
                                     await sequelize.query(`
                                        MERGE INTO p4u_FieldOptions AS target
                                        USING (
                                            SELECT ${fieldId} AS FieldId,
                                                   ${formatValue(option.OptionSource)} AS OptionSource,
                                                   ${formatValue(option.Value)} AS Value,
                                                   ${formatValue(option.DisplayText)} AS DisplayText,
                                                   ${formatValue(option.SourceTable)} AS SourceTable,
                                                   ${formatValue(option.ValueColumn)} AS ValueColumn,
                                                   ${formatValue(option.DisplayColumn)} AS DisplayColumn,
                                                   ${formatValue(option.WhereClause)} AS WhereClause,
                                                   ${option.DependentFieldId ? option.DependentFieldId : 'NULL'} AS DependentFieldId,
                                                   ${option.OrderIndex ?? 'NULL'} AS OrderIndex,
                                                   ${option.IsActive ? 1 : 0} AS IsActive
                                        ) AS source
                                        ON target.FieldId = source.FieldId AND target.Value = source.Value
                                        WHEN MATCHED THEN
                                            UPDATE SET
                                                OptionSource = source.OptionSource,
                                                DisplayText = source.DisplayText,
                                                SourceTable = source.SourceTable,
                                                ValueColumn = source.ValueColumn,
                                                DisplayColumn = source.DisplayColumn,
                                                WhereClause = source.WhereClause,
                                                DependentFieldId = source.DependentFieldId,
                                                OrderIndex = source.OrderIndex,
                                                IsActive = source.IsActive
                                        WHEN NOT MATCHED THEN
                                            INSERT (FieldId, OptionSource, Value, DisplayText, SourceTable, ValueColumn, DisplayColumn, WhereClause, DependentFieldId, OrderIndex, IsActive) 
                                            VALUES (source.FieldId, source.OptionSource, source.Value, source.DisplayText, source.SourceTable, source.ValueColumn, source.DisplayColumn, source.WhereClause, source.DependentFieldId, source.OrderIndex, source.IsActive);
                                    `, { type: sequelize.QueryTypes.INSERT });
                                }

                             
                                if (form.FormIdentifier) { // Only delete options if updating an existing form
                                    for (const existingOption of existingOptions) {
                                        if (!processedOptionValues.has(existingOption.Value)) {
                                            await sequelize.query(`
                                                DELETE FROM p4u_FieldOptions WHERE OptionId = ${existingOption.OptionId};
                                            `, { type: sequelize.QueryTypes.DELETE });
                                            console.log('Deleted field option:', existingOption.OptionId);
                                        }
                                    }
                                }

                            }
                        }

                        // Delete removed fields
                        for (const existingField of existingFields) {
                            if (!processedFieldNames.has(existingField.FieldName)) {
                                await sequelize.query(`
                                    DELETE FROM p4u_FieldOptions WHERE FieldId = ${existingField.FieldId};
                                    DELETE FROM p4u_FormFields WHERE FieldId = ${existingField.FieldId};
                                `, { type: sequelize.QueryTypes.DELETE });
                                console.log('Deleted field:', existingField.FieldId);
                                console.log('Deleted field options:', existingField.FieldId);
                            }
                        }
                    }
                }

                // Delete removed sections
                for (const existingSection of existingSections) {
                    if (!processedSectionNames.has(existingSection.SectionName)) {
                        await sequelize.query(`
                            DELETE FROM p4u_FieldOptions 
                            WHERE FieldId IN (SELECT FieldId FROM p4u_FormFields WHERE SectionId = ${existingSection.SectionId});

                            DELETE FROM p4u_FormFields 
                            WHERE SectionId = ${existingSection.SectionId};

                            DELETE FROM p4u_FormSections 
                            WHERE SectionId = ${existingSection.SectionId};
                        `, { type: sequelize.QueryTypes.DELETE });
                        console.log('Deleted section:', existingSection.SectionId);
                    }
                }
            }

            // Save configuration
            const formSubmission = new UpsertFormConfigurationQuery({ formId, formData: form });
            await formSubmission.get();

            console.log('Saved form configuration for form ID:', formId);
            return { FormId: formId, FormIdentifier: formIdentifier };
        } catch (error) {
            console.error('Error in UpsertFormBuilder:', error);
            throw error;
        }
    }
};
