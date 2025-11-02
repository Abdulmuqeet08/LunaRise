import { NgModule } from '@angular/core';
import { P4UMediaWatcherService } from '@fuse/services/media-watcher/media-watcher.service';

@NgModule({
    providers: [
        P4UMediaWatcherService
    ]
})
export class P4UMediaWatcherModule
{
    /**
     * Constructor
     */
    constructor(private _P4UMediaWatcherService: P4UMediaWatcherService)
    {
    }
}
