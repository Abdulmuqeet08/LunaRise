import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {  FormService} from 'app/services/form.Service';
import { IdentityService } from 'app/services/identity.service';
import { Auth } from 'app/models/auth';





@Injectable({
    providedIn: 'root'
})
export class UploadResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    auth:Auth;
    UserID:any;
    constructor(
        private _formService: FormService,
        private _IdentityService:IdentityService
        )
    {
        this.auth=this._IdentityService.getAuth();
        this.UserID=this.auth.UserID;
    }

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    {     
        let entity={
            formId:route.params.name
        } 
      return "";// this._formService.getFormDefinition(entity);

    }

}