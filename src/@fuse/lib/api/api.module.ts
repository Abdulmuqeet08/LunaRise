import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FUSE_MOCK_API_DEFAULT_DELAY } from '@fuse/lib/api/api.constants';
import { FuseApiInterceptor } from '@fuse/lib/api/api.interceptor';

@NgModule({
    providers: [
        {
            provide : HTTP_INTERCEPTORS,
            useClass: FuseApiInterceptor,
            multi   : true
        }
    ]
})
export class FuseApiModule
{
    /**
     * FuseApi module default configuration.
     *
     * @param ApiServices - Array of services that register mock API handlers
     * @param config - Configuration options
     * @param config.delay - Default delay value in milliseconds to apply all responses
     */
    static forRoot(ApiServices: any[], config?: { delay?: number }): ModuleWithProviders<FuseApiModule>
    {
        return {
            ngModule : FuseApiModule,
            providers: [
                {
                    provide   : APP_INITIALIZER,
                    deps      : [...ApiServices],
                    useFactory: () => (): any => null,
                    multi     : true
                },
                {
                    provide : FUSE_MOCK_API_DEFAULT_DELAY,
                    useValue: config?.delay ?? 0
                }
            ]
        };
    }
}
