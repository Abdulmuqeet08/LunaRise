import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { P4UCardComponent } from '@fuse/components/card/card.component';

@NgModule({
    declarations: [
        P4UCardComponent
    ],
    imports     : [
        CommonModule
    ],
    exports     : [
        P4UCardComponent
    ]
})
export class P4UCardModule
{
}
