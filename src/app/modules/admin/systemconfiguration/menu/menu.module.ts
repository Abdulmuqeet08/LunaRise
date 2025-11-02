import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { MenuComponent } from 'app/modules/admin/systemconfiguration/menu/menu.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatNativeDateModule} from '@angular/material/core';
import { HttpClientModule} from '@angular/common/http';
import { CdkTableModule} from '@angular/cdk/table';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatTableExporterModule } from 'mat-table-exporter';
import { SystemConfigurationFormComponent } from 'app/modules/admin/systemconfiguration/form/form.component'


export const routes: Route[] = [
    {
        path     : '',
        component: MenuComponent
    }
];

@NgModule({
    declarations: [
        // MenuComponent,
        // SystemConfigurationFormComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        SharedModule,
        FormsModule,
        HttpClientModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        CdkTableModule,
        MatTableModule,
        MatProgressBarModule,
        MatButtonModule,
        MatIconModule,
        MatSortModule,
        MatTableExporterModule,
        MatInputModule
    ]
})
export class MenuModule
{
}
