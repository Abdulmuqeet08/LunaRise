import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { P4UAlertComponent } from '@fuse/components/alert/alert.component';

@NgModule({
    declarations: [
        P4UAlertComponent
    ],
    imports     : [
        CommonModule,
        MatButtonModule,
        MatIconModule
    ],
    exports     : [
        P4UAlertComponent
    ]
})
export class P4UAlertModule
{
}
