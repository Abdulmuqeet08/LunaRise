import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { P4UCardModule } from '@fuse/components/card';
import { P4UAlertModule } from '@fuse/components/alert';

import { SharedModule } from 'app/shared/shared.module';
import { welcomeRoutes } from './welcome.routing';
@NgModule({
    declarations: [
    ],
    imports: [
        RouterModule.forChild(welcomeRoutes),
        ReactiveFormsModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        P4UCardModule,
        P4UAlertModule,
        SharedModule
    ]
})
export class WelcomeModule {}