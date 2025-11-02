import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { IdentityService } from 'app/services/identity.service';
import { Auth } from 'app/models/auth';

import { ProfileService } from './profile.service';




@Injectable({
    providedIn: 'root'
})
export class ProfileResolver implements Resolve<any> {
    /**
     * Constructor
     */
    auth: Auth;
    UserID: any;
    constructor(
        private _profileService: ProfileService,
        private _IdentityService: IdentityService
    ) {
        this.auth = this._IdentityService.getAuth();
        this.UserID = this.auth.UserID;
    }

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
                return this._profileService.getUserProfile(this.UserID);            


    }

}

