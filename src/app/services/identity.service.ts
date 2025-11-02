import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';
import { Auth } from '../models/auth';
import { HelpersService } from './helpers.service';
import { ActivatedRoute, Router } from "@angular/router";

@Injectable()
export class IdentityService {
    authChange: Subject<Auth> = new Subject<Auth>();

    private auth: Auth;

    private redirectUrl: string;

    expiredDate: any;

    externalAuth = false;
    eventId: any;

    constructor(
        private cookieService: CookieService,
        private helpersService: HelpersService,
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
    ) { }

    setAuth(auth: Auth) {
        this.expiredDate = new Date();
        this.expiredDate.setDate(this.expiredDate.getDate() + 30);
        this.auth = auth;
        this.cookieService.set('auth', JSON.stringify(auth), this.expiredDate, '/');
        this.authChange.next(this.auth);
    }
    setCookie(variable, value) {
        this.expiredDate = new Date();
        this.expiredDate.setDate(this.expiredDate.getDate() + 30);
        this.cookieService.set(variable, value, this.expiredDate, '/');
    }
    getCookie(variable) {
        return this.cookieService.get(variable);
    }
    deleteCookie(variable) {
        this.cookieService.delete(variable, '/');
    }
    setInMemory(auth: Auth) {
        this.auth = auth;
        this.externalAuth = true;
    }

    setRedirectUrl(redirectUrl: string) {
        this.redirectUrl = redirectUrl;
    }

    getRedirectUrl() {
        return this.redirectUrl;
    }

    getAuth(): Auth {
        if (this.auth) {
            return this.auth;
        }
        let authDetails = this.cookieService.get('auth');
        let auth: Auth = null;
        if (!authDetails) {
            auth = Auth.createGuest();
        } else {
            authDetails = JSON.parse(authDetails);
            auth = Auth.createFromHash(authDetails);
        }
        return auth;
    }

    logout() {       
        localStorage.clear();
        window.localStorage.clear();
        this.cookieService.delete('auth', '/');
        this.auth = null;
        this._router.navigate(['/']) 
    }

    isExternalAuth() {
        return this.externalAuth;
    }
}
