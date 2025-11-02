import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SystemConfigurationService } from 'app/modules/admin/systemconfiguration/systemconfiguration.service';




@Injectable({
    providedIn: 'root'
})
export class SystemCofigurationMenuResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private _systemconfigurationService: SystemConfigurationService,
        )
    {
    }

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    {      
       
        // 
        return this._systemconfigurationService.getMenuItemList(state.url);
       
       
    }

}

