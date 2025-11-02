import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { environment } from 'environments/environment';
import { TRAConfirmationService } from '@fuse/services/confirmation';
import { Observable, Observer, fromEvent, merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { HotToastService } from '@ngneat/hot-toast';
import { OrientationPromptService } from './orientation-prompt.service';


@Component({
    selector   : 'app-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss']
})
export class AppComponent
{
    shouldDisplayOrientationPrompt = false;
    excludedRoutes: string[] = ['/login', '/setup','/dispatch','/bundle','/pending-dispatch','/pending-bundle','/dispatch-selection','/confirmLogout','/bundle-selection','/remap','/sales/sales/sales','/sign-in','/sign-out','/dashboard'];
    router: Router;
    isInternetOnline:any;
    constructor(private _router: Router,
        private _TRAConfirmationService: TRAConfirmationService,
        private toastService: HotToastService,
        private orientationPromptService: OrientationPromptService
        ) {
        this.router = _router;
         this.createOnline$().subscribe(isOnline => 
            {   
                this.isInternetOnline = isOnline;
                if(isOnline){
                    this.toastService.close() ;
                }
                else{
                    this.toastService.loading("Internet connection lost ....",{ position: 'top-center' }) ;
                    try{   
                            (<any>window).android.playAudio(3);
                    }
                    catch(e){}
                }
                
        });
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
              // Update shouldDisplayOrientationPrompt based on the current route or any other condition
              this.shouldDisplayOrientationPrompt = this.shouldDisplayForRoute(event.url);
              this.orientationPromptService.setShouldDisplay(this.shouldDisplayOrientationPrompt);
            }
          });
    }

    private shouldDisplayForRoute(url: string): boolean {
        // Check if the current route is in the excludedRoutes array
        return !this.excludedRoutes.some(excludedRoute => url.includes(excludedRoute));
      }
      
   

    createOnline$() {
        return merge<boolean>(
          fromEvent(window, 'offline').pipe(map(() => false)),
          fromEvent(window, 'online').pipe(map(() => true)),
          new Observable((sub: Observer<boolean>) => {
            sub.next(navigator.onLine);
            sub.complete();
          }));
      }



    async logoutConfirm() {
        const confirmation = this._TRAConfirmationService.open({
            title: 'Confirm Logout',
            message: 'Are you sure you want to log out?',
            icon: {
                show: true,
                name: "heroicons_outline:exclamation",
                color: "warn"
              },
            actions: {
                confirm: {
                    label: 'Yes',
                },
                cancel: {
                    label: 'No',
                },
            },
            "dismissible": false
        });

        // Subscribe to the confirmation dialog closed action

        confirmation.afterClosed().subscribe((result) => {
            if (result === 'confirmed') {
                this.router.navigate(['/confirmLogout']);
            } else if (result === 'cancelled') {
                // this.clearPendingItems();
            }
        });
    }

    public logout(error) {
        this.createOnline$().subscribe(isOnline => {   
            if(isOnline){
                if(error.statusText=="Unknown Error"){
                    this.toastService.close();
                    return;
                }
                if(error.statusText==undefined || error.statusText=="Unauthorized"){
                    // Clear all storage data
                    localStorage.clear();
                    sessionStorage.clear();
                    // Clear all cookies
                    document.cookie.split(";").forEach(c => {
                        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
                    });
                    this.router.navigate(['/login']);
                }
            } 
        });
    }
}
