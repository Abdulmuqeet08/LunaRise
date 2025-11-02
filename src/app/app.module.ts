import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { P4UModule } from '@fuse';
import { FuseConfigModule } from '@fuse/services/config';
import { FuseApiModule } from '@fuse/lib/api';
import { CoreModule } from 'app/core/core.module';
import { appConfig } from 'app/core/config/app.config';
import { ApiServices } from 'app/api';
import { LayoutModule } from 'app/layout/layout.module';
import { AppComponent } from 'app/app.component';
import { appRoutes } from 'app/app.routing';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpService } from './services/http.service';
import { HelpersService } from './services/helpers.service';
import { Interceptor } from './services/http-interceptor.service';
import { IdentityService } from './services/identity.service';
import { MaterialModule } from './MaterialModule';
import { HotToastModule } from '@ngneat/hot-toast';
import { OrientationPromptComponent } from './OrientationPromptComponent';
import { OrientationPromptService } from './orientation-prompt.service';
import { ReactiveFormsModule } from '@angular/forms';
import { WelcomeComponent } from './modules/admin/welcome/welcome.component';
import { FormModalComponent } from './modules/admin/welcome/form-modal/form-modal.component';




// import { FormBuilderComponent } from './modules/admin/form-builder/form-builder.component';
WelcomeComponent

const routerConfig: ExtraOptions = {
    preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled',
    onSameUrlNavigation: 'reload'
};

@NgModule({
    declarations: [
        AppComponent,
        OrientationPromptComponent,
        WelcomeComponent,
        FormModalComponent,
        // ExternalRedirectComponent,
        // // UploadComponent,
       
        // UploadsComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes, routerConfig),
        HttpClientModule,
        // Fuse, FuseConfig & FuseAPI
        P4UModule,
        FuseConfigModule.forRoot(appConfig),
        FuseApiModule.forRoot(ApiServices),

        // Core module of your application
        CoreModule,

        // Layout module of your application
        LayoutModule,
        MaterialModule,

        // 3rd party modules that require global configuration via forRoot
        MarkdownModule.forRoot({}),
        HotToastModule.forRoot(),
        ReactiveFormsModule
    ],
    
    providers: [
        HttpService,
        IdentityService,
        HelpersService,
        OrientationPromptService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: Interceptor,
            multi: true
        }
    ],

    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
