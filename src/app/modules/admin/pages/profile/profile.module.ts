import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// ✅ Import Angular Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';  // ✅ Added MatDialogModule

// ✅ Import Other Modules
import { P4UCardModule } from '@fuse/components/card';
import { SharedModule } from 'app/shared/shared.module';
import { LayoutModule } from '../../../../layout/layout.module';

// ✅ Import Components
import { ProfileComponent } from 'app/modules/admin/pages/profile/profile.component';
import { profileRoutes } from 'app/modules/admin/pages/profile/profile.routing';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
// import { ExternalRedirectComponent } from './external-redirect/external-redirect.component';


@NgModule({
    declarations: [
        ProfileComponent,
        // ExternalRedirectComponent,


    ],
    imports: [
    CommonModule,
    RouterModule.forChild(profileRoutes),
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    LayoutModule,
    P4UCardModule,
    // ✅ Angular Material Modules
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatTooltipModule,
    MatSelectModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatCardModule,
    CommonModule,
    MatDialogModule ,
    MatDatepickerModule,
    MatNativeDateModule,

],
    exports: [
        ProfileComponent,
      
 // ✅ Ensure this is exported if used outside
        // LatestPostsComponent
    ],
    entryComponents: [
 // ✅ Required for dynamically loaded modals
        // LatestPostsComponent
    ]
})
export class ProfileModule { }