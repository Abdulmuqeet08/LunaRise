import { Route } from '@angular/router';
import { UploadComponent } from 'app/modules/admin/uploads/uploads.component';
import {UploadResolver  } from 'app/modules/admin/uploads/uploads.resolvers';

export const UploadRoutes: Route[] = [
    {
        path      : '',
        pathMatch : 'full',
        redirectTo: 'uploads'
    },
    {
        path     : '',
        component: UploadComponent,
        children : [
            {
                path     : ':name',
                component: UploadComponent,
                resolve  : {
                    form    : UploadResolver                   
                }
            },
           
        ]
       
    }
];
