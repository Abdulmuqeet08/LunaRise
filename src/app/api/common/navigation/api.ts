import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { P4UNavigationItem } from '@fuse/components/navigation';
import { P4UApiService  } from '@fuse/lib/api';
import { compactNavigation, defaultNavigation, futuristicNavigation, horizontalNavigation,compactNavigationSupervisor, defaultNavigationSupervisor, futuristicNavigationSupervisor, horizontalNavigationSupervisor, compactNavigationManager, defaultNavigationManager, futuristicNavigationManager, horizontalNavigationManager,compactNavigationsales, defaultNavigationsales, futuristicNavigationsales, horizontalNavigationsales  } from 'app/api/common/navigation/data';
import { Auth } from 'app/models/auth';
import { IdentityService } from 'app/services/identity.service';
import { SessionService } from 'app/services/session.service';

import {  
    GET_USERMENU_URL  
  }from '../../../../@fuse/models/url'

@Injectable({
    providedIn: 'root'
})
export class NavigationMockApi
{


    public auth: Auth;
    public  _compactNavigation: P4UNavigationItem[] ;
    public  _defaultNavigation: P4UNavigationItem[] ;
    public  _futuristicNavigation: P4UNavigationItem[] ;
    public  _horizontalNavigation: P4UNavigationItem[] ;
    
   
    /**
     * Constructor
     */
    constructor(
        private _TRAApiService: P4UApiService ,
        private _identityService:IdentityService,
        public _sessionService:SessionService,
        )
    {
        // Register API handlers      
        this.registerHandlers();
    }
  

  

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Register API handlers
     */
    registerHandlers(): void
    {
        // -----------------------------------------------------------------------------------------------------
        // @ Navigation - GET
        // -----------------------------------------------------------------------------------------------------
        this._TRAApiService
            .onGet('api/common/navigation')
            .reply(() => {
                this.auth=this._identityService.getAuth();
                if(this.auth.roles[0]=="Admin")
                {
                    this._compactNavigation= compactNavigation;
                    this._defaultNavigation= defaultNavigation;
                    this._futuristicNavigation= futuristicNavigation;
                    this._horizontalNavigation= horizontalNavigation;
                }
                if(this.auth.roles[0]=="Supervisor")
                {
                    this._compactNavigation= compactNavigationSupervisor;
                    this._defaultNavigation= defaultNavigationSupervisor;
                    this._futuristicNavigation= futuristicNavigationSupervisor;
                    this._horizontalNavigation= horizontalNavigationSupervisor;
                }
                if(this.auth.roles[0]=="Line Mgr")
                {
                    this._compactNavigation= compactNavigationManager;
                    this._defaultNavigation= defaultNavigationManager;
                    this._futuristicNavigation= futuristicNavigationManager;
                    this._horizontalNavigation= horizontalNavigationManager;
                } 
                if(this.auth.roles[0]=="Sales")
                {
                    this._compactNavigation= compactNavigationsales;
                    this._defaultNavigation= defaultNavigationsales;
                    this._futuristicNavigation= futuristicNavigationsales;
                    this._horizontalNavigation= horizontalNavigationsales;
                } 


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

                // Return the response
                return [
                    200,
                    {
                        compact   : cloneDeep(this._compactNavigation),
                        default   : cloneDeep(this._defaultNavigation),
                        futuristic: cloneDeep(this._futuristicNavigation),
                        horizontal: cloneDeep(this._horizontalNavigation)
                    }
                ];
            });
    }
}
