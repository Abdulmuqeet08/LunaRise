import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { SessionService } from './session.service'


@Injectable({
    providedIn: 'root'
})
export class FormService {
    
    private _isLoading: BehaviorSubject<boolean| false> = new BehaviorSubject(false);
  
    private _mode: BehaviorSubject<string | null> = new BehaviorSubject(null);
    private _formDefinition: BehaviorSubject<any | null> = new BehaviorSubject({
        formId: null,
        formName: '',
        description: '',
        layoutType: '',
        gridColumns: 0,
        isResponsive: false,
        tabularLayout: false,
        sections: [],
        fields: [],
        breakpoints: [],
        Destination: [] ,
      });

    // displayedColumns: string[] = ['utilityID', 'utilityName', 'Status', 'Action'];
    // dataSource:any=[];
    constructor( 
        public _sessionService:SessionService,
        ){}

        get isLoading$(): Observable<any>
    {
        return this._isLoading.asObservable();
    }

    get mode$(): Observable<any>
    {
        return this._mode.asObservable();
    }

    getMode(){
        return this._mode.asObservable();
    }
        get formDefinition$(): Observable<any>
    {
       
        return this._formDefinition.asObservable();
      
    }

    async getFormDefinition(formId) {
        this._sessionService.getFormDetails(formId).subscribe(async (response: any) => {
            if (!response.status) {
              
            }    
            else {
                 
                this._formDefinition.next(this.transformFormData(response.entity.data));               
            }
        });   
    }

   
    async getFieldOptions(fieldId, dependentValue = null) {
        this._sessionService.getFormFieldOptionDetails(fieldId,dependentValue).subscribe(async (response: any) => {
            if (!response.status) {
                
            }    
            else {
                this._formDefinition.next(this.transformFormData(response.entity));               
            }
        });
    }

   

    transformFormData(records) {    
        const form = {
            formId: records[0].FormId,
            formName: records[0].FormName,
            description: records[0].Description,
            layoutType: records[0].LayoutType,
            gridColumns: records[0].GridColumns,
            isResponsive: records[0].IsResponsive,
            tabularLayout: records[0].TabularLayout,
            sections: [],
            fields: [],
            breakpoints: [],
            Destination: records[0].Destination,
            
          
        };
    
        // Process sections
        const sectionsMap = new Map();
        records.forEach(record => {
            if (record.SectionId && !sectionsMap.has(record.SectionId)) {
                const section = {
                    sectionId: record.SectionId,
                    name: record.SectionName,
                    layoutType: record.SectionLayout,
                    gridColumns: record.SectionGridColumns,
                    isCollapsible: record.IsCollapsible,
                    breakpoints: [],
                    fields: [] 
                };
                sectionsMap.set(record.SectionId, section);
                form.sections.push(section);
            }
        });
    
        // Process fields and their options
        const fieldsMap = new Map();
        const optionsMap = new Map(); // Map to track unique options per field

        records.forEach(record => {
            if (record.FieldId && !fieldsMap.has(record.FieldId)) {
                const field = {
                    fieldId: record.FieldId,
                    name: record.FieldName,
                    label: record.Label,
                    type: record.FieldType,
                    gridColumnSpan: record.GridColumnSpan,
                    gridRowSpan: record.GridRowSpan,
                    isFullWidth: record.IsFullWidth,
                    labelPosition: record.LabelPosition,
                    required: record.IsRequired,
                    defaultValue: record.DefaultValue,
                    validation: record.ValidationPattern,
                    placeholder: record.Placeholder,
                    orderIndex: record.OrderIndex,
                    sectionId: record.SectionId,
                    options: [],
                    breakpoints: []
                };
                fieldsMap.set(record.FieldId, field);
                optionsMap.set(record.FieldId, new Map()); // Initialize options map for this field
                form.fields.push(field);
                
                // Add field to its section
                if (record.SectionId) {
                    const section = sectionsMap.get(record.SectionId);
                    if (section) {
                        section.fields.push(field);
                    }
                }
            }
    
            // Process options with deduplication
            if (record.OptionId) {
                const field = fieldsMap.get(record.FieldId);
                if (field) {
                    const fieldOptionsMap = optionsMap.get(record.FieldId);
                    const optionKey = record.Value;
                    
                    if (!fieldOptionsMap.has(optionKey)) {
                        const option = {
                            optionId: record.OptionId,
                            source: record.OptionSource,
                            value: record.Value,
                            label: record.DisplayText,
                            sourceTable: record.SourceTable,
                            valueColumn: record.ValueColumn,
                            displayColumn: record.DisplayColumn,
                            whereClause: record.WhereClause,
                            dependentFieldId: record.DependentFieldId
                        };
                        fieldOptionsMap.set(optionKey, option);
                        field.options.push(option);
                      
                        
                        
                    }
                }
            }
        });
    
        // Process layout configurations
        records.forEach(record => {
            if (record.ConfigId) {
                const config = {
                    configId: record.ConfigId,
                    name: record.BreakpointName,
                    minWidth: record.MinWidth,
                    columns: record.ColumnCount,
                    gutterSize: record.GutterSize
                };
    
                if (record.SectionId) {
                    const section = sectionsMap.get(record.SectionId);
                    if (section) {
                        section.breakpoints.push(config);
                    }
                } else if (record.FieldId) {
                    const field = fieldsMap.get(record.FieldId);
                    if (field) {
                        field.breakpoints.push(config);
                    }
                } else {
                    form.breakpoints.push(config);
                }
            }
        });
    
        return form;
    }

    async submitForm( formData: any) {
        this._isLoading.next(true);
    
        this._sessionService.submitFormRecord(formData).subscribe(async (response: any) => {
            if (!response.status) {
                
                this._mode.next('false');
            } else {
                
                this._mode.next('true');
            }
        });
    }
    
    
}
