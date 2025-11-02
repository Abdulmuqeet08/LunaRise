import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FileUploadService } from 'app/modules/admin/fileupload/fileupload.service';




@Injectable({
    providedIn: 'root'
})
export class FileUploadResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private _fileuploadService: FileUploadService,
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
       
       // return this._fileuploadService.getMenuItemList();
       
       
    }

}

