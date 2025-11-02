import { NgModule } from '@angular/core';
import { P4UTailwindService } from '@fuse/services/tailwind/tailwind.service';

@NgModule({
    providers: [
        P4UTailwindService
    ]
})
export class P4UTailwindConfigModule
{
    /**
     * Constructor
     */
    constructor(private _P4UTailwindConfigService: P4UTailwindService)
    {
    }
}
