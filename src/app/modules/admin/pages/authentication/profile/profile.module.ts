import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { P4UCardModule } from '@fuse/components/card';
import { SharedModule } from 'app/shared/shared.module';
import { ProfileComponent } from 'app/modules/admin/pages/profile/profile.component';
import { profileRoutes } from 'app/modules/admin/pages/profile/profile.routing';
import { ProfileEditModalComponent } from './profile-form-modal/profile-edit-modal.component';
import { animation } from '@angular/animations';
import { ProfileCompleteModalComponent } from './profile-complete-modal/profile-complete-modal.component';
import { LayoutModule } from "../../../../layout/layout.module";
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import {  ProfileSuccessModalComponent } from './success-modal/profile-success-modal.component';
import { ProfileVideoModalComponent } from './video-modal/video-modal.component';
import { MatCardModule } from '@angular/material/card';
// import { ImageUploadComponent } from '../profile/profile_avatar/profile_avatar.component';
@NgModule({
    declarations: [
        ProfileComponent,
        ProfileEditModalComponent,
        ProfileCompleteModalComponent,
        ProfileSuccessModalComponent,
        ProfileVideoModalComponent,
       
       
        
    ],
        
    imports: [
    RouterModule.forChild(profileRoutes),
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatTooltipModule,
    MatSelectModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    P4UCardModule,
    SharedModule,
    ReactiveFormsModule, 
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    MatProgressBarModule,
    CommonModule,
    MatCardModule
],
    exports:[
        ProfileComponent,
        ProfileEditModalComponent,
        ProfileCompleteModalComponent,
       ProfileSuccessModalComponent,
       ProfileVideoModalComponent,
    
    ]
})
export class ProfileModule
{
}
