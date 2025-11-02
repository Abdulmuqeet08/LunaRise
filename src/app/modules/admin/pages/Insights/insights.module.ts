import { NgModule } from '@angular/core'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE, MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgApexchartsModule } from 'ng-apexcharts';
import { TranslocoModule } from '@ngneat/transloco';
import { SharedModule } from 'app/shared/shared.module';
import { insightsComponent } from 'app/modules/admin/pages/Insights/insights.component';
import { MatTableModule } from '@angular/material/table';
import { MatTableExporterModule } from 'mat-table-exporter';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MAT_DATE_FORMATS } from '@angular/material/core';

import { insightsRoutingModule } from './insights.routing';  // Added import for routing module

import { EducationComponent } from './Education/education.component'; // ✅ Correct import
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
    declarations: [
        insightsComponent,
        EducationComponent
    ],
    imports: [
         // If you're using ReportRoutes, otherwise adjust
        insightsRoutingModule,
         // Import the routing module here
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatDialogModule,
        MatButtonToggleModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatMomentDateModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRippleModule,
        MatSortModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatTooltipModule,
        SharedModule,
        MatTableModule,
        MatTableExporterModule,
        NgApexchartsModule,
        TranslocoModule,
        MatAutocompleteModule,
        MatNativeDateModule
    ],
    providers: [
        
        { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
    ]
})
export class insightsModule {}
