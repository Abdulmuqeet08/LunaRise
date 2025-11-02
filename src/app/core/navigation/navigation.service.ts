import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { cloneDeep } from 'lodash-es';
import { tap } from 'rxjs/operators';
import { Navigation } from 'app/core/navigation/navigation.types';
import { P4UNavigationItem } from '@fuse/components/navigation';
import { SessionService } from 'app/services/session.service';
import { IdentityService } from 'app/services/identity.service';
import { Auth } from 'app/models/auth';
import {
GET_USERMENU_URL

}from '../../../@fuse/models/url'
@Injectable({
    providedIn: 'root'
})
export class NavigationService
{
    private _navigation: ReplaySubject<Navigation> = new ReplaySubject<Navigation>(1);
    public auth: Auth;
    public  _compactNavigation: P4UNavigationItem[] ;
    public  _defaultNavigation: P4UNavigationItem[] ;
    public  _futuristicNavigation: P4UNavigationItem[] ;
    public  _horizontalNavigation: P4UNavigationItem[] ;
    menuItems:any;
    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient,
        public _sessionService:SessionService,
        public _identityService:IdentityService,
        )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for navigation
     */
    get navigation$(): Observable<Navigation>
    {
        return this._navigation.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get all navigation data
     */
    get(): Observable<Navigation>
    {
        return this._httpClient.get<Navigation>('api/common/navigation').pipe(
            tap((navigation) => {
                console.log("----final menu----",navigation)
                this._navigation.next(navigation);
            })
        );
    }


    get1(): Observable<Navigation>
    {
        this.auth=this._identityService.getAuth();
        let entity={
            UserRole:this.auth.RoleID            
        }


        return this._httpClient.post<Navigation>(GET_USERMENU_URL,entity).pipe(
            tap((navigation) => {
                this.menuItems= navigation;
                this._compactNavigation= this.menuItems.entity;
                this._defaultNavigation=this.menuItems.entity;
                this._futuristicNavigation= this.menuItems.entity;
                this._horizontalNavigation= this.menuItems.entity;
    
    
               
                 // Fill compact navigation children using the default navigation
                 this._compactNavigation.forEach((compactNavItem) => {
                    this._defaultNavigation.forEach((defaultNavItem) => {
                        if ( defaultNavItem.id === compactNavItem.id )
                        {
                            compactNavItem.children = cloneDeep(defaultNavItem.children);
                        }
                    });
                });
    
                // Fill futuristic navigation children using the default navigation
                this._futuristicNavigation.forEach((futuristicNavItem) => {
                    this._defaultNavigation.forEach((defaultNavItem) => {
                        if ( defaultNavItem.id === futuristicNavItem.id )
                        {
                            futuristicNavItem.children = cloneDeep(defaultNavItem.children);
                        }
                    });
                });
    
                // Fill horizontal navigation children using the default navigation
                this._horizontalNavigation.forEach((horizontalNavItem) => {
                    this._defaultNavigation.forEach((defaultNavItem) => {
                        if ( defaultNavItem.id === horizontalNavItem.id )
                        {
                            horizontalNavItem.children = cloneDeep(defaultNavItem.children);
                        }
                    });
                });
                let finalMenu={
                    compact   : cloneDeep(this._compactNavigation),
                    default   : cloneDeep(this._defaultNavigation),
                    futuristic: cloneDeep(this._futuristicNavigation),
                    horizontal: cloneDeep(this._horizontalNavigation)
                };
                // console.log("----final menu----",finalMenu)
                this._navigation.next(finalMenu);
            })
        );

    }
}
