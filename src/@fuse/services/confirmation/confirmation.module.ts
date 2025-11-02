import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { TRAConfirmationService } from '@fuse/services/confirmation/confirmation.service';
import { TRAConfirmationDialogComponent } from '@fuse/services/confirmation/dialog/dialog.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        TRAConfirmationDialogComponent
    ],
    imports: [
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        CommonModule
    ],
    providers   : [
        TRAConfirmationService
    ]
})
export class P4UConfirmationModule
{
    /**
     * Constructor
     */
    constructor(private _TRAConfirmationService: TRAConfirmationService)
    {
    }
}
