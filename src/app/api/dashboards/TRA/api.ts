import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { P4UApiService  } from '@fuse/lib/api';
import { TRA as TRAData } from 'app/api/dashboards/TRA/data';

@Injectable({
    providedIn: 'root'
})
export class TRAApi
{
    private _project: any = TRAData;

    /**
     * Constructor
     */
    constructor(private _TRAApiService: P4UApiService )
    {
        // Register Mock API handlers
        this.registerHandlers();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Register Mock API handlers
     */
    registerHandlers(): void
    {
        // -----------------------------------------------------------------------------------------------------
        // @ Sales - GET
        // -----------------------------------------------------------------------------------------------------
        this._TRAApiService
            .onGet('api/dashboards/TRA')
            .reply(() => [200, cloneDeep(this._project)]);
    }
}
