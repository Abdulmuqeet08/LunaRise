import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CostTypesService } from 'app/modules/admin/apps/costtype/costtype.service';
import { CostType } from 'app/modules/admin/apps/costtype/costtype.types';

@Injectable({
    providedIn: 'root'
})
export class CostTypesResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _costTypeService: CostTypesService)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CostType[]>
    {
        return this._costTypeService.getCostTypes();
    }
}

@Injectable({
    providedIn: 'root'
})
export class CostTypeResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private _costTypeService: CostTypesService,
        private _router: Router
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CostType>
    {
        return this._costTypeService.getCostTypeById(route.paramMap.get('id'))
                   .pipe(
                       // Error here means the requested contact is not available
                       catchError((error) => {

                           // Log the error
                           console.error(error);

                           // Get the parent url
                           const parentUrl = state.url.split('/').slice(0, -1).join('/');

                           // Navigate to there
                           this._router.navigateByUrl(parentUrl);

                           // Throw an error
                           return throwError(error);
                       })
                   );
    }
}
