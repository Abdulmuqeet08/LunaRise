import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { P4UApiService } from '@fuse/lib/api';
import { P4U as P4UData } from 'app/api/dashboards/P4U/data';

@Injectable({
    providedIn: 'root'
})
export class P4UApi
{
    private _project: any = P4UData;

    /**
     * Constructor
     */
    constructor(private _P4UApiService: P4UApiService)
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
        this._P4UApiService
            .onGet('api/dashboards/P4U')
            .reply(() => [200, cloneDeep(this._project)]);
    }
}
