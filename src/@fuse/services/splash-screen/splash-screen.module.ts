import { NgModule } from '@angular/core';
import { P4USplashScreenService } from '@fuse/services/splash-screen/splash-screen.service';

@NgModule({
    providers: [
        P4USplashScreenService
    ]
})
export class P4USplashScreenModule
{
    /**
     * Constructor
     */
    constructor(private _P4USplashScreenService: P4USplashScreenService)
    {
    }
}
