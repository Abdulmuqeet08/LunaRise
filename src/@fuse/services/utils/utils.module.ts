import { NgModule } from '@angular/core';
import { P4UUtilsService } from '@fuse/services/utils/utils.service';

@NgModule({
    providers: [
        P4UUtilsService
    ]
})
export class P4UUtilsModule
{
    /**
     * Constructor
     */
    constructor(private _P4UUtilsService: P4UUtilsService)
    {
    }
}
