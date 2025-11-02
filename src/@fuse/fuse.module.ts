import { NgModule, Optional, SkipSelf } from '@angular/core';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { P4UConfirmationModule } from '@fuse/services/confirmation';
import { P4UMediaWatcherModule } from '@fuse/services/media-watcher/media-watcher.module';
import { P4USplashScreenModule } from '@fuse/services/splash-screen/splash-screen.module';
import { P4UTailwindConfigModule } from '@fuse/services/tailwind/tailwind.module';
import { P4UUtilsModule } from '@fuse/services/utils/utils.module';

@NgModule({
    imports  : [
        P4UConfirmationModule,
        P4UMediaWatcherModule,
        P4USplashScreenModule,
        P4UTailwindConfigModule,
        P4UUtilsModule
    ],
    providers: [
        {
            // Disable 'theme' sanity check
            provide : MATERIAL_SANITY_CHECKS,
            useValue: {
                doctype: false,
                theme  : false,
                version: true
            }
        },
        {
            // Use the 'fill' appearance on Angular Material form fields by default
            provide : MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: {
                appearance: 'fill'
            }
        }
    ]
})
export class P4UModule
{
    /**
     * Constructor
     */
    constructor(@Optional() @SkipSelf() parentModule?: P4UModule)
    {
        if ( parentModule )
        {
            throw new Error('P4UModule has already been loaded. Import this module in the AppModule only!');
        }
    }
}
