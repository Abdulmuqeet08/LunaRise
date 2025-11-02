import { Route } from '@angular/router';
import { MenuComponent } from 'app/modules/admin/systemconfiguration/menu/menu.component';
import {SystemCofigurationMenuResolver } from 'app/modules/admin/systemconfiguration/menu/menu.resolvers';

export const SystemConfigurationRoutes: Route[] = [
    {
        path      : '',
        pathMatch : 'full',
       // redirectTo: 'systemconfiguration',
        component: MenuComponent,
        resolve  : {
                           entity    : SystemCofigurationMenuResolver                   
                     }
    }
  
    // {
    //     path     : '',
    //     component: MenuComponent,
    //     children : [
    //         {
    //             path     : 'entity/:entityId',
    //             component: MenuComponent,
    //             resolve  : {
    //                 entity    : SystemCofigurationMenuResolver                   
    //             }
    //         },
           
    //     ]
       
    // }
];
