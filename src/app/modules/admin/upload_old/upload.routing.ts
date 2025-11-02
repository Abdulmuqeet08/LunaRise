import { Route } from '@angular/router';
import { UploadComponent } from 'app/modules/admin/upload_old/upload.component';
import {UploadResolver  } from 'app/modules/admin/upload_old/upload.resolvers';

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
