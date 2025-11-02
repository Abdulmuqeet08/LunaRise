export interface FormDefinition {
    formId: number;
    formName: string;
    description: string;
    layoutType: string;
    gridColumns: number;
    isResponsive: boolean;
    tabularLayout: boolean;
    sections: FormSection[];
    fields: FormField[];
    breakpoints: LayoutBreakpoint[];
    Destination: string;
}

export interface FormSection {
    sectionId: number;
    name: string;
    layoutType: string;
    gridColumns: number;
    isCollapsible: boolean;
    breakpoints: LayoutBreakpoint[];
}

export interface FormField {
    fieldId: number;
    name: string;
    label: string;
    type: string;
    gridColumnSpan: number;
    gridRowSpan: number;
    isFullWidth: boolean;
    labelPosition: string;
    required: boolean;
    defaultValue?: any;
    validation?: string;
    placeholder?: string;
    orderIndex: number;
    sectionId?: number;
    options: FieldOption[];
}

export interface FieldOption {
    optionId: number;
    source: 'static' | 'dynamic';
    value?: string;
    label?: string;
    sourceTable?: string;
    valueColumn?: string;
    displayColumn?: string;
    whereClause?: string;
    dependentFieldId?: number;
}

export interface LayoutBreakpoint {
    name: string;
    minWidth: number;
    columns: number;
    gutterSize: number;
}